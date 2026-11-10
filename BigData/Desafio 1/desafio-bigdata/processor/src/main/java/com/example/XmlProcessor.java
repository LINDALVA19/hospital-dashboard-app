package com.example;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Properties;

public class XmlProcessor {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "xml-processor-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:29092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.CACHE_MAX_BYTES_BUFFERING_CONFIG, 0);

        StreamsBuilder builder = new StreamsBuilder();

        // Lê o tópico do Debezium
        KStream<String, String> source = builder.stream("dbserver1.public.documentos");

        ObjectMapper mapper = new ObjectMapper();

        source
            // Extrai o XML do JSON complexo do Debezium
            .mapValues(value -> {
                try {
                    JsonNode root = mapper.readTree(value);
                    JsonNode after = root.path("payload").path("after");
                    if (!after.isMissingNode()) {
                        return after.path("conteudo_xml").asText();
                    }
                } catch (Exception e) { }
                return null;
            })
            .filter((k, v) -> v != null)
            .groupByKey()
            .count()
            .toStream()
            .mapValues((key, count) -> "Total XMLs acumulados: " + count)
            .to("xml-counts");

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();

        System.out.println("Processador rodando...");
        
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }
}
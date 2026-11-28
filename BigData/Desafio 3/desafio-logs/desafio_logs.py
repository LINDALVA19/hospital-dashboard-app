import os
import sys

# --- CONFIGURAÇÕES DO WINDOWS/HADOOP ---
hadoop_path = r"C:\hadoop"
os.environ["HADOOP_HOME"] = hadoop_path
os.environ["hadoop.home.dir"] = hadoop_path
# Adicione esta linha extra para o Java achar as bibliotecas nativas do Hadoop
os.environ["HADOOP_OPTS"] = "-Djava.library.path=C:\\hadoop\\bin"

winutils_path = os.path.join(hadoop_path, "bin", "winutils.exe")
if not os.path.isfile(winutils_path):
    print(f"ERRO CRÍTICO: O arquivo {winutils_path} não foi encontrado.")
    print("Verifique se o arquivo está na pasta correta e com o nome exato (sem .txt).")
    sys.exit(1)
else:
    print(f"OK: winutils.exe encontrado em {winutils_path}")

import shutil
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, current_date

def main():
    print("Iniciando o processamento de logs...")

    # 1. Inicializa a SparkSession
    spark = SparkSession.builder \
        .appName("OtimizacaoLogsEcommerce") \
        .master("local[1]") \
        .getOrCreate()

    # 2. Leitura dos logs
    caminho_logs = "dados/logs.csv"
    print(f"Lendo dados de: {caminho_logs}")
    
    df_logs = spark.read \
        .option("header", "true") \
        .option("inferSchema", "true") \
        .csv(caminho_logs)

    # 3. Agregação
    print("Agrupando dados e contando acessos...")
    df_resultado = df_logs.groupBy("pais", "estado", "cidade") \
        .agg(count("*").alias("total_acessos"))

    # 4. Particionamento
    df_resultado = df_resultado.withColumn("data_processamento", current_date())

    # 5. Escrita
    caminho_saida = "output/relatorio_acessos_parquet"
    
    # --- LIMPEZA MANUAL ---
    if os.path.exists(caminho_saida):
        print(f"Limpando pasta de saída antiga: {caminho_saida}")
        shutil.rmtree(caminho_saida)
    # ----------------------

    print(f"Gravando resultado em formato Parquet em: {caminho_saida}")
    
    df_resultado.write \
        .mode("overwrite") \
        .partitionBy("data_processamento") \
        .parquet(caminho_saida)

    print("Processamento concluído com sucesso!")
    spark.stop()

if __name__ == "__main__":
    main()
# Desafio Técnico 3: Otimização de Processamento de Logs

Este repositório contém a solução para o Desafio Técnico 3, que simula um cenário real de engenharia de dados: processar terabytes de logs de acesso de um e-commerce sem comprometer a performance do banco de dados operacional (MySQL).

## 🎯 O Desafio

O objetivo foi implementar um job de processamento distribuído (equivalente ao MapReduce, utilizando Apache Spark) que:
1. Lê logs brutos (simulando o HDFS).
2. Extrai e agrupa os acessos por geolocalização (País, Estado, Cidade).
3. Escreve o resultado em um formato colunar otimizado (**Parquet**).
4. Utiliza o padrão de **particionamento por data** com `INSERT OVERWRITE` para permitir reprocessamento diário sem afetar dias anteriores.

**Restrição Crítica Atendida:** A solução segue a **Arquitetura Lambda**. O processamento é feito de forma isolada (Batch Layer) em cima de arquivos locais/HDFS. O banco operacional (MySQL) não é acessado, garantindo zero locks e zero impacto nas transações do e-commerce.

## 🏗️ Arquitetura e Tecnologias Utilizadas

*   **Linguagem:** Python 3.12 (necessário para compatibilidade com o PySpark 4.x)
*   **Engine de Processamento:** Apache Spark (PySpark 4.3.0)
*   **Formato de Armazenamento:** Apache Parquet (Colunar)
*   **Ambiente:** VS Code com ambiente virtual (`.venv`)
*   **Simulação de Ambiente Hadoop:** `winutils.exe` e `hadoop.dll` (Hadoop 3.4.0 para Windows)

## 📂 Estrutura do Projeto

```text
desafio-logs/
├── dados/
│   └── logs.csv            # Arquivo simulando os logs brutos de acesso
├── output/                 # Diretório onde os arquivos Parquet são gerados
├── .venv/                  # Ambiente virtual Python (ignorado no Git)
├── desafio_logs.py         # Script principal com a lógica MapReduce/Spark
└── README.md               # Documentação do projeto
⚙️ Configuração do Ambiente (Passo a Passo)
Como o Spark no Windows exige configurações específicas, os seguintes passos foram necessários:

Java (JDK 21 ou superior): Necessário para a JVM rodar o Spark.

Python 3.12: O PySpark 4.x não possui suporte estável para o Python 3.14. O ambiente foi recriado com a versão 3.12.

Configuração do Hadoop no Windows:

Foi criada a pasta C:\hadoop\bin.

Foram baixados os arquivos winutils.exe e hadoop.dll (compatíveis com Hadoop 3.x).

O arquivo hadoop.dll foi copiado também para C:\Windows\System32 para que a JVM conseguisse carregar as bibliotecas nativas (UnsatisfiedLinkError resolvido).

Instalação das Dependências:

bash
python -m venv .venv
.venv\Scripts\activate  # No Windows
pip install pyspark
🚀 Como Executar
Certifique-se de que o ambiente virtual está ativado:

powershell
.venv\Scripts\activate
Execute o script Python:

powershell
python desafio_logs.py
O script irá ler o CSV, agrupar os dados, adicionar a coluna de data e gravar o resultado na pasta output/.

📊 Resultado e Validação
Após a execução, a seguinte estrutura é gerada na pasta output/:

text
output/relatorio_acessos_parquet/
└── data_processamento=2026-11-13/    <-- Particionamento por data (INSERT OVERWRITE)
    ├── part-00000-...snappy.parquet  <-- Arquivo colunar otimizado
    └── _SUCCESS                      <-- Indicador de sucesso do Spark
Particionamento: A pasta data_processamento=YYYY-MM-DD garante que rodar o script amanhã criará uma pasta nova, sem apagar a de hoje (a menos que a data seja a mesma, onde o overwrite substituirá apenas aquele dia).

Formato Colunar: Os arquivos .snappy.parquet permitem que ferramentas analíticas (como ClickHouse, BigQuery, Athena) leiam apenas as colunas necessárias (ex: só "cidade"), economizando recursos e melhorando a performance.

🧠 Desafios Superados (Lições Aprendidas)
Inferno das Dependências no Windows: O Spark originalmente é escrito para Linux (HDFS). Configurar os binários winutils.exe e hadoop.dll nas versões corretas exigiu lidar com erros como FileNotFoundException e UnsatisfiedLinkError.

Mudança de Versão do Python: A versão 3.14 do Python causava falhas de comunicação (Py4JJavaError) no PySpark. O downgrade para a 3.12 foi o divisor de águas para o sucesso do processamento.

Sincronização de Pastas: O projeto foi movido do OneDrive para o disco local (SSD), evitando que o sistema de sincronização bloqueasse os arquivos temporários criados rapidamente pelo Spark durante a escrita do Parquet.

text


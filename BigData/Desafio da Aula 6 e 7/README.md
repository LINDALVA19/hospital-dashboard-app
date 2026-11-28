# 📊 Desafio Prático: Desenvolvimento do Observatório de Dados

Este repositório contém a resolução do desafio prático proposto na disciplina de Desenvolvimento do Observatório de Dados. O objetivo foi criar um pipeline completo de Machine Learning, desde a carga dos dados até o armazenamento do modelo em produção.

## 🛠️ Ferramentas e Bibliotecas Utilizadas

O desafio foi desenvolvido inteiramente no **JupyterLab**, conforme as exigências do documento. As seguintes ferramentas e bibliotecas foram instaladas e configuradas:

*   **Python 3.14**
*   **JupyterLab** (Ambiente de desenvolvimento interativo)
*   **Pandas** (Manipulação e carregamento de dados)
*   **Scikit-learn** (Criação do pipeline, normalização e modelo de ML)
*   **Matplotlib e Seaborn** (Visualização de dados e métricas)
*   **Joblib** (Serialização e salvamento do modelo)

## 🚀 Passo a Passo do Desafio

O notebook `desafio_observatorio.ipynb` foi dividido nas seguintes etapas:

1.  **Criação da Tarefa:** Configuração de um notebook em branco no JupyterLab.
2.  **Carregamento dos Dados:** Utilização do dataset clássico *Iris* (embutido no Scikit-learn) via Pandas. Os dados foram divididos em conjuntos de treino (80%) e teste (20%).
3.  **Criação do Modelo:** Construção de um Pipeline (`StandardScaler` + `RandomForestClassifier`) para garantir que o modelo seja treinado com dados normalizados. O modelo foi treinado com sucesso.
4.  **Visualização de Resultados:** Geração de previsões no conjunto de teste e criação de uma Matriz de Confusão para avaliar a performance, que apresentou **100% de acurácia** (zero erros).
5.  **Salvamento dos Resultados:** Exportação das previsões e dos dados reais para um arquivo `.csv` (`resultados_modelo.csv`).
6.  **Armazenamento do Modelo:** Salvamento do pipeline treinado em um arquivo binário (`modelo_iris_observatorio.pkl`) usando a biblioteca `joblib`.
7.  **Carregamento do Modelo:** Teste de recarregamento do arquivo `.pkl` para simular o uso do modelo em produção, realizando uma nova previsão.

## 📁 Estrutura de Arquivos no Repositório

*   `desafio_observatorio.ipynb`: O caderno Jupyter contendo todo o código documentado e os resultados visuais.
*   `resultados_modelo.csv`: Planilha contendo os valores reais versus as previsões geradas pelo modelo.
*   `modelo_iris_observatorio.pkl`: O arquivo binário do modelo treinado, pronto para ser integrado a sistemas.
*   `README.md`: Documentação do projeto.

## 📈 Resultados Obtidos

O modelo de Random Forest obteve uma performance excelente no conjunto de testes. A Matriz de Confusão gerada no notebook comprova a precisão do modelo:

*   10 acertos para a classe *Setosa*
*   9 acertos para a classe *Versicolor*
*   11 acertos para a classe *Virginica*
*   **0 erros de classificação.**

## 👩‍💻 Como Executar este Projeto

Para rodar este projeto na sua máquina, siga os passos:

1. Clone este repositório.
2. Instale as dependências:
   ```bash
   pip install jupyterlab pandas scikit-learn matplotlib seaborn joblib
Inicie o JupyterLab:

3. jupyter lab
4. Abra o arquivo desafio_observatorio.ipynb e execute todas as células em sequência (Kernel > Restart Kernel and Run All Cells).

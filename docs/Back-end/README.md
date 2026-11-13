# 📊 API - CH em Números (Back-end)

Esta é a API (back-end) do projeto de extensão "Plataforma para Gestão, Visualização e Transparência de Indicadores Hospitalares", baseada no relatório oficial "CH em Números" do Complexo Hospitalar da UPE.

A API foi construída utilizando **Node.js**, **TypeScript** e **Express**, e atualmente serve os dados extraídos do documento para o front-end (React Native) consumir.

## 🛠️ Pré-requisitos

Para rodar este projeto no seu computador, você precisará ter instalado:
*   [Node.js](https://nodejs.org/) (Versão LTS 18 ou superior)
*   [Git](https://git-scm.com/) (Opcional, para clonar o repositório)
*   VS Code (Recomendado)

## 🚀 Como rodar o projeto localmente

1. Abra o terminal do seu VS Code.
2. Navegue até a pasta do projeto:
   ```bash
   cd backend-ch-em-numeros
   ```
3. Instale todas as dependências (bibliotecas) necessárias:
   ```bash
   npm install
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Se tudo der certo, o terminal exibirá a mensagem:
   `✅ Servidor rodando com sucesso em http://localhost:3333`

## 🔗 Endpoints da API (Rotas disponíveis)

O back-end está configurado na porta `3333`. As rotas estão divididas para atender as telas do Figma.

*   **Tela Início (Resumo Geral):**
    *   `GET http://localhost:3333/api/indicadores/resumo`
    *   *Retorna: Leitos, Internamentos, Procedimentos Ambulatoriais e Cirurgias (Ano-base 2024).*

*   **Tela de Indicadores (Taxa de Ocupação):**
    *   `GET http://localhost:3333/api/indicadores/ocupacao`
    *   *Retorna: A taxa de ocupação das unidades CISAM, HUOC e PROCAPE.*

*   **Tela Comparar Períodos:**
    *   `GET http://localhost:3333/api/indicadores/comparativo`
    *   *Retorna: Números de internamentos de 2023 e 2024 para o gráfico de barras.*

## 💻 Como o Front-end deve consumir esta API

### Testando no Navegador (PC)
Basta colar a URL da rota no navegador:
`http://localhost:3333/api/indicadores/resumo`

### Testando no Celular Físico (Importante!)
Se o aplicativo React Native estiver rodando no celular físico do colega (via Expo Go), o `localhost` não funcionará. O celular precisa acessar o IP da sua máquina na rede Wi-Fi.

1. Descubra o seu IP local. No terminal do VS Code, digite:
   * Windows: `ipconfig` (procure por "Endereço IPv4", ex: `192.168.1.15`)
   * Mac/Linux: `ifconfig` ou `ip a`
2. O seu colega deverá substituir o `localhost` pelo seu IP no código React Native dele:
   `http://192.168.1.15:3333/api/indicadores/resumo`

## 📂 Estrutura de Pastas

*   `src/controllers/`: Contém a lógica de cada rota (o que acontece quando uma rota é chamada).
*   `src/database/dadosMockados.ts`: Contém os dados fixos extraídos do PDF "CH em Números". *(Futuramente pode ser substituído por um banco de dados real, como SQLite ou PostgreSQL).*
*   `src/routes/routes.ts`: Define as rotas da API.
*   `src/server.ts`: O arquivo principal que inicializa o Express.

## 📅 Próximos Passos (To-Do)
- [ ] Adicionar os dados restantes das tabelas do CH em Números.
- [ ] Implementar filtros (ex: buscar taxa de ocupação de apenas uma unidade via Query Params).
- [ ] Migrar os "dados mockados" para um banco de dados real (Prisma + SQLite).
```

---

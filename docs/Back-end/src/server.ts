import express from 'express';
import cors from 'cors';
import routes from './routes/routes';

const app = express();

// Configurações básicas
app.use(cors()); // Permite requisições do front-end
app.use(express.json()); // Permite ler JSON no corpo das requisições

// Usa as rotas que criamos
app.use('/api', routes);

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('🚀 API do CH em Números está funcionando!');
});

// Inicia o servidor na porta 3333
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando com sucesso em http://localhost:${PORT}`);
  console.log(`📊 Teste o resumo em: http://localhost:${PORT}/api/indicadores/resumo`);
});
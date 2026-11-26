import { Router } from 'express';
import { getResumo, getTaxaOcupacao, getTaxaOcupacaoPorUnidade, getComparativo, getTransplantes } from '../controllers/IndicadorController';

const router = Router();

// Rota para a tela de Início
router.get('/indicadores/resumo', getResumo);

// Rota para a tela de Indicadores (com filtro opcional por unidade)
router.get('/indicadores/ocupacao', getTaxaOcupacao);
router.get('/indicadores/ocupacao/:unidade', getTaxaOcupacaoPorUnidade);

// Rota para a tela de Comparar Períodos
router.get('/indicadores/comparativo', getComparativo);

// Rota para os dados de transplantes
router.get('/indicadores/transplantes', getTransplantes);

export default router;
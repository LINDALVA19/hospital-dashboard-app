import { Request, Response } from 'express';
import { resumoGeral, taxaOcupacao, comparativoInternamentos, transplantes } from '../database/dadosMockados';

export const getResumo = (req: Request, res: Response) => {
  // Retorna os dados gerais para a tela inicial
  return res.json(resumoGeral);
};

export const getTaxaOcupacao = (req: Request, res: Response) => {
  const { unidade } = req.query;
  
  if (unidade) {
    const filtrado = taxaOcupacao.filter(item => item.unidade.toLowerCase() === (unidade as string).toLowerCase());
    return res.json(filtrado);
  }
  
  return res.json(taxaOcupacao);
};

export const getTaxaOcupacaoPorUnidade = (req: Request<{ unidade: string }>, res: Response) => {
  const { unidade } = req.params;
  const indicador = taxaOcupacao.find(
    item => item.unidade.toLowerCase() === unidade.toLowerCase()
  );

  if (!indicador) {
    return res.status(404).json({ erro: 'Unidade não encontrada' });
  }

  return res.json(indicador);
};

export const getComparativo = (req: Request, res: Response) => {
  // Retorna os dados para o gráfico de barras
  return res.json(comparativoInternamentos);
};

export const getTransplantes = (req: Request, res: Response) => {
  return res.json(transplantes);
};
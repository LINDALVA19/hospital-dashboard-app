const DADOS_CH_UPE = {
  resumoGeral: [
    {
      id: "leitos",
      titulo: "Leitos Operacionais",
      categoria: "Infraestrutura",
      badge: "2024 • CH/UPE",
      valorAnual: 779,
      descricao: "Capacidade instalada operacional no Complexo Hospitalar UPE"
    },
    {
      id: "internacoes",
      titulo: "Internações Hospitalares",
      categoria: "Assistencial",
      badge: "2024 • Total",
      valorAnual: 36074,
      descricao: "Internações registradas no complexo em 2024"
    },
    {
      id: "ambulatorial",
      titulo: "Procedimentos Ambulatoriais",
      categoria: "Assistencial",
      badge: "2024 • Volume",
      valorAnual: 1571580,
      descricao: "Atendimentos e procedimentos ambulatoriais realizados"
    },
    {
      id: "cirurgicas",
      titulo: "Internações Cirúrgicas",
      categoria: "Cirurgico",
      badge: "2024 • Cirurgia",
      valorAnual: 12815,
      descricao: "Internações hospitalares de natureza cirúrgica"
    }
  ],

  indicadores: [
    {
      indicador: "Leitos Operacionais Totais (CH/UPE)",
      categoria: "Infraestrutura",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 779,
      obs: "Anuário Estatístico 2025 (ano-base 2024)"
    },
    {
      indicador: "Área Construída do Complexo (m²)",
      categoria: "Infraestrutura",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 53000,
      obs: "Mais de 53.000 m² distribuídos entre CISAM, HUOC e PROCAPE"
    },
    {
      indicador: "Internações Hospitalares Totais",
      categoria: "Assistencial",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 36074,
      obs: "Assistência hospitalar integrada"
    },
    {
      indicador: "Procedimentos Ambulatoriais Realizados",
      categoria: "Assistencial",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 1571580,
      obs: "Volume ambulatorial consolidado no anuário"
    },
    {
      indicador: "Internações Hospitalares Cirúrgicas",
      categoria: "Cirurgico",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 12815,
      obs: "Cirurgias hospitalares registradas no período"
    },
    {
      indicador: "Programas de Pós-Graduação Lato Sensu",
      categoria: "Academico",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 10,
      obs: "Especialização médica e multiprofissional (novidade 2024)"
    },
    {
      indicador: "Vagas em Pós-Graduação Lato Sensu",
      categoria: "Academico",
      unidade: "TODOS",
      unidadeLabel: "Consolidado CH/UPE",
      periodo: "2024",
      valor: 113,
      obs: "Total de vagas nos 10 programas lato sensu"
    },
    {
      indicador: "Linha de Cuidado Materno-Infantil e Saúde da Mulher",
      categoria: "Assistencial",
      unidade: "CISAM",
      unidadeLabel: "CISAM",
      periodo: "2024",
      valor: null,
      obs: "Aguardando recorte numérico por unidade no back-end"
    },
    {
      indicador: "Assistência Geral, Infectologia e Oncologia",
      categoria: "Assistencial",
      unidade: "HUOC",
      unidadeLabel: "HUOC",
      periodo: "2024",
      valor: null,
      obs: "Aguardando recorte numérico por unidade no back-end"
    },
    {
      indicador: "Cardiologia Clínica, Urgência e Cirurgia Cardíaca",
      categoria: "Cirurgico",
      unidade: "PROCAPE",
      unidadeLabel: "PROCAPE",
      periodo: "2024",
      valor: null,
      obs: "Aguardando recorte numérico por unidade no back-end"
    }
  ],

  // Modelo ilustrativo para visualização gráfica no front-end
  modeloGraficoBarras: [
    { rotulo: "Internações", valor: 36074, cor: "#0D6E63" },
    { rotulo: "Cirúrgicas", valor: 12815, cor: "#15803D" },
    { rotulo: "Leitos", valor: 779, cor: "#334155" },
    { rotulo: "Vagas Pós", valor: 113, cor: "#64748B" }
  ],

  modeloDistribuicaoEixos: [
    { nome: "Assistencial", pct: 42, cor: "#0D6E63" },
    { nome: "Cirúrgico", pct: 22, cor: "#15803D" },
    { nome: "Infraestrutura", pct: 20, cor: "#1E293B" },
    { nome: "Acadêmico", pct: 16, cor: "#94A3B8" }
  ],

  unidades: [
    {
      sigla: "CISAM",
      nome: "Centro Integrado de Saúde Amaury de Medeiros",
      foco: "Referência em saúde da mulher, obstetrícia, neonatologia e atenção materno-infantil, com atuação acadêmica e de extensão.",
      local: "Encruzilhada • Recife-PE"
    },
    {
      sigla: "HUOC",
      nome: "Hospital Universitário Oswaldo Cruz",
      foco: "Hospital universitário de alta complexidade em clínica, cirurgia, doenças infecciosas, oncologia e residências em saúde.",
      local: "Santo Amaro • Recife-PE"
    },
    {
      sigla: "PROCAPE",
      nome: "Pronto-Socorro Cardiológico Universitário de Pernambuco",
      foco: "Referência regional em cardiologia clínica, hemodinâmica, urgências cardiovasculares e procedimentos cirúrgicos cardíacos.",
      local: "Santo Amaro • Recife-PE"
    }
  ],

  noticias: [
    {
      tag: "Transparência",
      data: "Anuário 2025",
      titulo: "CH em Números reúne dados de assistência, infraestrutura e ensino",
      resumo: "Documento consolidado com ano-base 2024 apoia a consulta pública e o planejamento institucional das unidades da UPE."
    },
    {
      tag: "Ensino & Residência",
      data: "Pós-Graduação",
      titulo: "10 programas lato sensu ampliam a formação em saúde no complexo",
      resumo: "São 113 vagas de especialização médica e multiprofissional integrando prática assistencial e qualificação profissional."
    },
    {
      tag: "Cidades Inteligentes",
      data: "Saúde Pública",
      titulo: "Visualização estruturada de indicadores amplia o controle social",
      resumo: "Filtros por unidade, categoria e período facilitam a leitura de dados públicos de forma clara em desktop e celular."
    }
  ]
};

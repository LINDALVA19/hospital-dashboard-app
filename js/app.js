document.addEventListener("DOMContentLoaded", () => {
  const filtroUnidade = document.getElementById("filtroUnidade");
  const filtroCategoria = document.getElementById("filtroCategoria");
  const filtroPeriodo = document.getElementById("filtroPeriodo");
  const buscaTabela = document.getElementById("buscaTabela");
  const btnLimpar = document.getElementById("btnLimparFiltros");
  const btnExportarCsv = document.getElementById("btnExportarCsv");
  const btnImprimir = document.getElementById("btnImprimir");
  const burgerBtn = document.getElementById("burgerBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");

  function getFatorPeriodo(periodo) {
    if (periodo === "2024-S1" || periodo === "2024-S2") return 0.5;
    return 1;
  }

  function formatarNumero(valor) {
    if (valor === null || valor === undefined) return "Pendente (API)";
    return Math.round(valor).toLocaleString("pt-BR");
  }

  // Controle menu mobile
  function toggleSidebar(forcarEstado) {
    const abrir =
      typeof forcarEstado === "boolean"
        ? forcarEstado
        : !sidebar.classList.contains("is-open");
    sidebar.classList.toggle("is-open", abrir);
    sidebarBackdrop.classList.toggle("is-open", abrir);
    burgerBtn.setAttribute("aria-expanded", String(abrir));
  }

  burgerBtn.addEventListener("click", () => toggleSidebar());
  sidebarBackdrop.addEventListener("click", () => toggleSidebar(false));

  document.querySelectorAll(".side-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".side-link").forEach((el) => el.classList.remove("is-active"));
      link.classList.add("is-active");
      toggleSidebar(false);
    });
  });

  // KPIs
  function renderKPIs() {
    const kpiGrid = document.getElementById("kpiGrid");
    const fator = getFatorPeriodo(filtroPeriodo.value);
    const cat = filtroCategoria.value;

    const base = DADOS_CH_UPE.resumoGeral.filter(
      (item) => cat === "TODAS" || item.categoria === cat
    );
    const lista = base.length > 0 ? base : DADOS_CH_UPE.resumoGeral;

    kpiGrid.innerHTML = lista
      .map((item) => {
        const valor = item.id === "leitos" ? item.valorAnual : item.valorAnual * fator;
        return `
          <article class="kpi-card">
            <div class="kpi-card__top">
              <span class="kpi-card__cat">${item.categoria}</span>
              <span class="kpi-card__badge">${item.badge}</span>
            </div>
            <div class="kpi-card__num">${formatarNumero(valor)}</div>
            <div class="kpi-card__label">${item.titulo}</div>
            <p class="kpi-card__desc">${item.descricao}</p>
          </article>
        `;
      })
      .join("");
  }

  // Modelo ilustrativo de Gráfico de Barras em SVG (escala em raiz para leitura visual)
  function renderGraficoBarrasSVG() {
    const container = document.getElementById("graficoBarrasContainer");
    const fator = getFatorPeriodo(filtroPeriodo.value);

    const itens = DADOS_CH_UPE.modeloGraficoBarras.map((d) => ({
      ...d,
      valAjustado: d.rotulo === "Leitos" || d.rotulo === "Vagas Pós" ? d.valor : Math.round(d.valor * fator)
    }));

    const maxSqrt = Math.sqrt(Math.max(...itens.map((i) => i.valAjustado)));
    const largura = 560;
    const altura = 240;
    const baseY = 190;
    const maxAlturaBarra = 135;
    const colWidth = 92;
    const gap = 32;
    const startX = 44;

    const barrasSvg = itens
      .map((item, idx) => {
        const prop = Math.sqrt(item.valAjustado) / maxSqrt;
        const h = Math.max(18, Math.round(prop * maxAlturaBarra));
        const x = startX + idx * (colWidth + gap);
        const y = baseY - h;

        return `
          <g>
            <text x="${x + colWidth / 2}" y="${y - 8}" text-anchor="middle"
                  font-family="IBM Plex Mono, monospace" font-size="11" font-weight="600" fill="#111615">
              ${item.valAjustado.toLocaleString("pt-BR")}
            </text>
            <rect x="${x}" y="${y}" width="${colWidth}" height="${h}" rx="6" fill="${item.cor}" />
            <text x="${x + colWidth / 2}" y="${baseY + 20}" text-anchor="middle"
                  font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="600" fill="#37413F">
              ${item.rotulo}
            </text>
          </g>
        `;
      })
      .join("");

    container.innerHTML = `
      <svg viewBox="0 0 ${largura} ${altura}" role="img" aria-label="Gráfico ilustrativo de indicadores">
        <line x1="28" y1="${baseY}" x2="${largura - 24}" y2="${baseY}" stroke="#DFE5E2" stroke-width="1.5" />
        ${barrasSvg}
      </svg>
    `;
  }

  // Modelo ilustrativo de Distribuição por Eixo em SVG
  function renderGraficoRoscaSVG() {
    const container = document.getElementById("graficoRoscaContainer");
    const eixos = DADOS_CH_UPE.modeloDistribuicaoEixos;

    const legendaHtml = eixos
      .map(
        (e) => `
        <g transform="translate(215, ${38 + eixos.indexOf(e) * 44})">
          <rect width="12" height="12" rx="3" y="2" fill="${e.cor}" />
          <text x="20" y="12" font-family="Plus Jakarta Sans, sans-serif" font-size="12.5" font-weight="600" fill="#111615">
            ${e.nome}
          </text>
          <text x="20" y="27" font-family="IBM Plex Mono, monospace" font-size="11" fill="#64706D">
            ${e.pct}% (modelo)
          </text>
        </g>
      `
      )
      .join("");

    // Anel ilustrativo com traços proporcionais
    const raio = 64;
    const circ = 2 * Math.PI * raio;
    let offsetAcumulado = 0;

    const arcos = eixos
      .map((e) => {
        const comp = (e.pct / 100) * circ;
        const arco = `
          <circle cx="105" cy="112" r="${raio}" fill="none" stroke="${e.cor}"
                  stroke-width="20" stroke-dasharray="${comp} ${circ}"
                  stroke-dashoffset="${-offsetAcumulado}" transform="rotate(-90 105 112)" />
        `;
        offsetAcumulado += comp;
        return arco;
      })
      .join("");

    container.innerHTML = `
      <svg viewBox="0 0 360 225" role="img" aria-label="Distribuição ilustrativa por categoria">
        ${arcos}
        <text x="105" y="109" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="15" font-weight="600" fill="#111615">
          CH/UPE
        </text>
        <text x="105" y="125" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" fill="#64706D">
          4 eixos
        </text>
        ${legendaHtml}
      </svg>
    `;
  }

  // Unidades
  function renderUnidades() {
    const unitsGrid = document.getElementById("unitsGrid");
    unitsGrid.innerHTML = DADOS_CH_UPE.unidades
      .map(
        (u) => `
        <article class="unit-box">
          <div>
            <span class="unit-box__code">${u.sigla}</span>
            <h3>${u.nome}</h3>
            <p>${u.foco}</p>
          </div>
          <div class="unit-box__foot">
            <span>${u.local}</span>
            <button type="button" class="btn btn--secondary" data-unidade="${u.sigla}">
              Ver ${u.sigla}
            </button>
          </div>
        </article>
      `
      )
      .join("");

    unitsGrid.querySelectorAll("button[data-unidade]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filtroUnidade.value = btn.dataset.unidade;
        atualizarTudo();
        document.getElementById("sec-tabela").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function filtrarLinhas() {
    const unid = filtroUnidade.value;
    const cat = filtroCategoria.value;
    const busca = buscaTabela.value.trim().toLowerCase();

    return DADOS_CH_UPE.indicadores.filter((row) => {
      const okUnid = unid === "TODOS" || row.unidade === unid || row.unidade === "TODOS";
      const okCat = cat === "TODAS" || row.categoria === cat;
      const okBusca =
        !busca ||
        row.indicador.toLowerCase().includes(busca) ||
        row.categoria.toLowerCase().includes(busca) ||
        row.unidadeLabel.toLowerCase().includes(busca) ||
        row.obs.toLowerCase().includes(busca);
      return okUnid && okCat && okBusca;
    });
  }

  function renderTabela() {
    const tbody = document.getElementById("tabelaCorpo");
    const fator = getFatorPeriodo(filtroPeriodo.value);
    const linhas = filtrarLinhas();

    if (linhas.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:24px; color:#64706D;">
            Nenhum registro encontrado para os filtros selecionados.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = linhas
      .map((row) => {
        const naoEscalaSemestre =
          row.indicador.includes("Leitos") ||
          row.indicador.includes("Área") ||
          row.indicador.includes("Programas") ||
          row.indicador.includes("Vagas");

        const valor =
          row.valor === null ? null : naoEscalaSemestre ? row.valor : row.valor * fator;

        return `
          <tr>
            <td><strong>${row.indicador}</strong></td>
            <td><span class="pill-cat">${row.categoria}</span></td>
            <td>${row.unidadeLabel}</td>
            <td style="font-family:var(--font-mono); font-size:0.8rem;">${filtroPeriodo.value}</td>
            <td class="num-col">${formatarNumero(valor)}</td>
            <td>${row.obs}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderNoticias() {
    const newsGrid = document.getElementById("newsGrid");
    newsGrid.innerHTML = DADOS_CH_UPE.noticias
      .map(
        (n) => `
        <article class="news-box">
          <div class="news-box__meta">
            <span>${n.tag}</span>
            <span>${n.data}</span>
          </div>
          <h3>${n.titulo}</h3>
          <p>${n.resumo}</p>
        </article>
      `
      )
      .join("");
  }

  function exportarCSV() {
    const linhas = filtrarLinhas();
    const header = ["Indicador", "Categoria", "Unidade", "Periodo", "Valor", "Observacao"];
    const rows = linhas.map((r) => [
      `"${r.indicador}"`,
      `"${r.categoria}"`,
      `"${r.unidadeLabel}"`,
      `"${filtroPeriodo.value}"`,
      r.valor !== null ? r.valor : `"Pendente API"`,
      `"${r.obs}"`
    ]);

    const blob = new Blob(
      ["\uFEFF" + [header.join(";"), ...rows.map((x) => x.join(";"))].join("\n")],
      { type: "text/csv;charset=utf-8;" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chupe_indicadores_${filtroUnidade.value.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function atualizarTudo() {
    const unidTexto = filtroUnidade.options[filtroUnidade.selectedIndex].text.split("—")[0].trim();
    const catTexto = filtroCategoria.options[filtroCategoria.selectedIndex].text;
    const perTexto = filtroPeriodo.options[filtroPeriodo.selectedIndex].text;

    document.getElementById("statusFiltroTexto").textContent =
      `Escopo ativo: ${unidTexto} • ${catTexto} • ${perTexto}`;

    renderKPIs();
    renderGraficoBarrasSVG();
    renderGraficoRoscaSVG();
    renderTabela();
  }

  [filtroUnidade, filtroCategoria, filtroPeriodo].forEach((el) =>
    el.addEventListener("change", atualizarTudo)
  );
  buscaTabela.addEventListener("input", renderTabela);

  btnLimpar.addEventListener("click", () => {
    filtroUnidade.value = "TODOS";
    filtroCategoria.value = "TODAS";
    filtroPeriodo.value = "2024";
    buscaTabela.value = "";
    atualizarTudo();
  });

  btnExportarCsv.addEventListener("click", exportarCSV);
  btnImprimir.addEventListener("click", () => window.print());

  renderUnidades();
  renderNoticias();
  atualizarTudo();
});
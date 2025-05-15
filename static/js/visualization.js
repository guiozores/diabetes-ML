// Funções para visualização de dados de diabetes

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar gráficos se a página for a de resultados
  if (document.querySelector(".risk-assessment")) {
    initDataVisualization();
  }
});

function initDataVisualization() {
  // Verificar se Chart.js está disponível
  if (!window.Chart) {
    // Carregar Chart.js dinamicamente se não estiver disponível
    loadChartJs().then(() => {
      createCharts();
    });
  } else {
    createCharts();
  }
}

function loadChartJs() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function createCharts() {
  createRiskFactorsChart();
  createComparisonChart();
  createTrendsChart();
}

function createRiskFactorsChart() {
  // Obter o canvas para o gráfico de fatores de risco
  const ctx = document.getElementById("riskFactorsChart");
  if (!ctx) return;

  // Obter dados do elemento
  const data = JSON.parse(ctx.getAttribute("data-values") || "[]");
  const labels = JSON.parse(ctx.getAttribute("data-labels") || "[]");

  // Cores para o gráfico
  const colors = data.map((value) => {
    const normalizedValue = value / 100;
    return `rgba(${255 * normalizedValue}, ${
      255 * (1 - normalizedValue)
    }, 0, 0.7)`;
  });

  // Criar gráfico de radar
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Fatores de Risco",
          data: data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          pointBackgroundColor: colors,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}%`;
            },
          },
        },
      },
    },
  });
}

function createComparisonChart() {
  // Obter o canvas para o gráfico de comparação
  const ctx = document.getElementById("comparisonChart");
  if (!ctx) return;

  // Criar gráfico de barras para comparação com médias populacionais
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Glicose", "Pressão Arterial", "IMC", "Idade"],
      datasets: [
        {
          label: "Seus Valores",
          data: [
            parseFloat(ctx.getAttribute("data-glucose")),
            parseFloat(ctx.getAttribute("data-bloodpressure")),
            parseFloat(ctx.getAttribute("data-bmi")),
            parseFloat(ctx.getAttribute("data-age")),
          ],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Média da População",
          data: [
            parseFloat(ctx.getAttribute("data-avg-glucose") || "85"),
            parseFloat(ctx.getAttribute("data-avg-bloodpressure") || "80"),
            parseFloat(ctx.getAttribute("data-avg-bmi") || "25"),
            parseFloat(ctx.getAttribute("data-avg-age") || "40"),
          ],
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

function createTrendsChart() {
  // Obter o canvas para o gráfico de tendências
  const ctx = document.getElementById("trendsChart");
  if (!ctx) return;

  // Dados fictícios para demonstração de tendências
  const data = {
    labels: ["20-30", "31-40", "41-50", "51-60", "61-70", "71+"],
    datasets: [
      {
        label: "Risco de Diabetes por Faixa Etária",
        data: [5, 10, 15, 25, 35, 40],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
      {
        label: "Risco com IMC Elevado",
        data: [10, 20, 35, 50, 65, 75],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  };

  // Criar gráfico de linha para tendências
  new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "% de Risco",
          },
          max: 100,
        },
        x: {
          title: {
            display: true,
            text: "Faixa Etária (anos)",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}%`;
            },
          },
        },
      },
    },
  });
}

// Função para criar um gráfico de medidor para visualizar o risco
function createRiskGauge(elementId, riskValue) {
  const canvas = document.getElementById(elementId);
  if (!canvas) return;

  // Criar gráfico de medidor
  new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [riskValue, 100 - riskValue],
          backgroundColor: [
            getColorForRisk(riskValue),
            "rgba(220, 220, 220, 0.5)",
          ],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
    plugins: [
      {
        id: "gaugeNeedle",
        afterDatasetDraw(chart) {
          const { ctx, data, chartArea } = chart;
          // Desenhar o valor no centro
          ctx.save();
          ctx.textAlign = "center";
          ctx.font = "bold 20px Arial";
          ctx.fillStyle = getColorForRisk(riskValue);
          ctx.fillText(
            `${riskValue}%`,
            chartArea.left + chartArea.width / 2,
            chartArea.top + chartArea.height - 10
          );
          ctx.restore();
        },
      },
    ],
  });

  // Adicionar texto abaixo do medidor
  const container = canvas.parentElement;
  const label = document.createElement("div");
  label.className = "gauge-label";
  label.textContent = getRiskLabel(riskValue);
  container.appendChild(label);
}

// Função para determinar a cor com base no valor de risco
function getColorForRisk(value) {
  if (value < 30) {
    return "rgba(46, 204, 113, 0.9)"; // Verde
  } else if (value < 70) {
    return "rgba(241, 196, 15, 0.9)"; // Amarelo
  } else {
    return "rgba(231, 76, 60, 0.9)"; // Vermelho
  }
}

// Função para determinar o rótulo de risco
function getRiskLabel(value) {
  if (value < 30) {
    return "Risco Baixo";
  } else if (value < 70) {
    return "Risco Moderado";
  } else {
    return "Risco Alto";
  }
}

// Exportar funções para uso global
window.DiabetesVisualization = {
  createRiskGauge,
  createRiskFactorsChart,
};

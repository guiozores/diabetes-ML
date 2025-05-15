// Arquivo JavaScript com funcionalidades avançadas e interações

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todos os componentes
  initTabs();
  initCustomSelects();
  initSidebar();
  initRiskMeter();
  initCharts();
  setupThemeToggle();
});

// Sistema de abas para organização de conteúdo
function initTabs() {
  const tabs = document.querySelectorAll(".tab");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remover classe ativa de todas as abas
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));

      // Esconder todos os conteúdos
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

      // Ativar a aba clicada e seu conteúdo
      this.classList.add("active");
      const contentId = this.getAttribute("data-tab");
      document.getElementById(contentId).classList.add("active");
    });
  });

  // Ativar a primeira aba por padrão
  tabs[0].click();
}

// Selects customizados e estilizados
function initCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select-container");

  if (!customSelects.length) return;

  customSelects.forEach((select) => {
    const selectedElement = select.querySelector(".custom-select-selected");
    const options = select.querySelectorAll(".custom-select-option");

    selectedElement.addEventListener("click", function () {
      select.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        selectedElement.querySelector("span").textContent = this.textContent;
        select.classList.remove("open");

        // Disparar evento de alteração
        const changeEvent = new Event("change");
        select.dispatchEvent(changeEvent);

        // Atualizar valor do input hidden
        const hiddenInput = select.querySelector('input[type="hidden"]');
        if (hiddenInput) {
          hiddenInput.value = this.getAttribute("data-value");
        }
      });
    });

    // Fechar o select ao clicar fora dele
    document.addEventListener("click", function (e) {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  });
}

// Sidebar responsivo
function initSidebar() {
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const pageContent = document.querySelector(".with-sidebar");

  if (!sidebarToggle || !sidebar) return;

  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");

    if (pageContent) {
      pageContent.classList.toggle("sidebar-closed");
    }
  });

  // Fechar sidebar no modo mobile ao clicar fora dele
  document.addEventListener("click", function (e) {
    const isMobile = window.innerWidth < 768;
    if (
      isMobile &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle
    ) {
      sidebar.classList.remove("open");

      if (pageContent) {
        pageContent.classList.add("sidebar-closed");
      }
    }
  });
}

// Medidor de risco interativo
function initRiskMeter() {
  const riskMeter = document.querySelector(".risk-meter");
  const riskIndicator = document.querySelector(".risk-indicator");

  if (!riskMeter || !riskIndicator) return;

  // Verificar se há um valor de risco predefinido
  const riskValue = parseFloat(
    riskIndicator.getAttribute("data-risk-value") || 0
  );

  // Posicionar o indicador com base no risco (0-100%)
  riskIndicator.style.left = `${riskValue}%`;

  // Adicionar classe correspondente ao nível de risco
  if (riskValue < 33) {
    riskIndicator.classList.add("risk-low");
  } else if (riskValue < 66) {
    riskIndicator.classList.add("risk-medium");
  } else {
    riskIndicator.classList.add("risk-high");
  }
}

// Gráficos para visualização de dados
function initCharts() {
  const chartElements = document.querySelectorAll("[data-chart]");

  if (!chartElements.length || !window.Chart) return;

  chartElements.forEach((element) => {
    const type = element.getAttribute("data-chart");
    const ctx = element.getContext("2d");

    // Obter dados dos atributos data
    const labels = JSON.parse(element.getAttribute("data-labels") || "[]");
    const data = JSON.parse(element.getAttribute("data-values") || "[]");
    const backgroundColor = JSON.parse(
      element.getAttribute("data-colors") || "[]"
    );

    // Configuração básica do gráfico
    const config = {
      type: type || "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: element.getAttribute("data-title") || "",
            data: data,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    // Criar o gráfico
    new Chart(ctx, config);
  });
}

// Alternar entre temas de cores
function setupThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeOptions = document.querySelectorAll("[data-theme]");

  if (!themeToggle && !themeOptions.length) return;

  // Verificar tema salvo no localStorage
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    document.body.className = savedTheme;
  }

  // Aplicar tema selecionado
  function applyTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("selectedTheme", themeName);
  }

  // Evento para o menu de temas
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.querySelector(".theme-options").classList.toggle("visible");
    });
  }

  // Eventos para opções de tema
  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      applyTheme(theme);

      // Fechar menu de temas
      const themeMenu = document.querySelector(".theme-options");
      if (themeMenu) {
        themeMenu.classList.remove("visible");
      }
    });
  });
}

// Função para mostrar o valor atual de um slider
function updateSliderValue(slider, valueDisplay) {
  slider.addEventListener("input", function () {
    valueDisplay.textContent = this.value;
  });
}

// Função para criar um efeito de digitação
function typeWriter(element, text, speed = 50, callback = null) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// Função para criar alertas personalizados
function createCustomAlert(message, type = "info", duration = 3000) {
  const alertContainer =
    document.querySelector(".alert-container") || createAlertContainer();

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <span class="alert-message">${message}</span>
    </div>
    <button class="alert-close">&times;</button>
  `;

  alertContainer.appendChild(alert);

  // Adicionar classe de entrada após um pequeno delay para ativar animação
  setTimeout(() => {
    alert.classList.add("show");
  }, 10);

  // Auto-fechar após a duração especificada
  if (duration) {
    setTimeout(() => {
      closeAlert(alert);
    }, duration);
  }

  // Evento de fechar
  alert.querySelector(".alert-close").addEventListener("click", () => {
    closeAlert(alert);
  });

  return alert;
}

function createAlertContainer() {
  const container = document.createElement("div");
  container.className = "alert-container";
  document.body.appendChild(container);
  return container;
}

function closeAlert(alert) {
  alert.classList.remove("show");

  // Remover do DOM após animação
  setTimeout(() => {
    if (alert.parentNode) {
      alert.parentNode.removeChild(alert);
    }
  }, 300);
}

// Exportar funções para uso global
window.DiabetesApp = {
  createCustomAlert,
  typeWriter,
  updateSliderValue,
};

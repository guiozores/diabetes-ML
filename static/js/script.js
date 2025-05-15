// Arquivo JavaScript principal para o aplicativo de avaliação de diabetes

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar os tooltips
  initTooltips();

  // Configurar formulário
  setupForm();

  // Configurar animações
  setupAnimations();
});

// Inicialização de tooltips
function initTooltips() {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", function () {
      this.querySelector(".tooltip-text").style.visibility = "visible";
      this.querySelector(".tooltip-text").style.opacity = "1";
    });

    tooltip.addEventListener("mouseleave", function () {
      this.querySelector(".tooltip-text").style.visibility = "hidden";
      this.querySelector(".tooltip-text").style.opacity = "0";
    });
  });
}

// Configuração do formulário
function setupForm() {
  const form = document.getElementById("diabetes-form");

  if (form) {
    // Validação em tempo real
    const numericInputs = form.querySelectorAll('input[type="number"]');
    numericInputs.forEach((input) => {
      input.addEventListener("input", function () {
        validateInput(this);
      });
    });

    // Exibição do loader ao enviar o formulário
    form.addEventListener("submit", function (e) {
      // Validar todos os campos antes de enviar
      let isValid = true;
      numericInputs.forEach((input) => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        document.querySelector(".loader-container").style.display = "flex";
      } else {
        e.preventDefault();
      }
    });

    // Resetar formulário
    const resetBtn = document.getElementById("reset-form");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        numericInputs.forEach((input) => {
          const formGroup = input.closest(".form-group");
          if (formGroup) {
            const error = formGroup.querySelector(".error-message");
            if (error) error.remove();
            input.classList.remove("input-error");
          }
        });
      });
    }
  }
}

// Validação de input numérico
function validateInput(input) {
  const formGroup = input.closest(".form-group");
  if (!formGroup) return true;

  let errorMessage = null;

  // Remover mensagem de erro existente
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) existingError.remove();

  // Verificar se o campo é obrigatório e está vazio
  if (input.hasAttribute("required") && !input.value) {
    errorMessage = "Este campo é obrigatório";
  }
  // Verificar se está dentro dos limites min/max
  else if (input.value) {
    const value = parseFloat(input.value);
    const min = input.hasAttribute("min")
      ? parseFloat(input.getAttribute("min"))
      : null;
    const max = input.hasAttribute("max")
      ? parseFloat(input.getAttribute("max"))
      : null;

    if (min !== null && value < min) {
      errorMessage = `O valor mínimo é ${min}`;
    } else if (max !== null && value > max) {
      errorMessage = `O valor máximo é ${max}`;
    }
  }

  // Exibir mensagem de erro se existir
  if (errorMessage) {
    const errorElement = document.createElement("small");
    errorElement.className = "error-message";
    errorElement.style.color = "var(--accent-color)";
    errorElement.textContent = errorMessage;
    formGroup.appendChild(errorElement);
    input.classList.add("input-error");
    return false;
  } else {
    input.classList.remove("input-error");
    return true;
  }
}

// Configurar animações
function setupAnimations() {
  // Animação de fade-in para elementos
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
  });
}

// Funções para resultados
function toggleResultDetails(id) {
  const details = document.getElementById(id);
  if (details) {
    if (details.style.display === "none" || details.style.display === "") {
      details.style.display = "block";
      details.previousElementSibling.querySelector("span").textContent = "−";
    } else {
      details.style.display = "none";
      details.previousElementSibling.querySelector("span").textContent = "+";
    }
  }
}

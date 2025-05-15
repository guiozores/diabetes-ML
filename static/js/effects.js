// Efeitos visuais avançados e interações

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todos os efeitos
  initRippleEffect();
  initSpotlightEffect();
  initParticles();
  initNumberCounters();
  initScrollAnimations();
});

// Efeito ripple ao clicar
function initRippleEffect() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;

      let ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Efeito de spotlight que segue o mouse
function initSpotlightEffect() {
  const spotlightElements = document.querySelectorAll(".spotlight");

  spotlightElements.forEach((element) => {
    element.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / this.offsetWidth) * 100;
      const y = ((e.clientY - rect.top) / this.offsetHeight) * 100;

      this.style.setProperty("--x", `${x}%`);
      this.style.setProperty("--y", `${y}%`);
    });
  });
}

// Criar e animar partículas flutuantes
function initParticles() {
  const particleContainer = document.querySelector(".particle-container");
  if (!particleContainer) return;

  const colors = ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"];

  for (let i = 0; i < 30; i++) {
    createParticle(particleContainer, colors);
  }
}

function createParticle(container, colors) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Propriedades aleatórias para cada partícula
  const size = Math.random() * 10 + 5;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  particle.style.left = `${left}%`;
  particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

  container.appendChild(particle);
}

// Contadores de números animados
function initNumberCounters() {
  const counters = document.querySelectorAll(".counter");

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.dataset.count);
        let count = 0;
        const interval = setInterval(() => {
          target.innerText = count;
          count++;

          if (count > countTo) {
            clearInterval(interval);
            target.innerText = countTo;
          }
        }, 2000 / countTo);

        observer.unobserve(target);
      }
    });
  }, options);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Animações baseadas em scroll
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  const options = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Efeito 3D para cartões
document.addEventListener("mousemove", function (e) {
  const cards = document.querySelectorAll(".card-3d");

  cards.forEach((card) => {
    // Calcular a posição do mouse em relação ao cartão
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calcular o ângulo de rotação (limitado a 10 graus)
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    // Aplicar a transformação apenas se o mouse estiver sobre o cartão
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    }
  });
});

// Efeito de typing para textos
function initTypingEffect() {
  const typingElements = document.querySelectorAll(".typing-effect");

  typingElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";

    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  });
}

// Inicializar o efeito de typing após o carregamento da página
window.addEventListener("load", initTypingEffect);

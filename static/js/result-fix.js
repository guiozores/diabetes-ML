// Script para melhorar a exibição dos resultados
document.addEventListener('DOMContentLoaded', function() {
  // Garantir que as recomendações são claramente visíveis
  const recomendacoesElement = document.querySelector('.recommendations p');
  if (recomendacoesElement) {
    recomendacoesElement.style.fontWeight = 'bold';
    recomendacoesElement.style.color = '#333';
  }
  
  // Formatar e destacar informações importantes na explicação
  const explicacaoElement = document.querySelector('.result-param p:not(:first-child)');
  if (explicacaoElement) {
    let texto = explicacaoElement.innerHTML;
    
    // Destacar valores percentuais
    texto = texto.replace(/\((\d+\.?\d*)%\)/g, '<strong style="color:#3498db;">($1%)</strong>');
    
    // Destacar DPF calculado
    texto = texto.replace(/(DPF calculado: [\d\.]+)/g, '<strong>$1</strong>');
    
    // Destacar resultados
    texto = texto.replace(/(Resultado ML: [^\.]+)/g, '<strong style="color:#e74c3c;">$1</strong>');
    
    // Destacar fatores de risco
    texto = texto.replace(/(devido aos seguintes fatores: )([^\.]+)/g, '$1<strong style="color:#e74c3c;">$2</strong>');
    
    explicacaoElement.innerHTML = texto;
  }

  // Garantir que o rótulo de risco seja consistente
  const riscoLabel = document.querySelector('.result-param p:first-child');
  const explicacaoTexto = explicacaoElement ? explicacaoElement.textContent : '';
  
  if (riscoLabel && explicacaoTexto) {
    if (explicacaoTexto.includes('alto risco')) {
      riscoLabel.textContent = 'Risco Alto para Diabetes';
      riscoLabel.style.color = '#e74c3c';
    } else if (explicacaoTexto.includes('baixo risco')) {
      // Extrair o percentual de risco, se existir
      const percentMatch = explicacaoTexto.match(/\((\d+\.?\d*)%\)/);
      const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;
      
      if (percent > 30) {
        riscoLabel.textContent = `Risco Moderado / Possível Pré-Diabetes (${percent}%)`;
        riscoLabel.style.color = '#f39c12';
      } else {
        riscoLabel.textContent = `Risco Baixo (${percent}%)`;
        riscoLabel.style.color = '#2ecc71';
      }
    }
  }

  // Remover elementos com efeitos visuais excessivos
  document.querySelectorAll('.float, .particle, .spotlight, .typing-effect').forEach(element => {
    element.classList.remove('float', 'particle', 'spotlight', 'typing-effect');
  });

  // Simplificar o estilo dos cards
  document.querySelectorAll('.glass-card, .card-3d').forEach(card => {
    card.classList.remove('glass-card', 'card-3d');
    card.style.backgroundColor = 'white';
    card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    card.style.border = '1px solid #e0e0e0';
    card.style.borderRadius = '8px';
  });
});

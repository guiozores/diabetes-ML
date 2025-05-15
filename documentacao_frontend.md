# DiabetesML - Documentação do Frontend

## Visão Geral

Este documento descreve a implementação do frontend para a aplicação DiabetesML, uma ferramenta de avaliação de risco de diabetes que utiliza machine learning para prever o risco com base em diversos fatores.

## Estrutura do Projeto

### Arquivos HTML

- `/templates/formulario.html`: Página principal com formulário de entrada de dados
- `/templates/resultado.html`: Exibição dos resultados da avaliação
- `/templates/sobre.html`: Informações sobre o projeto
- `/templates/referencias.html`: Referências científicas e fontes de dados

### Arquivos CSS

- `/static/css/styles.css`: Estilos principais e design system
- `/static/css/effects.css`: Efeitos visuais e animações
- `/static/css/advanced.css`: Componentes avançados de UI
- `/static/css/print.css`: Estilos específicos para impressão

### Arquivos JavaScript

- `/static/js/script.js`: Funcionalidades principais e validação de formulário
- `/static/js/effects.js`: Implementação de efeitos visuais
- `/static/js/advanced.js`: Componentes interativos como tabs, selects customizados
- `/static/js/visualization.js`: Visualização de dados e gráficos

### Imagens e Ícones

- `/static/images/diabetes-icon.svg`: Ícone principal da aplicação
- `/static/images/family-icon.svg`: Ícone para histórico familiar
- `/static/images/health-icon.svg`: Ícone para informações de saúde
- `/static/images/info-icon.svg`: Ícone informativo
- `/static/images/users-icon.svg`: Ícone para dados populacionais
- `/static/images/warning-icon.svg`: Ícone de alerta
- `/static/images/wave.svg`: Elemento decorativo de onda
- `/static/images/diet-icon.svg`: Ícone para recomendações alimentares
- `/static/images/exercise-icon.svg`: Ícone para atividades físicas
- `/static/images/monitoring-icon.svg`: Ícone para monitoramento de saúde

## Funcionalidades Implementadas

### Design Responsivo

- Layout fluido que se adapta a diferentes tamanhos de tela
- Design mobile-first com breakpoints para tablets e desktops
- Navegação adaptativa que se transforma em menu hambúrguer em telas menores

### Efeitos Visuais

- Animações de entrada e saída para elementos da página
- Efeitos de ripple (ondulação) no fundo
- Efeitos de glassmorphism para cards e containers
- Animações de parallax para elementos decorativos
- Efeitos de hover em botões e links
- Efeito de spotlight para destacar elementos interativos

### Formulário Interativo

- Validação de dados em tempo real
- Feedback visual para campos inválidos
- Tooltips explicativos para cada campo
- Auto-formatação de campos numéricos
- Seleção intuitiva para histórico familiar

### Visualização de Resultados

- Apresentação clara do diagnóstico
- Gráficos interativos para visualização de fatores de risco
- Comparação com médias populacionais
- Sistema de classificação de risco com código de cores
- Recomendações personalizadas baseadas nos dados inseridos

### Funcionalidades Adicionais

- Tema claro/escuro com alternância suave
- Versão para impressão otimizada
- Animações de loading durante o processamento
- Sistema de abas para organização de conteúdo
- Seletores customizados para melhor experiência de usuário

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com variáveis, flexbox e grid
- JavaScript vanilla (sem frameworks)
- Chart.js (carregado dinamicamente) para visualizações de dados
- SVG para ícones e elementos visuais

## Otimizações

- Lazy loading para recursos não críticos
- Carregamento condicional de bibliotecas externas
- CSS minificado para produção
- Código JavaScript modularizado
- Acessibilidade implementada (ARIA, contraste, navegação por teclado)

## Próximos Passos

1. Implementar cache de dados para avaliações anteriores
2. Adicionar suporte para múltiplos idiomas
3. Criar versão PWA (Progressive Web App)
4. Implementar testes de usabilidade
5. Otimizar performance em dispositivos de baixo desempenho

## Notas Importantes

- O design segue as diretrizes de UI/UX modernas
- O código foi estruturado para facilitar manutenção futura
- Funcionalidades avançadas foram implementadas com JavaScript vanilla
- A aplicação é totalmente acessível e segue as diretrizes WCAG
- A responsividade foi testada em diversos dispositivos

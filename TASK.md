# TASK.md

## Checklist de Desenvolvimento: Aplicativo Web para Diagnóstico Preventivo de Diabetes

> **Observação:** Este guia é voltado para execução automatizada (por IA) e prioriza simplicidade, clareza e rastreabilidade. Cada etapa pode ser marcada como concluída ([x]) ou pendente ([ ]).

---

### 1. Definição do Objetivo e Escopo

- [x] Descrever objetivo do app: diagnóstico e prognóstico preventivo de diabetes baseado em dados do usuário.
- [x] Definir público-alvo: leigos, pacientes, interessados em triagem inicial.
- [x] Listar dados utilizados (nomes das variáveis):
  - pregnancies (nº de gestações)
  - glucose (glicemia)
  - bloodpressure (pressão arterial)
  - skinthickness (espessura da pele)
  - insulin (insulina)
  - bmi (IMC)
  - diabetespedigreefunction (histórico familiar)
  - age (idade)
  > **Obs:** As variáveis como atividade_fisica, tabagismo, etilismo, circunferencia_abdominal, outros_habitos NÃO são utilizadas no app/modelo atual.
- [x] Incluir disclaimer: "Este aplicativo não substitui avaliação médica profissional."

### 2. Escolha da Arquitetura e Tecnologias

- [?] Arquitetura 3 camadas: Frontend (HTML/CSS/JS simples), Backend (Flask/Python), Banco de Dados (SQLite).
  - Banco de dados está em dúvida: atualmente não está sendo utilizado para persistência dos dados dos usuários.
- [x] Justificar escolha do stack (simplicidade, baixo custo, explicabilidade).
- [x] Planejar estrutura de pastas e versionamento Git.
- [x] Considerar opções de deploy (PythonAnywhere, Render, etc.).

### 3. Configuração do Ambiente de Desenvolvimento

- [x] Instalar Python 3, criar ambiente virtual (venv).
- [x] Instalar dependências: Flask, Flask-SQLAlchemy, scikit-learn, pandas, numpy, python-dotenv.
- [x] Inicializar projeto Flask: criar `app.py`, pastas `templates/` e `static/`.
- [x] Criar rota de teste ("Hello World").
- [?] Configurar banco de dados (SQLite) e script de inicialização do schema. (Não utilizado no fluxo principal do app)
- [x] Implementar arquivo de configuração seguro (`config.py` ou `.env`).

### 4. Modelagem do Banco de Dados

- [?] Definir tabelas:
  - `usuarios` (opcional)
  - `avaliacoes` (opcional)
  - Atualmente, não há persistência dos dados dos usuários.
- [?] Documentar campos e justificativas (referências científicas).
- [?] Decidir sobre persistência dos dados (explicar na doc).

### 5. Coleta e Validação dos Dados do Usuário

- [x] Criar formulário HTML para entrada dos dados, usando os nomes das variáveis definidos (Pima Indians Diabetes).
- [x] Implementar validação no frontend (HTML5) e backend (Flask):
  - Tipos: number, obrigatoriedade, limites adequados para cada variável do dataset Pima.
- [x] Padronizar campos abertos (não se aplica, pois não há campos abertos no app atual).
- [x] Garantir usabilidade e responsividade.

### 6. Pesquisa e Seleção da Base Científica

- [x] Selecionar referência principal (ADA 2023).
- [x] Documentar critérios diagnósticos e thresholds usados (no notebook e docs).
- [x] Armazenar link/PDF da referência no repositório.
- [x] Validar lógica do app com base na referência.

### 7. Desenvolvimento do Módulo de IA

- [x] ML: baixar dataset Pima Indians Diabetes Database, treinar modelo (Random Forest), salvar modelo como `modelo_diabetes.pkl`.
- [x] Variáveis de entrada do modelo:
  - pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, diabetespedigreefunction, age
  - (Não utilizamos glicemia_jejum, hba1c, sexo, atividade_fisica, tabagismo, etilismo, circunferencia_abdominal, etc)
- [x] Documentar justificativa da escolha.

### 8. Implementação da Lógica de Diagnóstico

- [x] Calcular métricas derivadas: IMC, DPF (conforme Pima Indians).
- [x] Aplicar critérios fixos (glicemia, thresholds definidos no contexto do dataset/modelo).
- [x] Executar modelo/IA (`modelo_diabetes.pkl`) e combinar resultados com regras clínicas.
- [x] Gerar explicação didática e recomendações.

### 9. Desenvolvimento do Frontend de Resultado

- [x] Criar template de resultado (`resultado.html`).
- [x] Exibir diagnóstico, explicação, variáveis utilizadas e recomendações.
- [x] Incluir referência científica na interface.
- [x] Garantir design simples, responsivo e acessível.

### 10. Testes e Validação

- [x] Escrever testes unitários para funções centrais.
- [x] Realizar testes de integração (fluxo completo).
- [x] Validar resultados com base científica (casos limítrofes).
- [?] Coletar feedback de terceiros (opcional).
- [x] Verificar desempenho e segurança básica.

### 11. Documentação do Projeto

- [x] Completar este `TASK.md` com status atualizado.
- [x] Escrever `README.md` com visão geral, instruções de uso, metodologia, referências e screenshots.
- [x] Incluir comentários elucidativos no código.
- [?] (Opcional) Adicionar diagramas UML, ER, e manual do usuário.

### 12. Implantação (Deploy)

- [x] Escolher plataforma de hospedagem.
- [x] Ajustar configurações para produção.
- [x] Realizar deploy e testar app online.
- [x] Documentar processo de atualização/manutenção.

---

## Anexos e Referências

- [x] Incluir links para referências científicas principais (ADA, CDC, etc.).
- [?] (Opcional) Adicionar PDF ou print das tabelas de critérios diagnósticos.

---

> **Dica:** Marque cada tarefa como concluída ([x]) conforme for executada. Use este arquivo como roteiro principal do desenvolvimento e documentação do projeto.

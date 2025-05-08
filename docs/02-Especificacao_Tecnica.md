## Especificação Técnica - Aplicativo Web de Diagnóstico de Diabetes

### Objetivo

Aplicativo web para diagnóstico preventivo de diabetes, utilizando modelo de Machine Learning (Random Forest) treinado com o dataset Pima Indians Diabetes.

### Tecnologias Utilizadas

- Python 3.8+
- Flask
- scikit-learn
- pandas, numpy
- Jupyter Notebook (análise exploratória)
- HTML5/CSS3 (frontend)
- SQLite (opcional)
- python-dotenv (variáveis de ambiente)

### Estrutura de Pastas

- `app.py`, `routes.py`, `diagnostico.py`: Backend Flask
- `models.py`: Modelos de dados (opcional)
- `templates/`: HTML do frontend
- `docs/`: Documentação
- `modelo_diabetes.pkl`: Modelo ML treinado
- `treina_modelo.py`: Script de treino
- `DiabetesML_Analise.ipynb`: Notebook de análise

### Fluxo Principal

1. Usuário acessa formulário web e insere dados clínicos.
2. Backend Flask processa dados, calcula métricas derivadas (IMC, DPF).
3. Dados são enviados ao modelo ML (`modelo_diabetes.pkl`).
4. Resultado do diagnóstico é exibido ao usuário, junto de explicação e recomendações.

### Variáveis Utilizadas

- pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, diabetespedigreefunction, age

### Segurança

- Uso de variáveis de ambiente para segredos e configuração.
- Sem armazenamento de dados sensíveis do usuário por padrão.

### Testes

- Testes unitários para funções de diagnóstico.
- Testes de integração do fluxo completo.

### Referências

Ver `docs/06-Referencias_Bibliograficas.md`.

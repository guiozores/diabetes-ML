# Aplicativo Web de Diagnóstico Preventivo de Diabetes (Flask + ML)

Este projeto é um aplicativo web para diagnóstico preventivo de diabetes, utilizando Flask, SQLite (opcional), e um modelo de Machine Learning (Random Forest) treinado com o dataset Pima Indians Diabetes. Inclui análise exploratória em Jupyter Notebook, documentação técnica e plano de testes.

---

## 1. Pré-requisitos

- Python 3.8+ instalado
- Git instalado

---

## 2. Clone o repositório

**Linux/macOS:**

```bash
git clone https://github.com/guiozores/diabetes-ML.git
cd diabetes-ML
```

**Windows (Prompt de Comando):**

```bat
git clone https://github.com/seu-usuario/diabetes-ML.git
cd diabetes-ML
```

---

## 3. Crie e ative o ambiente virtual

**Linux/macOS:**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (Prompt de Comando):**

```bat
python -m venv venv
venv\Scripts\activate
```

---

## 4. Instale as dependências

**Linux/macOS:**

```bash
pip install -r requirements.txt
```

**Windows:**

```bat
pip install -r requirements.txt
```

> Se não existir o arquivo `requirements.txt`, crie com:
>
> ```
> flask
> flask_sqlalchemy
> scikit-learn
> pandas
> numpy
> python-dotenv
> seaborn
> matplotlib
> joblib
> ```

---

## 5. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo de exemplo:

```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=$$
DATABASE_URL=sqlite:///diabetes.db
```

---

## 6. (Opcional) Configure o .gitignore

Crie um arquivo `.gitignore` na raiz do projeto com:

```
venv/
__pycache__/
*.pyc
*.pkl
.env
diabetes.db
*.sqlite3
```

---

## 7. Treine o modelo de Machine Learning (opcional, já incluso)

Se quiser treinar novamente o modelo:

**Linux/macOS:**

```bash
python treina_modelo.py
```

**Windows:**

```bat
python treina_modelo.py
```

O arquivo `modelo_diabetes.pkl` será gerado.

---

## 8. Execute o aplicativo Flask

**Linux/macOS:**

```bash
flask run
```

**Windows:**

```bat
flask run
```

Acesse em: http://127.0.0.1:5000

---

## 9. Execute o Jupyter Notebook para análise exploratória

**Linux/macOS:**

```bash
jupyter notebook DiabetesML_Analise.ipynb
```

**Windows:**

```bat
jupyter notebook DiabetesML_Analise.ipynb
```

---

## 10. Testes

- Testes unitários e de integração podem ser executados com:
  - **Linux/macOS:**
    ```bash
    python -m unittest discover
    ```
  - **Windows:**
    ```bat
    python -m unittest discover
    ```

---

## 11. Estrutura do Projeto

- `app.py`, `routes.py`, `models.py`: Backend Flask
- `templates/`: HTML do frontend
- `modelo_diabetes.pkl`: Modelo ML treinado
- `treina_modelo.py`: Script de treino do modelo
- `DiabetesML_Analise.ipynb`: Notebook de análise exploratória
- `docs/`: Documentação técnica

---

## 12. Referências

Consulte o arquivo `docs/06-Referencias_Bibliograficas.md` para todas as referências científicas e do dataset.

---

> **Dúvidas?** Consulte a documentação em `docs/` ou abra uma issue!

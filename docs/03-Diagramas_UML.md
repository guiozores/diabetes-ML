## Diagrama UML - Aplicativo Web de Diagnóstico de Diabetes

### Diagrama de Componentes (Simplificado)

```
┌─────────────────────────────┐
│        Usuário (Web)        │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│        Frontend (HTML)      │
│  - formulario.html          │
│  - resultado.html           │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│      Backend (Flask)        │
│  - app.py, routes.py        │
│  - diagnostico.py           │
│  - models.py (opcional)     │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Modelo ML (Random Forest)  │
│  - modelo_diabetes.pkl      │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   (Opcional) Banco SQLite   │
│   - diabetes.db             │
└─────────────────────────────┘
```

### Diagrama de Classes (Simplificado)

```
class Diagnostico:
    + calcular_imc(peso, altura)
    + calcular_dpf(parentes)
    + diagnosticar(dados_usuario)

class Usuario (opcional):
    - id
    - nome
    - email

class Avaliacao (opcional):
    - id
    - usuario_id
    - dados_clinicos
    - resultado
    - data_avaliacao
```

> Para detalhes completos, consulte o código-fonte e a documentação técnica.

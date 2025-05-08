def calcular_dpf(parentes):
    """
    parentes: lista de tuplas (diagnostico, grau)
    diagnostico: 0 (não tem diabetes) ou 1 (tem diabetes)
    grau: string, um dos: 'pai', 'mae', 'irmao', 'avo', 'tio', 'primo', etc.
    Pesos padrão:
        pai, mae, irmao: 0.5
        avo, tio, sobrinho: 0.25
        primo: 0.125
    """
    pesos = {
        'pai': 0.5, 'mae': 0.5, 'irmao': 0.5, 'irma': 0.5,
        'avo': 0.25, 'avoa': 0.25, 'tio': 0.25, 'tia': 0.25, 'sobrinho': 0.25, 'sobrinha': 0.25,
        'primo': 0.125, 'prima': 0.125
    }
    # Para simular o exemplo original de mãe, pai e irmão:
    # Consideramos apenas os parentes nucleares básicos sempre no denominador
    parentes_nucleares = ['pai', 'mae', 'irmao']
    
    # Dicionário para controlar quais parentes têm diabetes
    tem_diabetes = {}
    for diag, grau in parentes:
        g = grau.lower()
        tem_diabetes[g] = 1
    
    num = 0.0
    den = 0.0
    
    # Para parentes nucleares (pai, mãe, irmãos), soma os pesos SEMPRE no denominador
    for g in parentes_nucleares:
        w = pesos.get(g, 0.5)  # Peso padrão para parentes de primeiro grau
        if g in tem_diabetes:
            num += w  # Soma no numerador apenas se tiver diabetes
        den += w     # Sempre soma no denominador
    
    # Para outros parentes (não nucleares), soma apenas se foram marcados
    for diag, grau in parentes:
        g = grau.lower()
        if g not in parentes_nucleares:
            w = pesos.get(g, 0)
            num += w
            den += w
    if den == 0:
        return 0.0
    return num / den
from joblib import load

def calcular_imc(peso, altura_cm):
    altura_m = altura_cm / 100
    return peso / (altura_m ** 2)

# Exemplo de uso do modelo salvo
def diagnostico_ml(entrada):
    modelo = load('modelo_diabetes.pkl')
    prob = modelo.predict_proba([entrada])[0][1]  # Probabilidade de ser diabetes
    if prob < 0.3:
        return f"Baixo Risco ({prob:.1%})"
    elif prob < 0.5:
        return f"Risco Moderado / Possível Pré-Diabetes ({prob:.1%})"
    else:
        return f"Alto Risco / Provável Diabetes ({prob:.1%})"

#!/usr/bin/env python3
"""
Script para testar as funções de recomendação e explicação com diferentes entradas.
Pode ser útil para verificar se as recomendações estão sendo geradas corretamente
para diferentes perfis de risco.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from routes import gerar_recomendacoes, gerar_explicacao
from diagnostico import diagnostico_ml, calcular_dpf

def test_recomendacoes():
    print("Teste de geração de recomendações:")
    print("=" * 80)
    
    # Caso 1: Alto risco com glicemia elevada e IMC alto
    dados1 = [2, 180, 85, 30, 150, 35, 0.7, 55]
    resultado1 = "Positivo"
    print("Caso 1: Alto risco")
    print(f"Dados: {dados1}")
    print(f"Diagnóstico: {resultado1}")
    print(f"Recomendações: {gerar_recomendacoes(dados1, resultado1)}")
    print(f"Explicação: {gerar_explicacao(dados1, dados1[6], resultado1)}")
    print("-" * 80)
    
    # Caso 2: Baixo risco com glicemia normal mas IMC sobrepeso
    dados2 = [0, 95, 75, 20, 0, 26.5, 0.1, 30]
    resultado2 = "Negativo"
    print("Caso 2: Baixo risco com sobrepeso")
    print(f"Dados: {dados2}")
    print(f"Diagnóstico: {resultado2}")
    print(f"Recomendações: {gerar_recomendacoes(dados2, resultado2)}")
    print(f"Explicação: {gerar_explicacao(dados2, dados2[6], resultado2)}")
    print("-" * 80)
    
    # Caso 3: Caso limite com fatores de risco mas sem diagnóstico positivo
    dados3 = [0, 105, 80, 25, 90, 28, 0.4, 47]
    resultado3 = "Negativo"
    print("Caso 3: Caso limite com fatores de risco")
    print(f"Dados: {dados3}")
    print(f"Diagnóstico: {resultado3}")
    print(f"Recomendações: {gerar_recomendacoes(dados3, resultado3)}")
    print(f"Explicação: {gerar_explicacao(dados3, dados3[6], resultado3)}")
    print("-" * 80)
    
    # Caso 4: Usar o modelo ML real para diagnóstico
    dados4 = [0, 98.0, 70.0, 0.0, 0.0, 31.7, 0.0, 33]
    parentes4 = []
    dpf4 = calcular_dpf([(1, p) for p in parentes4]) if parentes4 else 0.0
    dados4[6] = dpf4
    resultado4 = diagnostico_ml(dados4)
    print("Caso 4: Usando modelo ML real")
    print(f"Dados: {dados4}")
    print(f"Diagnóstico real ML: {resultado4}")
    print(f"Recomendações: {gerar_recomendacoes(dados4, resultado4)}")
    print(f"Explicação: {gerar_explicacao(dados4, dados4[6], resultado4)}")
    print("=" * 80)

if __name__ == "__main__":
    test_recomendacoes()

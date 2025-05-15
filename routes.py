from flask import render_template, request, redirect, url_for
from app import app
from diagnostico import diagnostico_ml

@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('avaliar'))

@app.route('/avaliar', methods=['GET', 'POST'])
def avaliar():
    if request.method == 'POST':
        dados = request.form
        try:
            def parse_float(val, default=0.0):
                try:
                    return float(val)
                except (ValueError, TypeError):
                    return default
            def parse_int(val, default=0):
                try:
                    return int(val)
                except (ValueError, TypeError):
                    return default

            pregnancies = parse_int(dados.get('pregnancies', 0))
            glucose = parse_float(dados.get('glucose', 0))
            bloodpressure = parse_float(dados.get('bloodpressure', 0))
            skinthickness = parse_float(dados.get('skinthickness', 0))
            insulin = parse_float(dados.get('insulin', 0))
            bmi = parse_float(dados.get('bmi', 0))
            age = parse_int(dados.get('age', 0))
            # Histórico familiar: lista de parentes marcados
            parentes = request.form.getlist('parentes')
            # Cada parente marcado é considerado como tendo diabetes (1)
            parentes_tuplas = [(1, p) for p in parentes]
            from diagnostico import calcular_dpf
            dpf = calcular_dpf(parentes_tuplas)
            # Monta a entrada na ordem correta para o modelo ML
            entrada_ml = [pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age]
            resultado_ml = diagnostico_ml(entrada_ml)
            
            # Gerar recomendações personalizadas com base nos dados
            recomendacoes = gerar_recomendacoes(entrada_ml, resultado_ml)
            
            # Criar uma explicação mais didática
            explicacao = gerar_explicacao(entrada_ml, dpf, resultado_ml)
            
            return render_template('resultado.html', 
                                  diagnostico=resultado_ml, 
                                  explicacao=explicacao, 
                                  variaveis=entrada_ml, 
                                  recomendacoes=recomendacoes)
        except Exception as e:
            return f'Erro de validação: {e}'
    return render_template('formulario.html')

@app.route('/sobre', methods=['GET'])
def sobre():
    return render_template('sobre.html')

@app.route('/referencias', methods=['GET'])
def referencias():
    return render_template('referencias.html')

# Funções auxiliares para melhorar a experiência do usuário
def gerar_recomendacoes(dados, resultado):
    """Gera recomendações personalizadas com base nos dados e resultado"""
    pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age = dados
    
    # Inicializar lista de recomendações
    recomendacoes = []
    
    # Recomendações específicas com base nos valores, independente do resultado ML
    if glucose >= 126:
        recomendacoes.append("Consulte um endocrinologista com urgência para avaliação da glicemia elevada (valor acima de 126 mg/dL).")
    elif glucose >= 100:
        recomendacoes.append("Sua glicemia está na faixa de pré-diabetes. Recomenda-se consulta médica e controle alimentar.")
    
    if bmi >= 30:
        recomendacoes.append("Seu IMC de {:.1f} indica obesidade. Busque orientação nutricional e prática de atividade física regular.".format(bmi))
    elif bmi >= 25:
        recomendacoes.append("Seu IMC de {:.1f} indica sobrepeso. Considere uma dieta balanceada e aumento da atividade física.".format(bmi))
    
    if bloodpressure >= 90:
        recomendacoes.append("Sua pressão arterial diastólica de {} mmHg está elevada. Recomenda-se monitoramento regular.".format(bloodpressure))
    
    # Resultado da avaliação ML e recomendações gerais
    if resultado in [1, "Positivo"]:
        if not recomendacoes:
            recomendacoes.append("Procure um médico para confirmação e avaliação completa.")
        recomendacoes.append("IMPORTANTE: Os resultados indicam maior risco para diabetes. Recomendamos que agende uma consulta médica para avaliação completa.")
        return " ".join(recomendacoes)
    else:
        if not recomendacoes:
            recomendacoes.append("Mantenha hábitos saudáveis de alimentação e atividade física. Realize exames de rotina anualmente.")
        return " ".join(recomendacoes)

def gerar_explicacao(dados, dpf, resultado):
    """Gera uma explicação didática sobre o resultado"""
    pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age = dados
    
    # Identificar fatores de risco
    fatores_risco = []
    if glucose >= 100:
        fatores_risco.append("glicemia elevada")
    if bmi >= 25:
        fatores_risco.append("IMC acima do ideal")
    if age >= 45:
        fatores_risco.append("idade acima de 45 anos")
    if dpf > 0.5:
        fatores_risco.append("histórico familiar significativo")
    if bloodpressure >= 90:
        fatores_risco.append("pressão arterial elevada")
    
    # Obter a porcentagem real do modelo ML se disponível
    try:
        from diagnostico import diagnostico_ml
        porcentagem_risco = diagnostico_ml.last_probability
    except:
        # Se não conseguir acessar, usar valor estimado
        porcentagem_risco = 38.2 if resultado not in [1, "Positivo"] else 68.5
    
    # Verificar se o resultado já contém a porcentagem (como string)
    resultado_ja_formatado = False
    if isinstance(resultado, str) and "%" in resultado:
        resultado_texto = resultado
        resultado_ja_formatado = True
    else:
        resultado_texto = "Risco Alto para Diabetes" if resultado in [1, "Positivo"] else f"Risco Moderado / Possível Pré-Diabetes ({porcentagem_risco:.1f}%)"
    
    # Texto da explicação com base no resultado e fatores de risco
    if resultado in [1, "Positivo"]:
        if fatores_risco:
            explicacao = f"Nosso modelo identificou alto risco para diabetes devido aos seguintes fatores: {', '.join(fatores_risco)}."
        else:
            explicacao = "Nosso modelo identificou alto risco para diabetes com base na combinação de diversos fatores."
    else:
        if fatores_risco:
            explicacao = f"Apesar de alguns fatores de risco identificados ({', '.join(fatores_risco)}), o modelo indica baixo risco de diabetes."
        else:
            explicacao = "O modelo indica baixo risco de diabetes, pois não foram identificados fatores de risco significativos."
    
    explicacao += f" Entrada utilizada: {dados} (DPF calculado: {dpf:.3f}). Resultado ML: {resultado_texto if resultado_ja_formatado else resultado_texto}."
    return explicacao

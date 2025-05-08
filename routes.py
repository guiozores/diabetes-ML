from flask import render_template, request
from app import app
from diagnostico import diagnostico_ml

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
            explicacao = f"Entrada utilizada: {entrada_ml} (DPF calculado: {dpf:.3f}). Resultado ML: {resultado_ml}."
            return render_template('resultado.html', diagnostico=resultado_ml, explicacao=explicacao, variaveis=entrada_ml, recomendacoes="Procure um médico para confirmação.")
        except Exception as e:
            return f'Erro de validação: {e}'
    return render_template('formulario.html')

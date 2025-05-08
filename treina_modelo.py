import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.utils import resample
import joblib


# Baixar o dataset (exemplo via URL)
url = 'https://raw.githubusercontent.com/plotly/datasets/master/diabetes.csv'
df = pd.read_csv(url)

print(f"Dataset carregado: {df.shape[0]} linhas, {df.shape[1]} colunas.")



# Balanceamento das classes (upsample da minoria)
df_majority = df[df.Outcome == 0]
df_minority = df[df.Outcome == 1]
df_minority_upsampled = resample(
    df_minority,
    replace=True,     # amostragem com reposição
    n_samples=len(df_majority),    # igualar à classe majoritária
    random_state=42
)
df_balanced = pd.concat([df_majority, df_minority_upsampled])
print(f"Após balanceamento: {df_balanced.Outcome.value_counts().to_dict()}")


# Separa a variável alvo (y) e as features (X)
# y: coluna 'Outcome' (0 = não diabético, 1 = diabético)
y = df_balanced['Outcome']
# X: todas as colunas exceto 'Outcome' (features clínicas)
X = df_balanced.drop('Outcome', axis=1)




# Divide os dados balanceados em treino (80%) e teste (20%)
# random_state=42 garante reprodutibilidade
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)


# Cria o modelo Random Forest com hiperparâmetros ajustados:
# n_estimators=200: mais árvores para maior robustez
# max_depth=8: limita a profundidade para evitar overfitting
# min_samples_split=4: exige pelo menos 4 amostras para split
# random_state=42: garante reprodutibilidade
# Modelo Random Forest com parâmetros do pesquisador
modelo = RandomForestClassifier(
    criterion='gini',      # Critério de impureza
    n_estimators=100,      # Número de árvores
    max_depth=10,          # Profundidade máxima
    random_state=42        # Reprodutibilidade
)
# Treina o modelo com os dados de treino
modelo.fit(X_train, y_train)


# Avalia o modelo no conjunto de teste
y_pred = modelo.predict(X_test)  # Faz previsões
print("\nRelatório de Classificação (Teste):")
print(classification_report(y_test, y_pred))  # Mostra precisão, recall, f1-score
print("Matriz de Confusão (Teste):")
print(confusion_matrix(y_test, y_pred))       # Mostra matriz de confusão



# Validação cruzada 5-fold para avaliar estabilidade e robustez do modelo
scores = cross_val_score(modelo, X, y, cv=5, scoring='accuracy')
print(f"Acurácia média na validação cruzada (5-fold): {scores.mean():.3f} (+/- {scores.std():.3f})")



# Salva o modelo treinado para uso posterior no app Flask

# Exibe informações detalhadas do treinamento e do modelo
print("\n--- RESUMO DO TREINAMENTO ---")
print(f"Amostras de treino: {len(X_train)} | Amostras de teste: {len(X_test)}")
print(f"Acurácia no treino: {modelo.score(X_train, y_train):.3f}")
print(f"Acurácia no teste:  {modelo.score(X_test, y_test):.3f}")
print(f"Acurácia média na validação cruzada (5-fold): {scores.mean():.3f} (+/- {scores.std():.3f})")

# Importância das features
importancias = modelo.feature_importances_
features = X.columns
importancias_ordenadas = sorted(zip(features, importancias), key=lambda x: x[1], reverse=True)
print("\nImportância das features (ordem decrescente):")
for nome, valor in importancias_ordenadas:
    print(f"  {nome:25s}: {valor:.4f}")
print(f"\nFeature mais importante: {importancias_ordenadas[0][0]} ({importancias_ordenadas[0][1]:.4f})")

# Parâmetros principais do modelo
print("\nParâmetros do modelo Random Forest:")
print(modelo.get_params())

# Observação sobre balanceamento
print(f"\nObservação: O dataset foi balanceado por upsampling da classe minoritária. Após balanceamento: {df_balanced.Outcome.value_counts().to_dict()}")

# Salva o modelo treinado para uso posterior no app Flask
joblib.dump(modelo, 'modelo_diabetes.pkl')
print("\nModelo salvo como modelo_diabetes.pkl")

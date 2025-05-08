from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///diabetes.db'
db = SQLAlchemy(app)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    email = db.Column(db.String(100))
    data_cadastro = db.Column(db.DateTime, default=datetime.utcnow)

class Avaliacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=True)
    pregnancies = db.Column(db.Integer)  # Número de gestações
    glucose = db.Column(db.Float)        # Glicemia
    bloodpressure = db.Column(db.Float)  # Pressão diastólica
    skinthickness = db.Column(db.Float)  # Espessura da pele
    insulin = db.Column(db.Float)        # Insulina
    bmi = db.Column(db.Float)            # IMC
    dpf = db.Column(db.Float)            # DiabetesPedigreeFunction
    age = db.Column(db.Integer)          # Idade
    resultado_diagnostico = db.Column(db.String(50))
    explicacao = db.Column(db.Text)
    data_avaliacao = db.Column(db.DateTime, default=datetime.utcnow)

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False) # Sera chiffré avec Bcrypt
    
    # Infos Profil
    full_name = db.Column(db.String(100))
    bio = db.Column(db.Text, default="")
    profile_pic = db.Column(db.String(255), default="default_avatar.png")
    
    # Système de Certification & Monétisation
    is_verified = db.Column(db.Boolean, default=False)
    subscription_end_date = db.Column(db.DateTime, nullable=True) # Pour ton abonnement mensuel
    
    # Relations
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Contenu du Post
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text)
    
    # Système de Boost (ton service à 3$)
    is_boosted = db.Column(db.Boolean, default=False)
    boost_expires_at = db.Column(db.DateTime, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from models import User, db
from auth_utils import hash_password, check_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        # Vérification avec Bcrypt
        if user and check_password(user.password_hash, password):
            session['user_id'] = user.id
            session['is_admin'] = user.is_admin # On vérifie si c'est toi l'admin
            
            if user.is_admin:
                return redirect(url_for('admin.dashboard'))
            return redirect(url_for('profile.show_profile', username=user.username))
        
        flash('Identifiants invalides', 'error')
    
    return render_template('login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        hashed = hash_password(request.form.get('password'))
        new_user = User(
            username=request.form.get('username'),
            password_hash=hashed,
            full_name=request.form.get('full_name')
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('auth.login'))
    
    return render_template('register.html')

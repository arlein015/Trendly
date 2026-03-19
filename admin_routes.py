from flask import Blueprint, render_template, request, redirect, url_for
from models import db, User, Post

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/dashboard')
def dashboard():
    # Statistiques en temps réel
    total_users = User.query.count()
    total_posts = Post.query.count()
    # On récupère les 10 derniers utilisateurs inscrits
    recent_users = User.query.order_by(User.created_at.desc()).limit(10).all()
    
    return render_template('admin_dashboard.html', 
                           users=recent_users, 
                           total_users=total_users, 
                           total_posts=total_posts)

@admin_bp.route('/ban/<int:user_id>', methods=['POST'])
def ban_user(user_id):
    user = User.query.get(user_id)
    if user:
        # On peut soit supprimer, soit ajouter un flag is_banned
        db.session.delete(user)
        db.session.commit()
    return redirect(url_for('admin.dashboard'))

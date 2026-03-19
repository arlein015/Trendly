from flask import Blueprint, render_template, abort, request
from models import User, Post
from subscription_manager import check_verification_status
from cache_service import get_profile_stats

# Création du module (Blueprint) pour regrouper les routes du profil
profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile/<username>')
def show_profile(username):
    # 1. Récupération de l'utilisateur dans PostgreSQL
    user = User.query.filter_by(username=username).first()
    
    if not user:
        # Si l'utilisateur n'existe pas, on renvoie une erreur 404
        abort(404)

    # 2. Vérification du badge de certification (ton service à 10$/mois)
    is_verified = check_verification_status(user.id)

    # 3. Récupération des compteurs (Abonnés/Suivis) via Redis pour la rapidité
    stats = get_profile_stats(user.id)

    # 4. Récupération des publications (les plus récentes en premier)
    user_posts = Post.query.filter_by(user_id=user.id).order_by(Post.created_at.desc()).all()

    # 5. Envoi des données au template HTML (profile_main.html)
    return render_template(
        'profile_main.html',
        user=user,
        is_verified=is_verified,
        stats=stats,
        posts=user_posts
    )

@profile_bp.route('/profile/edit', methods=['POST'])
def update_profile():
    # Logique pour modifier les infos (nom, bio, photo)
    # C'est ici qu'on appellera media_handler.py pour l'avatar
    pass

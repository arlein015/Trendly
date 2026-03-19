from datetime import datetime, timedelta
from models import db, User, Post

def check_verification_status(user_id):
    """
    Vérifie si l'utilisateur doit avoir le badge bleu.
    Retourne True si l'abonnement est actif.
    """
    user = User.query.get(user_id)
    if not user or not user.subscription_end_date:
        return False
    
    # Si la date de fin est dans le futur, le badge est actif
    if user.subscription_end_date > datetime.utcnow():
        return True
    
    # Si l'abonnement est expiré, on remet is_verified à False en base
    if user.is_verified:
        user.is_verified = False
        db.session.commit()
        
    return False

def activate_monthly_subscription(user_id):
    """
    Appelé après un paiement réussi de 10$.
    Ajoute 30 jours à l'abonnement actuel.
    """
    user = User.query.get(user_id)
    now = datetime.utcnow()
    
    # Si déjà abonné, on prolonge à partir de la date de fin, sinon à partir de maintenant
    start_date = user.subscription_end_date if (user.subscription_end_date and user.subscription_end_date > now) else now
    
    user.subscription_end_date = start_date + timedelta(days=30)
    user.is_verified = True
    db.session.commit()
    return True

def boost_post(post_id):
    """
    Appelé après un paiement de 3$.
    Active la visibilité prioritaire pendant 24 heures.
    """
    post = Post.query.get(post_id)
    if post:
        post.is_boosted = True
        post.boost_expires_at = datetime.utcnow() + timedelta(hours=24)
        db.session.commit()
        return True
    return False

def cleanup_expired_boosts():
    """
    Tâche de fond à exécuter (Cron job) pour retirer le statut 'Boosté'
    quand les 24h sont passées.
    """
    expired_posts = Post.query.filter(
        Post.is_boosted == True, 
        Post.boost_expires_at < datetime.utcnow()
    ).all()
    
    for post in expired_posts:
        post.is_boosted = False
    
    db.session.commit()

import os
from PIL import Image # Librairie 'Pillow' pour la compression
from uuid import uuid4
from flask import current_app

# Configuration des extensions autorisées
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    """Vérifie si le fichier a une extension d'image valide."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_profile_picture(file, user_id):
    """
    Traite, compresse et enregistre la photo de profil.
    Retourne le nom du fichier final ou None en cas d'erreur.
    """
    if file and allowed_file(file.filename):
        # 1. Générer un nom de fichier unique pour éviter les conflits et le cache
        # Exemple: profile_12_a1b2c3.webp
        ext = "webp" # On force le format WebP pour la performance mobile
        filename = f"profile_{user_id}_{uuid4().hex[:8]}.{ext}"
        
        # Chemin de destination
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'profiles', filename)
        
        try:
            # 2. Ouvrir l'image avec Pillow
            img = Image.open(file)
            
            # 3. Transformer en carré (Crop) et Redimensionner
            # Instagram utilise du 320x320 pour les avatars
            img = img.convert("RGB") # S'assurer de la compatibilité
            width, height = img.size
            min_dim = min(width, height)
            
            left = (width - min_dim) / 2
            top = (height - min_dim) / 2
            right = (width + min_dim) / 2
            bottom = (height + min_dim) / 2
            
            img = img.crop((left, top, right, bottom))
            img.thumbnail((400, 400)) # Taille optimale pour mobile/web
            
            # 4. Sauvegarder avec compression
            img.save(upload_path, "WEBP", quality=80)
            
            return filename
            
        except Exception as e:
            print(f"Erreur lors du traitement de l'image : {e}")
            return None
            
    return None

def delete_old_picture(filename):
    """Supprime l'ancienne photo du serveur pour libérer de l'espace."""
    if filename and filename != "default_avatar.png":
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'profiles', filename)
        if os.path.exists(path):
            os.remove(path)

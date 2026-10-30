# Installer le suivi sur le téléphone (une seule fois, ~5 min)

1. Sur ordinateur, ouvre https://script.google.com avec ton compte Google d'agenda, puis « Nouveau projet ».
2. Efface le code, colle tout le contenu de `apps-script/Code.gs`.
3. Ligne `const CLE = …` : remplace par un mot de passe long de ton choix (lettres et chiffres, sans espace).
4. « Déployer » › « Nouveau déploiement » › type « Application Web ».
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
5. Autorise l'accès à ton agenda quand Google le demande (« Paramètres avancés » › « Accéder à… »).
6. Copie l'URL qui finit par `/exec`, ajoute `?key=TON_MOT_DE_PASSE` à la fin.
7. Ouvre la page de l'app sur le téléphone, colle cette adresse complète dans le champ, « Enregistrer ».
8. Safari › Partager › « Sur l'écran d'accueil » pour en faire une icône.

 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 007f408a897dce0c909801f91952e2cf21a266a8..0013656a1f6b927a419e06fd8baa6cb996e61fd1 100644
--- a/README.md
+++ b/README.md
@@ -1,15 +1,38 @@
-# Calculateur de saturation du charbon actif
+# Assistant OberA + Calculateur saturation charbon actif
 
-Outil technique permettant d’estimer le taux de saturation d’un filtre à charbon actif
-à partir du poids mesuré, du type de polluant et de la référence du filtre.
+Intégration de l'outil de calcul de saturation dans l'Assistant OberA avec une route dédiée:
+- `/` : page Assistant OberA
+- `/charbon-actif` : calculateur saturation charbon actif
 
-## Fonctionnalités
-- Sélection de la référence filtre
-- Sélection polluant ou mélange
-- Calcul conservateur du taux de saturation
-- Aide à la décision : OK / À surveiller / À remplacer
-- Génération d’un rapport copiable
-- Affichage des photos des références filtres
+## Installation
+```bash
+npm install
+```
 
-## Dossier images
-Les images des filtres doivent être placées dans :
+## Lancer en local
+```bash
+npm run dev -- --host 0.0.0.0 --port 5173
+```
+
+## Build
+```bash
+npm run build
+```
+
+## Preview build
+```bash
+npm run preview -- --host 0.0.0.0 --port 4173
+```
+
+## Tests rapides
+```bash
+npm run test
+```
+
+## Variables d'environnement
+Aucune variable d'environnement requise pour cette version.
+
+## Déploiement
+Exemple GitHub Pages / hébergement statique:
+1. `npm run build`
+2. publier le dossier `dist/` sur votre plateforme de hosting statique.
 
EOF
)

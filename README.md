# Assistant OberA + Calculateur saturation charbon actif

Intégration de l'outil de calcul de saturation dans l'Assistant OberA avec une route dédiée:
- `/` : page Assistant OberA
- `/charbon-actif` : calculateur saturation charbon actif

## Installation
```bash
npm install
```

## Lancer en local
```bash
npm run dev -- --host 0.0.0.0 --port 5173
```
Puis ouvrir: `http://localhost:5173`

## Build
```bash
npm run build
```

## Preview build (site final en local)
```bash
npm run preview -- --host 0.0.0.0 --port 4173
```
Puis ouvrir: `http://localhost:4173`

## Tests rapides
```bash
npm run test
```

## Variables d'environnement
Aucune variable d'environnement requise pour cette version.


## Important pour GitHub Pages
Cette version utilise un routage `HashRouter` (`/#/charbon-actif`) pour éviter les pages blanches sur hébergement statique (GitHub Pages).

## Déploiement
Exemple GitHub Pages / hébergement statique:
1. `npm run build`
2. publier le dossier `dist/` sur votre plateforme de hosting statique.

---

## Procédure complète après extraction + `git apply` (copier sur GitHub)

### 1) Appliquer le patch
```bash
git apply mon-patch.diff
```

### 2) Vérifier les changements
```bash
git status
```

### 3) Installer et lancer le site en local
```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```
Ouvre `http://localhost:5173` pour voir le rendu en dev.

### 4) Vérifier le rendu final (build de prod)
```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```
Ouvre `http://localhost:4173` (c'est le rendu proche prod).

### 5) Commit et push vers GitHub
```bash
git add .
git commit -m "Intégration Assistant OberA + calculateur charbon actif"
git push origin <ta-branche>
```

### 6) Créer la Pull Request
- Va sur GitHub
- Ouvre une PR de `<ta-branche>` vers `main`
- Vérifie les checks CI
- Merge

### 7) Publier sur GitHub Pages (si utilisé)
- Settings → Pages
- Source: **GitHub Actions** (ou `dist/` selon ton setup)
- Si workflow Pages est présent, le déploiement part automatiquement après merge sur `main`.

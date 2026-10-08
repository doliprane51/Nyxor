# Nyxor — Personal Portfolio

Portfolio personnel statique en **HTML + CSS + JavaScript vanilla**, sans framework, sans npm et sans build step.

## 1. Modifier mes informations

La source principale est `script.js`. Toutes les données éditoriales sont regroupées au début dans l'objet `SITE` :

- `name`
- `role`
- `email`
- `links`
- `metrics`
- `skills`
- `projects`
- `journey`
- `socials`

Les métriques fournies sont explicitement des **exemples** : remplace-les par tes chiffres réels.

Le site est en anglais comme demandé.

### Domaine

Les métadonnées SEO utilisent `https://nyxor.dev/` comme domaine d'exemple. Si ton domaine final est différent, remplace-le dans :

- `index.html` : canonical, `og:url`, `og:image`
- `sitemap.xml`
- `robots.txt`

## 2. Remplacer les médias

Place tes fichiers ici :

```text
assets/
├── avatar.webp
└── music.mp3
```

### Avatar

Remplace `assets/avatar.webp` par ta photo. Une image carrée, nette, idéalement 800×800 px ou plus, fonctionne bien.

### Musique

Remplace `assets/music.mp3` par ton fichier audio.

Le lecteur :

- ne lance jamais l'audio automatiquement ;
- possède play/pause ;
- permet de déplacer la progression ;
- affiche la durée ;
- fonctionne au clavier ;
- affiche `ADD AUDIO` si le fichier est absent/invalide.

## 3. Développement local

Aucun serveur Node n'est nécessaire.

Pour une expérience locale proche d'un hébergement statique, tu peux utiliser un serveur HTTP simple :

```bash
python3 -m http.server 8080
```

Puis ouvre :

```text
http://localhost:8080
```

Tu peux aussi simplement ouvrir `index.html`, mais certains comportements de navigateur sont plus fiables avec HTTP.

## 4. GitHub

Initialiser le dépôt :

```bash
git init
git add .
git commit -m "feat: initial Nyxor portfolio"
git branch -M main
git remote add origin https://github.com/doliprane51/nyxor-portfolio.git
git push -u origin main
```

Si le dépôt existe déjà :

```bash
git add .
git commit -m "update portfolio"
git push
```

## 5. Déploiement Vercel

### Option A — depuis GitHub

1. Connecte-toi à Vercel.
2. Choisis **Add New → Project**.
3. Importe le dépôt GitHub.
4. Framework Preset : **Other**.
5. Build Command : laisse vide.
6. Output Directory : laisse la racine du projet.
7. Clique sur **Deploy**.
8. À chaque `git push`, Vercel reconstruira automatiquement le site.

### Option B — CLI

Le site n'a pas besoin de build.

Avec la CLI Vercel installée :

```bash
vercel
```

Puis pour la production :

```bash
vercel --prod
```

## 6. Nom de domaine personnalisé

Dans Vercel :

1. Ouvre ton projet.
2. Va dans **Settings → Domains**.
3. Ajoute ton domaine.
4. Si Vercel te demande un enregistrement DNS, ajoute exactement celui indiqué.
5. Attends la propagation DNS.
6. Vérifie que le HTTPS est actif.
7. Mets ensuite à jour le domaine dans `index.html`, `sitemap.xml` et `robots.txt`.

## 7. Checklist avant mise en ligne

- [ ] Remplacer `assets/avatar.webp`
- [ ] Remplacer `assets/music.mp3`
- [ ] Remplacer les métriques d'exemple
- [ ] Remplacer les projets fictifs par les vrais projets
- [ ] Vérifier tous les liens sociaux
- [ ] Vérifier l'adresse email
- [ ] Remplacer `nyxor.dev` par le domaine réel
- [ ] Vérifier `og.png`
- [ ] Tester le thème clair et le thème sombre
- [ ] Tester `prefers-reduced-motion`
- [ ] Tester la navigation clavier
- [ ] Tester le command palette avec `/` et `Ctrl+K`
- [ ] Tester le bouton de copie d'email
- [ ] Tester le lecteur audio
- [ ] Tester la page `404.html`
- [ ] Tester à 320 px de largeur
- [ ] Tester sur mobile réel
- [ ] Vérifier les titres, la meta description et le favicon
- [ ] Vérifier les liens externes avec ouverture dans un nouvel onglet
- [ ] Vérifier le sitemap
- [ ] Lancer Lighthouse sur mobile et desktop
- [ ] Vérifier la console navigateur : aucune erreur JS
- [ ] Vérifier que le fichier audio et l'avatar sont bien présents avant `git push`

## 8. Architecture

```text
/
├── index.html
├── 404.html
├── style.css
├── script.js
├── favicon.svg
├── og.png
├── sitemap.xml
├── robots.txt
├── vercel.json
├── README.md
└── assets/
    ├── avatar.webp
    └── music.mp3
```

Le projet ne contient aucune dépendance npm et aucun framework.

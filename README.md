# 🌍 Yetumia — African Language Intelligence Platform

**Yetumia** est un projet technologique et linguistique visant à créer un **dictionnaire intelligent multi-langues** et, à long terme, une **IA vocale** dédiée aux langues et dialectes africains sous-représentés dans les technologies actuelles.

L’objectif est de **réduire le fossé technologique** en donnant aux communautés locales un accès à des outils linguistiques modernes.

[![Website](https://img.shields.io/badge/Visiter_Yetumia-www.yetumia.com-4CAF50?style=for-the-badge&logo=world&logoColor=white)](http://www.yetumia.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/yetumiaGit/yetufrontend)

---

## 🚀 État actuel du projet

✔ Frontend en ligne  
✔ Backend Node.js opérationnel  
✔ Base de données PostgreSQL  
✔ API REST pour gérer le lexique  
✔ Infrastructure déployée sur VPS  

---

## 🧠 Fonctionnalités actuelles

- 🔎 **Recherche de mots** (Swahili → Français)
- ➕ **Ajout de mots** dans le dictionnaire
- ✏ **Modification** de traductions
- ❌ **Suppression** de mots
- 📦 **Import massif** de lexique via fichiers SQL
- 🗃 **Structure prête** pour évolution IA

---

## 📁 Frontend (structure stabilisée)

- **Une seule source de logique** : `script.js` (l’ancien script inline dans `index.html` a été retiré).
- **API unique** : l’URL de l’API est définie dans `script.js` : `apiBaseUrl: 'https://yetumia.com/api'`.
- **Favoris** : les mots issus de l’API peuvent être ajoutés aux favoris et restent affichés après rechargement.

---

## ▶️ Guide de lancement (run en local)

Le frontend est du **HTML/CSS/JS statique**. Il doit être servi via HTTP (éviter d’ouvrir `index.html` en `file://` pour éviter les problèmes de chemins et CORS).

### Prérequis

- Aucun build : pas de `npm install` nécessaire.
- Un navigateur moderne (Chrome, Firefox, Edge, Safari).
- **Optionnel** : Python 3 ou Node.js pour lancer un serveur local.

### 1. Aller dans le dossier du projet

```bash
cd yetufrontend
# ou, sous Windows PowerShell :
Set-Location yetufrontend
```

### 2. Démarrer un serveur HTTP local

**A. Avec Python 3**

```bash
python -m http.server 3000
```

**B. Avec Node.js (npx)**

```bash
npx serve -l 3000
```

**C. Avec VS Code / Cursor**

- Installer l’extension **Live Server**.
- Clic droit sur `index.html` → **Open with Live Server**.

### 3. Ouvrir l’application

Dans le navigateur : **http://localhost:3000** (ou le port indiqué par Live Server).

L’app utilise par défaut l’API en production : `https://yetumia.com/api`. Recherche et favoris fonctionnent sans configuration supplémentaire.

### 4. (Optionnel) Utiliser une API locale

Si vous avez un backend en local, dans `script.js` modifiez :

```js
apiBaseUrl: 'http://localhost:VOTRE_PORT/api'
```

Puis rechargez la page.

### Arrêter le serveur

- **Terminal** : `Ctrl+C` dans la fenêtre où le serveur tourne.
- **Live Server** : bouton « Port » ou arrêt du serveur dans la barre d’état.

---

## 🏗 Stack technique

| Couche           | Technologie             |
| ---------------- | ----------------------- |
| Frontend         | HTML / CSS / JavaScript |
| Backend          | Node.js + Express       |
| Base de données  | PostgreSQL              |
| Déploiement      | VPS (Linux)             |
| Containerisation | Docker via Dokploy      |
| Reverse Proxy    | Traefik                 |
| Versioning       | GitHub                  |

---

## 🗂 Structure du backend

Routes principales :

| Méthode | Route            | Description             |
| ------- | ---------------- | ----------------------- |
| GET     | `/`              | Test serveur            |
| GET     | `/mot/:mot`      | Rechercher un mot       |
| POST    | `/ajouter`       | Ajouter un mot          |
| PUT     | `/modifier/:mot` | Modifier une traduction |
| DELETE  | `/supprimer/:id` | Supprimer un mot        |

---

## 🗄 Base de données

Table principale : **`lexique_swahili`**

Champs clés :
- `id` (UUID)
- `mot_swahili`
- `traduction_fr`
- `categorie_grammaticale`
- `exemples`
- `synonymes`
- `étymologie`
- `niveau_langue`
- `categorie_semantique`
- `niveau_difficulte`
- `date_ajout`




## 🌐 Déploiement

Le projet est déployé sur un **VPS Linux** via **Dokploy (Docker)** :
- Conteneur backend Node.js
- Conteneur PostgreSQL
- Traefik pour HTTPS
- Domaine connecté au frontend

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Accéder_au_site-009688?style=for-the-badge&logo=google-chrome&logoColor=white)](http://www.yetumia.com)

---

## 🔮 Vision future

- Intégration **IA linguistique**
- **Assistant vocal** pour dialectes africains
- **Apprentissage automatique** sur lexiques
- **Traduction intelligente** contextuelle
- **API publique** linguistique

---

## 🤝 Contribution

Les développeurs peuvent contribuer en :
1. Améliorant l'API
2. Ajoutant des langues
3. Optimisant la base de données
4. Développant les modules IA

**Processus :** Fork → Branch → Pull Request

[![Contribute](https://img.shields.io/badge/Contribuer-au_projet-FF6F61?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yetumiaGit/yetufrontend/fork)

---

## 📜 Licence

Projet en développement — licence à définir.

---

## ✨ Auteur

Projet initié par **Meso**  
Vision : connecter les langues africaines au futur numérique.

---

**Yetumia = Technologie + Culture + Langues africaines**

---

<div align="center">

[![Visit Yetumia](https://img.shields.io/badge/🌍_Visiter_Yetumia-Click_ici-8A2BE2?style=for-the-badge)](http://www.yetumia.com)
[![Report Issue](https://img.shields.io/badge/🐛_Signaler_un_bug-DD0031?style=for-the-badge&logo=github)](https://github.com/yetumiaGit/yetufrontend/issues)
[![Feature Request](https://img.shields.io/badge/💡_Suggestion-F39C12?style=for-the-badge&logo=github)](https://github.com/yetumiaGit/yetufrontend/issues)

</div>

---

*Dernière mise à jour : Janvier 2025*

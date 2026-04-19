# TP — Intégration continue (React + Node.js)

Structure prévue par le cours : `frontend/` (React), `backend/` (Node/Express), Docker, GitHub Actions, SonarCloud.

## Prérequis locaux

- Node.js 18+
- npm
- Docker (optionnel, pour les images)

## Commandes locales

### Frontend

```bash
cd frontend
npm install
npm run lint
npm test
npm run build
```

### Backend

```bash
cd backend
npm install
npm run lint
npm test
```

### Docker Compose

```bash
docker compose up --build
```

- Frontend : http://localhost:8080  
- Backend : http://localhost:3001/health  

## GitHub Actions

Le workflow `.github/workflows/ci.yml` exécute lint, tests avec couverture, build React, build Docker pour chaque partie, puis une analyse SonarCloud lorsque les secrets sont configurés.

### Secrets à créer (repository → Settings → Secrets and variables → Actions)

| Nom           | Description                                      |
|---------------|--------------------------------------------------|
| `SONAR_TOKEN` | Token utilisateur SonarCloud (My Account → Security) |

### SonarCloud

1. Créer un projet sur [SonarCloud](https://sonarcloud.io) et noter la **clé d’organisation** et la **clé de projet**.
2. Éditer `sonar-project.properties` : remplacer `YOUR_SONARCLOUD_ORG` et aligner `sonar.projectKey` / `sonar.projectName` avec le projet SonarCloud.

Sans `SONAR_TOKEN` et une config SonarCloud valide, le job `sonarqube` échouera — les jobs `frontend` et `backend` restent utiles pour valider lint, tests et Docker.

## Note pédagogique

Le polycopié place `npx sonar-scanner` dans le job backend alors que le frontend produit son `lcov.info` dans un autre job. Ce dépôt ajoute un job `sonarqube` qui récupère les deux rapports de couverture (artifacts) puis lance l’analyse, ce qui correspond au fichier `sonar-project.properties` fourni.

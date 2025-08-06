# Pixelora

**Live Website:** [https://pixeloragamerquant.netlify.app/](https://pixeloragamerquant.netlify.app/)

> **Inspired by:** [adrianhajdin/project_shareme_social_media](https://github.com/adrianhajdin/project_shareme_social_media)

---

Pixelora is a social media application focused on image sharing and AI-powered image generation. The platform allows users to explore, generate, and share images, providing a seamless experience powered by a modern frontend and a robust Sanity backend.

## Features

- **Image Sharing:** Upload, explore, and share creative images with the community.
- **AI Image Generation:** Generate unique images using integrated AI components (details in the frontend).
- **Sanity Backend:** Utilizes Sanity for content management, offering real-time content editing and flexibility.
- **Modern Frontend:** Built with React (v19), styled-components, and a clean, responsive UI.

## Tech Stack

- **Frontend:** React, styled-components
- **Backend:** Sanity.io (Content Studio)
- **Other:** ESLint, Prettier, TypeScript

---

## Folder Structure

```
pixelora_backend/
  ├── README.md              # Sanity Studio setup and guides
  ├── readme.md              # Note about Sanity backend code
  ├── eslint.config.mjs      # ESLint configuration for studio
  ├── package.json           # Backend dependencies and scripts
  ├── package-lock.json      # Backend dependency lock file
  ├── sanity.cli.js          # Sanity CLI config
  └── schemaTypes/           # (Not shown) Sanity schema definitions

pixelora_frontend/
  ├── public/                # Static assets
  └── src/
      ├── AiComponents/      # AI-powered image components
      └── Aicontainer/       # AI feature containers
      └── assets/            # logo and images 
      └── components/        
      └── container/         #Container main container like home and pin
      └── utilis/            #Contains utility function files
      └── App.js
      └── index.js
      └── client.js
      └── index.css
```

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Lokesh-102214/Pixelora.git
cd Pixelora
```

### 2. Install Dependencies

#### Backend (Sanity Studio)

```sh
cd pixelora_backend
npm install
```

#### Frontend

```sh
cd ../pixelora_frontend
npm install
```

### 3. Environment Variables

**Create a `.env` file in the `pixelora_frontend` directory and add:**

```
REACT_APP_GOOGLE_API_TOKEN=your_google_api_token
REACT_APP_SANITY_PROJECT_ID=your_sanity_project_id
REACT_APP_SANITY_API_TOKEN=your_sanity_api_token
```

**Note:** Never commit your `.env` file to version control.

### 4. Running the App

#### Start Sanity Studio (Backend)

```sh
cd pixelora_backend
npm run dev
```

#### Start Frontend

```sh
cd ../pixelora_frontend
npm start
```

---

## Backend (Sanity) Notes

- The Sanity Studio enables real-time content management.
- Configuration is in `sanity.cli.js` (project ID, dataset, auto updates).
- Custom schemas go in `pixelora_backend/schemaTypes/`.

## Scripts (pixelora_backend/package.json)

- `dev`: Start Sanity Studio in dev mode
- `build`: Build Sanity Studio for production
- `deploy`: Deploy Sanity Studio
- `deploy-graphql`: Deploy Sanity GraphQL API

---

## Credits

- **Inspired by:** [adrianhajdin/project_shareme_social_media](https://github.com/adrianhajdin/project_shareme_social_media)
- **Sanity Studio docs:** [Getting Started](https://www.sanity.io/docs/introduction/getting-started)
- **Sanity Community:** [Join here](https://www.sanity.io/community/join)

---

## License

This project is intended for educational purposes and personal use.

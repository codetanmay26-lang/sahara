# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Sahaara

  Sahaara is a companion and care platform designed to help seniors stay connected, heard, remembered, and supported. It provides separate experiences for seniors and caregivers, combining family connection, memories, wellness, devotion, community, and companionship in one application.

  ## Features

  - Senior portal with home, Saathi voice room, nostalgia, community, devotion, and legacy spaces
  - Caregiver dashboard with reports, memories, community, cultural activities, and legacy tools
  - Role-based navigation and protected routes for Senior and Caregiver accounts
  - Firebase Authentication, Firestore, and Storage integration
  - Demo Mode for trying the senior experience without a Firebase account
  - Shared audio player with devotional, family, memories, events, and Saathi audio
  - Responsive React interface with Lucide icons and TypeScript

  ## Tech Stack

  - React 19 and TypeScript
  - Vite
  - React Router
  - Firebase Authentication, Firestore, and Storage
  - Lucide React

  ## Getting Started

  ### Requirements

  - Node.js 18 or newer
  - npm

  ### Installation

  ```bash
  npm install
  ```

  ### Environment setup

  For Firebase authentication, copy the example environment file and add the Firebase web app configuration:

  ```bash
  copy .env.example .env
  ```

  Then set the `VITE_FIREBASE_*` values in `.env`. These values are read by `src/services/firebase.ts`.

  To explore the application without Firebase credentials, open the landing page and choose **Try Demo Mode**. Demo Mode signs in as the sample senior user, Ramesh Kumar.

  ### Run locally

  ```bash
  npm run dev
  ```

  Vite will print the local development URL in the terminal.

  ## Available Scripts

  | Command | Description |
  | --- | --- |
  | `npm run dev` | Start the Vite development server |
  | `npm run build` | Type-check and create a production build |
  | `npm run lint` | Run ESLint |
  | `npm run preview` | Preview the production build locally |

  ## Application Routes

  | Area | Routes |
  | --- | --- |
  | Public | `/` |
  | Senior | `/senior/home`, `/senior/saathi`, `/senior/nostalgia`, `/senior/community`, `/senior/devotion`, `/senior/legacy` |
  | Caregiver | `/caregiver/dashboard`, `/caregiver/reports`, `/caregiver/memories`, `/caregiver/community`, `/caregiver/cultural`, `/caregiver/legacy` |

  Senior and caregiver routes require authentication and automatically redirect users to the portal matching their role.

  ## Project Structure

  ```text
  src/
    components/   Reusable UI components such as the audio player and vitals card
    context/      Authentication and audio providers
    layouts/      Shared application layout
    pages/        Landing, senior, and caregiver screens
    services/     Firebase and mock data services
    types/        Shared TypeScript types
  public/audio/   Audio assets grouped by experience
  ```

  ## Audio Assets

  Audio files are stored under `public/audio/` and grouped into `devotion`, `events`, `family`, `memories`, and `saathi`. The optional `generate_audio.py` script can be used when generating additional audio assets; configure its dependencies and credentials separately before running it.

  ## Build Verification

  Before submitting changes, run:

  ```bash
  npm run lint
  npm run build
  ```

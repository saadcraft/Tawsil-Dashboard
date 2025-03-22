# Frontend Platform Documentation

<div align="center">
  <img src="./public/Logo_Horizontal.svg" alt="Company Logo" width="200" />
</div>

**Platform Link:** [https://platforme.tawsilstar.dz](https://platforme.tawsilstar.dz)

---

## Description
This is a frontend application built with **Next.js**. It serves as the user interface for the platform, providing a seamless experience for users with different roles and permissions. The application includes public pages (e.g., login, password reset) and private dashboard pages accessible after authentication.

---

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Running the Development Server
To start the development server, run:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## Folder Structure
The project is organized as follows:

- **`src/app`**: Contains all the pages for the application.
- **`src/components`**: Reusable UI components.
- **`src/lib`**: Contains logic for connecting with endpoints and utility tools.
- **`public`**: Static assets like images and fonts.

---

## Folder Roots
### Public Pages (Authentication)
- **`src/app/(auth)/login`**: Login page.
- **`src/app/(auth)/forget`**: Forgot password page.
- **`src/app/(auth)/reset-password`**: Password reset page.

### Private Pages (Dashboard)
- **`src/app/dashboard`**: Main dashboard page accessible after login. Pages within this directory are role-specific.

#### Role-Specific Routes
- **`chef_bureau`**:
  - `/action`
  - `/agent_administratif`
  - `/ajoute_agent`
  - `/apple_center`
  - `/caisses`
  - `/deliveries`

- **`centre_appel`**:
  - `/apple_center`
  - `/demande`
  - `/center_actions`

- **`superviseur`**:
  - `/validation`
  - `/recharge`
  - `/rapports`

- **`gestion_commercial`**:
  - `/modifie_superviseur`
  - `/ajoute_superviseur`
  - `/agent_administratif`
  - `/magasin`
  - `/partenaire`

- **`validation_vtc`**:
  - `/courses`

- **`comptable`**:
  - `/comptable`
  - `/group_actions`

- **`partener`**:
  - `/product_management`
  - `/commandes`

#### Global Routes
- `/`: Home page.
- `/profile`: User profile page.

#### Adding New Routes or Roles
To add a new route or role, update the file:
```
src/lib/tools/roles/user_role.ts
```

---

## Environment Variables
The following environment variables are required for the application to function:

- **`SERVER_DOMAIN`**: The base URL for the API.
- **`IMGS_DOMAIN`**: The base URL for images.
- **`WS_SERVER`**: The base URL for the WebSocket server.

Create a `.env.local` file in the root directory and add these variables:
```env
SERVER_DOMAIN=your_api_url
IMGS_DOMAIN=your_images_url
WS_SERVER=your_websocket_url
```

---

## Deployment
The application is deployed using a **VPS** (Virtual Private Server). The deployment process is automated using a `.yml` configuration file. The build is automatically deployed when changes are pushed to the main branch.
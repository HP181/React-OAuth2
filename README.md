# OAuth2 Demo — Frontend

A React + Vite frontend for OAuth2 authentication with Google and GitHub, built with Tailwind CSS.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| react-icons | Icons (FcGoogle, ImGithub, Feather) |

---

## Project Structure

```
src/
├── components/
│   ├── AuthContext.jsx       # Global auth state + user normalization
│   ├── ProtectedRoute.jsx    # Redirects unauthenticated users to /login
│   └── PublicRoute.jsx       # Redirects authenticated users to /dashboard
├── pages/
│   ├── Login.jsx             # Login page with Google & GitHub buttons
│   ├── Home.jsx              # Landing page (protected)
│   └── Dashboard.jsx         # User profile page (protected)
├── Navbar.jsx                # Top navigation with sign out
└── App.jsx                   # Routes + AuthProvider wrapper
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:8080`

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment

No `.env` needed — the backend URL is hardcoded as `http://localhost:8080`. To change it, update the fetch URLs in `AuthContext.jsx`.

---

## Auth Flow

```
User visits protected route
        ↓
AuthProvider fetches /user-info (with credentials)
        ↓
   Authenticated?
   ┌────┴────┐
  Yes        No
   ↓          ↓
Render     Redirect to /login
page
        ↓
User clicks "Continue with Google/GitHub"
        ↓
window.location.href → http://localhost:8080/oauth2/authorization/{provider}
        ↓
Spring handles OAuth2 flow → redirects to /dashboard
        ↓
AuthProvider fetches /user-info → sets normalized user state
```

---

## User Normalization

GitHub and Google return different field names. `AuthContext.jsx` normalizes them into a single shape:

| Field | Google | GitHub |
|---|---|---|
| `name` | `name` | `name` \|\| `login` |
| `email` | `email` | `email` \|\| `"Not provided"` |
| `picture` | `picture` | `avatar_url` |
| `provider` | `"google"` | `"github"` |
| `username` | — | `login` |
| `bio` | — | `bio` |
| `location` | — | `location` |
| `blog` | — | `blog` |
| `company` | — | `company` |
| `publicRepos` | — | `public_repos` |
| `followers` | — | `followers` |
| `following` | — | `following` |
| `createdAt` | — | `created_at` |

---

## Routes

| Path | Component | Access |
|---|---|---|
| `/login` | `Login.jsx` | Public only (redirects to `/dashboard` if logged in) |
| `/` | `Home.jsx` | Protected |
| `/dashboard` | `Dashboard.jsx` | Protected |

---

## Sign Out

1. `POST http://localhost:8080/logout` with `credentials: "include"`
2. Backend invalidates the session
3. Frontend clears user state via `setUser(null)`
4. React Router navigates to `/login`

---

## Notes

- All fetch calls use `credentials: "include"` to send the session cookie cross-origin
- The backend must have `allowCredentials(true)` and `allowedOrigins("http://localhost:5173")` set in CORS config
- `Customizer.withDefaults()` in Spring Security picks up the `CorsConfigurationSource` bean automatically

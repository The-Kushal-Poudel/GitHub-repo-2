# Dynamic React Portfolio

React + Vite frontend with a Laravel API and admin panel.

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Set the backend URL in `.env`:

```env
VITE_API_URL=http://localhost:8000
```

The public site runs at `http://localhost:5173` and the admin panel is available at `/admin`.

## Production

Deploy this folder to Vercel and set:

```env
VITE_API_URL=https://your-api.onrender.com
```

The Laravel backend is in the separate `portfolio-backend` folder. Create its administrator securely with `php artisan admin:create`; no default production credentials are included.

See `DEPLOYMENT_FREE.md` in the parent project for complete Vercel, Render, Neon, and Cloudinary instructions.

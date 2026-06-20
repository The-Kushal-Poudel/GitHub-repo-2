# Implementation Notes

## Frontend

- React/Vite public portfolio and `/admin` panel are preserved.
- All API requests use the shared `src/config/api.js` configuration.
- Dynamic portfolio content is loaded from `GET /api/portfolio`.
- Contact and review forms submit to the Laravel API.
- Vercel SPA rewrites support direct admin routes.
- ESLint and the production Vite build pass.

## Backend

- Laravel Sanctum Bearer-token admin authentication is preserved.
- Admin login and public form submissions are rate-limited.
- Uploaded images and PDFs use Cloudinary rather than local container storage.
- PostgreSQL/Neon-compatible migrations and SSL configuration are included.
- Admin creation uses the secure `php artisan admin:create` command.
- Render Docker deployment files and `/up` health checking are included.
- CORS is restricted through `FRONTEND_URL` and `FRONTEND_URLS`.

See `DEPLOYMENT_FREE.md` in the parent project for deployment instructions.

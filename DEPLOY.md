# Deploy

## Render (free tier)

[Render](https://render.com) free web services sleep after 15 min of inactivity. Cold starts take ~5-10s.

### Setup

1. Push your repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**
3. Connect your GitHub repo
4. Fill in:

| Field | Value |
|-------|-------|
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free |

5. Add environment variables (copy from `.env.example`):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | your Neon PostgreSQL URL |
| `BETTER_AUTH_SECRET` | random 32+ char string |
| `BETTER_AUTH_URL` | `https://your-app.onrender.com` |
| `BETTER_AUTH_TRUSTED_ORIGINS` | `https://your-app.onrender.com` |
| `LOG_LEVEL` | `info` |

6. Click **Deploy Web Service**

### Auto-deploy

Render auto-deploys on every push to the default branch. Disable in Dashboard → Settings → Auto-Deploy.

### Health check

Render pings your app periodically. Make sure your app responds on the root path or configure a health check path in Dashboard → Settings.

### Database migrations

Run once after first deploy (or use release command if on paid plan):

```bash
# SSH into your Render shell (Pro plan only) or run locally:
DATABASE_URL="your-prod-url" bun run db:push
```

### Notes

- Free tier sleeps after 15 min of inactivity — first request after idle takes ~5-10s
- No custom domain on free tier (use `*.onrender.com`)
- Free tier includes 512 MB RAM, 1 CPU
- All sensitive env vars go through Render's **Environment Variables** section in the dashboard

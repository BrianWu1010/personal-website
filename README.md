# Personal Website

Developer portfolio for Boyuan (Brian) Wu, built with Next.js 16 and Tailwind CSS v4, hosted on Vercel (Hobby plan).

Live: https://brianwu-portfolio.vercel.app

```bash
npm install
npm run dev                # http://localhost:3000
npx vercel deploy --prod   # publish
```

## Editing content

| What | Where |
| --- | --- |
| Name, tagline, links, projects, experience | `src/data/resume.ts` |
| Resume PDF | `public/resume.pdf` (shown at `/resume`) |
| Portrait photo | `src/assets/portrait.jpg` |
| Theme colors | CSS variables at the top of `src/app/globals.css` |

Redeploy after any change.

## How it works

- **Phone vs laptop layouts:** `src/proxy.ts` checks the user agent and serves `src/app/m/page.tsx` to phones and `src/app/page.tsx` to everyone else. Visitors can switch with the footer link, which sets a `layout` cookie.
- **GitHub activity:** `src/lib/github.ts` fetches the contribution calendar and recent commits from the GitHub GraphQL API, cached for one hour. It needs a `GITHUB_TOKEN` environment variable on Vercel (fine-grained token, public repositories, no permissions). Without it, the activity section is hidden.
- **Analytics:** Vercel Web Analytics is enabled; visits to `/resume` show how often the resume is viewed.

## Maintenance

- Renew the GitHub token before it expires, then update `GITHUB_TOKEN` in the Vercel project settings and redeploy.
- Local dev with GitHub activity: `GITHUB_TOKEN=$(gh auth token) npm run dev`.

# Surya Portfolio

Single-page portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Edit content

All content lives in `src/data/`:

| File | Controls |
|---|---|
| `profile.ts` | Name, email, GitHub/LinkedIn/Medium URLs, resume path, site URL |
| `skills.ts` | Expertise cards, stats, process steps, exploring items, about facts |
| `projects.ts` | Projects, status badge, optional `github` link, diagram id |
| `faq.ts` | FAQ entries |

Medium articles sync automatically from the configured RSS feed when running the dev server or building,
and the GitHub Pages workflow refreshes the site every six hours. Only summaries and links are sent to
site visitors. Publish on Medium; no website code changes are needed to add a post. Medium may limit
the number of posts in its feed, and feed caching or GitHub Actions scheduling can delay updates.
If Medium is unavailable, the build uses `public/medium-feed.json` from the last successful sync and
logs a warning locally. CI fails instead of deploying an older cached feed, leaving the last successful
deployment online. Commit the JSON file so local builds have a fallback. Run `npm run sync:medium`
to refresh it.

The resume PDF is at `public/resume/surya-resume.pdf`; replace it when updating your resume.

## Deploy to GitHub Pages

1. Push this project to `https://github.com/ssurya101/myWebsite` with `main` as the default branch.
   Include `public/medium-feed.json` and `public/resume/surya-resume.pdf`.
2. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
3. Configure and verify `surya-sethuramasamy.com` in **Settings → Pages**, and configure DNS at your
   domain provider using [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
   Enable **Enforce HTTPS** when available. DNS and certificate provisioning may take time.
4. Every push to `main` and the scheduled workflow publishes `dist/`; check the **Actions** tab for status.
   Scheduled workflows run on the default branch and GitHub may delay or disable them in inactive repositories.

If this folder has not yet been pushed, create an empty repository on GitHub, then run:

```bash
git init -b main
git add .
git commit -m "Add portfolio website"
git remote add origin https://github.com/ssurya101/myWebsite.git
git push -u origin main
```

GitHub Pages availability depends on your repository visibility and GitHub plan.

### Custom domain

`public/CNAME`, the metadata, and `base: '/'` in `vite.config.ts` are set for
`surya-sethuramasamy.com`. If the domain changes, update `CNAME`, `siteUrl` in `profile.ts`, and
the URLs in `index.html`, `robots.txt` and `sitemap.xml`.

### Without a custom domain

For `https://<user>.github.io/<repo>/`, set `base: '/<repo>/'` in `vite.config.ts`, change the `href` of
the favicon in `index.html` to a relative path, and delete `public/CNAME`.

# Charan Tej P | Portfolio

A terminal-inspired, multi-page portfolio for Charan Tej P, an Artificial Intelligence & Data Science graduate based in Bengaluru, India. Built with React, Vite, React Router, Tailwind CSS, and Framer Motion.

## Features

- Independent routes for Home, About, Education, Skills, Projects, project details, Certifications, and Contact.
- Fixed, collapsible desktop sidebar with a mobile navigation drawer and active-route state.
- Scroll progress, page transitions, terminal reveal animations, and reduced-motion support.
- Home command prompt accepts commands such as `cd skills`, `cd projects`, and `cd..`; press Enter to navigate.
- Project repository links use the GitHub profile until a project-specific repository URL is added.
- Contact form validates input, opens a pre-filled draft through the device's default email app, and can copy the message to the clipboard.
- Responsive layout with self-hosted JetBrains Mono font.

## Routes

| Route | Content |
| --- | --- |
| `/` | Home |
| `/about` | About Me |
| `/education` | Education |
| `/skills` | Skills |
| `/projects` | Projects |
| `/projects/:id` | Project details |
| `/certifications` | Certifications |
| `/contact` | Get in touch |

## Run locally

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Verify and build

```sh
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Portfolio data

- `src/data/profile.js`: name, handle, role, location, contact details, social links, and resume path.
- `src/data/education.js`: university and junior-college entries.
- `src/data/skills.js`: skill groups and items.
- `src/data/projects.js`: project descriptions, technologies, highlights, and optional URLs.
- `src/data/certifications.js`: certification details and optional credential URLs.

Project and credential URLs that are not available are kept as `null`. When adding a project repository URL, set that project's `repoUrl` in `src/data/projects.js`.

## Resume

The Resume links use `public/assets/Charantej_Resume__.pdf`. Keep this filename or update `profile.resume` in `src/data/profile.js` if the file is renamed.

## Contact form behavior

This is a static frontend and does not send email in the background. After validation, the form creates a pre-filled `mailto:` link for the device's configured email app and provides a copy-message fallback. Automatic server-side delivery would require a backend and SMTP configuration; no third-party form/email service is used.

## Deploy

Deploy the repository root to Vercel or Netlify with:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` and `public/_redirects` provide SPA rewrites for direct route visits and refreshes. The Vite base is `/`; GitHub Pages requires a different base/router configuration.
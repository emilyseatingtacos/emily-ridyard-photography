# Project Hub Dashboard

A lightweight static dashboard for working on multiple projects at the same time. The hub is designed as a visual command center for AI-assisted content systems, project flips, 3D-print experiments, resale workflows, and the Emily Ridyard Photography portfolio.

## What the dashboard includes

- A high-level overview with project counts, high-priority work, average progress, and the current next-up project.
- A searchable and filterable project grid powered by `data/projects.json`.
- A focus board for selecting one project and seeing its next concrete action.
- A beginner-safe ship-loop checklist.
- A browser-saved scratchpad for quick notes and next Codex prompts.

## Project structure

```text
/
  index.html          # Dashboard page and accessible sections
  styles.css          # Visual system, responsive dashboard layout, and cards
  script.js           # Project loading, filtering, focus board, metrics, and notes
  /assets             # Placeholder folders for future visual assets
  /data
    projects.json     # Project metadata used by the dashboard
    gallery.json      # Previous photography gallery sample data retained for later reuse
```

## Local preview

Because project data is loaded from `data/projects.json`, preview the dashboard with a local web server instead of opening `index.html` directly:

```bash
python3 -m http.server 4173
```

Then visit <http://127.0.0.1:4173/>.

## Updating projects

1. Add or edit project entries in `data/projects.json`.
2. Keep each project focused on one clear `nextAction`.
3. Use `priority`, `status`, `progress`, and `tags` to make the dashboard easier to filter.

## Deployment

The project is static and can be deployed to Netlify by publishing the repository root.

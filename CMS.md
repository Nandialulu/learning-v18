# erxes CMS connection

CMS: https://erdenetsogtg.next.erxes.io/content/cms
Website: https://learning-v18-steel.vercel.app

The existing client portal app token selects this site's CMS pages and menus.
The integration reuses the project's Apollo client and CP_PAGES / CP_MENUS operations.

## Editing existing content

- Publish pages with slugs `home`, `services`, `portfolio`, and `contact`.
- `home` controls the introductory text beneath the hero headline. The marketing headline and action buttons remain in `messages/<locale>.json`.
- `services` controls the page title and feature descriptions.
- `portfolio` controls the title and introductory content. Subject cards, counts, flashcards and quizzes continue to use the existing local learning data.
- `contact` controls the title and introduction. This CMS integration does not submit contact form messages; the existing form still needs a separate backend integration.
- Edit root menu entries with kind `header` or `footer`. Labels, URLs, target and order are used by desktop and mobile navigation. Internal links retain the selected language and GitHub Pages base path.
- The tenant's existing non-Mongolian rich-text translations are stored in `description`. Those take precedence over `content`; otherwise content and a plain-text description are displayed. Edit each language in the CMS.

The site includes a build-time content snapshot, then fetches current CMS content when opened or refreshed. Existing page text and menu changes therefore do not require a deployment. On API failure, the snapshot or existing local copy remains usable. Draft pages are excluded. Rich text is sanitized before rendering.

## Static hosting limits

New page slugs require a rebuild/deployment to create their URLs. Page metadata and the initial HTML snapshot also update on deployment. A new slug must not collide with application routes such as `services`, `portfolio`, `contact`, `flashcards` or `quiz`.

The current CMS portfolio copy contains sample subjects that differ from the actual finance learning decks. Update that editorial content in the CMS as needed.

GitHub Pages rebuilds on pushes to `main`. The Vercel project currently requires `npx vercel deploy --prod --yes --scope erxes`; it is not connected to the GitHub repository.

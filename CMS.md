# erxes CMS connection

CMS: https://erdenetsogtg.next.erxes.io/content/cms
Website: https://learning-v18-steel.vercel.app

The existing client portal app token selects this site's CMS pages and menus.
The integration reuses the project's Apollo client and CP_PAGES / CP_MENUS operations.

## Editing existing content

- Publish pages with slugs `home`, `services`, `portfolio`, and `contact`.
- `home` controls the introductory text beneath the hero headline. The marketing headline and action buttons remain in `messages/<locale>.json`.
- `services` controls the page title and feature descriptions.
- `portfolio` controls the title and introductory content. Subject cards keep the existing layout; counts, flashcards and quizzes now read published CMS posts.
- `contact` controls the title and introduction. This CMS integration does not submit contact form messages; the existing form still needs a separate backend integration.
- Edit root menu entries with kind `header` or `footer`. Labels, URLs, target and order are used by desktop and mobile navigation. Internal links retain the selected language and GitHub Pages base path.
- The tenant's existing non-Mongolian rich-text translations are stored in `description`. Those take precedence over `content`; otherwise content and a plain-text description are displayed. Edit each language in the CMS.

The site includes a build-time content snapshot, then fetches current CMS content when opened or refreshed. Existing page text and menu changes therefore do not require a deployment. On API failure, the snapshot or existing local copy remains usable. Draft pages are excluded. Rich text is sanitized before rendering.

## Static hosting limits

New page slugs require a rebuild/deployment to create their URLs. Page metadata and the initial HTML snapshot also update on deployment. A new slug must not collide with application routes such as `services`, `portfolio`, `contact`, `flashcards` or `quiz`.

The current CMS portfolio copy contains sample subjects that differ from the actual finance learning decks. Update that editorial content in the CMS as needed.

GitHub Pages rebuilds on pushes to `main`. The Vercel project currently requires `npx vercel deploy --prod --yes --scope erxes`; it is not connected to the GitHub repository.

## Flashcards and quizzes

Open **learning > Manage > Posts** and select the Flashcard or Quiz custom type. Each question is a separate post. Use its subject/language category to narrow the list.

- **Title** is the question.
- **Content** is the flashcard answer or quiz explanation; ordinary rich text is converted to plain text while preserving paragraphs and line breaks.
- **Category** selects the subject and language. Use the category IDs in `src/data/learning-cms.json`; this is the authoritative website routing map.
- Learning custom fields expose subject, language, numeric question order, optional topic ID/title/order and section.
- Quiz custom fields expose question type, answer options A?H, and the correct option label (a, b, c...) or fill-in answer text. For true/false, enter both options and the matching correct label.
- Set **Published** to show a question. Draft/archived/deleted questions disappear after refresh. A successful empty CMS response shows an empty state instead of restoring deleted questions from backups.
- Questions are imported separately per language because the source decks differ (for example, Mongolian bank-management has 70 quiz questions while the other languages have 76). Edit the matching language-category post in the default CMS editing language, rather than creating an additional translation on a different post.
- Existing subject URLs load new questions and topics after refresh without deployment. A new subject URL requires adding its category mapping, subject label and static route, then deploying.

The build captures a CMS snapshot. The browser fetches every page of published questions before updating a deck; network/validation failures preserve the snapshot and offer Retry. Local JSON remains a build-time emergency backup. New content must have a nonempty question/answer, and quiz answer labels must match the available options.

### Migration and verification

`node scripts/migrate-learning-cms.cjs` imports source data using the existing app-token configuration; use only for initial migration/resuming that migration, before editorial changes to topic/order fields. It preserves the saved type/category IDs and skips posts with matching import coordinates. The CMS auto-generates slugs, so input slugs are not used for deduplication.

`node scripts/verify-learning-cms.cjs` reads all CMS pages and compares every question, answer, choice label/text, explanation, section and topic against the original files. It is an initial-migration check; intentional later CMS edits will differ from the backups.

`node --test scripts/test-learning.cjs` checks rich-text parsing, scoring data, topic ordering, publication filtering and pagination failure handling.

The CMS API accepts type **IDs** on post creation, but type **codes** in public post filters. Both are recorded in the manifest. Public pagination uses `endCursor` / `hasNextPage`.

Legacy note: 41 Mongolian finance-basics fill-in rows have an empty correct-answer field and one **marked answer** in the title. The reader uses that marked text as the answer and displays a blank. For new questions, enter the correct-answer field explicitly. Option display uses A?H order; labels and scoring remain unchanged.

# Community Develop Together

## Folder structure

community-develop-together/
├── index.html
├── about.html
├── connect.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── legal/
    ├── privacy.html
    └── terms.html

## How the files are linked

Root HTML pages use:
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>

Legal pages are one folder deeper, so they use:
<link rel="stylesheet" href="../css/style.css">
<script src="../js/script.js"></script>

## Run locally

Open `index.html` in a browser, or use VS Code + Live Server.

No backend is required for the current front-end demo. The registration and contact forms are validated and handled by JavaScript in the browser. To actually save users/messages, connect the forms to a backend/database later.

## Important fixes made

- Renamed `index(1).html` to `index.html`.
- Fixed the extra `>` in `about.html`.
- Fixed the invalid smooth-scroll CSS selector.
- Removed the external Google Fonts dependency so the project can run without an internet connection.
- Kept all CSS in `css/style.css`.
- Kept all JavaScript in `js/script.js`.
- Added working Privacy and Terms pages.
- Improved mobile navigation and responsive behavior.

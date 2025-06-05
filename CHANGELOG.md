# 📜 Changelog

_All noteworthy changes to CrossMedia Fan Hub are documented here. This changelog is for everyone—from casual users to our development team._

---

## 🔖 Version Index

| Version    | Date       | Highlights                                          |
|------------|------------|-----------------------------------------------------|
| Unreleased | –          | New features and fixes in the works.                |
| 1.0.2      | 2025-06-10 | • 🧹 Project Cleanup<br/>• 🛠️ Faster Development Setup |
| 1.0.1      | 2025-06-07 | • ⚙️ Code Organization<br/>• 📄 Improved Documentation |
| 1.0.0      | 2025-06-01 | • ✨ Major Project Restructure<br/>• 💻 Simplified Local Dev |

---

## 🚧 What's Next (Unreleased)

_Here's a sneak peek at what we're currently working on. These changes aren't live yet._

| Type of Change  | What We're Building & Why It Matters                                      | For Developers          |
|-----------------|---------------------------------------------------------------------------|-------------------------|
| ✨ New Feature  | Adding "Topic Tags" to the **Explore** page, so you can filter content by themes like "Sci-Fi" or "Fantasy." | PR #146                 |
| 🛠️ Improvement | Our automated scripts will now create better logs, helping us track data processing more accurately. | `session_worker.py` logs |
| 🐞 Bug Squashing | Fixing a configuration typo that could affect how new media is added to the site. | `SUPABASE_URL` typo fix |

---

## ✅ Version 1.0.2 – June 10, 2025

_This update focused on internal project organization. We cleaned up the codebase to make it easier for our team to work on the website. This was a technical tune-up with no direct changes to what users see on the site, but it sets us up for faster development ahead._

| Type of Change  | What We Did & Why It Matters                                                                                           | For Developers (Context/Link)                     |
|-----------------|------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 🧹 Housekeeping | We continued reorganizing our internal code, moving another piece of our database tooling into the main `frontend/` folder. This keeps related code together. | Moved `prisma/` → `frontend/prisma/`. [#145](https://github.com/akiyaani2/crossmedia-fan-hub/pull/145) |
| 🛠️ Improvement | As part of the cleanup, we updated our project's "address book" to ensure all parts of the code could find each other after the move. | Updated `tsconfig.json` & `import` statements. |
| 🐞 Bug Squashing | We fixed an issue where some code was still looking for files in their old location, which could have caused pages to break. | Resolved broken path aliases in `frontend/`.      |
| 🧹 Housekeeping | We deleted old, empty folders that were no longer needed after the reorganization, keeping our project neat and tidy.     | Removed legacy root folders (`app/`, etc.).     |

---

## ✅ Version 1.0.1 – June 07, 2025

_Another round of housekeeping! We continued to streamline the project's structure, making our codebase more logical and easier to manage._

| Type of Change  | What We Did & Why It Matters                                                                                           | For Developers (Context/Link)                     |
|-----------------|------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 🧹 Housekeeping | We moved our database management folder to live with the rest of the website code, which is a more standard and organized approach. | Moved `prisma/` folder into `frontend/prisma/`. [#123](https://github.com/akiyaani2/crossmedia-fan-hub/pull/123) |
| 📄 Documentation | We updated our developer notes to make it clear where our automated scripts are located. This helps new developers get up to speed faster. | Clarified `scripts/README.md`. |
| 🐞 Bug Squashing | We fixed a few broken "shortcuts" in the code that appeared after we moved files around. | Corrected TS path aliases in `frontend/`. |
| 🧹 Housekeeping | We finished the cleanup by removing more empty folders that were left behind after the reorganization. | Deleted empty legacy folders at repo root. |

---

## ✅ Version 1.0.0 – June 01, 2025

_This was a foundational update where we completely restructured the project behind the scenes. We organized the codebase into a "monorepo" — a single, well-organized repository containing separate sections for the website, our data services, and other tools. This makes the entire project more professional, scalable, and easier to maintain._

| Type of Change  | What We Did & Why It Matters                                                                                           |
|-----------------|------------------------------------------------------------------------------------------------------------------------|
| ✨ Major Update | We created a new, clean folder structure to separate the different parts of our application:<br/>• **`frontend/`**: The main website you see and interact with.<br/>• **`services/`**: A background service that understands content (like movie synopses).<br/>• **`scripts/`**: Tools for importing new data.<br/>• **`infra/`**: Our database setup and configuration. |
| 💻 Dev Experience | We removed a complex tool called Docker from the local development process. Now, developers can get the project running on their computers with simpler commands, making it faster to start building new features. |
| 🐞 Bug Squashing | After moving so many files, some internal "wiring" was broken. We reconnected everything so all parts of the app can communicate correctly. |
| 🧹 Housekeeping | We deleted all the old, scattered folders from the main project directory, since everything now has a new home inside the `frontend/` folder. |

---

## ⭐ How To Use This Changelog

1.  **Check "What's Next"** for a preview of features currently in development.
2.  **Read the summary** under each version for a simple explanation of the changes.
3.  **Look at the tables** for more detail. The "What We Did" column explains the change in plain language, while the "For Developers" column provides technical context and links. 
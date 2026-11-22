# Mejba Ad Blocker

Free, open-source ad blocker for **browsers (Chrome, Edge, Brave)** and **Android**. Made by SMT Company.

No account, no tracking, no data collection.

## 1. Browser extension (Chrome, Edge, Brave)

**Features**
- Blocks ads from 44,000+ ad-server domains (EasyList based)
- Hides cookie pop-ups, newsletter/sign-up overlays and floating videos
- Skips YouTube ads (best effort, YouTube changes often)
- Turn blocking on or off for all sites, or for one site only
- Add your own domains to block

**Install**
1. Download `mejba-ad-blocker.zip` from the **Releases** page (tag `v1.1.0`) and unzip it.
2. Open `chrome://extensions` (Edge: `edge://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the unzipped `mejba-ad-blocker` folder.

Do not drag and drop the zip into Chrome. Use **Load unpacked** with the folder.

## 2. Android app (Mejba Browser)

A small Android browser with a built-in ad blocker. The ad matching is done by a Rust core
(Brave's `adblock` engine), and the screen is a small Kotlin app.

**Install**
1. Download `mejba-browser.apk` from the **Releases** page (tag starting with `android-`).
2. Open it on your phone and allow installs from this source when Android asks.

**Build it yourself:** go to **Actions > Build APK > Run workflow**, then download the
`mejba-browser-apk` artifact.

**Early version limits:** empty ad boxes are not hidden yet, and YouTube in-page ads are not handled.

## Folders
| Folder | What it is |
|---|---|
| `manifest.json`, `background.js`, `content.js`, `youtube.js`, `popup/`, `icons/`, `rules/` | Browser extension |
| `rust/` | Rust ad-matching core for Android (with tests) |
| `android/` | Kotlin Android app |
| `.github/workflows/` | Builds the Android APK |

## Report a problem
Open an Issue. Please include the website link and what ad you still see.

## License
MIT for this project's code (see `LICENSE`). Filter lists and dependencies: see `NOTICE.md`.

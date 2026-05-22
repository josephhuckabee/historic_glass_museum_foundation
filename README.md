# Historical Glass Museum Website

This is a simple static website. There is no build step.

## Files

- `docs/index.html` - home page
- `docs/about-us.html` - about page
- `docs/support-us.html` - support and membership page
- `docs/newsletter.html` - newsletter page
- `docs/gift-shop.html` - gift shop page
- `docs/contact-us.html` - contact page
- `docs/privacy.html` - privacy, accessibility, donation, and nonprofit notes
- `docs/404.html` - fallback page for broken links
- `docs/styles.css` - all site styles
- `docs/script.js` - mobile menu, newsletter tabs, and membership modal
- `docs/images/` - site images

## Before Publishing

- Have the Foundation review `docs/privacy.html` before launch.
- Replace or add photos only in `docs/images/`, then update the matching image paths in the HTML.
- Keep the site static unless the Foundation is ready to maintain forms, donations, analytics, or newsletter tools.

## Preview

Run:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8091/
```

If VS Code Live Preview opens the workspace root, use `docs/index.html` or the root `index.html` redirect.

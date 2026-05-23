# Historical Glass Museum Website

This is a simple static website. There is no build step.

## Files

- `index.html` - home page
- `about-us.html` - about page
- `support-us.html` - support and membership page
- `newsletter.html` - newsletter page
- `gift-shop.html` - gift shop page
- `contact-us.html` - contact page
- `privacy.html` - privacy, accessibility, donation, and nonprofit notes
- `404.html` - fallback page for broken links
- `robots.txt` - crawler instructions and sitemap location
- `sitemap.xml` - search engine sitemap
- `llms.txt` - plain-text site summary for AI tools and maintainers
- `styles.css` - all site styles
- `script.js` - mobile menu, newsletter tabs, and membership modal
- `images/` - site images

## Before Publishing

- If the site uses a custom domain, update the canonical URLs, `sitemap.xml`, `robots.txt`, and `llms.txt`.
- Have the Foundation review `privacy.html` before launch.
- Replace or add photos only in `images/`, then update the matching image paths in the HTML.
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

If VS Code Live Preview opens the workspace root, use the root `index.html` entry point.

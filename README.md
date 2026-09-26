# Historical Glass Museum Website

This is a simple static website. There is no build step.

## Files

- `index.html` - home page
- `about-us.html` - about page
- `support-us.html` - support and membership page
- `donations.html` - financial, glass, and volunteer donation information
- `newsletter.html` - newsletter page
- `gift-shop.html` - gift shop page
- `contact-us.html` - contact page
- `unsubscribe.html` - email opt-out instructions
- `privacy.html` - privacy, accessibility, donation, and nonprofit notes
- `404.html` - fallback page for broken links
- `robots.txt` - crawler instructions and sitemap location
- `sitemap.xml` - search engine sitemap
- `styles.css` - all site styles
- `script.js` - mobile menu, newsletter viewer, forms, gallery lightbox, and membership calculations
- `Images/` - museum photos grouped by building, collection gallery, people, Gift Shop, and icons
- `fonts/` - locally hosted website font

## Before Publishing

- GitHub Pages is configured to publish the repository root. Keep the website files in the root directory.
- If the site moves to a custom domain, update the canonical URLs, Open Graph URLs, structured data, `sitemap.xml`, and `robots.txt`.
- Have an authorized Foundation representative review `privacy.html` and the email practices before launch.
- Replace or add photos only in the matching `Images/` category folder, then update the corresponding image paths in the HTML.
- Keep the site static unless the Foundation is ready to maintain forms, donations, analytics, or newsletter tools.

## Contact Form Setup

The form is intentionally disabled until its external services are configured:

1. Create a Formspree form and verify `HistoricalGlassMuseum4@gmail.com` as its target email.
2. Restrict the Formspree project to the production website domain.
3. Create a Cloudflare Turnstile widget for the production domain in Managed mode.
4. Store the Turnstile secret key only in Formspree's CAPTCHA settings.
5. Add the public Turnstile site key to `data-turnstile-sitekey` and the Formspree endpoint to the form's `action` in `contact-us.html`.
6. Change `data-form-configured` to `true`, then test successful, invalid, spam, and error submissions.

Never put the Turnstile secret key or email credentials in this repository.

## Membership Form Setup

The membership application calculates the check amount but does not collect payment. It is intentionally disabled until secure submission is configured:

1. Create a separate Formspree form and verify `HistoricalGlassMuseum4@gmail.com` as its target email.
2. Restrict that Formspree project to the production website domain.
3. Create or reuse a Cloudflare Turnstile widget for the production domain in Managed mode.
4. Store the Turnstile secret key only in Formspree's CAPTCHA settings.
5. In `support-us.html`, add the public Turnstile site key to `data-turnstile-sitekey`, add the Formspree endpoint to the form's `action`, and change `data-membership-configured` to `true`.
6. Test accepted, invalid, spam, duplicate, and provider-error submissions. Confirm that the mailing instructions appear only after Formspree accepts the application.

No membership payment service needs to be configured. Applicants submit online and then mail a check. The printable PDF remains available as a secondary option, and the separate Museum donation Donorbox link is unchanged.

## Email Operations

Before sending marketing or newsletter email, the Foundation should configure its email provider to:

- use accurate sender details and non-deceptive subject lines;
- include the Foundation's valid postal address and a clear unsubscribe method;
- keep each opt-out method working for at least 30 days after a message is sent;
- honor opt-out requests within 10 business days, without a fee, login, or information beyond the email address;
- place opted-out addresses on a durable suppression list and prevent accidental re-import or resubscription; and
- use the provider's one-step unsubscribe link in each applicable email instead of relying only on the website's temporary manual email process.

The Foundation remains responsible for these practices when an outside email provider sends messages on its behalf.

## Preview

The site automatically follows the visitor's light or dark system appearance through `prefers-color-scheme`. Theme colors are maintained as custom properties near the top of `styles.css`; no theme JavaScript or manual toggle is required.

Run:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8091/
```

If VS Code Live Preview opens the workspace root, use the root `index.html` entry point.

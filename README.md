# CHIMA Website – Chipukizi wa Mazingira

A React-only (Vite + React Router + Lucide icons) website for **Chipukizi wa Mazingira (CHIMA)**.
No database or CMS: all content is edited in `src/data/`. A tiny Node mail server forwards form submissions to info@chima.org.

## 1. Install and run

Requires Node.js 18+.

```bash
npm install
cp .env.example .env     # then fill in the SMTP details (see "Email" below)
npm run dev:all          # website (http://localhost:5173) + mail server (port 3001)
```

Other commands: `npm run dev` (website only), `npm run dev:server` (mail server only),
`npm run build` (production build into `dist/`), `npm start` (production: serves `dist/` **and** the mail API on one port).

## Email – forms reach info@chima.org
A small Express server (`server/index.js`) receives three forms and emails them to `MAIL_TO` (`info@chima.org`):
Contact (`/api/contact`), Membership/Partner registration (`/api/register`) and Donation pledge (`/api/donate`).
Each sender also gets a short acknowledgement email. Spam is limited by a hidden honeypot field and rate limiting.

To make real emails go out you must give the server the login of a mailbox (usually info@chima.org itself) in `.env`:
`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`. Get them from your email/hosting provider
(Google Workspace needs an "App password"). Until SMTP is set, in development the server just prints the email to the
terminal; in production it returns an error to the visitor. Check status at `/api/health`.
**Never commit `.env`.** Because there is now a server, host on a Node host (Render, Railway, a VPS, cPanel Node app);
a static-only host (e.g. plain Netlify without functions) will not run the forms.

## Donations and registration
- **Donate page (`/donate`)** – M-Pesa Paybill, Till, bank transfer, card/PayPal and in-person options with copy buttons and a
  pledge form. **All numbers in `src/data/donate.js` are MOCK values** (Paybill 123456, account CHIMA, Till 654321, bank 0000000000).
  Replace them with real details and set `mock: false` to remove the warning banner. The site does not process payments.
- **Register page (`/register`)** – membership/partner application form built from the constitution's categories and fees (Art. VII).
- **Social links** in `src/data/site.js` are mock URLs – replace with the real pages.

## 2. What to edit

| To change…                                  | Edit                         |
|---------------------------------------------|------------------------------|
| Mission, vision, values, objectives, membership, contact details, social links, gallery | `src/data/site.js` |
| Leadership / organogram                     | `src/data/leadership.js`     |
| Programmes / areas of intervention          | `src/data/programmes.js`     |
| Articles                                    | `src/data/articles.js`       |
| Colours, fonts                              | `:root` variables at the top of `src/styles/global.css` |

### Leadership / organogram
The organogram is generated from the list in `leadership.js` using each item's `parentId`.
- **Update a person:** replace `name`, `biography`, `image`, and optionally add `email`, `phone`, `linkedin`; set `placeholder` to `false` (or delete it).
- **Add a person:** copy a `'member'` block, give it a new unique `id`, set `parentId` to the id of the box it sits under.
- **Add another Trustee:** copy a Trustee block with `parentId: 20`.
- Photos: save to `public/images/leadership/` (square, ~400×400 px) and use `"/images/leadership/name.jpg"`.

The structure follows the Constitution: General Assembly (supreme organ, Art. XI) → Executive Committee
(Chairperson, Vice Chairperson, Secretary, Treasurer, Member at Large) and, separately, a Board of Trustees
of at least three (Art. XVII). The Constitution does not set reporting lines *between* the five office bearers,
so they are shown side by side.

### Articles
Add an object to the `articles` array in `src/data/articles.js` (fields are documented at the top of the file).
It appears automatically on the Articles page, the Home page (3 most recent) and at `/articles/<slug>`.
Put images in `public/images/articles/`. In `content`, leave a blank line between paragraphs, use `## Heading`
for headings and `- item` for bullets. The three existing articles are **samples** – replace or delete them.

### Images (real photos)
Folders: `public/images/{backgrounds,leadership,programmes,articles,gallery}`.
The site picks images automatically by file name: for every spot it looks for `name.jpg`, then `name.webp`, then
falls back to a built-in placeholder illustration (`name.svg`). **So to use a real photo just save it with the right name** –
no code changes. Examples: `backgrounds/hero.jpg` (home hero), `backgrounds/cta.jpg`, `backgrounds/about.jpg`,
`backgrounds/page-header.jpg` (all inner-page banners), `programmes/programme-1.jpg` … `programme-9.jpg`,
`articles/article-1.jpg`, `gallery/gallery-1.jpg` … `gallery-8.jpg`.

Or paste direct image links into `scripts/download-images.mjs` and run `npm run images`.
Suggested searches on Unsplash / Pexels / Pixabay: "Kenya arid landscape", "pastoralist Africa", "cracked dry earth",
"tree planting Africa", "water borehole drylands", "African youth environmental training", "green savanna restoration".
Resize to ~1600 px wide (hero/backgrounds) and keep files under ~400 KB. Credit photographers where the licence asks for it.
The current placeholder illustrations were generated by `scripts/gen_placeholder_images.py`.

The logo is `public/logo.jpeg` (also the favicon); replace with a transparent PNG if you have one.

## 3. Content sources and placeholders
All organisational text comes from the CHIMA Constitution (2026): preamble, vision, mission, core values,
objectives (Art. VI), membership and fees (Art. VII), governance (Art. XI–XIII, XVII), registered office (Isiolo County).

Placeholders (replace when available): leader names/photos/biographies, social links (mock), payment details (mock), photographs, sample articles.
Contact details (address, P.O. Box, hours, info@chima.org, 0789 988 989) were supplied by CHIMA.

Items marked **Proposed** (the "Climate-Related Conflict Reduction" programme and the two extra objectives on the About page)
come from margin notes in the draft constitution and are not yet adopted objectives. Remove them when confirmed or rejected.

### Points in the draft constitution to resolve
- Objective numbering skips 6.4; article numbering of duties (14.x) and meetings (XIV) repeats.
- Draft notes on institutional-member voting power, quorum, a third bank signatory and escalating disputes to the SDO are unresolved.
- The AGM date and the adoption date are blank.

## 4. Project structure
```
public/            logo + images
scripts/           placeholder image generator
server/            mail API (Express + Nodemailer)
src/
  components/      Navbar, Footer, Hero, Organogram, MemberCard, MemberModal, ArticleCard, ProgrammeCard, ...
  pages/           Home, About, Programmes, Leadership, Articles, ArticleDetails, Gallery, Contact, Register, Donate
  data/            site.js, leadership.js, programmes.js, articles.js, donate.js
  styles/          global.css, components.css, responsive.css
  utils/           icons.js, format.js
```

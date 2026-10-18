# CFS page metadata

This site remains static. GitHub Actions runs `node scripts/generate-headmeta.mjs`, validates the output, then generates the sitemap before publishing. The generated metadata is already in the HTML; visitors and crawlers do not need JavaScript or PHP.

Edit `seo/pages.json` for titles, descriptions, page names and types. Run the generator locally after editing. Do not edit the generated SEO blocks directly. Existing styles and application-independent head content are preserved.

When adding a page, add its repository-relative HTML path to the configuration. A missing entry fails deployment so a page cannot silently ship without SEO metadata. Each page needs `title`, `description` and `name`; `type` defaults to `WebPage`. URLs follow the actual static path (`index.html` becomes its directory URL). Supported overrides include `canonical`, `robots`, `image`, `imageAlt`, `ogType`, and additional schema objects in `schema`. Use an absolute CFS canonical URL, without query strings or fragments. The default raster logo uses a summary social card rather than promising a large editorial image.

Use `service` for a service page, `blog: true` for the blog index, or `article` for an actual published article. An article requires a page-specific `image` plus `headline`, `datePublished` and an `author` object with a schema type and name. Optional `dateModified` must reflect a real editorial change, not a daily workflow run. Dates accept YYYY-MM-DD or ISO timestamps with a timezone. Match these details in the visible article. The article author and dates are not invented by the generator.

The current blog is a collection with a Blog entity, not a published article. SearchAction, ratings, FAQ, offers, geographic coverage and prices are not emitted without corresponding content or functionality. Add only schema that accurately describes the visible page. The generator supports additional page-specific schema objects rather than guessing business facts.

Checks:

    node scripts/generate-headmeta.mjs
    node --test scripts/headmeta.test.mjs
    node scripts/generate-sitemap.mjs

Google's Rich Results Test can check supported search features after publication; JSON syntax validation alone does not guarantee rich results.

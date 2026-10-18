// GitHub Pages has no application server: generate this file before deployment.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://cyberfreaksoftware.co.uk';
const excluded = new Set(['node_modules', 'views', 'scripts', '_site', 'coverage']);
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

async function discover(directory = root) {
  const urls = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || excluded.has(entry.name)) continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      urls.push(...await discover(filename));
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== '404.html') {
      const html = await readFile(filename, 'utf8');
      const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
      const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
      if (metaTags.some(tag => /^(robots|googlebot)$/i.test(attribute(tag, 'name') || '') && /\b(noindex|none)\b/i.test(attribute(tag, 'content') || ''))) continue;
      if (metaTags.some(tag => /^refresh$/i.test(attribute(tag, 'http-equiv') || ''))) continue;
      const relative = path.relative(root, filename).split(path.sep).map(encodeURIComponent).join('/');
      const url = new URL(relative.replace(/(^|\/)index\.html$/, '$1'), origin + '/').href;
      const canonicalTag = (html.match(/<link\b[^>]*>/gi) || []).find(tag => /\bcanonical\b/i.test(attribute(tag, 'rel') || ''));
      // Only list the page at its canonical location; never add another host.
      if (canonicalTag) {
        const canonical = new URL(attribute(canonicalTag, 'href'), url);
        if (canonical.href !== url) continue;
      }
      urls.push(url);
    }
  }
  return urls;
}

const urls = [...new Set(await discover())].sort();
if (!urls.includes(origin + '/')) throw new Error('Homepage missing from sitemap');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(root, 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${urls.length} pages.`);

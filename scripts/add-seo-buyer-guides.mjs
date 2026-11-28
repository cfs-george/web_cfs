import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://cyberfreaksoftware.co.uk';
const service = '/seo-management/';
const pricing = '/seo-management/#pricing';
const enquiry = '/seo-management/?contact=seo-management';
const image = '/images/blog-seo-management.png';
const today = '2026-11-28';

const posts = [
  {
    slug:'seo-cost-per-month-uk', kicker:'SEO SERVICES PRICING', title:'How Much Does SEO Cost Per Month in the UK?',
    summary:'Compare common monthly SEO pricing models in the UK and learn what to check before choosing a provider.',
    keyword:'SEO cost per month UK', card:'A practical guide to monthly SEO costs, service scope and the questions to ask before committing.',
    sections:[
      ['Why monthly SEO prices vary',`A monthly quote is only useful when you know what work it buys. One provider may charge for technical audits and implementation; another may focus on content, digital PR or local search. These are different services, so comparing the headline fee alone can lead to the wrong conclusion. Ask for the activities, frequency and responsibilities behind the number.`],
      ['What affects the fee?',`The size and condition of a website, the number of locations or services, the competitiveness of its market and the amount of implementation required can all affect the work involved. A small brochure site with a stable structure does not need the same programme as a large online shop. A provider should explain which factors apply to your situation rather than selling a package that assumes every business has identical needs.`],
      ['What does £125 a month cover?',`Cyberfreak Software offers a defined SEO Management service for £125 per month. It includes Google Search Console setup and verification, XML sitemap submission and maintenance, monitoring of clicks, impressions and indexed pages, query and keyword opportunity analysis, practical content recommendations and a monthly performance report. Subscriptions have no minimum term and can be cancelled at any time. Content writing, major technical changes and bespoke development are not included in that fee; they can be discussed separately.`],
      ['Compare scope, not promises',`Ask whether the quote includes implementation or recommendations only, who makes website changes, how progress is measured, what happens when an issue is found and whether the contract renews automatically. Be cautious of guarantees about rankings or a specific amount of traffic. Search performance depends on many factors and no responsible provider can promise a precise result for every site.`],
      ['Choose a useful starting point',`If you need a clearly scoped, lower-commitment way to keep an eye on your search foundations, review our <a href="${pricing}">SEO Management pricing and deliverables</a>. If your needs extend to content production or development, ask for those items to be priced separately so the boundaries stay clear.`]
    ], related:['seo-agency-pricing-uk','monthly-seo-services-inclusions']
  },
  {
    slug:'outsourcing-seo-uk-businesses', kicker:'OUTSOURCING SEO', title:'Outsourcing SEO: A Guide for UK Businesses',
    summary:'A buyer-focused guide to outsourcing SEO, defining responsibilities and choosing the right level of support.',
    keyword:'Outsource SEO', card:'What outsourcing SEO can cover, how responsibilities work and how to assess a provider.',
    sections:[
      ['Start with the work you need help with',`“SEO” can mean technical diagnosis, content planning, local optimisation, link acquisition, implementation or measurement. Before you outsource SEO, identify the task that is currently going undone. A focused brief helps you find a suitable specialist and stops a small monitoring need from turning into an oversized retainer.`],
      ['Decide who owns implementation',`Some businesses want an agency to make changes directly. Others have a developer or marketing colleague who can act on recommendations. Agree who has access to the website, who approves changes and how urgent issues are handled. If the provider is advisory, recommendations should be specific enough for the person implementing them to understand.`],
      ['Set a sensible reporting rhythm',`A useful update connects completed work with observable evidence: Search Console clicks, impressions, queries and indexing where relevant. It should explain what changed, what needs attention and what the next action is. Avoid reports that present a dashboard without interpretation or treat rankings as the only measure of success.`],
      ['Check fit before signing',`Ask for a written scope, named deliverables, access requirements, communication expectations, pricing and cancellation terms. Ask what is excluded as well as what is included. You should retain ownership of your domain, website, analytics and Search Console accounts.`],
      ['A defined outsourced option',`Our <a href="${service}">SEO Management service for UK businesses</a> covers Search Console and sitemap oversight, monthly reporting and keyword/content recommendations for £125 per month. It suits businesses that want a regular evidence-led review; substantial technical work and content production are separately agreed. You can <a href="${enquiry}">ask whether that scope fits your website</a>.`]
    ], related:['in-house-vs-outsourced-seo','choosing-small-business-seo-provider']
  },
  {
    slug:'affordable-seo-services-expectations', kicker:'AFFORDABLE SEO SERVICES', title:'Affordable SEO Services: What Should Your Business Expect?',
    summary:'Understand what affordable SEO can reasonably include, where scope limits matter and how to compare providers.',
    keyword:'Affordable SEO services', card:'How to assess a lower-cost SEO service by its scope, reporting and realistic boundaries.',
    sections:[
      ['Affordable should mean focused',`A lower monthly fee can make sense when the service is deliberately narrow, repeatable and transparent. It cannot reasonably include unlimited content production, development, digital PR and hands-on optimisation at the same time. The important question is whether the defined work addresses a real need for your business.`],
      ['Look for concrete deliverables',`A credible proposal names the data sources and tasks involved. For example: Search Console verification, sitemap submission, monitoring, analysis of query opportunities, a monthly report and recommendations. “We will grow your rankings” is not a deliverable. Ask what you will actually receive and when.`],
      ['Understand what remains with you',`At an affordable price point, the business may need to publish recommended content or implement technical fixes itself. Clarify whether the provider will make changes, advise your developer or simply identify opportunities. A clear division of work prevents disappointment later.`],
      ['Avoid false economies and inflated claims',`Do not choose solely by price if a provider cannot explain its approach, access requirements or reporting. Equally, a large retainer is not automatically a better fit. Be wary of guaranteed positions, secret methods, large link quantities or pressure to sign a long contract before the scope is clear.`],
      ['A transparent example',`Cyberfreak Software provides a defined package at £125 per month, with no minimum term and cancellation at any time. See the <a href="${pricing}">full list of included SEO services</a>. It is monitoring, reporting and recommendations; writing content and carrying out significant website changes are separate pieces of work.`]
    ], related:['seo-cost-per-month-uk','what-125-pounds-seo-includes']
  },
  {
    slug:'choosing-small-business-seo-provider', kicker:'SMALL BUSINESS SEO', title:'Choosing an SEO Management Company for Your Small Business',
    summary:'Questions small business owners can use to assess an SEO management company, its scope and its reporting.',
    keyword:'Small business SEO agency', card:'A practical shortlist for evaluating SEO companies when you need clear scope and accountable reporting.',
    sections:[
      ['Match the provider to the problem',`A small business may need help interpreting search data, improving local service pages, fixing technical issues or producing content. These needs call for different capabilities. Describe the business goal and ask the provider to explain which part of its service addresses it.`],
      ['Ask for a plain-English scope',`A proposal should say what happens each month, what access is needed, what the business must do and what is outside the fee. Ask how website changes are handled and whether content is written by the provider. If the answer is broad or difficult to understand, request an example of a typical monthly output.`],
      ['Check how performance is reviewed',`Google Search Console can show how pages appear in Google Search, including impressions, clicks and queries. It is useful evidence, but not a complete measure of leads or revenue. A thoughtful provider explains what the data can and cannot show, then relates it to your commercial goals.`],
      ['Protect your independence',`Keep your domain, website, Search Console and analytics accounts under your business control. Agree how access is granted and removed. Check contract length, notice, renewal and ownership of any work created for you.`],
      ['Choose a service that fits the business',`A small business SEO agency is not automatically the right choice; a focused consultant or management service may suit your requirements better. Review our <a href="${service}">SEO service for small businesses</a> if regular monitoring and practical recommendations are the support you need. The £125 monthly fee and scope are set out on the <a href="${pricing}">pricing section</a>.`]
    ], related:['outsourcing-seo-uk-businesses','monthly-seo-services-inclusions']
  },
  {
    slug:'monthly-seo-services-inclusions', kicker:'MONTHLY SEO SERVICES', title:'Monthly SEO Packages: What Should Be Included?',
    summary:'A checklist for comparing monthly SEO packages by deliverables, responsibilities and useful reporting.',
    keyword:'Monthly SEO services', card:'Compare monthly SEO packages by what is delivered, who acts on recommendations and how progress is reviewed.',
    sections:[
      ['There is no universal monthly package',`Monthly SEO services vary widely. One package might include content briefs and implementation; another might cover technical maintenance, local listings or digital PR. The label “monthly SEO” does not tell you enough. Compare the actual tasks and the time or output committed to each.`],
      ['A useful package makes its routine clear',`Look for an agreed reporting period, a review of search performance, a way to surface issues, a prioritised list of next steps and a named contact. If the package includes changes, ask how many, how they are approved and whether development time is capped.`],
      ['Separate advice from production',`Recommendations and implementation are different activities. A provider may identify content gaps without writing articles, or flag technical issues without changing code. Both models can work, but the package should say which one you are buying. Content volume should not be implied if it is not included.`],
      ['Read the terms as well as the task list',`Check minimum term, cancellation, renewal, onboarding, access and any extra charges. If your website needs substantial repair, ask whether a separate project is needed before monthly monitoring will be useful.`],
      ['An example with a defined scope',`Cyberfreak Software’s £125 per month service includes Search Console setup, sitemap submission and maintenance, performance monitoring, query and keyword opportunity analysis, practical content recommendations and a monthly report. It has no minimum term and can be cancelled at any time. <a href="${pricing}">Review the full monthly SEO service details</a>.`]
    ], related:['seo-cost-per-month-uk','monthly-seo-reporting-metrics']
  },
  {
    slug:'pay-as-you-go-seo-vs-contracts', kicker:'SEO CONTRACTS', title:'Pay-As-You-Go SEO vs Long-Term SEO Contracts',
    summary:'Compare flexible monthly SEO with longer contracts and assess which commitment matches your needs.',
    keyword:'Pay-as-you-go SEO', card:'Understand the trade-offs between flexible monthly SEO and longer agreements before you commit.',
    sections:[
      ['What flexibility changes',`Pay-as-you-go SEO usually means a rolling monthly arrangement or a one-off task. It can suit a business testing a service, needing a defined piece of work or wanting a lower commitment. A long-term contract can give both sides time to plan a broader programme, but it should come with a clear scope and review points.`],
      ['SEO work takes time, but terms still matter',`Search performance does not respond to a fixed timetable. A contract cannot make rankings appear by a promised date. Longer commitments may be reasonable where the provider is investing in a sustained programme, but ask what work is planned, how progress is reviewed and what happens if priorities change.`],
      ['Compare total cost and included work',`A low monthly fee with a lengthy minimum term may cost more overall than a flexible service. Conversely, a rolling arrangement may not include the strategic or production capacity needed for a major site. Compare total commitment, not only the monthly figure, and check whether setup fees or additional work apply.`],
      ['Keep control of accounts and assets',`Whatever the contract, your business should retain ownership of its domain, website and measurement accounts. Make sure access, data and any content or technical work remain usable if you change provider.`],
      ['A flexible monthly option',`Cyberfreak Software’s SEO Management service costs £125 per month and has no minimum term; it can be cancelled at any time. It provides monitoring and recommendations, while content creation and substantial implementation are agreed separately. See <a href="${pricing}">the pricing and terms</a> or <a href="${enquiry}">ask us about a monthly arrangement</a>.`]
    ], related:['seo-cost-per-month-uk','monthly-seo-services-inclusions']
  },
  {
    slug:'in-house-vs-outsourced-seo', kicker:'SEO RESOURCING', title:'In-House SEO vs Outsourced SEO Management',
    summary:'Decide whether to manage SEO in-house, outsource it or combine external analysis with internal implementation.',
    keyword:'Managed SEO services', card:'Choose an SEO operating model based on skills, time, website access and implementation capacity.',
    sections:[
      ['The right model depends on where work gets stuck',`In-house SEO gives a business direct context and control, but requires time, skills and access to useful data. Outsourcing can add specialist capacity, although an external provider still needs input from people who understand the business. Neither model removes the need to make decisions and act on findings.`],
      ['When in-house ownership works well',`An internal marketer or developer may be well placed to make changes quickly, maintain service information and coordinate content. They may still benefit from external review when search data is difficult to interpret or there is no established process for prioritising improvements.`],
      ['When outsourcing can help',`A managed SEO service may be useful when nobody has time to monitor Search Console, maintain the sitemap or turn performance data into a practical task list. Before outsourcing, clarify how recommendations reach the person who can implement them, and how work is approved.`],
      ['Consider a blended approach',`A common arrangement is external monitoring and analysis paired with internal implementation. This keeps business knowledge close to the website while giving the team a regular evidence-based review. It works best when responsibilities and reporting dates are agreed.`],
      ['A focused external option',`Our <a href="${service}">managed SEO service</a> is designed around Search Console oversight, sitemap maintenance, monthly reporting and keyword/content recommendations. At £125 per month, it does not include content production or substantial development. Those boundaries can make it easier to decide whether your team can take action on the recommendations.`]
    ], related:['outsourcing-seo-uk-businesses','choosing-small-business-seo-provider']
  },
  {
    slug:'seo-agency-pricing-uk', kicker:'SEO AGENCY PRICING', title:'Understanding SEO Agency Pricing in the UK',
    summary:'Learn how UK SEO agency pricing reflects scope, implementation and specialist work, and compare quotes fairly.',
    keyword:'SEO agency pricing', card:'A straightforward way to compare SEO agency quotes beyond the monthly retainer.',
    sections:[
      ['Price reflects a service model',`UK SEO agency pricing may be monthly, project-based, hourly or tied to a specific deliverable. Retainers can cover strategy, content, technical work, digital PR and reporting in different combinations. Ask the agency to map the fee to activities and outputs rather than relying on the package name.`],
      ['Compare like with like',`When reviewing quotes, record whether each includes discovery, technical implementation, content, link work, local SEO, reporting and meetings. Note any minimum term, setup charge, extra fees and client responsibilities. Two prices are not comparable if one includes implementation and the other only supplies recommendations.`],
      ['Ask what evidence supports the plan',`A credible provider should explain how it will assess your website and decide priorities. Search Console is one source of evidence for impressions, clicks, queries and indexing; analytics and business data may add context. Ask how often the plan is reviewed and how the provider will explain uncertainty.`],
      ['Be cautious of pricing tied to promises',`Avoid paying for a guaranteed ranking, a fixed quantity of links without context or traffic targets that ignore your site and market. A provider can commit to work, communication and analysis; it cannot control every search result or customer decision.`],
      ['A smaller, transparent scope',`Not every business needs a full agency retainer. Cyberfreak Software’s defined SEO Management service costs £125 per month and includes monitoring, sitemap oversight, monthly reporting and recommendations. <a href="${pricing}">See the current pricing and inclusions</a> and compare them with the work your business needs.`]
    ], related:['seo-cost-per-month-uk','affordable-seo-services-expectations']
  },
  {
    slug:'what-125-pounds-seo-includes', kicker:'SEO SERVICE SCOPE', title:'What Can £125 Per Month Get You in SEO Services?',
    summary:'See exactly what Cyberfreak Software’s £125 monthly SEO Management service includes and where extra work is separate.',
    keyword:'SEO services for small business', card:'A precise breakdown of the £125 monthly service, its deliverables and what is scoped separately.',
    sections:[
      ['A defined monthly service',`A £125 monthly budget needs a focused scope. Cyberfreak Software’s SEO Management service is intended for businesses that want regular oversight of search foundations and clear recommendations without committing to a broad agency programme.`],
      ['What is included',`The service includes Google Search Console setup and verification, XML sitemap submission and maintenance, monitoring of clicks, impressions and indexed pages, query analysis and keyword opportunity review, practical content recommendations and a monthly SEO performance report. The report helps you understand what the available data shows and what could be worth addressing next.`],
      ['What is not included in the monthly fee',`The service does not include writing and publishing blog posts, ongoing website development, major technical fixes or a guarantee of rankings, traffic or enquiries. If the review identifies a change that needs implementation, we can discuss it separately with a clear scope. This keeps recommendations distinct from production work and avoids implying unlimited development.`],
      ['Who may find it useful',`It may suit a small business with an existing website and someone available to review or implement recommendations. It is less suitable if you need a full content team, extensive development or a large-scale campaign included in one monthly fee. Start by describing what your site needs and checking whether the included work addresses it.`],
      ['Terms and next step',`The service is £125 per month, has no minimum subscription term and can be cancelled at any time. Read the <a href="${pricing}">SEO Management pricing and service details</a>, or <a href="${enquiry}">send an enquiry about your website</a>.`]
    ], related:['affordable-seo-services-expectations','monthly-seo-services-inclusions']
  },
  {
    slug:'monthly-seo-reporting-metrics', kicker:'SEO REPORTING', title:'Monthly SEO Reporting: What Should Your Provider Be Measuring?',
    summary:'Know which Search Console measures belong in a useful monthly SEO report and what they cannot tell you alone.',
    keyword:'Monthly SEO management', card:'What to expect from a monthly SEO report, from clicks and impressions to clear next steps.',
    sections:[
      ['A report should help you decide what to do',`A monthly SEO report should make the data understandable and connect it to decisions. A table of figures without context is difficult to use. Look for a summary of changes, notable patterns, limitations and the next sensible actions.`],
      ['Clicks and impressions',`Google Search Console reports clicks from Google Search and impressions when a result is shown. Reviewing them over a consistent period can reveal whether visibility or visits are changing. Compare similar date ranges and consider seasonality, changes to the site and the search terms involved.`],
      ['Queries and pages',`Query data can show the searches associated with impressions and clicks, while page data shows which URLs appear in results. These views can highlight pages that may need clearer titles, stronger answers or better internal links. They do not show every search, and low-volume data may be limited.`],
      ['Indexing and sitemap signals',`A report may note indexed pages and issues surfaced in Search Console. A submitted sitemap helps communicate the URLs you want search engines to discover, but submission does not guarantee indexing. The provider should identify meaningful issues rather than treating a raw count as a success measure.`],
      ['Measures beyond Search Console',`Search Console does not measure every business outcome. Enquiries, sales, calls and booked appointments need suitable analytics or CRM tracking, configured with appropriate consent and tested carefully. Ask how reporting distinguishes search visibility from actual commercial outcomes.`],
      ['Ask for interpretation and next steps',`The provider should explain what changed, why it may matter, what remains uncertain and who is responsible for acting. Cyberfreak Software’s <a href="${service}">monthly SEO Management</a> includes a Search Console-based performance report and practical keyword/content recommendations. See <a href="${pricing}">what the monthly service measures</a>.`]
    ], related:['monthly-seo-services-inclusions','seo-cost-per-month-uk']
  }
];

const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const metaCfg = JSON.parse(await readFile(path.join(root,'seo/pages.json'),'utf8'));
const indexPath = path.join(root,'blog/index.html');
let indexHtml = await readFile(indexPath,'utf8');
for (const post of posts) {
  const slug = post.slug;
  const href = `/blog/${slug}/`;
  const filepath = `blog/${slug}/index.html`;
  const canonical = `${base}${href}`;
  const paragraphs = post.sections.map(([h,p])=>`<h2>${esc(h)}</h2><p>${p}</p>`).join('');
  const related = post.related.map(s=>{const p=posts.find(x=>x.slug===s);return `<li><a href="/blog/${s}/">${esc(p?.title || s)}</a></li>`}).join('');
  const article = `<!doctype html><html lang="en"><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"><link rel="stylesheet" href="/styles/site.css?v=20261114-longform"><link rel="stylesheet" href="/styles/contact.css?v=20261018-modal-motion"><script src="/scripts/contact.js?v=20261018-modal-motion" defer></script></head><body><a class="skip-link" href="#main">Skip to content</a><header><a class="logo" href="/" aria-label="Cyberfreak Software home"><img src="/images/cfs_logo_dark.svg" alt="Cyberfreak Software logo"></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/seo-management/">SEO Management</a><a href="https://try.cyberfreaksoftware.co.uk/" target="_blank" rel="noopener noreferrer">Website Deployments</a><a href="/software-house/">Software House</a><a href="/blog/" aria-current="page">Blog</a><button type="button" class="nav-contact" data-contact-open>Contact</button></nav></header><main id="main"><section class="hero-section compact inner-page-hero article-hero"><div class="hero-inner"><p class="eyebrow">${esc(post.kicker)}</p><h1>${esc(post.title)}</h1><p>${esc(post.summary)}</p></div></section><article class="article-page"><img class="article-visual" src="${image}" alt="SEO management and search performance illustration"><p class="article-meta">By Cyberfreak Software · <time datetime="${today}">28 November 2026</time></p><div class="article-content">${paragraphs}<section class="article-related"><p class="eyebrow">KEEP READING</p><h2>Related guides</h2><ul>${related}</ul></section><section class="article-cta"><h2>Explore SEO Management</h2><p>Cyberfreak Software provides monthly Search Console monitoring, sitemap oversight, clear reporting and practical recommendations for £125 per month. <a href="${service}">Learn about our SEO Management service</a> or <a href="${enquiry}">ask us whether it fits your business</a>.</p></section></div></article></main><footer><p class="eyebrow">LET'S TALK</p><h2>What are you working on?</h2><p>Tell us about your business, your website or your next software project.</p><button type="button" class="button" data-contact-open>Send us a message</button><p class="footer-legal"><a href="/terms/">Terms of Service</a><span aria-hidden="true">&#183;</span><a href="/privacy-policy/">Privacy Policy</a></p></footer></body></html>`;
  await mkdir(path.join(root,`blog/${slug}`),{recursive:true});
  await writeFile(path.join(root,filepath),article);
  metaCfg[filepath] = {title:`${post.title} | Cyberfreak Software`,description:post.summary,name:post.title,type:'BlogPosting',image,socialImage:'/images/cfs_logo_dark.png',imageAlt:'SEO management and search performance illustration',article:{headline:post.title,datePublished:today,dateModified:today,author:{'@type':'Organization',name:'Cyberfreak Software',url:`${base}/`}}};
  const card = `<article class="blog-card"><div class="blog-image-wrapper"><img src="${image}" alt="SEO management and search performance illustration" class="blog-image"></div><div class="blog-content"><div class="blog-category">${esc(post.kicker)}</div><h2><a href="${href}">${esc(post.title)}</a></h2><p>${esc(post.card)}</p><a href="${href}" class="blog-read-more">Read article →</a></div></article>`;
  if (!indexHtml.includes(`href="${href}"`)) indexHtml = indexHtml.replace('<div class="blog-grid">',`<div class="blog-grid">\n${card}`);
}
await writeFile(indexPath,indexHtml);
await writeFile(path.join(root,'seo/pages.json'),JSON.stringify(metaCfg,null,2)+'\n');
console.log(`Created ${posts.length} buyer-focused SEO articles.`);

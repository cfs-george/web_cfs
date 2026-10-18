import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderHead } from './generate-headmeta.mjs';
const root = new URL('../', import.meta.url);
const config = JSON.parse((await readFile(new URL('seo/pages.json',root),'utf8')).replace(/^\uFEFF/,''));
const parseGraph = head => JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];

for (const [file,page] of Object.entries(config)) {
  test(`${file}: unique metadata and consistent schema references`,async () => {
    const html = await readFile(new URL(file,root),'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.equal((head.match(/<title>/g)||[]).length,1);
    assert.equal((head.match(/name="description"/g)||[]).length,1);
    assert.equal((head.match(/rel="canonical"/g)||[]).length,1);
    assert.equal((head.match(/type="application\/ld\+json"/g)||[]).length,1);
    assert.ok(head.includes(renderHead(file,page)));
    const graph = parseGraph(head);
    const ids = graph.map(node=>node['@id']);
    assert.equal(new Set(ids).size, ids.length);
    const visit = value => {
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length===1 && value['@id']) assert.ok(ids.includes(value['@id']),`Unresolved reference ${value['@id']}`);
      Object.values(value).forEach(visit);
    };
    graph.forEach(visit);
    assert.equal(graph.some(node=>node['@type']==='BreadcrumbList'), false);
    assert.equal(html.includes('aria-label="Breadcrumb"'), false);
    assert.equal(graph.some(node=>node['@type']==='BlogPosting'), Boolean(page.article));
  });
}

test('HTML and JSON encoding handle quotes, ampersands and script terminators',()=>{
  const text = 'A "quote" & </script><script>alert(1)</script>';
  const head=renderHead('index.html',{title:text,description:text,name:text});
  assert.ok(head.includes('&quot;quote&quot; &amp; &lt;/script&gt;'));
  assert.equal((head.match(/<script /g)||[]).length,1);
  assert.equal(parseGraph(head).find(node=>node['@type']==='WebPage').description,text);
});

test('Article configuration requires real details and emits connected article schema',()=>{
  const page={title:'An article',description:'Article description',name:'An article',image:'/images/cfs_logo_dark.png',article:{headline:'An article',datePublished:'2026-10-18',author:{'@type':'Person',name:'George Lomas'}}};
  const head=renderHead('blog/example/index.html',page);
  const article=parseGraph(head).find(node=>node['@type']==='BlogPosting');
  assert.equal(article.author.name,'George Lomas');
  assert.ok(head.includes('content="article"'));
  assert.throws(()=>renderHead('blog/example/index.html',{...page,image:undefined}),/articles require/);
  assert.throws(()=>renderHead('blog/example/index.html',{...page,article:{...page.article,datePublished:'not-a-date'}}),/invalid article date/);
});

test('Canonicals cannot accidentally point to another domain',()=>{
  assert.throws(()=>renderHead('index.html',{title:'Title',description:'Description',name:'Home',canonical:'https://example.com/'}),/invalid CFS canonical/);
});

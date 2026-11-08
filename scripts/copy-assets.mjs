import { cp, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

async function inlineStyles(url, ancestors = []) {
  if (ancestors.includes(url.href)) throw new Error(`Circular CSS import: ${url.pathname}`);
  const source = await readFile(url, 'utf8');
  const pattern = /@import\s+['"]([^'"]+)['"];?/g;
  let css = '';
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    css += source.slice(cursor, match.index);
    css += await inlineStyles(new URL(match[1], url), [...ancestors, url.href]);
    cursor = match.index + match[0].length;
  }
  return css + source.slice(cursor);
}

await writeFile(
  new URL('dist/styles.css', root),
  await inlineStyles(new URL('src/styles.css', root)),
);
await cp(new URL('src/foundations/tokens/tokens.json', root), new URL('dist/tokens.json', root));

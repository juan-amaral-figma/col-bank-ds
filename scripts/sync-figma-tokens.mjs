import { readFile, writeFile } from 'node:fs/promises';
const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) throw new Error('Set FIGMA_ACCESS_TOKEN in .env or your shell. Never commit it.');
const path = new URL('../figma/tokens.json', import.meta.url);
const source = JSON.parse(await readFile(path, 'utf8'));
const response = await fetch(`https://api.figma.com/v1/files/${source.fileKey}/variables/local`, {
  headers: { 'X-Figma-Token': token },
});
if (!response.ok)
  throw new Error(
    `Figma token export returned ${response.status}. Check file access, token scopes, and Variables REST API plan availability.`,
  );
const { meta } = await response.json();
const variables = Object.values(meta.variables)
  .filter((v) => !v.remote)
  .map((v) => ({
    id: v.id,
    name: v.name,
    type: v.resolvedType,
    collection: v.variableCollectionId,
    values: v.valuesByMode,
  }));
if (!variables.length)
  throw new Error('Figma returned no local variables; leaving the snapshot intact.');
// Match by immutable Figma variable ID, not localized display name. Renames are valid.
const byId = new Map(variables.map((variable) => [variable.id, variable]));
for (const variable of source.variables) {
  const current = byId.get(variable.id);
  if (!current)
    throw new Error(`Required token ${variable.id} disappeared. Review the design change.`);
  if (current.type !== variable.type || current.collection !== variable.collection)
    throw new Error(`Token ${variable.id} changed type or collection. Review before syncing.`);
}
const changes = variables.filter(
  (v) => JSON.stringify(v) !== JSON.stringify(source.variables.find((old) => old.id === v.id)),
);
if (process.argv.includes('--check')) {
  if (changes.length) {
    console.error(
      `${changes.length} Figma tokens differ. Run npm run tokens:sync and review the diff.`,
    );
    process.exitCode = 1;
  } else console.log('Token snapshot matches Figma.');
} else {
  source.variables = variables;
  source.capturedAt = new Date().toISOString().slice(0, 10);
  await writeFile(path, JSON.stringify(source, null, 2) + '\n');
  console.log(`Refreshed ${variables.length} tokens. Run npm run tokens and review the diff.`);
}

import { cp, readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const shared = new URL('../src/', root);
// Only framework-neutral CSS and SVGs are reused; no React modules enter this package.
const styles = [
  'foundations/tokens/generated.css',
  'foundations/base.css',
  'foundations/typography.css',
  'foundations/utilities.css',
  'components/atoms/Icon/Icon.css',
  'components/atoms/Button/Button.css',
  'components/atoms/IconButton/IconButton.css',
  'components/atoms/Divider/Divider.css',
  'components/molecules/Alert/Alert.css',
  'components/molecules/AccountCard/AccountCard.css',
];
await writeFile(
  new URL('dist/styles.css', root),
  (await Promise.all(styles.map((path) => readFile(new URL(path, shared), 'utf8')))).join('\n'),
);
await cp(new URL('components/atoms/Icon/assets/', shared), new URL('dist/assets/', root), {
  recursive: true,
});

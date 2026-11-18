# Col Bank Angular

Implementação standalone de `Icon`, `Button`, `IconButton`, `Alert` e `AccountCard`, sem aplicação ou dependências React.

Use Node.js 22.12+ (linha 22) ou 24 e instale as dependências nesta pasta:

```sh
npm ci
npm run build
npm test
```

O pacote usa Angular 21.2 e TypeScript 5.9 isolados do React. `ngc` compila com templates estritos e modo parcial. `dist/index.js` e as declarações são a entrada da biblioteca; `dist/styles.css` deve ser carregado globalmente pelo consumidor. Os SVGs são copiados para `dist/assets/` e referenciados por URLs relativas ao módulo. Preserve essa pasta ao consumir a saída; com bundlers, habilite o processamento de `new URL(..., import.meta.url)` para servir os assets.

O build reutiliza os tokens CSS gerados e apenas CSS/SVGs neutros do repositório. Após alterar o snapshot de tokens, execute `npm run tokens` na raiz antes do build Angular. Não é necessário compilar React. Os temas seguem os seletores `data-theme` dos tokens existentes. Carregue Inter ou personalize `--col-font-family` no consumidor.

## Organização

```text
src/
  AccountCard/account-card.ts
  Alert/alert.ts
  Button/button.ts
  IconButton/icon-button.ts
  Icon/
    icon.ts
    Icon.figma.ts
  index.ts
```

A entrada pública continua sendo `dist/index.js`. O build limpa a saída anterior antes de compilar, evitando módulos obsoletos após movimentações. Os SVGs permanecem em `dist/assets/`; `dist/Icon/icon.js` os referencia por `../assets/`.

Os templates `.figma.ts` são excluídos da compilação da biblioteca Angular. O Code Connect os encontra separadamente por `src/**/*.figma.ts`, com label `Angular` e language `html`.

## Code Connect

Existem cinco templates: `Icon`, `Button`, `IconButton`, `Alert` e `AccountCard`. Instale as dependências na raiz do repositório (`npm ci`) para disponibilizar o CLI e os tipos de `@figma/code-connect`, além das dependências Angular instaladas nesta pasta.

Execute a partir de `angular/`:

```sh
../node_modules/.bin/figma connect parse --skip-update-check --exit-on-unreadable-files
node node_modules/typescript/bin/tsc -p src/tsconfig.json
```

O primeiro comando valida o parse local dos cinco templates usando `angular/figma.config.json`. O segundo verifica os tipos dos fontes e templates no projeto do editor (`src/tsconfig.json`), sem emitir arquivos; o build mantém seu próprio `tsconfig.json`.

Quando for publicar, configure `FIGMA_ACCESS_TOKEN` no `.env` local desta pasta, seguindo `.env.example`, e execute explicitamente:

```sh
../node_modules/.bin/figma connect publish
```

O parse local não verifica os componentes ou as propriedades atuais no Figma nem confirma uma publicação. Após publicar, confira o label `Angular` no Dev Mode; a configuração React da raiz usa o label `React` separadamente.

## API

Importe os componentes de `@col-bank/angular` e inclua-os em `imports` do consumidor standalone.

- `col-icon`: `name`, `size` (16 ou 24), `label` opcional; sem label, é decorativo. Suporta todos os nomes React, incluindo `eye`, `eye-off`, `transfer`, `payment` e `info`. `payment` reutiliza o SVG de `credit-card`.
- `button[colButton]`: texto por projeção; `icon` opcional pelo nome; `hierarchy` (`primary`, `secondary`, `tertiary`), `size` (`sm`, `md`, `lg`), `disabled`, `loading`, `loadingLabel` e `type`. O botão nativo preserva atributos ARIA, eventos e comportamento de teclado.
- `button[colIconButton]`: `icon` e `label` obrigatórios; herda as opções de Button, com `size` limitado a `sm` e `md`. `label` fornece o nome acessível.
- `col-alert`: `message` obrigatório e `icon` opcional (`info` por padrão), com `role="alert"`.
- `col-account-card`: `accountType`, `accountNumber` já mascarado e `balance` obrigatório. `defaultBalanceHidden` define o estado inicial; `balanceHidden` permite controle externo e `balanceHiddenChange` emite a próxima visibilidade (`[(balanceHidden)]` também funciona). Os textos `balanceLabel`, `showBalanceLabel` e `hideBalanceLabel` são personalizáveis; os padrões seguem o React em espanhol.

AccountCard recebe conteúdo projetado diretamente abaixo do saldo. Projete um `col-alert` ou vários botões; a região permite quebra de linha e não ocupa espaço quando vazia. O cartão não cria alertas ou ações de negócio. O saldo oculto sai do DOM, e o botão alterna entre `eye`/`eye-off`, o nome da ação e `aria-pressed`.

Os testes executam os componentes compilados com TestBed e verificam alternância, controle externo, projeção, botões, acessibilidade e assets.

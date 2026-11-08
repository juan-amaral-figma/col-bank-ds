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

## API

Importe os componentes de `@col-bank/angular` e inclua-os em `imports` do consumidor standalone.

- `col-icon`: `name`, `size` (16 ou 24), `label` opcional; sem label, é decorativo. Suporta todos os nomes React, incluindo `eye`, `eye-off`, `transfer`, `payment` e `info`. `payment` reutiliza o SVG de `credit-card`.
- `button[colButton]`: texto por projeção; `icon` opcional pelo nome; `hierarchy` (`primary`, `secondary`, `tertiary`), `size` (`sm`, `md`, `lg`), `disabled`, `loading`, `loadingLabel` e `type`. O botão nativo preserva atributos ARIA, eventos e comportamento de teclado.
- `button[colIconButton]`: `icon` e `label` obrigatórios; herda as opções de Button, com `size` limitado a `sm` e `md`. `label` fornece o nome acessível.
- `col-alert`: `message` obrigatório e `icon` opcional (`info` por padrão), com `role="alert"`.
- `col-account-card`: `accountType`, `accountNumber` já mascarado e `balance` obrigatório. `defaultBalanceHidden` define o estado inicial; `balanceHidden` permite controle externo e `balanceHiddenChange` emite a próxima visibilidade (`[(balanceHidden)]` também funciona). Os textos `balanceLabel`, `showBalanceLabel` e `hideBalanceLabel` são personalizáveis; os padrões seguem o React em espanhol.

AccountCard recebe conteúdo projetado diretamente abaixo do saldo. Projete um `col-alert` ou vários botões; a região permite quebra de linha e não ocupa espaço quando vazia. O cartão não cria alertas ou ações de negócio. O saldo oculto sai do DOM, e o botão alterna entre `eye`/`eye-off`, o nome da ação e `aria-pressed`.

Os testes executam os componentes compilados com TestBed e verificam alternância, controle externo, projeção, botões, acessibilidade e assets.

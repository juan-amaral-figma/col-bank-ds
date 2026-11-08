# Col Bank

Design system em React + TypeScript, com 20 componentes ligados ao [arquivo COL-BANK no Figma](https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=0-1) pelo Code Connect.

**Contrato bilíngue:** componentes, variantes, propriedades e variáveis são nomeados em espanhol no Figma (`Botón`, `Jerarquía`, `Primario`, `amarillo/500`). A API React e os tokens CSS mantêm nomes em inglês (`Button`, `hierarchy="primary"`, `--col-yellow-500`). Os templates `.figma.ts` fazem a tradução explícita. Não renomeie as propriedades no Figma apenas para corresponder ao código.

## Rodar localmente

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Abra **http://localhost:6006**. O Storybook mostra foundations, atoms, molecules e organisms. Selecione um componente na barra lateral, experimente as propriedades em **Controls** e alterne entre os temas light e dark na barra superior.

## Estrutura

```text
src/
  components/
    atoms/             # Button, IconButton, TextInput, Checkbox, RadioButton, Badge, Icon, Divider
    molecules/         # AccountCard, TransactionItem, RecipientCard, QuickAction, AmountField, SearchField
    organisms/         # AccountOverview, QuickActionsPanel, TransactionHistory,
                       # TransactionFilters, RecipientSelector, TransferForm
  foundations/         # Tokens gerados, tipografia e estilos base
  providers/           # ThemeProvider
  hooks/               # Estado compartilhado
  utils/               # Utilitários internos
  index.ts             # API pública
  styles.css           # Entrada única de estilos
figma/tokens.json      # Variáveis capturadas do Figma, incluindo aliases e modos
figma.config.json     # Configuração do Code Connect
.storybook/           # Configuração do catálogo local
stories/              # Foundations e dados dos exemplos de componentes
scripts/              # Geração/sincronização de tokens e empacotamento
tests/                # Setup e contratos do Figma usados pelos testes
```

Cada componente tem sua própria pasta com implementação, tipos, CSS, story, template `Nome.figma.ts` e `index.ts`. Os testes de interação existentes ficam junto dos componentes. Os contratos em `tests/fixtures/figma-components.json` verificam nomes de propriedades, variantes e imports dos templates; são uma referência capturada, não uma consulta ao Figma em tempo real.

## Componentes Angular e composição

A pasta [`angular/`](angular/README.md) contém somente cinco componentes standalone e mantém dependências, configuração e build separados do React. Consulte seu README para compilar e consumir a biblioteca.

Nas duas implementações, AccountCard aceita conteúdo externo abaixo do saldo: `children` no React e projeção no Angular. A região vazia não ocupa espaço. O React preserva estado controlado, callbacks e slots existentes; o botão padrão alterna `eye`/`eye-off` e o nome acessível conforme a ação disponível. Passe `accountNumber` já mascarado, como `•••• 4582`.

O novo `Alert` React recebe `message` e `icon` opcional (`info` por padrão). Button já aceita texto e ícone opcional; IconButton continua exigindo `aria-label`. Os nomes `eye-off`, `payment` e `info` foram adicionados sem remover os existentes; `payment` reutiliza o asset de cartão.

## Code Connect

Os 20 templates `src/components/**/*.figma.ts` definem os links para os componentes do Figma e os exemplos de código. Mantenha `FIGMA_ACCESS_TOKEN` no `.env` local, usando `.env.example` como referência. O CLI lê esse arquivo; ele está ignorado pelo Git.

```sh
npm run figma:parse       # Analisa os templates localmente
npm run figma:publish -- --dry-run   # Mostra os 20 destinos; exige token
npm run figma:publish     # Valida e publica as conexões no Figma
```

A publicação exige acesso ao arquivo e os escopos necessários no token. **Antes de publicar, verifique que o preview utiliza `@col-bank/react` e que nenhum valor aparece como `PROPERTY_NOT_FOUND`.** Se o CLI avisar sobre mappings criados pela interface, use `npm run figma:publish -- --force` somente quando quiser substituí-los pelos templates deste repositório. A execução com `--dry-run` não substitui a verificação no Dev Mode após publicar.

Code Connect fornece exemplos no Dev Mode. Alterações em componentes React e no design do Figma precisam ser mantidas em conjunto; a publicação não sincroniza o visual automaticamente.

## Tokens

```text
Figma → npm run tokens:sync → figma/tokens.json
                            ↓ npm run tokens
                            src/foundations/tokens/{tokens.json,generated.css}
```

`tokens:sync` é opcional e depende de acesso à API de variáveis do Figma. O sync identifica os tokens por **ID** e permite que os nomes visíveis mudem de inglês para espanhol; `scripts/token-name-aliases.mjs` traduz esses nomes para a API CSS estável em inglês. Depois da sincronização, gere os estilos e revise as mudanças. O build usa o snapshot local e não precisa de token ou rede. Não edite os arquivos gerados diretamente.

## Verificar e gerar o pacote

```sh
npm run check             # Geração de tokens, TypeScript, testes e build
npm run build-storybook   # Catálogo estático em storybook-static/
npm pack                  # Pacote local para instalar em outro projeto
```

```tsx
import { Button, ThemeProvider } from '@col-bank/react';
import '@col-bank/react/styles.css';

export function App() {
  return (
    <ThemeProvider theme="light">
      <Button hierarchy="primary">Continuar</Button>
    </ThemeProvider>
  );
}
```

O pacote suporta React 18.3 e 19. O Storybook carrega Inter; nos projetos consumidores, carregue a fonte ou personalize `--col-font-family`.
# col-bank-ds

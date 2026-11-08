import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
for (const name of ['window', 'document', 'HTMLElement', 'Node', 'Event', 'MouseEvent']) {
  globalThis[name] = dom.window[name];
}
await import('@angular/compiler');
const { Component } = await import('@angular/core');
const { TestBed } = await import('@angular/core/testing');
const { BrowserTestingModule, platformBrowserTesting } =
  await import('@angular/platform-browser/testing');
const { AccountCard, Alert, Button, IconButton, Icon } = await import('../dist/index.js');
TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
const values = { accountType: 'Ahorros', accountNumber: '•••• 4582', balance: '$2.450.000' };

function createCard(extra = {}) {
  TestBed.configureTestingModule({ imports: [AccountCard] });
  const fixture = TestBed.createComponent(AccountCard);
  for (const [key, value] of Object.entries({ ...values, ...extra }))
    fixture.componentRef.setInput(key, value);
  fixture.detectChanges();
  return fixture;
}
function assertVisibility(fixture, hidden) {
  const el = fixture.nativeElement;
  const button = el.querySelector('button');
  assert.equal(button.getAttribute('aria-label'), hidden ? 'Mostrar saldo' : 'Ocultar saldo');
  assert.equal(button.getAttribute('aria-pressed'), String(!hidden));
  assert.ok(
    button.querySelector('col-icon').style.maskImage.includes(hidden ? '/eye-off.svg' : '/eye.svg'),
  );
  assert.equal(el.textContent.includes(values.balance), !hidden);
}

test('Angular standalone components', async (t) => {
  t.afterEach(() => TestBed.resetTestingModule());
  await t.test('toggles balance, eye icon and accessible name; empty content has no space', () => {
    const fixture = createCard();
    assertVisibility(fixture, false);
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    assertVisibility(fixture, true);
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    assertVisibility(fixture, false);
    assert.equal(
      fixture.nativeElement.querySelector('.col-account-card__content').childNodes.length,
      0,
    );
    fixture.destroy();
    TestBed.resetTestingModule();
  });
  await t.test('respects controlled state and emits changes; supports initial hidden state', () => {
    const fixture = createCard({ balanceHidden: true });
    const changes = [];
    fixture.componentInstance.balanceHiddenChange.subscribe((value) => changes.push(value));
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    assert.deepEqual(changes, [false]);
    assertVisibility(fixture, true);
    fixture.componentRef.setInput('balanceHidden', false);
    fixture.detectChanges();
    assertVisibility(fixture, false);
    fixture.destroy();
    TestBed.resetTestingModule();
    const initial = createCard({ defaultBalanceHidden: true });
    assertVisibility(initial, true);
    initial.destroy();
    TestBed.resetTestingModule();
  });
  await t.test('projects alerts or multiple native buttons after the balance', () => {
    class Host {
      alert = true;
      clicks = 0;
    }
    Component({
      standalone: true,
      imports: [AccountCard, Alert, Button],
      template: `
      <col-account-card accountType="Ahorros" accountNumber="•••• 4582" balance="$2.450.000">
        @if (alert) { <col-alert message="Saldo bajo" /> }
        @else {
          <button colButton icon="transfer" (click)="clicks = clicks + 1">Transferir</button>
          <button colButton icon="payment">Pagar</button>
        }
      </col-account-card>`,
    })(Host);
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const region = fixture.nativeElement.querySelector('.col-account-card__content');
    assert.equal(region.querySelector('[role="alert"]').textContent, 'Saldo bajo');
    fixture.componentInstance.alert = false;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    assert.equal(region.querySelectorAll('button').length, 2);
    region.querySelector('button').click();
    fixture.detectChanges();
    assert.equal(fixture.componentInstance.clicks, 1);
    assert.ok(
      fixture.nativeElement.querySelector('.col-money').compareDocumentPosition(region) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
    fixture.destroy();
    TestBed.resetTestingModule();
  });
  await t.test('native buttons preserve type, loading, disabled and accessible icon names', () => {
    class Host {
      loading = false;
      clicks = 0;
    }
    Component({
      standalone: true,
      imports: [Button, IconButton],
      template: `
      <button colButton icon="payment" [loading]="loading" loadingLabel="Loading" (click)="clicks = clicks + 1">Pay</button>
      <button colIconButton icon="info" label="Information" disabled></button>`,
    })(Host);
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [button, iconButton] = fixture.nativeElement.querySelectorAll('button');
    assert.equal(button.type, 'button');
    assert.equal(iconButton.getAttribute('aria-label'), 'Information');
    assert.equal(iconButton.disabled, true);
    assert.ok(iconButton.classList.contains('col-icon-button'));
    button.click();
    assert.equal(fixture.componentInstance.clicks, 1);
    fixture.componentInstance.loading = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    assert.equal(button.disabled, true);
    assert.equal(button.getAttribute('aria-busy'), 'true');
    assert.ok(button.textContent.includes('Loading'));
    button.click();
    assert.equal(fixture.componentInstance.clicks, 1);
    fixture.destroy();
    TestBed.resetTestingModule();
  });
  await t.test('ships all shared SVGs, masks and the empty-content CSS rule', async () => {
    TestBed.configureTestingModule({ imports: [Icon] });
    const fixture = TestBed.createComponent(Icon);
    for (const name of [
      'home',
      'transfer',
      'wallet',
      'credit-card',
      'search',
      'notification',
      'arrow',
      'check',
      'close',
      'eye',
      'eye-off',
      'payment',
      'info',
    ]) {
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();
      const asset = name === 'payment' ? 'credit-card' : name;
      assert.ok(fixture.nativeElement.style.maskImage.includes(`/${asset}.svg`));
      assert.equal(fixture.nativeElement.getAttribute('aria-hidden'), 'true');
      const svg = await readFile(new URL(`../dist/assets/${asset}.svg`, import.meta.url), 'utf8');
      assert.ok(svg.includes('<svg'));
    }
    fixture.componentRef.setInput('label', 'Information');
    fixture.detectChanges();
    assert.equal(fixture.nativeElement.getAttribute('role'), 'img');
    assert.equal(fixture.nativeElement.getAttribute('aria-label'), 'Information');
    const css = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');
    assert.match(css, /\.col-account-card__content:empty\s*\{\s*display: none;/);
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from './icon.js';
import { IconButton } from './icon-button.js';

@Component({
  selector: 'col-account-card',
  standalone: true,
  imports: [Icon, IconButton],
  styles: [':host { display: contents; }'],
  template: `
    <article class="col-account-card" [attr.aria-label]="accountType + ' ' + accountNumber">
      <div class="col-row">
        <span class="col-icon-tile"><col-icon name="wallet" /></span>
        <div class="col-grow">
          <div>{{ accountType }}</div>
          <div class="col-muted col-body-small">{{ accountNumber }}</div>
        </div>
        <button
          colIconButton
          [icon]="hidden ? 'eye-off' : 'eye'"
          [label]="hidden ? showBalanceLabel : hideBalanceLabel"
          [attr.aria-pressed]="!hidden"
          (click)="toggleBalance()"
        ></button>
      </div>
      <div class="col-divider col-divider--horizontal" role="separator"></div>
      <div>
        <div class="col-label-small col-muted">{{ balanceLabel }}</div>
        <div class="col-money" aria-live="polite">
          @if (hidden) {
            <span aria-label="••••">••••••</span>
          } @else {
            {{ balance }}
          }
        </div>
      </div>
      <div class="col-account-card__content"><ng-content /></div>
    </article>
  `,
})
export class AccountCard {
  @Input({ required: true }) accountType!: string;
  /** Pass a masked account number, e.g. •••• 4582, as in the React API. */
  @Input({ required: true }) accountNumber!: string;
  @Input({ required: true }) balance!: string;
  @Input() balanceHidden?: boolean;
  @Input() defaultBalanceHidden = false;
  @Input() balanceLabel = 'Saldo disponible';
  @Input() showBalanceLabel = 'Mostrar saldo';
  @Input() hideBalanceLabel = 'Ocultar saldo';
  @Output() balanceHiddenChange = new EventEmitter<boolean>();
  private internalHidden?: boolean;
  get hidden(): boolean {
    return this.balanceHidden ?? this.internalHidden ?? this.defaultBalanceHidden;
  }
  toggleBalance(): void {
    const next = !this.hidden;
    if (this.balanceHidden === undefined) this.internalHidden = next;
    this.balanceHiddenChange.emit(next);
  }
}

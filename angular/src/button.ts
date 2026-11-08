import { booleanAttribute, Component, Input } from '@angular/core';
import { Icon, type IconName } from './icon.js';

@Component({
  selector: 'button[colButton]',
  standalone: true,
  imports: [Icon],
  template: `
    @if (loading) {
      <span class="col-spinner" aria-hidden="true"></span>
    } @else if (icon) {
      <col-icon [name]="icon" />
    }
    @if (loading && loadingLabel) {
      {{ loadingLabel }}
    } @else {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'classes',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.type]': 'type',
  },
})
export class Button {
  @Input() hierarchy: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input() loadingLabel?: string;
  @Input() icon?: IconName;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  get classes(): string {
    return `col-button col-button--${this.hierarchy} col-button--${this.size}`;
  }
}

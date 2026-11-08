import { Component, Input } from '@angular/core';
import { Button } from './button.js';
import { Icon, type IconName } from './icon.js';

@Component({
  selector: 'button[colIconButton]',
  standalone: true,
  imports: [Icon],
  template: `
    @if (loading) {
      <span class="col-spinner" aria-hidden="true"></span>
    } @else {
      <col-icon [name]="icon" />
    }
  `,
  host: { '[attr.aria-label]': 'label' },
})
export class IconButton extends Button {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) override icon: IconName = 'info';
  @Input() override size: 'sm' | 'md' = 'sm';
  override get classes(): string {
    return `${super.classes} col-icon-button`;
  }
}

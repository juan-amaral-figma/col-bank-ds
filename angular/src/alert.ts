import { Component, Input } from '@angular/core';
import { Icon, type IconName } from './icon.js';

@Component({
  selector: 'col-alert',
  standalone: true,
  imports: [Icon],
  template: `<col-icon [name]="icon" /><span>{{ message }}</span>`,
  host: { class: 'col-alert', role: 'alert' },
})
export class Alert {
  @Input({ required: true }) message!: string;
  @Input() icon: IconName = 'info';
}

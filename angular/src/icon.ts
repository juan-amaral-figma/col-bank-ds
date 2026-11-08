import { Component, Input } from '@angular/core';

const iconAssets = {
  home: new URL('./assets/home.svg', import.meta.url).href,
  transfer: new URL('./assets/transfer.svg', import.meta.url).href,
  wallet: new URL('./assets/wallet.svg', import.meta.url).href,
  'credit-card': new URL('./assets/credit-card.svg', import.meta.url).href,
  search: new URL('./assets/search.svg', import.meta.url).href,
  notification: new URL('./assets/notification.svg', import.meta.url).href,
  arrow: new URL('./assets/arrow.svg', import.meta.url).href,
  check: new URL('./assets/check.svg', import.meta.url).href,
  close: new URL('./assets/close.svg', import.meta.url).href,
  eye: new URL('./assets/eye.svg', import.meta.url).href,
  'eye-off': new URL('./assets/eye-off.svg', import.meta.url).href,
  payment: new URL('./assets/credit-card.svg', import.meta.url).href,
  info: new URL('./assets/info.svg', import.meta.url).href,
} as const;
export type IconName = keyof typeof iconAssets;

@Component({
  selector: 'col-icon',
  standalone: true,
  template: '',
  host: {
    class: 'col-icon',
    '[style.width.px]': 'size',
    '[style.height.px]': 'size',
    '[style.mask-image]': 'maskImage',
    '[style.-webkit-mask-image]': 'maskImage',
    '[attr.role]': 'label ? "img" : null',
    '[attr.aria-label]': 'label || null',
    '[attr.aria-hidden]': 'label ? null : "true"',
  },
})
export class Icon {
  @Input({ required: true }) name!: IconName;
  @Input() size: 16 | 24 = 24;
  @Input() label?: string;
  get maskImage(): string {
    return `url("${iconAssets[this.name]}")`;
  }
}

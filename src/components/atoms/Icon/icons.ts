import eyeOff from './assets/eye-off.svg';
import info from './assets/info.svg';
import home from './assets/home.svg';
import transfer from './assets/transfer.svg';
import wallet from './assets/wallet.svg';
import credit_card from './assets/credit-card.svg';
import search from './assets/search.svg';
import notification from './assets/notification.svg';
import arrow from './assets/arrow.svg';
import check from './assets/check.svg';
import close from './assets/close.svg';
import eye from './assets/eye.svg';
export const iconAssets = {
  home: home,
  transfer: transfer,
  wallet: wallet,
  'credit-card': credit_card,
  search: search,
  notification: notification,
  arrow: arrow,
  check: check,
  close: close,
  eye: eye,
  'eye-off': eyeOff,
  payment: credit_card,
  info,
} as const;
export type IconName = keyof typeof iconAssets;

import { type HTMLAttributes } from 'react';
import { type IconName } from './icons';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: 16 | 24;
  label?: string;
}

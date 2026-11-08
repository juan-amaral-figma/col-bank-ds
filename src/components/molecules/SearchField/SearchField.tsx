import { forwardRef } from 'react';
import { useControllable } from '../../../hooks/useControllable';
import { cx } from '../../../utils/cx';
import { Icon } from '../../atoms/Icon';
import { IconButton } from '../../atoms/IconButton';
import { TextInput } from '../../atoms/TextInput';
import { type SearchFieldProps } from './SearchField.types';

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    value,
    defaultValue = '',
    onChange,
    onClear,
    showClear = true,
    clearLabel = 'Limpiar búsqueda',
    searchIcon,
    clearButton,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const [text, setText] = useControllable(value, defaultValue);
  return (
    <TextInput
      {...props}
      value={text}
      ref={ref}
      type="search"
      wrapperClassName={cx('col-search-field', wrapperClassName)}
      leading={searchIcon ?? <Icon name="search" />}
      onChange={(e) => {
        setText(e.target.value);
        onChange?.(e);
      }}
      trailing={
        showClear && String(text).length > 0
          ? (clearButton ?? (
              <IconButton
                hierarchy="tertiary"
                disabled={props.disabled}
                icon={<Icon name="close" />}
                aria-label={clearLabel}
                onClick={() => {
                  setText('');
                  onClear?.();
                }}
              />
            ))
          : undefined
      }
    />
  );
});

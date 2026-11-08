import { useState } from 'react';
import { Panel } from '../_shared/Panel';
import { Button } from '../../atoms/Button';
import { AmountField } from '../../molecules/AmountField';
import { RecipientCard } from '../../molecules/RecipientCard';
import { type TransferFormProps } from './TransferForm.types';

export function TransferForm({
  heading = 'Datos de la transferencia',
  recipient,
  currency = 'COP',
  amountLabel = 'Monto a transferir',
  helperText = 'Ingresa un monto en pesos colombianos.',
  submitLabel = 'Continuar',
  invalidAmountMessage = 'Ingresa un monto mayor que cero con hasta dos decimales.',
  missingRecipientMessage = 'Elige un destinatario.',
  onSubmit,
  recipientSummary,
  amountField,
  continueButton,
  error,
  defaultAmount = '',
  submitting = false,
  submitProps,
  ...props
}: TransferFormProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [validation, setValidation] = useState('');
  const [pending, setPending] = useState(false);
  const busy = submitting || pending;
  const valid =
    /^(?:0|[1-9]\d*)(?:[.,]\d{1,2})?$/.test(amount) && Number(amount.replace(',', '.')) > 0;
  return (
    <Panel {...props} heading={heading}>
      <form
        className="col-stack"
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy) return;
          if (!recipient && !recipientSummary) {
            setValidation(missingRecipientMessage);
            return;
          }
          if (!valid) {
            setValidation(invalidAmountMessage);
            return;
          }
          setValidation('');
          setPending(true);
          try {
            await onSubmit?.({
              amount: amount.replace(',', '.'),
              currency,
              recipientId: recipient?.id ?? '',
            });
          } catch (cause) {
            setValidation(
              cause instanceof Error ? cause.message : 'No se pudo completar la solicitud.',
            );
          } finally {
            setPending(false);
          }
        }}
      >
        {recipientSummary ?? (recipient && <RecipientCard {...recipient} selected readOnly />)}
        {amountField ?? (
          <AmountField
            label={amountLabel}
            currency={currency}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setValidation('');
            }}
            placeholder="0,00"
            helperText={helperText}
            error={error || validation}
            disabled={busy}
          />
        )}
        {amountField && (error || validation) && (
          <div className="col-helper" role="alert">
            {error || validation}
          </div>
        )}
        {continueButton ?? (
          <Button
            {...submitProps}
            type="submit"
            loading={busy}
            disabled={submitProps?.disabled || (!amount && !amountField)}
          >
            {submitLabel}
          </Button>
        )}
      </form>
    </Panel>
  );
}

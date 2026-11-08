import {
  Icon,
  type AccountCardProps,
  type QuickActionProps,
  type Recipient,
  type TransactionItemProps,
} from '../../src';
export const accounts: (AccountCardProps & { id: string })[] = [
  {
    id: 'savings',
    accountType: 'Cuenta de Ahorros',
    accountNumber: '•••• 4582',
    balance: '$2.450.000 COP',
  },
  {
    id: 'secondary',
    accountType: 'Cuenta de Ahorros',
    accountNumber: '•••• 9031',
    balance: '$850.000 COP',
  },
];
export const recipients: Recipient[] = [
  {
    id: 'maria',
    initials: 'MG',
    recipientName: 'María González',
    bank: 'Col Bank',
    accountNumber: '•••• 9301',
  },
  {
    id: 'carlos',
    initials: 'CR',
    recipientName: 'Carlos Rojas',
    bank: 'Col Bank',
    accountNumber: '•••• 2048',
  },
];
export const transactions: (TransactionItemProps & { id: string })[] = [
  {
    id: 'salary',
    transactionName: 'Nómina',
    date: '14 oct 2026',
    amount: '2.800.000',
    direction: 'incoming',
    status: 'completed',
  },
  {
    id: 'groceries',
    transactionName: 'Mercado',
    date: '13 oct 2026',
    amount: '125.000',
    direction: 'outgoing',
    status: 'completed',
  },
  {
    id: 'transfer',
    transactionName: 'Transferencia',
    date: '13 oct 2026',
    amount: '150.000',
    direction: 'outgoing',
    status: 'pending',
  },
];
export const actions: (QuickActionProps & { id: string })[] = [
  { id: 'transfer', label: 'Transferir', icon: <Icon name="transfer" /> },
  { id: 'pay', label: 'Pagar', icon: <Icon name="credit-card" /> },
  { id: 'history', label: 'Movimientos', icon: <Icon name="wallet" /> },
];

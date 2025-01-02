export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount / 100);
}

export function parseAmount(amount: string): number {
  return Math.round(parseFloat(amount.replace(/[^0-9.-]+/g, '')) * 100);
}
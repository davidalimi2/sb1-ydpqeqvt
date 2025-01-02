import { TokenUsage } from '../types/billing';

export function exportUsageData(usageData: TokenUsage[]): void {
  const csvContent = [
    ['Date', 'Action', 'Tokens Used', 'Cost'].join(','),
    ...usageData.map(usage => [
      usage.timestamp.toISOString(),
      usage.action,
      usage.amount,
      (usage.cost / 100).toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `token-usage-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
import { useState, useEffect } from 'react';
import { TokenUsage, BillingInvoice } from '../types/billing';
import { calculateCustomerLifetimeValue } from '../utils/analytics/business';

interface FinancialMetrics {
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  customerLifetimeValue: number;
  tokenRevenue: number;
  seatRevenue: number;
  churnRate: number;
  trends: {
    mrrGrowth: number;
    arpuGrowth: number;
    clvGrowth: number;
  };
}

export function useFinancialMetrics(
  invoices: BillingInvoice[],
  tokenUsage: TokenUsage[],
  activeUsers: number
) {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    monthlyRecurringRevenue: 0,
    averageRevenuePerUser: 0,
    customerLifetimeValue: 0,
    tokenRevenue: 0,
    seatRevenue: 0,
    churnRate: 0,
    trends: {
      mrrGrowth: 0,
      arpuGrowth: 0,
      clvGrowth: 0
    }
  });

  useEffect(() => {
    // Calculate MRR
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getMonth() === currentMonth && 
             invoiceDate.getFullYear() === currentYear;
    });
    
    const mrr = currentMonthInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    
    // Calculate ARPU
    const arpu = activeUsers > 0 ? mrr / activeUsers : 0;
    
    // Calculate Token Revenue
    const monthlyTokenRevenue = tokenUsage
      .filter(usage => {
        const usageDate = new Date(usage.timestamp);
        return usageDate.getMonth() === currentMonth &&
               usageDate.getFullYear() === currentYear;
      })
      .reduce((sum, usage) => sum + usage.cost, 0);

    // Calculate Seat Revenue
    const monthlySeatRevenue = mrr - monthlyTokenRevenue;

    // Calculate CLV
    const clv = calculateCustomerLifetimeValue(mrr, metrics.churnRate, 100); // Example acquisition cost

    // Calculate Trends
    const lastMonth = new Date(currentYear, currentMonth - 1);
    const lastMonthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getMonth() === lastMonth.getMonth() &&
             invoiceDate.getFullYear() === lastMonth.getFullYear();
    });
    
    const lastMonthMrr = lastMonthInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const mrrGrowth = lastMonthMrr > 0 ? ((mrr - lastMonthMrr) / lastMonthMrr) * 100 : 0;

    setMetrics({
      monthlyRecurringRevenue: mrr,
      averageRevenuePerUser: arpu,
      customerLifetimeValue: clv,
      tokenRevenue: monthlyTokenRevenue,
      seatRevenue: monthlySeatRevenue,
      churnRate: 0.05, // Example: Calculate from actual churn data
      trends: {
        mrrGrowth,
        arpuGrowth: 0, // Calculate from historical ARPU data
        clvGrowth: 0 // Calculate from historical CLV data
      }
    });
  }, [invoices, tokenUsage, activeUsers]);

  return metrics;
}
import React, { useState } from 'react';
import { CreditCard, Zap, Settings } from 'lucide-react';
import { proseSubscriptionTiers, firmSubscriptionTiers, tokenPrices } from '../data/billingPlans';
import { BillingType, SubscriptionTier, TokenPrice } from '../types/billing';
import AutoRechargeSettings from '../components/billing/AutoRechargeSettings';
import TokenUsageChart from '../components/billing/TokenUsageChart';
import TokenUsageBreakdown from '../components/billing/TokenUsageBreakdown';
import UsageAlerts from '../components/billing/UsageAlerts';
import UsageForecast from '../components/billing/UsageForecast';
import TokenMonitor from '../components/billing/TokenMonitor';
import { useTokenMonitor } from '../hooks/useTokenMonitor';
import SubscriptionCard from '../components/billing/SubscriptionCard';
import BillingHistory from '../components/billing/BillingHistory';
import TokenPurchaseCard from '../components/billing/TokenPurchaseCard';

// Mock data - replace with actual API data
const mockBillingDetails = {
  customerId: 'cus_123',
  currentPlan: proseSubscriptionTiers[0],
  tokenBalance: 750,
  billingType: 'subscription' as BillingType,
  autoRecharge: true,
  autoRechargeThreshold: 100,
  autoRechargeAmount: 1000
};

export default function Billing() {
  const [activeTab, setActiveTab] = useState<'subscription' | 'token'>('subscription');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showSeatManager, setShowSeatManager] = useState(false);
  const { currentRate, averageRate, recentUsage } = useTokenMonitor(
    [
      { userId: '1', amount: 1200, timestamp: new Date(Date.now() - 3600000), action: 'Analysis', cost: 1200 },
      { userId: '1', amount: 1800, timestamp: new Date(Date.now() - 3000000), action: 'Generation', cost: 1800 },
      { userId: '1', amount: 1400, timestamp: new Date(Date.now() - 2400000), action: 'Analysis', cost: 1400 },
      { userId: '1', amount: 2200, timestamp: new Date(Date.now() - 1800000), action: 'Generation', cost: 2200 },
      { userId: '1', amount: 1900, timestamp: new Date(Date.now() - 1200000), action: 'Analysis', cost: 1900 },
      { userId: '1', amount: 800, timestamp: new Date(Date.now() - 600000), action: 'Generation', cost: 800 },
      { userId: '1', amount: 1100, timestamp: new Date(), action: 'Analysis', cost: 1100 }
    ]
  );
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning' as const,
      message: 'Token balance is below 1,000. Consider enabling auto-recharge.',
      date: new Date()
    },
    {
      id: '2',
      type: 'info' as const,
      message: 'Usage increased by 25% compared to last week.',
      date: new Date()
    }
  ]);

  const handleSubscribe = (tier: SubscriptionTier) => {
    console.log('Subscribe to tier:', tier);
  };

  const handleTokenPurchase = (price: TokenPrice) => {
    console.log('Purchase tokens:', price);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Billing & Subscription
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your subscription plan and token purchases
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Token Balance</h3>
              <p className="text-3xl font-bold text-gray-900">{mockBillingDetails.tokenBalance}</p>
            </div>
          </div>
          <button
            className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Auto-recharge Settings
          </button>
        </div>
      </div>

      {mockBillingDetails.billingType === 'subscription' && (
        <SeatBillingManager
          currentSeats={2}
          maxSeats={mockBillingDetails.currentPlan?.maxUsers || 5}
          pricePerSeat={49}
          onUpdateSeats={(seats) => {
            console.log('Update seats:', seats);
          }}
        />
      )}

      <TokenMonitor
        currentRate={currentRate}
        averageRate={averageRate}
        recentUsage={recentUsage}
        anomalyThreshold={50}
      />

      <UsageAlerts
        alerts={alerts}
        onDismiss={(id) => setAlerts(alerts.filter(alert => alert.id !== id))}
      />

      <TokenUsageChart
        data={[
          { date: 'Mon', amount: 1200, category: 'Analysis' },
          { date: 'Tue', amount: 1800, category: 'Generation' },
          { date: 'Wed', amount: 1400, category: 'Analysis' },
          { date: 'Thu', amount: 2200, category: 'Generation' },
          { date: 'Fri', amount: 1900, category: 'Analysis' },
          { date: 'Sat', amount: 800, category: 'Generation' },
          { date: 'Sun', amount: 1100, category: 'Analysis' },
        ]}
        totalUsage={10400}
        trend={12.5}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <TokenUsageBreakdown
          categories={[
            { category: 'Document Analysis', amount: 4500, color: '#818cf8' },
            { category: 'Content Generation', amount: 3200, color: '#34d399' },
            { category: 'Legal Research', amount: 2100, color: '#fbbf24' },
            { category: 'Contract Review', amount: 600, color: '#f87171' }
          ]}
          totalUsage={10400}
        />
        <UsageForecast
          usageData={[
            { userId: '1', amount: 1200, timestamp: new Date('2024-03-10'), action: 'Analysis', cost: 1200 },
            { userId: '1', amount: 1800, timestamp: new Date('2024-03-11'), action: 'Generation', cost: 1800 },
            { userId: '1', amount: 1400, timestamp: new Date('2024-03-12'), action: 'Analysis', cost: 1400 },
            { userId: '1', amount: 2200, timestamp: new Date('2024-03-13'), action: 'Generation', cost: 2200 },
            { userId: '1', amount: 1900, timestamp: new Date('2024-03-14'), action: 'Analysis', cost: 1900 },
            { userId: '1', amount: 800, timestamp: new Date('2024-03-15'), action: 'Generation', cost: 800 },
            { userId: '1', amount: 1100, timestamp: new Date('2024-03-16'), action: 'Analysis', cost: 1100 }
          ]}
          tokenBalance={mockBillingDetails.tokenBalance}
        />
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('subscription')}
            className={`${
              activeTab === 'subscription'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('token')}
            className={`${
              activeTab === 'token'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Purchase Tokens
          </button>
        </nav>
      </div>

      {activeTab === 'subscription' ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {subscriptionTiers.map((tier) => (
            <SubscriptionCard
              key={tier.id}
              tier={tier}
              isCurrentPlan={mockBillingDetails.currentPlan?.id === tier.id}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-4">
          {tokenPrices.map((price) => (
            <TokenPurchaseCard
              key={price.amount}
              tokenPrice={price}
              onPurchase={handleTokenPurchase}
            />
          ))}
        </div>
      )}
      
      <BillingHistory
        transactions={[
          {
            id: '1',
            date: new Date(),
            description: 'Monthly Subscription - Professional Plan',
            amount: 7900,
            status: 'succeeded',
            invoiceUrl: '#'
          },
          {
            id: '2',
            date: new Date(Date.now() - 86400000),
            description: 'Token Purchase - 5,000 Tokens',
            amount: 3999,
            status: 'succeeded',
            invoiceUrl: '#'
          }
        ]}
      />
      
      <AutoRechargeSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSettings={{
          enabled: mockBillingDetails.autoRecharge,
          threshold: mockBillingDetails.autoRechargeThreshold,
          amount: mockBillingDetails.autoRechargeAmount
        }}
        onSave={(settings) => {
          console.log('Save auto-recharge settings:', settings);
          setIsSettingsOpen(false);
        }}
      />
    </div>
  );
}
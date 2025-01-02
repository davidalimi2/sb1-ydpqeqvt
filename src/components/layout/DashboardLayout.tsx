import React from 'react';
import { LayoutDashboard, Users, Settings, FileText, CreditCard, BarChart3, Shield, Bell, Building2, Zap, HelpCircle, Mail, Phone, Bot } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { canAccessRoute } from '../../utils/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', resource: 'dashboard' },
  { icon: Users, label: 'User Management', href: '/dashboard/users', resource: 'users' },
  { icon: Building2, label: 'Employee Access', href: '/dashboard/employee-access', resource: 'users' },
  { icon: Zap, label: 'AI Playground', href: '/dashboard/ai-playground', resource: 'ai' },
  { icon: Phone, label: 'CRM', href: '/dashboard/crm', resource: 'content' },
  { icon: CreditCard, label: 'Subscriptions', href: '/dashboard/subscriptions', resource: 'billing' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', resource: 'analytics' },
  { icon: Users, label: 'Lawyer Network', href: '/dashboard/lawyer-network', resource: 'users' },
  { icon: Shield, label: 'Security', href: '/dashboard/security', resource: 'security' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', resource: 'settings' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', resource: 'settings' },
  { icon: HelpCircle, label: 'Support', href: '/dashboard/support', resource: 'support' }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { permissions } = useAuth();

  // Filter navigation items based on user permissions
  const filteredItems = navigationItems.filter(item =>
    canAccessRoute(permissions, item.href)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={filteredItems} />
      <div className="lg:pl-72">
        <Header />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
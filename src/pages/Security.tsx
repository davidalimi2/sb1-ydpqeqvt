import React from 'react';
import { Shield } from 'lucide-react';
import TwoFactorSettings from '../components/security/TwoFactorSettings';
import APIKeyManagement from '../components/security/APIKeyManagement';
import SecurityAuditLog from '../components/security/SecurityAuditLog';
import SecuritySettings from '../components/security/SecuritySettings';

export default function Security() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Security Settings
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage security settings, API keys, and monitor security events
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Two-Factor Authentication */}
        <TwoFactorSettings />

        {/* Security Settings */}
        <SecuritySettings />

        {/* API Key Management */}
        <APIKeyManagement />

        {/* Security Audit Log */}
        <SecurityAuditLog />
      </div>
    </div>
  );
}
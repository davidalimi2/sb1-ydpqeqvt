import React, { useState } from 'react';
import { QrCode, Smartphone, Mail, Key } from 'lucide-react';

export default function TwoFactorSettings() {
  const [method, setMethod] = useState<'app' | 'sms' | 'email'>('app');
  const [isEnabled, setIsEnabled] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleEnable2FA = () => {
    setShowQR(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Two-Factor Authentication (2FA)
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Add an extra layer of security to your account</p>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="2fa-method"
                checked={method === 'app'}
                onChange={() => setMethod('app')}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="ml-3 flex items-center">
                <Smartphone className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Authenticator App
                  </span>
                  <span className="block text-sm text-gray-500">
                    Use Google Authenticator or similar apps
                  </span>
                </div>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="2fa-method"
                checked={method === 'sms'}
                onChange={() => setMethod('sms')}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="ml-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    SMS Authentication
                  </span>
                  <span className="block text-sm text-gray-500">
                    Receive codes via text message
                  </span>
                </div>
              </label>
            </div>
          </div>

          {!isEnabled && (
            <div className="mt-5">
              <button
                type="button"
                onClick={handleEnable2FA}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Key className="h-4 w-4 mr-2" />
                Enable 2FA
              </button>
            </div>
          )}

          {showQR && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-center">
                <QrCode className="h-48 w-48 text-gray-400" />
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Scan this QR code with your authenticator app
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Enter verification code
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter 6-digit code"
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEnabled && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Recovery Codes
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Save these backup codes in a secure place</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <code key={i} className="block p-2 bg-gray-50 rounded border font-mono text-sm">
                  XXXX-XXXX-XXXX
                </code>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
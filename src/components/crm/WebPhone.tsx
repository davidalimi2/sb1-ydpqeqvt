import React, { useEffect, useState } from 'react';
import { Phone, MicOff, PhoneOff } from 'lucide-react';
import { initializeWebPhone, makeCall, endCall, toggleMute } from '../../services/communications/webphone';
import { CRMConfig } from '../../types/crm';

interface WebPhoneProps {
  config: CRMConfig;
  phoneNumber?: string;
}

export default function WebPhone({ config, phoneNumber }: WebPhoneProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function initialize() {
      try {
        await initializeWebPhone(config);
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize WebPhone');
        console.error(err);
      }
    }

    if (config.voip.settings.webRTCEnabled) {
      initialize();
    }
  }, [config]);

  const handleCall = async () => {
    if (!phoneNumber) return;

    try {
      if (isCallActive) {
        endCall();
        setIsCallActive(false);
      } else {
        await makeCall(phoneNumber);
        setIsCallActive(true);
      }
    } catch (err) {
      setError('Call failed');
      console.error(err);
    }
  };

  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  if (!config.voip.settings.webRTCEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-2 bg-white shadow-lg rounded-lg p-4">
        {isCallActive && (
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-full ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <MicOff className="h-5 w-5" />
          </button>
        )}
        
        <button
          onClick={handleCall}
          disabled={!isInitialized || !phoneNumber}
          className={`p-3 rounded-full ${
            isCallActive
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isCallActive ? (
            <PhoneOff className="h-6 w-6" />
          ) : (
            <Phone className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}
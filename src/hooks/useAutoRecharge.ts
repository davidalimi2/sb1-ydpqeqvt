import { useState } from 'react';
import { TokenPrice } from '../types/billing';

interface AutoRechargeSettings {
  enabled: boolean;
  threshold: number;
  amount: number;
}

interface AutoRechargeHook {
  settings: AutoRechargeSettings;
  updateSettings: (newSettings: Partial<AutoRechargeSettings>) => void;
  validateSettings: () => string | undefined;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AutoRechargeSettings = {
  enabled: false,
  threshold: 100,
  amount: 1000
};

export function useAutoRecharge(initialSettings?: Partial<AutoRechargeSettings>): AutoRechargeHook {
  const [settings, setSettings] = useState<AutoRechargeSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings
  });

  const updateSettings = (newSettings: Partial<AutoRechargeSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  };

  const validateSettings = (): string | undefined => {
    if (!settings.enabled) return undefined;
    if (settings.threshold >= settings.amount) {
      return 'Threshold must be less than recharge amount';
    }
    if (settings.threshold < 0 || settings.amount < 0) {
      return 'Values cannot be negative';
    }
    return undefined;
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSettings,
    validateSettings,
    resetSettings
  };
}
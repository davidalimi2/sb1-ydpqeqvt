import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

interface SocialMediaProfile {
  platform: string;
  url: string;
  icon: typeof Facebook;
  enabled: boolean;
}

export default function SocialMediaSettings() {
  const [profiles, setProfiles] = useState<SocialMediaProfile[]>([
    { platform: 'Facebook', url: '', icon: Facebook, enabled: true },
    { platform: 'Twitter', url: '', icon: Twitter, enabled: true },
    { platform: 'Instagram', url: '', icon: Instagram, enabled: true },
    { platform: 'LinkedIn', url: '', icon: Linkedin, enabled: true }
  ]);

  const handleSave = () => {
    console.log('Saving social media settings:', profiles);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>
        <div className="mt-6 space-y-6">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <div key={profile.platform} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">
                    {profile.platform}
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      value={profile.url}
                      onChange={(e) => {
                        const newProfiles = [...profiles];
                        newProfiles[index].url = e.target.value;
                        setProfiles(newProfiles);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={`Enter your ${profile.platform} URL`}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.enabled}
                      onChange={(e) => {
                        const newProfiles = [...profiles];
                        newProfiles[index].enabled = e.target.checked;
                        setProfiles(newProfiles);
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
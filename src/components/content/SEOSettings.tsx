import React, { useState } from 'react';
import { Globe, Search, Tag } from 'lucide-react';

interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  googleVerification: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
  canonicalUrl: string;
}

export default function SEOSettings() {
  const [settings, setSettings] = useState<SEOSettings>({
    title: 'Legal Tech Platform',
    description: 'Advanced legal technology solutions for modern law firms',
    keywords: ['legal tech', 'law firm software', 'legal automation'],
    ogImage: 'https://example.com/og-image.jpg',
    googleVerification: '',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapEnabled: true,
    canonicalUrl: 'https://example.com'
  });

  const handleSave = () => {
    console.log('Saving SEO settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            SEO Settings
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Site Title
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <Globe className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <div className="mt-1">
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Keywords
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={settings.keywords.join(', ')}
                  onChange={(e) => setSettings({
                    ...settings,
                    keywords: e.target.value.split(',').map(k => k.trim())
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                OG Image URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  value={settings.ogImage}
                  onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Google Site Verification
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={settings.googleVerification}
                  onChange={(e) => setSettings({ ...settings, googleVerification: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Google verification meta tag content"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                robots.txt Content
              </label>
              <div className="mt-1">
                <textarea
                  value={settings.robotsTxt}
                  onChange={(e) => setSettings({ ...settings, robotsTxt: e.target.value })}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.sitemapEnabled}
                  onChange={(e) => setSettings({ ...settings, sitemapEnabled: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable XML Sitemap
                </label>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Canonical URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  value={settings.canonicalUrl}
                  onChange={(e) => setSettings({ ...settings, canonicalUrl: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
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
    </div>
  );
}
import React, { useState } from 'react';
import { Layout, Image, Type, Link } from 'lucide-react';

interface HomepageSection {
  id: string;
  type: 'hero' | 'features' | 'about' | 'cta';
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
}

export default function HomepageEditor() {
  const [sections, setSections] = useState<HomepageSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Welcome to Our Platform',
      content: 'Your trusted legal technology solution',
      imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744',
      buttonText: 'Get Started',
      buttonLink: '/signup',
      order: 1
    }
  ]);

  const handleSectionChange = (id: string, updates: Partial<HomepageSection>) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const addSection = (type: HomepageSection['type']) => {
    const newSection: HomepageSection = {
      id: crypto.randomUUID(),
      type,
      title: 'New Section',
      content: '',
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Homepage Editor</h3>
          <p className="mt-1 text-sm text-gray-500">
            Customize your homepage sections and content
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex space-x-3">
            <button
              onClick={() => addSection('hero')}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <Layout className="h-4 w-4 mr-2" />
              Add Section
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Type className="h-5 w-5 text-gray-400" />
                  <h4 className="ml-2 text-sm font-medium text-gray-900">
                    {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const newOrder = Math.max(1, section.order - 1);
                      handleSectionChange(section.id, { order: newOrder });
                    }}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => {
                      const newOrder = section.order + 1;
                      handleSectionChange(section.id, { order: newOrder });
                    }}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(section.id, { title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleSectionChange(section.id, { content: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {section.type === 'hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          value={section.imageUrl}
                          onChange={(e) => handleSectionChange(section.id, { imageUrl: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={section.buttonText}
                          onChange={(e) => handleSectionChange(section.id, { buttonText: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={section.buttonLink}
                          onChange={(e) => handleSectionChange(section.id, { buttonLink: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
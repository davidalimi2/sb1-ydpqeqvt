import React, { useState } from 'react';
import { Mail, Plus, Search } from 'lucide-react';
import { EmailTemplate, EmailTemplateType } from '../../types/email';
import EmailTemplateEditor from './EmailTemplateEditor';

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    type: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to {{company_name}}',
    content: 'Dear {{user_name}},\n\nWelcome to {{company_name}}!',
    variables: ['user_name', 'company_name'],
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function EmailTemplateManager() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (template: EmailTemplate) => {
    if (template.id) {
      setTemplates(templates.map(t => t.id === template.id ? template : t));
    } else {
      setTemplates([...templates, { ...template, id: crypto.randomUUID() }]);
    }
    setSelectedTemplate(null);
  };

  const createTemplate = (type: EmailTemplateType) => {
    const newTemplate: EmailTemplate = {
      id: '',
      type,
      name: `New ${type.replace('_', ' ')} Template`,
      subject: '',
      content: '',
      variables: [],
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSelectedTemplate(newTemplate);
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {selectedTemplate ? (
        <EmailTemplateEditor
          template={selectedTemplate}
          onSave={handleSave}
          onCancel={() => setSelectedTemplate(null)}
        />
      ) : (
        <>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your email templates and automated messages
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => createTemplate('welcome')}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search templates..."
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <ul role="list" className="divide-y divide-gray-200">
              {filteredTemplates.map((template) => (
                <li
                  key={template.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <p className="ml-2 text-sm font-medium text-indigo-600 truncate">
                          {template.name}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {template.type.replace('_', ' ')}
                        </p>
                        {template.isDefault && (
                          <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Default
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-500">
                          {template.subject}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Updated {template.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
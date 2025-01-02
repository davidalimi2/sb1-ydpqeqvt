import React from 'react';
import { Template } from '../../types/content';
import { FileText, Copy, Star } from 'lucide-react';

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Service Agreement',
    description: 'Standard service agreement template with customizable terms',
    content: '',
    variables: ['client_name', 'service_description', 'payment_terms'],
    category: 'Contracts',
    usage_count: 156,
    created_by: 'john@example.com',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-03-10')
  },
  {
    id: '2',
    name: 'Employment Contract',
    description: 'Employment agreement template with standard clauses',
    content: '',
    variables: ['employee_name', 'position', 'salary', 'start_date'],
    category: 'Employment',
    usage_count: 89,
    created_by: 'jane@example.com',
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-03-15')
  }
];

export default function TemplateLibrary() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Template Library</h3>
          <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Create Template
          </button>
        </div>
      </div>

      <ul role="list" className="divide-y divide-gray-200">
        {mockTemplates.map((template) => (
          <li key={template.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-gray-400" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {template.usage_count} uses
                    <span className="mx-2">•</span>
                    {template.category}
                    <span className="mx-2">•</span>
                    {template.variables.length} variables
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <Copy className="h-4 w-4 mr-2" />
                  Use Template
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
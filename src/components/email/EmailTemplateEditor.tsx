import React, { useState } from 'react';
import { Save, Code, Variable } from 'lucide-react';
import { EmailTemplate, EmailTemplateType } from '../../types/email';

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onCancel: () => void;
}

export default function EmailTemplateEditor({
  template,
  onSave,
  onCancel
}: EmailTemplateEditorProps) {
  const [editedTemplate, setEditedTemplate] = useState(template);
  const [showVariables, setShowVariables] = useState(false);

  const handleSave = () => {
    onSave({
      ...editedTemplate,
      updatedAt: new Date()
    });
  };

  const insertVariable = (variable: string) => {
    const textArea = document.getElementById('email-content') as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const content = editedTemplate.content;
    const newContent = content.substring(0, start) + 
                      `{{${variable}}}` + 
                      content.substring(end);
    
    setEditedTemplate({ ...editedTemplate, content: newContent });
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template Name
            </label>
            <input
              type="text"
              value={editedTemplate.name}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject Line
            </label>
            <input
              type="text"
              value={editedTemplate.subject}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, subject: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Email Content
              </label>
              <button
                type="button"
                onClick={() => setShowVariables(!showVariables)}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <Variable className="h-4 w-4 mr-1" />
                Variables
              </button>
            </div>
            {showVariables && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500 mb-2">Available Variables:</div>
                <div className="flex flex-wrap gap-2">
                  {editedTemplate.variables.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => insertVariable(variable)}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <textarea
              id="email-content"
              rows={15}
              value={editedTemplate.content}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editedTemplate.isDefault}
              onChange={(e) => setEditedTemplate({ ...editedTemplate, isDefault: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-700">
              Set as default template for {editedTemplate.type.replace('_', ' ')}
            </label>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </button>
      </div>
    </div>
  );
}
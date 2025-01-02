import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface SignatureEditorProps {
  initialSignature?: string;
  onSave: (signature: string) => void;
}

export default function SignatureEditor({ initialSignature = '', onSave }: SignatureEditorProps) {
  const [signature, setSignature] = useState(initialSignature);
  const [isHtml, setIsHtml] = useState(false);

  const handleSave = () => {
    onSave(signature);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Signature</h3>
        
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsHtml(!isHtml)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {isHtml ? 'Switch to Rich Text' : 'Switch to HTML'}
            </button>
          </div>

          {isHtml ? (
            <textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              rows={10}
              className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="<div>Your HTML signature here</div>"
            />
          ) : (
            <div className="border rounded-md p-4">
              <div
                contentEditable
                dangerouslySetInnerHTML={{ __html: signature }}
                onBlur={(e) => setSignature(e.currentTarget.innerHTML)}
                className="prose max-w-none focus:outline-none"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface EmailComposerProps {
  onSend: (email: {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    content: string;
    attachments: File[];
  }) => void;
  onCancel: () => void;
  signature?: string;
}

export default function EmailComposer({ onSend, onCancel, signature }: EmailComposerProps) {
  const [to, setTo] = useState<string[]>([]);
  const [cc, setCc] = useState<string[]>([]);
  const [bcc, setBcc] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ to, cc, bcc, subject, content: content + '\n\n' + (signature || ''), attachments });
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg">
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <div className="space-x-2 text-sm">
              <button
                type="button"
                onClick={() => setShowCc(!showCc)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cc
              </button>
              <button
                type="button"
                onClick={() => setShowBcc(!showBcc)}
                className="text-gray-500 hover:text-gray-700"
              >
                Bcc
              </button>
            </div>
          </div>
          <input
            type="text"
            value={to.join(', ')}
            onChange={(e) => setTo(e.target.value.split(',').map(email => email.trim()))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {showCc && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Cc</label>
            <input
              type="text"
              value={cc.join(', ')}
              onChange={(e) => setCc(e.target.value.split(',').map(email => email.trim()))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {showBcc && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Bcc</label>
            <input
              type="text"
              value={bcc.join(', ')}
              onChange={(e) => setBcc(e.target.value.split(',').map(email => email.trim()))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Attachments</label>
          <div className="mt-2 space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
              <input type="file" className="hidden" multiple onChange={handleAttachment} />
            </label>
          </div>
        </div>

        {signature && (
          <div className="border-t pt-4">
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </button>
      </div>
    </form>
  );
}
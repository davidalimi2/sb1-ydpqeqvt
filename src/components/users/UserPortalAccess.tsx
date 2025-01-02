import React, { useState } from 'react';
import { User } from '../../types/auth';
import { Eye, Link, Copy, CheckCircle } from 'lucide-react';

interface UserPortalAccessProps {
  user: User;
  onGenerateAccess: (userId: string) => Promise<string>;
}

export default function UserPortalAccess({ user, onGenerateAccess }: UserPortalAccessProps) {
  const [accessLink, setAccessLink] = useState<string>();
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAccess = async () => {
    setIsGenerating(true);
    try {
      const link = await onGenerateAccess(user.id);
      setAccessLink(link);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (accessLink) {
      await navigator.clipboard.writeText(accessLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Portal Access
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Generate a secure portal access link for {user.name}</p>
            </div>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <button
              type="button"
              onClick={handleGenerateAccess}
              disabled={isGenerating}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Link className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Access'}
            </button>
          </div>
        </div>

        {accessLink && (
          <div className="mt-5">
            <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
              <div className="flex-1 truncate mr-4">
                <code className="text-sm text-gray-600">{accessLink}</code>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center text-gray-400 hover:text-gray-600"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This link will expire in 24 hours
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { UserPlus, Mail } from 'lucide-react';
import { MemberRole } from '../../types/organization';

interface MemberInviteProps {
  onInvite: (emails: string[], role: MemberRole) => Promise<void>;
  availableRoles: MemberRole[];
}

export default function MemberInvite({ onInvite, availableRoles }: MemberInviteProps) {
  const [emails, setEmails] = useState<string>('');
  const [role, setRole] = useState<MemberRole>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailList = emails.split(',').map(email => email.trim()).filter(Boolean);
      await onInvite(emailList, role);
      setEmails('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Invite Team Members
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Invite lawyers and staff to join your organization.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="emails" className="block text-sm font-medium text-gray-700">
              Email Addresses
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="emails"
                  id="emails"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="email@example.com, email2@example.com"
                />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="relative -ml-px rounded-none rounded-r-md border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !emails.trim()}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Sending Invites...' : 'Send Invites'}
          </button>
        </form>
      </div>
    </div>
  );
}
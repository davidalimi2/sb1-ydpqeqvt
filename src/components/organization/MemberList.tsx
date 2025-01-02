import React from 'react';
import { User, UserMinus, Shield } from 'lucide-react';
import { OrganizationMember, MemberRole } from '../../types/organization';
import { formatDate } from '../../utils/date';

interface MemberListProps {
  members: OrganizationMember[];
  onRemoveMember: (memberId: string) => void;
  onUpdateRole: (memberId: string, newRole: MemberRole) => void;
  currentUserRole: MemberRole;
}

export default function MemberList({
  members,
  onRemoveMember,
  onUpdateRole,
  currentUserRole
}: MemberListProps) {
  const canManageMembers = ['owner', 'admin'].includes(currentUserRole);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Team Members
        </h3>
        
        <div className="mt-6 flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {members.map((member) => (
              <li key={member.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-x-3">
                    <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {member.title || 'Team Member'}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {member.department && `${member.department} • `}
                        Joined {formatDate(member.joinedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-x-3">
                    {canManageMembers && (
                      <>
                        <select
                          value={member.role}
                          onChange={(e) => onUpdateRole(member.id, e.target.value as MemberRole)}
                          className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          {currentUserRole === 'owner' && (
                            <option value="owner">Owner</option>
                          )}
                        </select>
                        
                        <button
                          onClick={() => onRemoveMember(member.id)}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <UserMinus className="h-4 w-4 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
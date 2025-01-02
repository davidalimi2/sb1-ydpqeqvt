import React from 'react';
import { Building2, Users } from 'lucide-react';
import { Organization, OrganizationType } from '../../types/organization';

interface OrganizationFormProps {
  onSubmit: (data: Partial<Organization>) => void;
  onCancel: () => void;
  initialData?: Partial<Organization>;
}

export default function OrganizationForm({ onSubmit, onCancel, initialData }: OrganizationFormProps) {
  const organizationTypes: { value: OrganizationType; label: string }[] = [
    { value: 'law_firm', label: 'Law Firm' },
    { value: 'solo_practice', label: 'Solo Practice' },
    { value: 'legal_department', label: 'Legal Department' }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      type: formData.get('type') as OrganizationType,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <Building2 className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? 'Edit Organization' : 'Create Organization'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={initialData?.name}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Organization Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={initialData?.type || 'law_firm'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {organizationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {initialData ? 'Save Changes' : 'Create Organization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
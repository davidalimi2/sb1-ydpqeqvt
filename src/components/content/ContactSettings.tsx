import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  googleMapsEmbed: string;
}

export default function ContactSettings() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    phone: '',
    email: '',
    hours: {
      weekday: '9:00 AM - 5:00 PM',
      weekend: 'Closed'
    },
    googleMapsEmbed: ''
  });

  const handleSave = () => {
    console.log('Saving contact settings:', contactInfo);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Address</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  value={contactInfo.address.street}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    address: { ...contactInfo.address, street: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={contactInfo.address.city}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    address: { ...contactInfo.address, city: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  value={contactInfo.address.state}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    address: { ...contactInfo.address, state: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={contactInfo.address.zip}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    address: { ...contactInfo.address, zip: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  value={contactInfo.address.country}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    address: { ...contactInfo.address, country: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Phone</h4>
            </div>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Email</h4>
            </div>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Business Hours</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weekdays
                </label>
                <input
                  type="text"
                  value={contactInfo.hours.weekday}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    hours: { ...contactInfo.hours, weekday: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weekends
                </label>
                <input
                  type="text"
                  value={contactInfo.hours.weekend}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    hours: { ...contactInfo.hours, weekend: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Google Maps Embed Code
            </label>
            <textarea
              value={contactInfo.googleMapsEmbed}
              onChange={(e) => setContactInfo({ ...contactInfo, googleMapsEmbed: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Paste your Google Maps embed code here"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
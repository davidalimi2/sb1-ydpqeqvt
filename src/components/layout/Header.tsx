import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" />
          <input
            type="search"
            name="search"
            className="block h-full w-full border-0 py-0 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-500">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button className="flex items-center gap-2">
            <User className="h-8 w-8 rounded-full bg-gray-50 p-1" />
            <span className="hidden lg:flex lg:items-center">
              <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                Admin User
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
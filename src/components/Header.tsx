import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-[#0d1117] border-b border-gray-800 flex items-center px-4 fixed top-0 right-0 left-64">
      <div className="flex-1 flex items-center">
        <div className="max-w-xl flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or jump to..."
              className="w-full bg-gray-900 text-gray-300 pl-10 pr-4 py-1.5 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-300">
          <Bell size={18} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-sm text-gray-300">JD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
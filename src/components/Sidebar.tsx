import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  CircleUser,
  CircleUserRound,
  ShoppingBag,
  FileText,
  Settings
} from 'lucide-react';

const navItems = [
  { icon: <Home size={18} />, text: 'Home', path: '/' },
  { icon: <CircleUser size={18} />, text: 'Kunden', path: '/customers' },
  { icon: <ShoppingBag size={18} />, text: 'Produkte', path: '/products' },
  { icon: <FileText size={18} />, text: 'Rechnungen', path: '/invoices' },
];

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#0d1117] text-gray-300 fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <CircleUserRound className="w-8 h-8" />
          <span className="text-lg font-semibold">farrier.cloud</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-2 py-2 rounded-md transition-colors duration-150
                  ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`
                }
              >
                <span className="text-gray-400">{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-2 py-2 rounded-md transition-colors duration-150
            ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`
          }
        >
          <Settings size={18} className="text-gray-400" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
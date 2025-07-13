import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  LogOut,
} from 'lucide-react';

interface MenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Menu: React.FC<MenuProps> = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
      <ul>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === 'dashboard' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === 'pages' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveTab('pages')}
        >
          Pages
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === 'components' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveTab('components')}
        >
          Components
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === 'settings' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === 'users' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </li>
      </ul>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mt-4"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Menu;

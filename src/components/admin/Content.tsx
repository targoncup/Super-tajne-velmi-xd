import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useContent } from '../../hooks/useContent';
import { useRegistrations } from '../../hooks/useRegistrations';
import { TeamRegistration } from '../../config/admin';
import {
  Lock,
  LogOut,
  Save,
  RotateCcw,
  Edit3,
  Eye,
  EyeOff,
  Shield,
  Check,
  AlertCircle,
  X,
  Home,
  Settings,
  Users,
  Calendar,
  Mail,
  Phone,
  User,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  FileText
} from 'lucide-react';

interface ContentProps {
  activeTab: string;
}

const Content: React.FC<ContentProps> = ({ activeTab }) => {
  const { content, updateContent, resetContent } = useContent();
  const { registrations, getRegistrationStats } = useRegistrations();
  const stats = getRegistrationStats();

  return (
    <div className="flex-1 p-4">
      {activeTab === 'dashboard' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold">Total Registrations</h3>
              <p className="text-2xl">{stats.total}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold">Pending Registrations</h3>
              <p className="text-2xl">{stats.pending}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold">Approved Registrations</h3>
              <p className="text-2xl">{stats.approved}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold">Rejected Registrations</h3>
              <p className="text-2xl">{stats.rejected}</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'pages' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(content).map((page) => (
              <div key={page} className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-bold">{page}</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'components' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Components</h2>
          <p>Coming soon...</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p>Coming soon...</p>
        </div>
      )}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <p>Coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default Content;

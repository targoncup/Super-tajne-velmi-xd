import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useContent } from '../hooks/useContent';
import { useSupabaseRegistrations } from '../hooks/useSupabaseRegistrations';
import { TeamRegistration, SiteContent } from '../config/admin';
import ContentEditor from '../components/admin/ContentEditor';
import UniversalContentEditor from '../components/admin/UniversalContentEditor';
import RegistrationDetail from '../components/admin/RegistrationDetail';
import { 
  Lock, 
  LogOut, 
  RotateCcw, 
  Edit3,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
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
  FileText,
  BarChart3,
  Globe,
  Palette,
  Database,
  RefreshCw,
  Type,
  Download,
  Archive
} from 'lucide-react';

const Admin: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { content, resetContent } = useContent();
  const { 
    registrations, 
    loading: registrationsLoading, 
    error: registrationsError,
    updateRegistrationStatus, 
    deleteRegistration, 
    getRegistrationStats,
    refetch: refetchRegistrations
  } = useSupabaseRegistrations();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRegistration, setSelectedRegistration] = useState<TeamRegistration | null>(null);
  const [editingSection, setEditingSection] = useState<keyof SiteContent | null>(null);
  const [showUniversalEditor, setShowUniversalEditor] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const stats = getRegistrationStats();

  const downloadAllLogos = () => {
    const teamsWithLogos = registrations.filter(reg => reg.logo);
    
    if (teamsWithLogos.length === 0) {
      alert('Žádné týmy nemají nahraná loga.');
      return;
    }

    teamsWithLogos.forEach((registration) => {
      if (registration.logo) {
        const link = document.createElement('a');
        link.href = registration.logo.data;
        link.download = `${registration.teamName}_${registration.teamTag}_logo.${registration.logo.type.split('/')[1]}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (login(password)) {
        setPassword('');
        setLoginError('');
      } else {
        setLoginError('Nesprávné heslo');
      }
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: TeamRegistration['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 border-yellow-500/30 text-yellow-400';
      case 'approved':
        return 'bg-green-600/20 border-green-500/30 text-green-400';
      case 'rejected':
        return 'bg-red-600/20 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-600/20 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusIcon = (status: TeamRegistration['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'approved':
        return <CheckCircle className="w-3 h-3" />;
      case 'rejected':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: TeamRegistration['status']): string => {
    switch (status) {
      case 'pending':
        return 'Čekající';
      case 'approved':
        return 'Schváleno';
      case 'rejected':
        return 'Zamítnuto';
      default:
        return 'Neznámý';
    }
  };

  const handleStatusUpdate = (id: string, status: TeamRegistration['status']) => {
    updateRegistrationStatus(id, status).catch((error) => {
      console.error('Failed to update registration status:', error);
    });
  };

  const handleDeleteRegistration = (id: string) => {
    if (window.confirm('Opravdu chcete smazat tuto registraci? Tato akce je nevratná.')) {
      deleteRegistration(id).then(() => {
        if (selectedRegistration?.id === id) {
          setSelectedRegistration(null);
        }
      }).catch((error) => {
        console.error('Failed to delete registration:', error);
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete obnovit všechen obsah na výchozí hodnoty? Tato akce je nevratná.')) {
      setIsLoading(true);
      setTimeout(() => {
        resetContent();
        setIsLoading(false);
      }, 1000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-800 text-white pt-20">
        <div className="max-w-md mx-auto px-4 py-24">
          <div className="bg-gray-700 rounded-2xl p-8 border border-gray-600 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Přístup</h1>
              <p className="text-gray-300">Zadejte heslo pro přístup k administraci</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Heslo *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none pr-12"
                    placeholder="Zadejte admin heslo"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginError && (
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">{loginError}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Přihlašování...' : 'Přihlásit se'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen border-r border-gray-700">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-gray-400">Targon Cup</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('registrations')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'registrations' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Registrace</span>
                {stats.pending > 0 && (
                  <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pending}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'content' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Obsah Stránek</span>
              </button>

              <button
                onClick={() => setShowUniversalEditor(true)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  showUniversalEditor 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Type className="w-5 h-5" />
                <span>Univerzální Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Nastavení</span>
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Odhlásit se</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-800">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <button
                  onClick={refetchRegistrations}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Obnovit</span>
                </button>
                <button
                  onClick={downloadAllLogos}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  <span>Stáhnout všechna loga</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Celkem Registrací</p>
                      <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Čekající</p>
                      <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Schválené</p>
                      <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Zamítnuté</p>
                      <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Registrations */}
              <div className="bg-gray-700 rounded-xl border border-gray-600">
                <div className="p-6 border-b border-gray-600">
                  <h2 className="text-xl font-bold text-white">Nejnovější Registrace</h2>
                </div>
                <div className="p-6">
                  {registrationsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : registrations.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      Žádné registrace zatím
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {registrations.slice(0, 5).map((registration) => (
                        <div key={registration.id} className="flex items-center justify-between p-4 bg-gray-600/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{registration.teamName}</h3>
                              <p className="text-sm text-gray-400">{registration.captainName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(registration.status)}`}>
                              {getStatusIcon(registration.status)}
                              <span>{getStatusText(registration.status)}</span>
                            </div>
                            <button
                              onClick={() => setSelectedRegistration(registration)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              Zobrazit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Registrations */}
          {activeTab === 'registrations' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Registrace Týmů</h1>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={refetchRegistrations}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Obnovit</span>
                  </button>
                  <button
                    onClick={downloadAllLogos}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Stáhnout všechna loga</span>
                  </button>
                </div>
              </div>

              {registrationsError && (
                <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">Chyba: {registrationsError}</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-700 rounded-xl border border-gray-600">
                <div className="p-6">
                  {registrationsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : registrations.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Žádné registrace</h3>
                      <p>Zatím se neregistroval žádný tým</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {registrations.map((registration) => (
                        <div key={registration.id} className="flex items-center justify-between p-6 bg-gray-600/50 rounded-lg border border-gray-500 hover:border-gray-400 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{registration.teamName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>#{registration.teamTag}</span>
                                <span>•</span>
                                <span>{registration.captainName}</span>
                                <span>•</span>
                                <span>{formatDate(registration.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(registration.status)}`}>
                              {getStatusIcon(registration.status)}
                              <span>{getStatusText(registration.status)}</span>
                            </div>
                            <button
                              onClick={() => setSelectedRegistration(registration)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                              Zobrazit
                            </button>
                            <button
                              onClick={() => handleDeleteRegistration(registration.id)}
                              className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Správa Obsahu</h1>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowUniversalEditor(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Type className="w-4 h-4" />
                    <span>Univerzální Editor</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Obnovit na výchozí</span>
                  </button>
                </div>
              </div>

              {/* Page Visibility Controls */}
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 mb-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-400" />
                  Viditelnost Stránek v Navigaci
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'tournament', label: 'Turnaj', icon: Calendar },
                    { key: 'register', label: 'Registrace', icon: Users },
                    { key: 'rules', label: 'Pravidla', icon: FileText },
                    { key: 'champions', label: 'Šampioni', icon: Crown },
                    { key: 'contact', label: 'Kontakt', icon: Mail }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-medium">{label}</span>
                      </div>
                      <button
                        onClick={() => {
                          const newContent = { ...content };
                          newContent.navigation.pageVisibility[key] = !newContent.navigation.pageVisibility[key];
                          updateContent(newContent);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          content.navigation.pageVisibility[key] 
                            ? 'bg-blue-600' 
                            : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            content.navigation.pageVisibility[key] 
                              ? 'translate-x-6' 
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-300">
                    <strong>Poznámka:</strong> Vypnuté stránky se nebudou zobrazovat v navigačním menu, ale budou stále dostupné přes přímý odkaz.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(content).map(([sectionKey, sectionContent]) => {
                  const getSectionIcon = (key: string) => {
                    switch (key) {
                      case 'home': return <Home className="w-6 h-6" />;
                      case 'tournament': return <Calendar className="w-6 h-6" />;
                      case 'rules': return <FileText className="w-6 h-6" />;
                      case 'champions': return <Crown className="w-6 h-6" />;
                      case 'register': return <Users className="w-6 h-6" />;
                      case 'contact': return <Mail className="w-6 h-6" />;
                      case 'navigation': return <Globe className="w-6 h-6" />;
                      case 'footer': return <Database className="w-6 h-6" />;
                      default: return <FileText className="w-6 h-6" />;
                    }
                  };

                  const getSectionTitle = (key: string): string => {
                    const titles: Record<string, string> = {
                      home: 'Domovská stránka',
                      tournament: 'Turnaj',
                      rules: 'Pravidla',
                      champions: 'Šampioni',
                      register: 'Registrace',
                      contact: 'Kontakt',
                      navigation: 'Navigace',
                      footer: 'Footer'
                    };
                    return titles[key] || key;
                  };

                  return (
                    <div key={sectionKey} className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-colors">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                          {getSectionIcon(sectionKey)}
                        </div>
                        <h3 className="text-lg font-bold text-white">{getSectionTitle(sectionKey)}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {Object.keys(sectionContent).length} polí k editaci
                      </p>
                      <button
                        onClick={() => setEditingSection(sectionKey as keyof SiteContent)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Editovat</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Universal Editor Promotion */}
              <div className="mt-12 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8">
                <div className="text-center">
                  <Type className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">Univerzální Editor Obsahu</h2>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Editujte veškerý text na webu v jednom místě. Rychle najděte a upravte jakýkoliv obsah pomocí vyhledávání a pokročilých nástrojů.
                  </p>
                  <button
                    onClick={() => setShowUniversalEditor(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                  >
                    <Type className="w-6 h-6" />
                    <span>Otevřít Univerzální Editor</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Nastavení</h1>
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">Systémové Informace</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between">
                    <span>Verze systému:</span>
                    <span className="text-white">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Databáze:</span>
                    <span className="text-green-400">Supabase (Připojeno)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Celkem registrací:</span>
                    <span className="text-white">{stats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Poslední aktualizace:</span>
                    <span className="text-white">{new Date().toLocaleDateString('cs-CZ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedRegistration && (
        <RegistrationDetail
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {editingSection && (
        <ContentEditor
          section={editingSection}
          onClose={() => setEditingSection(null)}
        />
      )}

      {showUniversalEditor && (
        <UniversalContentEditor
          onClose={() => setShowUniversalEditor(false)}
        />
      )}
    </div>
  );
};

export default Admin;
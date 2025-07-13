import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useContent } from '../hooks/useContent';
import { useRegistrations } from '../hooks/useRegistrations';
import { TeamRegistration } from '../config/admin';
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

const Admin: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { content, updateContent, resetContent } = useContent();
  const { registrations, updateRegistrationStatus, deleteRegistration, getRegistrationStats } = useRegistrations();
  const [activeTab, setActiveTab] = useState<'content' | 'registrations'>('content');
  const [selectedRegistration, setSelectedRegistration] = useState<TeamRegistration | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState(content);
  const [saveMessage, setSaveMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTempContent(content);
  }, [content]);

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

  const validateField = (section: string, field: string, value: string): string => {
    if (!value.trim()) {
      return 'Toto pole je povinné';
    }
    
    if (field.includes('Title') && value.length < 3) {
      return 'Titulek musí mít alespoň 3 znaky';
    }
    
    if (field.includes('Description') && value.length < 10) {
      return 'Popis musí mít alespoň 10 znaků';
    }
    
    if (field.includes('ButtonText') && value.length > 30) {
      return 'Text tlačítka nesmí být delší než 30 znaků';
    }
    
    return '';
  };

  const validateSection = (sectionKey: string): boolean => {
    const errors: Record<string, string> = {};
    const section = tempContent[sectionKey as keyof typeof tempContent];
    
    if (typeof section === 'object' && section !== null) {
      Object.entries(section).forEach(([fieldKey, fieldValue]) => {
        if (typeof fieldValue === 'string') {
          const error = validateField(sectionKey, fieldKey, fieldValue);
          if (error) {
            errors[`${sectionKey}.${fieldKey}`] = error;
          }
        }
      });
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!editingSection) return;
    
    setIsLoading(true);
    
    if (validateSection(editingSection)) {
      setTimeout(() => {
        updateContent(tempContent);
        setSaveMessage('Změny byly úspěšně uloženy!');
        setEditingSection(null);
        setValidationErrors({});
        setIsLoading(false);
        
        setTimeout(() => setSaveMessage(''), 4000);
      }, 800);
    } else {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setEditingSection(null);
    setValidationErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete obnovit všechen obsah na výchozí hodnoty? Tato akce je nevratná.')) {
      setIsLoading(true);
      setTimeout(() => {
        resetContent();
        setTempContent(content);
        setSaveMessage('Obsah byl obnoven na výchozí hodnoty');
        setEditingSection(null);
        setValidationErrors({});
        setIsLoading(false);
        setTimeout(() => setSaveMessage(''), 4000);
      }, 1000);
    }
  };

  const updateTempContent = (section: string, field: string, value: string) => {
    setTempContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: field === 'statsEnabled' ? value === 'true' : value,
      },
    }));
    
    // Clear validation error for this field
    const errorKey = `${section}.${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const updateStatsContent = (field: string, value: string) => {
    setTempContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        stats: {
          ...prev.home.stats,
          [field]: value,
        },
      },
    }));
  };

  const getSectionTitle = (sectionKey: string): string => {
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
    return titles[sectionKey] || sectionKey;
  };

  const getFieldLabel = (fieldKey: string): string => {
    const labels: Record<string, string> = {
      heroTitle: 'Hlavní titulek',
      heroSubtitle: 'Podtitulek',
      heroDescription: 'Popis hero sekce',
      registerButtonText: 'Text registračního tlačítka',
      watchTrailerText: 'Text tlačítka trailer',
      featuresTitle: 'Titulek funkcí',
      featuresSubtitle: 'Podtitulek funkcí',
      championsTitle: 'Titulek šampiónů',
      championsSubtitle: 'Podtitulek šampiónů',
      welcomeMessage: 'Uvítací zpráva',
      announcementText: 'Text oznámení',
      callToActionText: 'Výzva k akci',
      statsEnabled: 'Zobrazit statistiky',
      title: 'Titulek',
      subtitle: 'Podtitulek',
      description: 'Popis',
      prizePool: 'Prize Pool',
      registrationDeadline: 'Termín registrace',
      registerButtonText: 'Text registračního tlačítka',
      rulesButtonText: 'Text tlačítka pravidel',
      tournament: 'Turnaj',
      register: 'Registrace',
      rules: 'Pravidla',
      champions: 'Šampioni',
      contact: 'Kontakt',
      copyright: 'Copyright text'
    };
    return labels[fieldKey] || fieldKey.replace(/([A-Z])/g, ' $1').toLowerCase();
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
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Admin Panel</h1>
              <p className="text-gray-300">Správa obsahu webu Targon Cup</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Obnovit</span>
            </button>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Odhlásit</span>
            </button>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-medium">{saveMessage}</p>
          </div>
        )}

        {/* Validation Errors */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h3 className="text-red-400 font-medium">Chyby validace:</h3>
            </div>
            <ul className="space-y-1 text-sm text-red-300">
              {Object.entries(validationErrors).map(([field, error]) => (
                <li key={field}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(content).map(([sectionKey, sectionContent]) => (
            <div key={sectionKey} className="bg-gray-700 rounded-2xl p-6 border border-gray-600 hover:border-gray-500 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">
                    {getSectionTitle(sectionKey)}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  {editingSection === sectionKey && (
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Zrušit</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (editingSection === sectionKey) {
                        handleSave();
                      } else {
                        setEditingSection(sectionKey);
                        setTempContent(content);
                        setValidationErrors({});
                      }
                    }}
                    disabled={isLoading}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                      editingSection === sectionKey
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isLoading && editingSection === sectionKey ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : editingSection === sectionKey ? (
                      <Save className="w-4 h-4" />
                    ) : (
                      <Edit3 className="w-4 h-4" />
                    )}
                    <span>
                      {isLoading && editingSection === sectionKey ? 'Ukládání...' : 
                       editingSection === sectionKey ? 'Uložit' : 'Upravit'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(sectionContent as Record<string, any>).map(([fieldKey, fieldValue]) => {
                  if (fieldKey === 'stats' && sectionKey === 'home') {
                    return (
                      <div key={fieldKey} className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-2">
                          Statistiky
                        </h4>
                        {Object.entries(fieldValue as Record<string, string>).map(([statsKey, statsValue]) => (
                          <div key={statsKey}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              {getFieldLabel(statsKey)}
                            </label>
                            {editingSection === sectionKey ? (
                              <input
                                type="text"
                                value={tempContent.home.stats[statsKey as keyof typeof tempContent.home.stats]}
                                onChange={(e) => updateStatsContent(statsKey, e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                              />
                            ) : (
                              <div className="bg-gray-800 px-3 py-2 rounded border border-gray-600 text-gray-300">
                                {statsValue}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }

                  const errorKey = `${sectionKey}.${fieldKey}`;
                  const hasError = validationErrors[errorKey];

                  return (
                    <div key={fieldKey}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {getFieldLabel(fieldKey)}
                        {editingSection === sectionKey && !fieldKey.includes('statsEnabled') && (
                          <span className="text-red-400 ml-1">*</span>
                        )}
                      </label>
                      {editingSection === sectionKey ? (
                        fieldKey === 'statsEnabled' ? (
                          <select
                            value={tempContent[sectionKey as keyof typeof tempContent][fieldKey as keyof typeof sectionContent] ? 'true' : 'false'}
                            onChange={(e) => updateTempContent(sectionKey, fieldKey, e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                          >
                            <option value="true">Zapnuto</option>
                            <option value="false">Vypnuto</option>
                          </select>
                        ) : fieldKey.includes('description') || fieldKey.includes('subtitle') ? (
                          <textarea
                            value={tempContent[sectionKey as keyof typeof tempContent][fieldKey as keyof typeof sectionContent] as string}
                            onChange={(e) => updateTempContent(sectionKey, fieldKey, e.target.value)}
                            className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none resize-none ${
                              hasError ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-blue-500'
                            }`}
                            rows={3}
                            placeholder={`Zadejte ${getFieldLabel(fieldKey).toLowerCase()}`}
                          />
                        ) : (
                          <input
                            type="text"
                            value={tempContent[sectionKey as keyof typeof tempContent][fieldKey as keyof typeof sectionContent] as string}
                            onChange={(e) => updateTempContent(sectionKey, fieldKey, e.target.value)}
                            className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none ${
                              hasError ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-blue-500'
                            }`}
                            placeholder={`Zadejte ${getFieldLabel(fieldKey).toLowerCase()}`}
                          />
                        )
                      ) : (
                        <div className="bg-gray-800 px-3 py-2 rounded border border-gray-600 text-gray-300">
                          {typeof fieldValue === 'boolean' ? (fieldValue ? 'Zapnuto' : 'Vypnuto') : fieldValue}
                        </div>
                      )}
                      {hasError && (
                        <div className="flex items-center space-x-2 mt-1">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <p className="text-red-400 text-sm">{hasError}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Registration Management Tab */}
        {activeTab === 'registrations' && (
          <div className="space-y-8">
            {/* Registration Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-sm text-gray-400">Celkem</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-gray-400">Čekající</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-sm text-gray-400">Schválené</span>
                </div>
                <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-2">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <span className="text-sm text-gray-400">Zamítnuté</span>
                </div>
                <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
              </div>
            </div>

            {/* Registration List */}
            <div className="bg-gray-700 rounded-2xl border border-gray-600">
              <div className="p-6 border-b border-gray-600">
                <h2 className="text-xl font-bold text-white">Registrace Týmů</h2>
              </div>
              
              {registrations.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Žádné registrace</h3>
                  <p className="text-gray-400">Zatím se neregistroval žádný tým</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-600">
                  {registrations.map((registration) => (
                    <div key={registration.id} className="p-6 hover:bg-gray-600/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {registration.teamName} [{registration.teamTag}]
                            </h3>
                            <p className="text-sm text-gray-400">
                              Registrováno: {formatDate(registration.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(registration.status)}`}>
                            {getStatusIcon(registration.status)}
                            <span className="capitalize">{registration.status === 'pending' ? 'Čekající' : registration.status === 'approved' ? 'Schváleno' : 'Zamítnuto'}</span>
                          </div>
                          <button
                            onClick={() => setSelectedRegistration(selectedRegistration?.id === registration.id ? null : registration)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRegistration(registration.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Kapitán:</span>
                          <div className="text-white font-medium">{registration.captainName}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <div className="text-white font-medium">{registration.captainEmail}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Discord:</span>
                          <div className="text-white font-medium">{registration.captainDiscord}</div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedRegistration?.id === registration.id && (
                        <div className="mt-6 pt-6 border-t border-gray-600 space-y-6">
                          {/* Players */}
                          <div>
                            <h4 className="text-sm font-bold text-white mb-3">Hlavní Sestava:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {registration.players.map((player, index) => (
                                <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="text-white font-medium">{player.name}</div>
                                      <div className="text-sm text-gray-400">{player.summonerName}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-blue-400 font-medium">{player.role}</div>
                                      <div className="text-xs text-gray-400">{player.nationality}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Substitutes */}
                          {registration.substitutes.some(sub => sub.name) && (
                            <div>
                              <h4 className="text-sm font-bold text-white mb-3">Náhradníci:</h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {registration.substitutes.filter(sub => sub.name).map((sub, index) => (
                                  <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="text-white font-medium">{sub.name}</div>
                                        <div className="text-sm text-gray-400">{sub.summonerName}</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-blue-400 font-medium">{sub.role}</div>
                                        <div className="text-xs text-gray-400">{sub.nationality}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Coach */}
                          {registration.coach.name && (
                            <div>
                              <h4 className="text-sm font-bold text-white mb-3">Trenér:</h4>
                              <div className="bg-gray-800/50 rounded-lg p-3">
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div>
                                    <span className="text-gray-400">Jméno:</span>
                                    <div className="text-white font-medium">{registration.coach.name}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Email:</span>
                                    <div className="text-white font-medium">{registration.coach.email}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Zkušenosti:</span>
                                    <div className="text-white font-medium">{registration.coach.experience}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleStatusUpdate(registration.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Schválit</span>
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(registration.id, 'rejected')}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Zamítnout</span>
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(registration.id, 'pending')}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              <Clock className="w-4 h-4" />
                              <span>Čekající</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
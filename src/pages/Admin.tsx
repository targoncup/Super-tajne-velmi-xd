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
import Menu from '../components/admin/Menu';
import Content from '../components/admin/Content';

const Admin: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { content, updateContent, resetContent } = useContent();
  const { registrations, updateRegistrationStatus, deleteRegistration, getRegistrationStats } = useRegistrations();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRegistration, setSelectedRegistration] = useState<TeamRegistration | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState(content);
  const [saveMessage, setSaveMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const stats = getRegistrationStats();

  useEffect(() => {
    setTempContent(content);
  }, [content]);

  // Listen for new registrations
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'targon_cup_registrations') {
        setRefreshTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const handleStatusUpdate = (id: string, status: TeamRegistration['status']) => {
    updateRegistrationStatus(id, status);
  };

  const handleDeleteRegistration = (id: string) => {
    if (window.confirm('Opravdu chcete smazat tuto registraci? Tato akce je nevratná.')) {
      deleteRegistration(id);
      if (selectedRegistration?.id === id) {
        setSelectedRegistration(null);
      }
    }
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
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        <Content activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Admin;
import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { SiteContent } from '../../config/admin';
import {
  Save,
  X,
  Edit3,
  AlertCircle,
  Check,
  Copy,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';

interface UniversalContentEditorProps {
  onClose: () => void;
}

const UniversalContentEditor: React.FC<UniversalContentEditorProps> = ({ onClose }) => {
  const { content, updateContent, resetContent } = useContent();
  const [editedContent, setEditedContent] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [saveMessage, setSaveMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['home']));
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const getSectionTitle = (sectionKey: string): string => {
    const titles: Record<string, string> = {
      home: 'Domovská stránka',
      tournament: 'Turnaj',
      rules: 'Pravidla',
      champions: 'Šampioni',
      register: 'Registrace',
      contact: 'Kontakt',
      navigation: 'Navigace',
      footer: 'Footer',
      admin: 'Admin rozhraní'
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
      rulesButtonText: 'Text tlačítka pravidel',
      tournament: 'Turnaj',
      register: 'Registrace',
      rules: 'Pravidla',
      champions: 'Šampioni',
      contact: 'Kontakt',
      copyright: 'Copyright text',
      logoText: 'Text loga',
      logoSubtext: 'Podtext loga',
      teams: 'Počet týmů',
      teamsLabel: 'Label týmů',
      prizePoolLabel: 'Label prize pool',
      viewers: 'Počet diváků',
      viewersLabel: 'Label diváků',
      countries: 'Počet zemí',
      countriesLabel: 'Label zemí',
      icon: 'Ikona',
      team: 'Tým',
      prize: 'Odměna',
      place: 'Umístění',
      season: 'Sezóna',
      name: 'Název',
      value: 'Hodnota',
      team: 'Tým',
      prize: 'Cena',
      email: 'Email',
      phone: 'Telefon',
      available: 'Dostupnost',
      question: 'Otázka',
      answer: 'Odpověď',
      day: 'Den',
      hours: 'Hodiny',
      text: 'Text',
      href: 'Odkaz',
      phase: 'Fáze',
      dates: 'Datumy',
      amount: 'Částka',
      color: 'Barva',
      items: 'Položky',
      note: 'Poznámka',
      loginTitle: 'Titulek přihlášení',
      loginSubtitle: 'Podtitulek přihlášení',
      passwordLabel: 'Label hesla',
      loginButtonText: 'Text tlačítka přihlášení',
      dashboardTitle: 'Titulek dashboardu',
      registrationsTitle: 'Titulek registrací',
      contentTitle: 'Titulek obsahu',
      settingsTitle: 'Titulek nastavení',
      logoutText: 'Text odhlášení',
      total: 'Celkem',
      pending: 'Čekající',
      approved: 'Schválené',
      rejected: 'Zamítnuté',
      requirementsTitle: 'Titulek požadavků',
      requirements: 'Požadavky',
      teamInfoTitle: 'Titulek info o týmu',
      captainTitle: 'Titulek kapitána',
      playersTitle: 'Titulek hráčů',
      substitutesTitle: 'Titulek náhradníků',
      coachTitle: 'Titulek trenéra',
      termsTitle: 'Titulek podmínek',
      submitButtonText: 'Text tlačítka odeslání',
      successTitle: 'Titulek úspěchu',
      successMessage: 'Zpráva úspěchu',
      contactMethods: 'Kontaktní metody',
      departments: 'Oddělení',
      formTitle: 'Titulek formuláře',
      officeTitle: 'Titulek kanceláře',
      officeAddress: 'Adresa kanceláře',
      workingHoursTitle: 'Titulek pracovní doby',
      workingHours: 'Pracovní doba',
      faqTitle: 'Titulek FAQ',
      faqItems: 'FAQ položky',
      scheduleTitle: 'Titulek harmonogramu',
      scheduleItems: 'Položky harmonogramu',
      prizeDistributionTitle: 'Titulek rozdělení cen',
      prizes: 'Ceny',
      sections: 'Sekce',
      downloadButtonText: 'Text tlačítka stažení',
      mvpTitle: 'Titulek MVP',
      mvpSubtitle: 'Podtitulek MVP',
      recordsTitle: 'Titulek rekordů',
      recordsSubtitle: 'Podtitulek rekordů',
      records: 'Rekordy',
      tournamentLinks: 'Odkazy turnaje',
      socialTitle: 'Titulek sociálních sítí',
      statsLabels: 'Labely statistik'
    };
    return labels[fieldKey] || fieldKey.replace(/([A-Z])/g, ' $1').toLowerCase();
  };

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const setNestedValue = (obj: any, path: string[], val: any) => {
    const [head, ...rest] = path;
    const match = head.match(/(.+)\[(\d+)\]/);
    if (match) {
      const [, key, index] = match;
      obj[key] = Array.isArray(obj[key]) ? [...obj[key]] : [];
      if (rest.length === 0) {
        obj[key][Number(index)] = val;
      } else {
        obj[key][Number(index)] = obj[key][Number(index)] || {};
        setNestedValue(obj[key][Number(index)], rest, val);
      }
    } else if (rest.length === 0) {
      obj[head] = val;
    } else {
      obj[head] = obj[head] ? { ...obj[head] } : {};
      setNestedValue(obj[head], rest, val);
    }
  };

  const handleFieldChange = (sectionKey: string, field: string, value: string | boolean) => {
    setEditedContent(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      setNestedValue(updated[sectionKey], field.split('.'), value);
      return updated;
    });
    setHasChanges(true);
  };

  const addArrayItem = (sectionKey: string, arrayPath: string, defaultItem: any) => {
    setEditedContent(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const pathParts = arrayPath.split('.');
      let current = updated[sectionKey];
      
      // Ensure the section exists
      if (!current) {
        updated[sectionKey] = {};
        current = updated[sectionKey];
      }
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      const arrayKey = pathParts[pathParts.length - 1];
      if (!Array.isArray(current[arrayKey])) {
        current[arrayKey] = [];
      }
      current[arrayKey].push(JSON.parse(JSON.stringify(defaultItem)));
      
      return updated;
    });
    setHasChanges(true);
  };

  const removeArrayItem = (sectionKey: string, arrayPath: string, index: number) => {
    setEditedContent(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const pathParts = arrayPath.split('.');
      let current = updated[sectionKey];
      
      // Safety check
      if (!current) {
        return updated;
      }
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          return updated; // If path doesn't exist, return unchanged
        }
        current = current[pathParts[i]];
      }
      
      const arrayKey = pathParts[pathParts.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey].splice(index, 1);
      }
      
      return updated;
    });
    setHasChanges(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSaveMessage('Text zkopírován do schránky!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleSave = () => {
    setIsLoading(true);
    setSaveMessage('');
    
    updateContent(editedContent)
      .then(() => {
        setSaveMessage('Všechny změny byly úspěšně uloženy a synchronizovány do databázy!');
        setHasChanges(false);
        setIsLoading(false);
        
        setTimeout(() => {
          setSaveMessage('');
        }, 3000);
      })
      .catch((error) => {
        setSaveMessage('Chyba při ukládání: ' + (error.message || 'Zkuste to znovu'));
        console.error('Save error:', error);
        setIsLoading(false);
        
        setTimeout(() => {
          setSaveMessage('');
        }, 4000);
      });
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete obnovit všechen obsah na výchozí hodnoty? Tato akce je nevratná.')) {
      setIsLoading(true);
      setSaveMessage('');
      
      resetContent()
        .then(() => {
          setEditedContent(DEFAULT_CONTENT);
          setHasChanges(false);
          setSaveMessage('Obsah byl obnoven na výchozí hodnoty a synchronizován!');
          setIsLoading(false);
          
          setTimeout(() => setSaveMessage(''), 3000);
        })
        .catch((error) => {
          setSaveMessage('Chyba při resetování: ' + (error.message || 'Zkuste to znovu'));
          console.error('Reset error:', error);
          setIsLoading(false);
          
          setTimeout(() => setSaveMessage(''), 4000);
        });
    }
  };

  const renderField = (sectionKey: string, key: string, value: any, prefix = ''): React.ReactNode => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const fieldId = `${sectionKey}-${fullKey}`;
    
    // Filter by search term
    if (searchTerm && !getFieldLabel(key).toLowerCase().includes(searchTerm.toLowerCase()) && 
        !(typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return null;
    }
    
    if (Array.isArray(value)) {
      const getDefaultItem = () => {
        console.log('Getting default item for key:', key, 'in section:', sectionKey);
        if (key === 'features') return { icon: 'Star', title: '', description: '' };
        if (key === 'champions') return { season: '', team: '', prize: '', place: '1' };
        if (key === 'requirements') return '';
        if (key === 'contactMethods') return { title: '', description: '', contact: '', available: '', icon: '' };
        if (key === 'departments') return { title: '', email: '', description: '', icon: '' };
        if (key === 'officeAddress') return '';
        if (key === 'workingHours') return { day: '', hours: '' };
        if (key === 'faqItems') return { question: '', answer: '' };
        if (key === 'scheduleItems') return { phase: '', title: '', dates: '', description: '' };
        if (key === 'prizes') return { place: '', amount: '', color: '' };
        if (key === 'sections') return { title: '', icon: 'FileText', items: [''], note: '' };
        if (key === 'records') return { title: '', value: '', description: '', icon: '' };
        if (key === 'tournamentLinks') return { text: '', href: '' };
        if (key === 'items') return '';
        console.log('No default found for key:', key);
        return {};
      };

      return (
        <div key={fieldId} className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">
              {getFieldLabel(key)} ({value.length})
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => addArrayItem(sectionKey, fullKey, getDefaultItem())}
                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                title="Přidat položku"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="ml-4 space-y-4 border-l-2 border-gray-600 pl-4 max-h-96 overflow-y-auto">
            {value.map((item, idx) => (
              <div key={`${fieldId}[${idx}]`} className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-gray-300">Položka {idx + 1}</h5>
                  <button
                    onClick={() => removeArrayItem(sectionKey, fullKey, idx)}
                    className="p-1 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                    title="Odstranit položku"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                {typeof item === 'object' && item !== null ? (
                  Object.entries(item).map(([subKey, subValue]) =>
                    renderField(sectionKey, subKey, subValue, `${fullKey}[${idx}]`)
                  )
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item as string}
                      onChange={(e) => handleFieldChange(sectionKey, `${fullKey}[${idx}]`, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                      placeholder={`Zadejte ${getFieldLabel(key).toLowerCase()}`}
                    />
                    <button
                      onClick={() => copyToClipboard(item as string)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Kopírovat"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fieldId} className="space-y-4">
          <h4 className="text-lg font-semibold text-white">
            {getFieldLabel(key)}
          </h4>
          <div className="ml-4 space-y-4 border-l-2 border-gray-600 pl-4">
            {Object.entries(value).map(([subKey, subValue]) => 
              renderField(sectionKey, subKey, subValue, fullKey)
            )}
          </div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={fieldId} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {getFieldLabel(key)}
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleFieldChange(sectionKey, fullKey, true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                value 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Check className="w-4 h-4 inline mr-2" />
              Ano
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange(sectionKey, fullKey, false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !value 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <X className="w-4 h-4 inline mr-2" />
              Ne
            </button>
          </div>
        </div>
      );
    }

    const isTextarea = key.includes('Description') || key.includes('description') || 
                     (typeof value === 'string' && value.length > 100);

    return (
      <div key={fieldId} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          {getFieldLabel(key)}
        </label>
        <div className="flex items-center space-x-2">
          {isTextarea ? (
            <textarea
              value={value as string}
              onChange={(e) => handleFieldChange(sectionKey, fullKey, e.target.value)}
              rows={4}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
              placeholder={`Zadejte ${getFieldLabel(key).toLowerCase()}`}
            />
          ) : (
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleFieldChange(sectionKey, fullKey, e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder={`Zadejte ${getFieldLabel(key).toLowerCase()}`}
            />
          )}
          <button
            onClick={() => copyToClipboard(value as string)}
            className="p-3 text-gray-400 hover:text-white transition-colors"
            title="Kopírovat"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-600 w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <Edit3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Univerzální Editor Obsahu
            </h2>
            {hasChanges && (
              <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
                Neuložené změny
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Controls */}
        <div className="p-6 border-b border-gray-600 bg-gray-700/50">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Hledat v obsahu..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setExpandedSections(new Set(Object.keys(editedContent)))}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Rozbalit vše
              </button>
              <button
                onClick={() => setExpandedSections(new Set())}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Sbalit vše
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mx-6 mt-6 bg-green-600/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">{saveMessage}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-280px)]">
          <div className="space-y-6">
            {Object.entries(editedContent).map(([sectionKey, sectionContent]) => {
              const isExpanded = expandedSections.has(sectionKey);
              
              return (
                <div key={sectionKey} className="bg-gray-700/30 rounded-xl border border-gray-600">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                      <h3 className="text-xl font-bold text-white">
                        {getSectionTitle(sectionKey)}
                      </h3>
                      <span className="text-sm text-gray-400">
                        ({Object.keys(sectionContent).length} polí)
                      </span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-6 border-t border-gray-600 space-y-6">
                      {Object.entries(sectionContent).map(([key, value]) => 
                        renderField(sectionKey, key, value)
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-600 bg-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Editujete obsah pro celý web
            </div>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset na výchozí</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Zavřít
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !hasChanges}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Ukládám...' : 'Uložit a Publikovat'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalContentEditor;
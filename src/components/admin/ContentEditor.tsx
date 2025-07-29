import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { SiteContent } from '../../config/admin';
import {
  Save,
  X,
  RotateCcw,
  Edit3,
  AlertCircle,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

interface ContentEditorProps {
  section: keyof SiteContent;
  onClose: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ section, onClose }) => {
  const { content, updateContent } = useContent();
  const [editedContent, setEditedContent] = useState(content[section]);
  const [saveMessage, setSaveMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
      rulesButtonText: 'Text tlačítka pravidel',
      tournament: 'Turnaj',
      register: 'Registrace',
      rules: 'Pravidla',
      champions: 'Šampioni',
      contact: 'Kontakt',
      copyright: 'Copyright text',
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
      season: 'Sezóna'
    };
    return labels[fieldKey] || fieldKey.replace(/([A-Z])/g, ' $1').toLowerCase();
  };

  const validateField = (field: string, value: string): string => {
    if (typeof value === 'string' && !value.trim()) {
      return 'Toto pole je povinné';
    }
    
    if (field.includes('Title') && typeof value === 'string' && value.length < 3) {
      return 'Titulek musí mít alespoň 3 znaky';
    }
    
    if (field.includes('Description') && typeof value === 'string' && value.length < 10) {
      return 'Popis musí mít alespoň 10 znaků';
    }
    
    if (field.includes('ButtonText') && typeof value === 'string' && value.length > 30) {
      return 'Text tlačítka nesmí být delší než 30 znaků';
    }
    
    return '';
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

  const handleFieldChange = (field: string, value: string | boolean) => {
    setEditedContent(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      setNestedValue(updated, field.split('.'), value);
      return updated;
    });

    // Clear validation error
    const errorKey = field;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    
    const validateObject = (obj: any, prefix = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
          value.forEach((item, idx) => {
            if (typeof item === 'object' && item !== null) {
              validateObject(item, `${fullKey}[${idx}]`);
            } else if (typeof item === 'string') {
              const error = validateField(key, item);
              if (error) {
                errors[`${fullKey}[${idx}]`] = error;
              }
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          validateObject(value, fullKey);
        } else if (typeof value === 'string') {
          const error = validateField(key, value);
          if (error) {
            errors[fullKey] = error;
          }
        }
      });
    };

    validateObject(editedContent);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateAll()) return;
    
    setIsLoading(true);
    setSaveMessage('');
    
    // Use async/await for better error handling
    const saveContent = async () => {
      try {
        await updateContent({ [section]: editedContent });
        setSaveMessage('Změny byly úspěšně uloženy do databáze!');
        setIsLoading(false);
        
        // Close after showing success message
        setTimeout(() => {
          setSaveMessage('');
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Save error:', error);
        setSaveMessage(`Chyba při ukládání: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
        setIsLoading(false);
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setSaveMessage('');
        }, 5000);
      }
    };
    
    saveContent();
  };

  const handleCancel = () => {
    setEditedContent(content[section]);
    setValidationErrors({});
    onClose();
  };

  const renderField = (key: string, value: any, prefix = ''): React.ReactNode => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const errorKey = fullKey;
    
    if (Array.isArray(value)) {
      return (
        <div key={fullKey} className="space-y-4">
          <h4 className="text-lg font-semibold text-white capitalize">
            {getFieldLabel(key)}
          </h4>
          <div className="ml-4 space-y-6 border-l-2 border-gray-600 pl-4">
            {value.map((item, idx) => (
              <div key={`${fullKey}[${idx}]`} className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-300">{idx + 1}</h5>
                {typeof item === 'object' && item !== null ? (
                  Object.entries(item).map(([subKey, subValue]) =>
                    renderField(subKey, subValue, `${fullKey}[${idx}]`)
                  )
                ) : (
                  <input
                    type="text"
                    value={item as string}
                    onChange={(e) => handleFieldChange(`${fullKey}[${idx}]`, e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fullKey} className="space-y-4">
          <h4 className="text-lg font-semibold text-white capitalize">
            {getFieldLabel(key)}
          </h4>
          <div className="ml-4 space-y-4 border-l-2 border-gray-600 pl-4">
            {Object.entries(value).map(([subKey, subValue]) => 
              renderField(subKey, subValue, fullKey)
            )}
          </div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={fullKey} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {getFieldLabel(key)}
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleFieldChange(fullKey, true)}
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
              onClick={() => handleFieldChange(fullKey, false)}
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
      <div key={fullKey} className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          {getFieldLabel(key)}
        </label>
        {isTextarea ? (
          <textarea
            value={value as string}
            onChange={(e) => handleFieldChange(fullKey, e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none resize-none ${
              validationErrors[errorKey] 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-500'
            }`}
            placeholder={`Zadejte ${getFieldLabel(key).toLowerCase()}`}
          />
        ) : (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleFieldChange(fullKey, e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
              validationErrors[errorKey] 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-500'
            }`}
            placeholder={`Zadejte ${getFieldLabel(key).toLowerCase()}`}
          />
        )}
        {validationErrors[errorKey] && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{validationErrors[errorKey]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-600 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <Edit3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Editovat: {getSectionTitle(section)}
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {saveMessage && (
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">{saveMessage}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {Object.entries(editedContent).map(([key, value]) => 
              renderField(key, value)
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-600 bg-gray-700/50">
          <div className="text-sm text-gray-400">
            * Všechna pole jsou povinná
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Zrušit
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Ukládám...' : 'Uložit'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
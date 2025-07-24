import React from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Trophy,
  Target,
  Users,
  Star,
  Gamepad2,
  Shield,
  Crown,
  FileText,
  Award
} from 'lucide-react';

const Rules: React.FC = () => {
  const { content } = useContent();

  const iconMap: Record<string, React.ElementType> = {
    Trophy,
    Target,
    Users,
    Star,
    Gamepad2,
    Shield,
    Crown,
    Award
  };

  const colorClasses = [
    'from-blue-600/20 to-blue-800/20 border-blue-500/30',
    'from-green-600/20 to-green-800/20 border-green-500/30',
    'from-purple-600/20 to-purple-800/20 border-purple-500/30',
    'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30',
    'from-red-600/20 to-red-800/20 border-red-500/30',
    'from-indigo-600/20 to-indigo-800/20 border-indigo-500/30',
    'from-pink-600/20 to-pink-800/20 border-pink-500/30',
    'from-teal-600/20 to-teal-800/20 border-teal-500/30',
    'from-orange-600/20 to-orange-800/20 border-orange-500/30'
  ];

  const iconColorClasses = [
    'from-blue-600 to-blue-800 text-blue-400',
    'from-green-600 to-green-800 text-green-400',
    'from-purple-600 to-purple-800 text-purple-400',
    'from-yellow-600 to-yellow-800 text-yellow-400',
    'from-red-600 to-red-800 text-red-400',
    'from-indigo-600 to-indigo-800 text-indigo-400',
    'from-pink-600 to-pink-800 text-pink-400',
    'from-teal-600 to-teal-800 text-teal-400',
    'from-orange-600 to-orange-800 text-orange-400'
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <FileText className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.rules.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
              {content.rules.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {content.rules.description}
            </p>
          </div>
        </div>
      </section>

      {/* Rules Sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {content.rules.sections.map((section, index) => {
              const Icon = iconMap[section.icon] || FileText;
              const colorClass = colorClasses[index % colorClasses.length];
              const iconColorClass = iconColorClasses[index % iconColorClasses.length];
              
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${colorClass} border rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${iconColorClass.split(' ').slice(0, 2).join(' ')} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className={`w-8 h-8 text-white`} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {(section.items || []).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0 opacity-60"></div>
                        <p className="text-gray-200 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  {section.note && (
                    <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <p className="text-sm text-gray-200">
                        <span className="font-bold text-white">Poznámka:</span> {section.note}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Download Rules Button */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-12 border border-gray-600">
              <div className="mb-8">
                <FileText className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Kompletní Pravidla</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Stáhněte si kompletní verzi pravidel ve formátu PDF pro offline použití a detailní studium.
                </p>
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-600/25 flex items-center space-x-3 mx-auto">
                <FileText className="w-6 h-6" />
                <span>{content.rules.downloadButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;
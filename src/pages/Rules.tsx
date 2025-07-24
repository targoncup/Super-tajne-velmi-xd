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
  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      {/* Rules Section */}
      <section className="py-24 bg-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <FileText className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.rules.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.rules.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.rules.description}
            </p>
          </div>

          {/* Rules Sections */}
          <div className="grid lg:grid-cols-2 gap-8">
            {content.rules.sections.map((section, index) => {
              const Icon = iconMap[section.icon] || FileText;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <div className="space-y-4 text-gray-300">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm">
                        • {item}
                      </div>
                    ))}
                    {section.note && (
                      <div className="bg-blue-900/20 rounded-lg p-4 mt-4">
                        <p className="text-sm"><strong>Poznámka:</strong> {section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Download Rules Button */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-600/25 flex items-center space-x-3 mx-auto">
              <FileText className="w-6 h-6" />
              <span>{content.rules.downloadButtonText}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;

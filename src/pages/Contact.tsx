import React from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Users,
  Shield,
  Headphones
} from 'lucide-react';

const Contact: React.FC = () => {
  const { content } = useContent();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Obecné dotazy a podpora',
      contact: 'info@targoncup.cz',
      available: '24/7'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Komunitní podpora a chat',
      contact: 'discord.gg/targoncup',
      available: '24/7'
    },
    {
      icon: Phone,
      title: 'Telefon',
      description: 'Naléhavé záležitosti',
      contact: '+420 123 456 789',
      available: 'Po-Pá 9:00-17:00'
    }
  ];

  const departments = [
    {
      icon: Users,
      title: 'Registrace Týmů',
      email: 'registrace@targoncup.cz',
      description: 'Pomoc s registrací a dokumenty'
    },
    {
      icon: Shield,
      title: 'Technická Podpora',
      email: 'tech@targoncup.cz',
      description: 'Technické problémy a herní záležitosti'
    },
    {
      icon: Headphones,
      title: 'Mediální Dotazy',
      email: 'media@targoncup.cz',
      description: 'Tiskové zprávy a partnerství'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <Mail className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.contact.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.contact.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.contact.description}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{method.title}</h3>
                  <p className="text-gray-300 mb-4">{method.description}</p>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-blue-400 font-bold mb-1">{method.contact}</div>
                    <div className="text-sm text-gray-400">Dostupnost: {method.available}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Departments */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Specializované Oddělení
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{dept.title}</h3>
                      <p className="text-sm text-gray-400">{dept.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <a href={`mailto:${dept.email}`} className="text-blue-400 hover:text-blue-300 font-medium">
                      {dept.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
              <h2 className="text-2xl font-bold mb-6 text-white">Napište nám</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Jméno *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Vaše jméno"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="vas@email.cz"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Předmět *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Vyberte předmět</option>
                    <option value="registration">Registrace týmu</option>
                    <option value="technical">Technický problém</option>
                    <option value="rules">Dotaz k pravidlům</option>
                    <option value="media">Mediální dotaz</option>
                    <option value="other">Ostatní</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zpráva *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Napište svou zprávu..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Odeslat Zprávu</span>
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  Naše Kancelář
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <div className="font-semibold text-white">Targon Cup s.r.o.</div>
                    <div>Wenceslas Square 1</div>
                    <div>110 00 Praha 1</div>
                    <div>Česká republika</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-400" />
                  Pracovní Doba
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Pondělí - Pátek</span>
                    <span className="text-white font-medium">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobota</span>
                    <span className="text-white font-medium">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neděle</span>
                    <span className="text-gray-400">Zavřeno</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-300">
                    <strong>Poznámka:</strong> Během turnajů jsme dostupní 24/7 přes Discord
                  </p>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-xl font-bold mb-4 text-white">FAQ</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-white mb-1">Kdy začíná registrace?</div>
                    <div className="text-gray-300">Registrace je otevřena od 1. listopadu do 15. prosince.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Kolik stojí registrace?</div>
                    <div className="text-gray-300">Registrační poplatek je 500 CZK na tým.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Jak rychle odpovídáte?</div>
                    <div className="text-gray-300">Obvykle do 24 hodin, během turnajů do 2 hodin.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
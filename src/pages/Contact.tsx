import React from 'react';
import { useContent } from '../hooks/useContent';
import {
  Mail,
  MapPin,
  Clock,
  MessageCircle,
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
      contact: 'targoncupofficial@gmail.com',
      available: '24/7'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Komunitní podpora a chat',
      contact: 'https://discord.gg/c9pRsbYCt2',
      available: '24/7'
    }
  ];

  const departments = [
    {
      icon: Users,
      title: 'Registrace Týmů',
      email: 'targoncupofficial@gmail.com',
      description: 'Pomoc s registrací a dokumenty'
    },
    {
      icon: Shield,
      title: 'Technická Podpora',
      email: 'targoncupofficial@gmail.com',
      description: 'Technické problémy a herní záležitosti'
    },
    {
      icon: Headphones,
      title: 'Mediální Dotazy',
      email: 'targoncupofficial@gmail.com',
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
              <span className="text-blue-400 font-semibold">
                {content.contact.subtitle}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.contact.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.contact.description}
            </p>
          </div>

          <div className="space-y-8">
            {/* Working Hours */}
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

            {/* Contact Methods */}
            <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
              <h3 className="text-xl font-bold mb-6 text-white">Způsoby Kontaktování</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {contactMethods.map(({ icon: Icon, title, description, contact, available }) => (
                  <div key={title} className="p-4 rounded-lg border border-gray-600 bg-gray-800/40">
                    <div className="flex items-center mb-2">
                      <Icon className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-semibold">{title}</h4>
                    </div>
                    <p className="text-gray-300">{description}</p>
                    <p className="text-white font-medium mt-2">
                      {title === 'Email' ? (
                        <a href={`mailto:${contact}`} className="hover:underline">{contact}</a>
                      ) : (
                        <a href={contact} target="_blank" rel="noopener noreferrer" className="hover:underline">https://discord.gg/c9pRsbYCt2</a>
                      )}
                    </p>
                    <p className="text-sm text-blue-300 mt-1">Dostupnost: {available}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
              <h3 className="text-xl font-bold mb-6 text-white">Oddělení</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(({ icon: Icon, title, email, description }) => (
                  <div key={title} className="p-4 rounded-lg border border-gray-600 bg-gray-800/40">
                    <div className="flex items-center mb-2">
                      <Icon className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-semibold">{title}</h4>
                    </div>
                    <p className="text-gray-300">{description}</p>
                    <p className="text-white font-medium mt-2">
                      <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

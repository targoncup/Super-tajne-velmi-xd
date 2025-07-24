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

  const iconMap: Record<string, React.ElementType> = {
    Mail,
    MessageCircle,
    Users,
    Shield,
    Headphones
  };

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
                {content.contact.workingHoursTitle}
              </h3>
              <div className="space-y-3 text-gray-300">
                {content.contact.workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{schedule.day}</span>
                    <span className={schedule.hours === 'Zavřeno' ? 'text-gray-400' : 'text-white font-medium'}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
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
                {content.contact.contactMethods.map((method, index) => {
                  const Icon = iconMap[method.icon] || Mail;
                  return (
                  <div key={index} className="p-4 rounded-lg border border-gray-600 bg-gray-800/40">
                    <div className="flex items-center mb-2">
                      <Icon className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-semibold">{method.title}</h4>
                    </div>
                    <p className="text-gray-300">{method.description}</p>
                    <p className="text-white font-medium mt-2">
                      <a href="mailto:targoncupofficial@gmail.com" className="hover:underline">targoncupofficial@gmail.com</a>
                    </p>
                    <p className="text-sm text-blue-300 mt-1">Dostupnost: {method.available}</p>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
              <h3 className="text-xl font-bold mb-6 text-white">Oddělení</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.contact.departments.map((department, index) => {
                  const Icon = iconMap[department.icon] || Users;
                  return (
                  <div key={index} className="p-4 rounded-lg border border-gray-600 bg-gray-800/40">
                    <div className="flex items-center mb-2">
                      <Icon className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-semibold">{department.title}</h4>
                    </div>
                    <p className="text-gray-300">{department.description}</p>
                    <p className="text-white font-medium mt-2">
                      <a href="https://discord.gg/c9pRsbYCt2" target="_blank" rel="noopener noreferrer" className="hover:underline">https://discord.gg/c9pRsbYCt2</a>
                    </p>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
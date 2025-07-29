import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Calendar, 
  Trophy, 
  Users, 
  FileText, 
  Mail
} from 'lucide-react';
import { useContent } from '../hooks/useContent';

const Navigation: React.FC = () => {
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: content.navigation.tournament, icon: Calendar, href: '/tournament', visible: content.navigation.pageVisibility.tournament },
    { name: content.navigation.register, icon: Users, href: '/register', visible: content.navigation.pageVisibility.register },
    { name: content.navigation.rules, icon: FileText, href: '/rules', visible: content.navigation.pageVisibility.rules },
    { name: 'Skupiny', icon: Users, href: '/groups', visible: true },
    { name: content.navigation.champions, icon: Trophy, href: '/champions', visible: content.navigation.pageVisibility.champions },
    { name: content.navigation.contact, icon: Mail, href: '/contact', visible: content.navigation.pageVisibility.contact }
  ].filter(item => item.visible);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrollY > 50 ? 'bg-gray-800/95 backdrop-blur-md shadow-2xl border-b border-gray-700' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/image.png" 
                alt="Targon Cup Oficiální Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Targon Cup</div>
              <div className="text-xs text-blue-400 font-medium">OFICIÁLNÍ</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-700 rounded-lg flex items-center space-x-2 group ${
                    location.pathname === item.href 
                      ? 'text-blue-400 bg-gray-700' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 rounded-lg flex items-center space-x-3 ${
                  location.pathname === item.href 
                    ? 'text-blue-400 bg-gray-700' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
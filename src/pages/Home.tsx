import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { 
  Users, 
  Star,
  Camera,
  DollarSign,
  Shield,
  Trophy,
  Play,
  ChevronDown,
  Crown
} from 'lucide-react';

const Home: React.FC = () => {
  const { content } = useContent();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: content.home.stats.teams, label: content.home.stats.teamsLabel },
    { number: content.home.stats.prizePool, label: content.home.stats.prizePoolLabel },
    { number: content.home.stats.viewers, label: content.home.stats.viewersLabel },
    { number: content.home.stats.countries, label: content.home.stats.countriesLabel }
  ];

  const iconMap: Record<string, React.ElementType> = {
    DollarSign,
    Shield,
    Users,
    Star,
    Camera,
    Trophy
  };

  const features = content.home.features;

  const champions = content.home.champions;

  return (
    <div className="min-h-screen bg-gray-800 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo Container */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mb-8 relative shadow-2xl">
              <img 
                src="/image.png" 
                alt="Targon Cup Oficiální Logo" 
                className="w-16 h-16 object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl animate-ping opacity-20"></div>
            </div>
            {content.home.welcomeMessage && (
              <p className="text-lg text-blue-400 font-medium mb-4">
                {content.home.welcomeMessage}
              </p>
            )}
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-blue-600">
            {content.home.heroTitle}
          </h1>
          
          {/* Subtitle */}
          <div className="mb-12">
            {content.home.announcementText && (
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6 inline-block">
                <p className="text-blue-300 font-medium">
                  {content.home.announcementText}
                </p>
              </div>
            )}
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {content.home.heroDescription}
            </p>
            {content.home.callToActionText && (
              <p className="text-base text-gray-400 mt-4 max-w-2xl mx-auto">
                {content.home.callToActionText}
              </p>
            )}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-600/25 flex items-center space-x-3 min-w-[220px]"
            >
              <Users className="w-6 h-6" />
              <span>{content.home.registerButtonText}</span>
            </Link>
            <button className="border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white hover:bg-blue-500/10 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 min-w-[220px]">
              <Play className="w-6 h-6" />
              <span>{content.home.watchTrailerText}</span>
            </button>
          </div>

          {/* Stats */}
          {content.home.statsEnabled && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 relative z-10">
            <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full mb-8">
              <Star className="w-6 h-6 text-blue-400 mr-3" />
              <span className="text-blue-400 font-bold text-lg">Výhody účasti</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {content.home.featuresTitle}
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              {content.home.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Star;
              const gradients = [
                'from-green-600 to-green-800',
                'from-purple-600 to-purple-800', 
                'from-red-600 to-red-800',
                'from-yellow-600 to-yellow-800'
              ];
              const borderColors = [
                'border-green-500/30 hover:border-green-400/60',
                'border-purple-500/30 hover:border-purple-400/60',
                'border-red-500/30 hover:border-red-400/60', 
                'border-yellow-500/30 hover:border-yellow-400/60'
              ];
              const shadowColors = [
                'hover:shadow-green-500/25',
                'hover:shadow-purple-500/25',
                'hover:shadow-red-500/25',
                'hover:shadow-yellow-500/25'
              ];
              
              return (
                <div key={index} className={`bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm border ${borderColors[index % borderColors.length]} rounded-3xl p-10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${shadowColors[index % shadowColors.length]} group relative overflow-hidden`}>
                  {/* Card background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10`}>
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-blue-100 transition-colors duration-300 relative z-10">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300 relative z-10">{feature.description}</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full group-hover:bg-blue-400/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400/30 rounded-full group-hover:bg-purple-400/60 transition-colors duration-300"></div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom decorative line */}
          <div className="mt-20 flex justify-center relative z-10">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Champions Section */}
      {content.navigation.pageVisibility.champions && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {content.home.championsTitle}
              </h2>
              <p className="text-xl text-gray-300">{content.home.championsSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {champions.map((champion, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-yellow-500/50 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-sm text-yellow-400 font-bold mb-2">{champion.season}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">{champion.team}</h3>
                    <div className="text-2xl font-black text-green-400 mb-2">{champion.prize}</div>
                    <div className="text-sm text-gray-300">{champion.place} Místo</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/champions"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Zobrazit Všechny Šampiony
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
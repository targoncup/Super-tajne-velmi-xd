import React from 'react';
import { useContent } from '../hooks/useContent';
import { 
  Users, 
  Trophy, 
  Star,
  Shield,
  Crown,
  Target,
  Gamepad2
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Trophy,
  Users,
  Star,
  Shield,
  Crown,
  Target,
  Gamepad2
};

const Groups: React.FC = () => {
  const { content } = useContent();

  // Ukážkové skupiny
  const groups = [
    {
      id: 'A',
      name: 'Skupina A',
      teams: [
        { name: 'Celestial Guardians', tag: 'CG', points: 9, wins: 3, losses: 0 },
        { name: 'Thunder Wolves', tag: 'TW', points: 6, wins: 2, losses: 1 },
        { name: 'Dragon Slayers', tag: 'DS', points: 3, wins: 1, losses: 2 },
        { name: 'Phoenix Rising', tag: 'PR', points: 0, wins: 0, losses: 3 }
      ]
    },
    {
      id: 'B',
      name: 'Skupina B',
      teams: [
        { name: 'Starforge Legends', tag: 'SL', points: 9, wins: 3, losses: 0 },
        { name: 'Cosmic Reapers', tag: 'CR', points: 6, wins: 2, losses: 1 },
        { name: 'Shadow Hunters', tag: 'SH', points: 3, wins: 1, losses: 2 },
        { name: 'Ice Breakers', tag: 'IB', points: 0, wins: 0, losses: 3 }
      ]
    }
  ];

  const getPositionColor = (position: number): string => {
    switch (position) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-4 h-4" />;
      case 2:
        return <Trophy className="w-4 h-4" />;
      case 3:
        return <Star className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

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
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.groups.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
              {content.groups.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {content.groups.description}
            </p>
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {groups.map((group) => (
              <div key={group.id} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-black text-white">{group.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{group.name}</h2>
                </div>

                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-700/50 rounded-lg text-sm font-medium text-gray-300">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Tým</div>
                    <div className="col-span-2 text-center">V</div>
                    <div className="col-span-2 text-center">P</div>
                    <div className="col-span-2 text-center">Body</div>
                  </div>

                  {/* Teams */}
                  {group.teams.map((team, index) => {
                    const position = index + 1;
                    return (
                      <div key={team.tag} className="grid grid-cols-12 gap-4 px-4 py-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors">
                        <div className={`col-span-1 flex items-center ${getPositionColor(position)}`}>
                          <div className="flex items-center space-x-1">
                            {getPositionIcon(position)}
                            <span className="font-bold">{position}</span>
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center overflow-hidden">
                            {team.logo ? (
                              <img 
                                src={team.logo} 
                                alt={`${team.name} logo`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-xs font-bold text-white">{team.tag}</span>
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium">{team.name}</div>
                            <div className="text-xs text-gray-400">#{team.tag}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-green-400 font-bold">{team.wins}</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-red-400 font-bold">{team.losses}</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-white font-bold text-lg">{team.points}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Qualification Info */}
                <div className="mt-6 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <div className="text-sm text-blue-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      <span><strong>{content.groups.qualificationInfo.advance}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span><strong>{content.groups.qualificationInfo.eliminate}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tournament Format Info */}
          <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4 text-white">{content.groups.formatTitle}</h2>
              <p className="text-gray-300">{content.groups.formatSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {content.groups.formatCards.map((card, index) => {
                const Icon = iconMap[card.icon] || Trophy;
                const gradients = [
                  'from-green-600 to-green-800',
                  'from-blue-600 to-blue-800',
                  'from-purple-600 to-purple-800'
                ];
                
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-gray-300 text-sm">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Groups;
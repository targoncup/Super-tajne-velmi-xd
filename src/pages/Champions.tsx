import React from 'react';
import { useContent } from '../hooks/useContent';
import { Crown, Trophy, Star, Award } from 'lucide-react';

const Champions: React.FC = () => {
  const { content } = useContent();

  const champions = [
    { 
      season: 'Léto 2024', 
      team: 'Celestial Guardians', 
      prize: '$25,000', 
      place: '1.',
      players: ['CelestialADC', 'GuardianJungle', 'StarMid', 'CosmicSupport', 'GalaxyTop'],
      coach: 'MasterStrategist'
    },
    { 
      season: 'Jaro 2024', 
      team: 'Starforge Legends', 
      prize: '$20,000', 
      place: '1.',
      players: ['LegendaryADC', 'ForgeJungle', 'StarMid', 'MythicSupport', 'TitanTop'],
      coach: 'EliteCoach'
    },
    { 
      season: 'Zima 2023', 
      team: 'Cosmic Reapers', 
      prize: '$15,000', 
      place: '1.',
      players: ['ReaperADC', 'CosmicJungle', 'VoidMid', 'ShadowSupport', 'DarkTop'],
      coach: 'VoidMaster'
    },
    { 
      season: 'Podzim 2023', 
      team: 'Phoenix Rising', 
      prize: '$12,000', 
      place: '1.',
      players: ['PhoenixADC', 'FlameJungle', 'FireMid', 'BurnSupport', 'InfernoTop'],
      coach: 'FlameGuide'
    },
    { 
      season: 'Léto 2023', 
      team: 'Thunder Wolves', 
      prize: '$10,000', 
      place: '1.',
      players: ['ThunderADC', 'WolfJungle', 'StormMid', 'LightningSupport', 'BoltTop'],
      coach: 'StormMaster'
    },
    { 
      season: 'Jaro 2023', 
      team: 'Dragon Slayers', 
      prize: '$8,000', 
      place: '1.',
      players: ['SlayerADC', 'DragonJungle', 'FlameMid', 'ScaleSupport', 'WyrmTop'],
      coach: 'DragonLord'
    }
  ];

  const mvpPlayers = [
    {
      name: 'CelestialADC',
      team: 'Celestial Guardians',
      season: 'Léto 2024',
      role: 'ADC',
      stats: { kda: '4.2', winRate: '85%', avgDamage: '28,450' }
    },
    {
      name: 'LegendaryADC',
      team: 'Starforge Legends',
      season: 'Jaro 2024',
      role: 'ADC',
      stats: { kda: '3.8', winRate: '82%', avgDamage: '26,200' }
    },
    {
      name: 'ReaperADC',
      team: 'Cosmic Reapers',
      season: 'Zima 2023',
      role: 'ADC',
      stats: { kda: '4.5', winRate: '88%', avgDamage: '29,100' }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      {/* Champions Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600/20 border border-yellow-500/30 rounded-full mb-6">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold">{content.champions.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.champions.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.champions.description}
            </p>
          </div>

          {/* Champions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {champions.map((champion, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-yellow-500/50 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-sm text-yellow-400 font-bold mb-2">{champion.season}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{champion.team}</h3>
                  <div className="text-2xl font-black text-green-400 mb-2">{champion.prize}</div>
                  <div className="text-sm text-gray-300 mb-4">{champion.place} Místo</div>
                  
                  {/* Team Details */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-bold text-white mb-2">Sestava:</h4>
                    <div className="space-y-1 text-xs text-gray-300">
                      {champion.players.map((player, playerIndex) => (
                        <div key={playerIndex}>{player}</div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="text-xs text-gray-400">
                        <strong>Trenér:</strong> {champion.coach}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MVP Players Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                {content.champions.mvpTitle}
              </h2>
              <p className="text-lg text-gray-300">
                {content.champions.mvpSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mvpPlayers.map((player, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
                    <div className="text-sm text-blue-400 mb-1">{player.team}</div>
                    <div className="text-xs text-gray-400 mb-4">{player.season} • {player.role}</div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-white font-bold">{player.stats.kda}</div>
                          <div className="text-gray-400">KDA</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">{player.stats.winRate}</div>
                          <div className="text-gray-400">Win Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">{player.stats.avgDamage}</div>
                          <div className="text-gray-400">Avg DMG</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Records */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4 text-white">
                {content.champions.recordsTitle}
              </h2>
              <p className="text-gray-300">
                {content.champions.recordsSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.champions.records.map((record, index) => {
                const Icon = iconMap[record.icon] || Trophy;
                const colors = ['text-yellow-400', 'text-blue-400', 'text-green-400', 'text-purple-400'];
                return (
                  <div key={index} className="bg-gray-700/50 rounded-xl p-6 text-center">
                    <Icon className={`w-12 h-12 ${colors[index % colors.length]} mx-auto mb-3`} />
                    <div className="text-2xl font-bold text-white mb-1">{record.value}</div>
                    <div className="text-sm text-gray-300 mb-1">{record.title}</div>
                    <div className="text-xs text-gray-400">{record.description}</div>
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

export default Champions;
import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { 
  DollarSign,
  Clock,
  Users,
  FileText,
  Trophy,
  Target,
  Gamepad2,
  Shield,
  Play,
  Zap
} from 'lucide-react';

const Tournament: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      {/* Tournament Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <Zap className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.tournament.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.tournament.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.tournament.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-3xl p-12 hover:border-blue-500/50 transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-700/80 rounded-2xl p-6 border border-gray-600">
                    <div className="flex items-center space-x-3 mb-3">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      <span className="text-sm text-gray-400 font-medium">Prize Pool</span>
                    </div>
                    <p className="text-3xl font-black text-green-400">{content.tournament.prizePool}</p>
                  </div>
                  <div className="bg-gray-700/80 rounded-2xl p-6 border border-gray-600">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-gray-400 font-medium">Registrace Končí</span>
                    </div>
                    <p className="text-3xl font-black text-blue-400">{content.tournament.registrationDeadline}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Users className="w-5 h-5" />
                    <span>{content.tournament.registerButtonText}</span>
                  </Link>
                  <Link 
                    to="/rules"
                    className="border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white hover:bg-blue-500/10 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>{content.tournament.rulesButtonText}</span>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
                  <div className="text-center">
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold mb-4 text-white">Formát Turnaje</h4>
                    <p className="text-gray-300 mb-6 text-lg">Double Elimination Bracket</p>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Maximálně 64 Týmů</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Best of 3 (Finále: Best of 5)</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Draft Pick Formát</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Živé Vysílání na Twitchi</span>
                      </div>
                    </div>
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

export default Tournament;

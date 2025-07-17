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
  Check,
  X,
  AlertCircle
} from 'lucide-react';

const Rules: React.FC = () => {
  const { content } = useContent();

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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Struktura ligy */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Struktura Ligy</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Počet týmů:</strong> 8–10</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Splity:</strong> Dva ročně – Jarní, Letní a Zimní</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Základní část:</strong> Double Round Robin (každý s každým 2×)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Formát zápasu:</strong> Best of 3 (Fearless)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Playoffs:</strong> Top 6 týmů postupuje do vyřazovací části</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Formát Playoffs:</strong> Double Elimination – Best of 5 (Fearless)</span>
                </div>
              </div>
            </div>

            {/* Systém bodování */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Systém Bodování</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Výhra 2:0</span>
                      <span className="text-green-400 font-bold">3 body</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Výhra 2:1</span>
                      <span className="text-green-400 font-bold">2 body</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prohra 1:2</span>
                      <span className="text-yellow-400 font-bold">1 bod</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prohra 0:2</span>
                      <span className="text-red-400 font-bold">0 bodů</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Při shodě rozhoduje:</strong></p>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• Výsledek vzájemných zápasů</li>
                    <li>• Tiebreak zápas(y), pokud je nutný</li>
                    <li>• Čas potřebný k výhře (v krajních případech)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pravidla pro týmy */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Pravidla pro Týmy</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Velikost soupisky:</strong> 7 hráčů (5 hlavních, 2 náhradníci)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Trenér:</strong> Každý tým může mít trenéra</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Občanství:</strong> Min. 3 hráči CZ/SK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Přestupy:</strong> Povoleny pouze mezi splity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>Registrace:</strong> Logo, název a barvy před sezónou</span>
                </div>
              </div>
            </div>

            {/* Technické podmínky */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Technické Podmínky</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Oficiální turnajové servery Riot Games</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Žádná externí komunikace během zápasu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Schválené headsety a software</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Dozor administrátorů ligy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Streaming pouze s povolením admina</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Rules Sections */}
          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {/* Chování a disciplína */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Chování a Disciplína</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Zakázáno: Hate speech, trolling, griefing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Verbální útoky na streamu nebo sociálních sítích</span>
                </div>
                <div className="bg-red-900/20 rounded-lg p-3 mt-3">
                  <p className="text-xs"><strong>Tresty:</strong> Varování, pokuty, suspendace, vyloučení</p>
                </div>
              </div>
            </div>

            {/* Draftovací pravidla */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Draftovací Pravidla</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Standardní Riot Games Ban/Pick formát</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Draft za přítomnosti rozhodčího</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Trenéři komunikují pouze během draftu</span>
                </div>
              </div>
            </div>

            {/* Správa ligy */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Správa Ligy</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Změny pravidel podléhají správě ligy</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Týmy se účastní diskusí mezi splity</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Právo vyloučit za závažné porušení</span>
                </div>
              </div>
            </div>
          </div>

          {/* Identity and Substitutions */}
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {/* Identita týmu */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Identita Týmu</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p className="text-sm"><strong>Název týmu, logo a dresy nesmí obsahovat:</strong></p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Urážlivé, vulgární nebo nenávistné výrazy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Politická, náboženská nebo ideologická sdělení</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Napodobeniny jiných značek nebo týmů</span>
                  </div>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4 mt-4">
                  <p className="text-sm"><strong>Poznámka:</strong> Veškerý vizuál musí být schválen organizátory před sezónou</p>
                </div>
              </div>
            </div>

            {/* Záskoky a náhrady */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Záskoky a Náhrady</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Náhradník může být nasazen mezi hrami</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Hráč musí být oficiálně zaregistrován</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Dočasný záskok při technickém výpadku</span>
                </div>
                <div className="bg-green-900/20 rounded-lg p-4 mt-4">
                  <p className="text-sm"><strong>Povinnosti:</strong> Týmy se musí dostavit včas, mediální povinnosti jsou závazné</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Rules Button */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-600/25 flex items-center space-x-3 mx-auto">
              <FileText className="w-6 h-6" />
              <span>Stáhnout Kompletní Pravidla (PDF)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;

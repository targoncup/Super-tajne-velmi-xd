import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useSupabaseRegistrations } from '../hooks/useSupabaseRegistrations';
import { 
  Users, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Trophy,
  Check,
  AlertCircle,
  Upload,
  CheckCircle
} from 'lucide-react';

const Register: React.FC = () => {
  const { content } = useContent();
  const { addRegistration, loading: dbLoading, error: dbError } = useSupabaseRegistrations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    teamName: '',
    teamTag: '',
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    captainDiscord: '',
    players: [
      { name: '', summonerName: '', role: '', nationality: '' },
      { name: '', summonerName: '', role: '', nationality: '' },
      { name: '', summonerName: '', role: '', nationality: '' },
      { name: '', summonerName: '', role: '', nationality: '' },
      { name: '', summonerName: '', role: '', nationality: '' }
    ],
    substitutes: [
      { name: '', summonerName: '', role: '', nationality: '' },
      { name: '', summonerName: '', role: '', nationality: '' }
    ],
    coach: { name: '', email: '', experience: '' },
    agreeToRules: false,
    agreeToStreaming: false
  });

  const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];
  const nationalities = ['Česká republika', 'Slovensko', 'Ostatní'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (index: number, field: string, value: string, isSubstitute = false) => {
    setFormData(prev => ({
      ...prev,
      [isSubstitute ? 'substitutes' : 'players']: prev[isSubstitute ? 'substitutes' : 'players'].map((player, i) =>
        i === index ? { ...player, [field]: value } : player
      )
    }));
  };

  const handleCoachChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      coach: { ...prev.coach, [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validate required fields
      if (!formData.teamName || !formData.teamTag || !formData.captainName || 
          !formData.captainEmail || !formData.captainPhone || !formData.captainDiscord) {
        throw new Error('Vyplňte všechna povinná pole týmu a kapitána');
      }

      // Validate players
      const validPlayers = formData.players.filter(player => 
        player.name && player.summonerName && player.role && player.nationality
      );
      
      if (validPlayers.length < 5) {
        throw new Error('Musíte zadat všech 5 hlavních hráčů');
      }

      // Check for duplicate roles
      const roles = validPlayers.map(player => player.role);
      const uniqueRoles = new Set(roles);
      if (uniqueRoles.size !== roles.length) {
        throw new Error('Každý hráč musí mít unikátní roli');
      }

      if (!formData.agreeToRules || !formData.agreeToStreaming) {
        throw new Error('Musíte souhlasit s pravidly a podmínkami');
      }

      // Submit registration
      setTimeout(() => {
        addRegistration({
          teamName: formData.teamName,
          teamTag: formData.teamTag,
          captainName: formData.captainName,
          captainEmail: formData.captainEmail,
          captainPhone: formData.captainPhone,
          captainDiscord: formData.captainDiscord,
          players: validPlayers,
          substitutes: formData.substitutes.filter(sub => sub.name && sub.summonerName),
          coach: formData.coach,
          agreeToRules: formData.agreeToRules,
          agreeToStreaming: formData.agreeToStreaming,
        }).then(() => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          
          // Reset form
          setFormData({
            teamName: '',
            teamTag: '',
            captainName: '',
            captainEmail: '',
            captainPhone: '',
            captainDiscord: '',
            players: [
              { name: '', summonerName: '', role: '', nationality: '' },
              { name: '', summonerName: '', role: '', nationality: '' },
              { name: '', summonerName: '', role: '', nationality: '' },
              { name: '', summonerName: '', role: '', nationality: '' },
              { name: '', summonerName: '', role: '', nationality: '' }
            ],
            substitutes: [
              { name: '', summonerName: '', role: '', nationality: '' },
              { name: '', summonerName: '', role: '', nationality: '' }
            ],
            coach: { name: '', email: '', experience: '' },
            agreeToRules: false,
            agreeToStreaming: false
          });
        }).catch((error) => {
          setSubmitError(error.message);
          setIsSubmitting(false);
        });
      }, 1000);
      
    } catch (error) {
      setSubmitError((error as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-20">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold">{content.register.subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {content.register.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.register.description}
            </p>
          </div>

          {/* Registration Requirements */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
              Požadavky pro Registraci
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Minimálně 3 hráči CZ/SK národnosti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>5 hlavních hráčů + 2 náhradníci</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Všichni hráči Diamond+ rank</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Registrační poplatek: 500 CZK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Souhlas s pravidly turnaje</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Logo a název týmu (schválení)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-8 mb-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-400 mb-4">Registrace Úspěšná!</h2>
              <p className="text-gray-300 mb-4">
                Váš tým byl úspěšně zaregistrován. Obdržíte potvrzovací email s dalšími instrukcemi.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Registrovat Další Tým
              </button>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-600/20 border border-red-500/30 rounded-2xl p-6 mb-12">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-red-400">Chyba při registraci</h3>
              </div>
              <p className="text-red-300 mt-2">{submitError}</p>
            </div>
          )}

          {/* Database Error */}
          {dbError && (
            <div className="bg-red-600/20 border border-red-500/30 rounded-2xl p-6 mb-12">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-red-400">Chyba databáze</h3>
              </div>
              <p className="text-red-300 mt-2">{dbError}</p>
            </div>
          )}

          {/* Registration Form */}
          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Team Information */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Informace o Týmu</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Název Týmu *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Zadejte název týmu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Tag *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={formData.teamTag}
                      onChange={(e) => handleInputChange('teamTag', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="TAG (max 5 znaků)"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo Týmu
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Nahrajte logo týmu</p>
                    <p className="text-sm text-gray-400">PNG, JPG do 2MB</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>

              {/* Captain Information */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Kapitán Týmu</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Jméno a Příjmení *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.captainName}
                      onChange={(e) => handleInputChange('captainName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.captainEmail}
                      onChange={(e) => handleInputChange('captainEmail', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="jan.novak@email.cz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.captainPhone}
                      onChange={(e) => handleInputChange('captainPhone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="+420 123 456 789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Discord *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.captainDiscord}
                      onChange={(e) => handleInputChange('captainDiscord', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="username#1234"
                    />
                  </div>
                </div>
              </div>

              {/* Main Players */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Hlavní Sestava (5 hráčů)</h3>
                <div className="space-y-6">
                  {formData.players.map((player, index) => (
                    <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Jméno a Příjmení *
                        </label>
                        <input
                          type="text"
                          required
                          value={player.name}
                          onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Jan Novák"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Summoner Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={player.summonerName}
                          onChange={(e) => handlePlayerChange(index, 'summonerName', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                          placeholder="SummonerName"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Role *
                        </label>
                        <select
                          required
                          value={player.role}
                          onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Vyberte roli</option>
                          {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Národnost *
                        </label>
                        <select
                          required
                          value={player.nationality}
                          onChange={(e) => handlePlayerChange(index, 'nationality', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Vyberte</option>
                          {nationalities.map(nat => (
                            <option key={nat} value={nat}>{nat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Substitute Players */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Náhradníci (2 hráči)</h3>
                <div className="space-y-6">
                  {formData.substitutes.map((player, index) => (
                    <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Jméno a Příjmení
                        </label>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => handlePlayerChange(index, 'name', e.target.value, true)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Jan Novák"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Summoner Name
                        </label>
                        <input
                          type="text"
                          value={player.summonerName}
                          onChange={(e) => handlePlayerChange(index, 'summonerName', e.target.value, true)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                          placeholder="SummonerName"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Role
                        </label>
                        <select
                          value={player.role}
                          onChange={(e) => handlePlayerChange(index, 'role', e.target.value, true)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Vyberte roli</option>
                          {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Národnost
                        </label>
                        <select
                          value={player.nationality}
                          onChange={(e) => handlePlayerChange(index, 'nationality', e.target.value, true)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Vyberte</option>
                          {nationalities.map(nat => (
                            <option key={nat} value={nat}>{nat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Information */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Trenér (volitelné)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Jméno a Příjmení
                    </label>
                    <input
                      type="text"
                      value={formData.coach.name}
                      onChange={(e) => handleCoachChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.coach.email}
                      onChange={(e) => handleCoachChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="trenér@email.cz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Zkušenosti
                    </label>
                    <input
                      type="text"
                      value={formData.coach.experience}
                      onChange={(e) => handleCoachChange('experience', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="2 roky coaching"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-700/50 rounded-2xl p-8 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Souhlas s Podmínkami</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreeToRules}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeToRules: e.target.checked }))}
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">
                      Souhlasím s <a href="/rules" className="text-blue-400 hover:underline">pravidly turnaje</a> a zavazuji se je dodržovat *
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreeToStreaming}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeToStreaming: e.target.checked }))}
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">
                      Souhlasím s nahráváním a vysíláním zápasů pro účely turnaje *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || dbLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-600/25 flex items-center space-x-3 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Registruji...</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-6 h-6" />
                      <span>Registrovat Tým</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  Po odeslání formuláře obdržíte email s dalšími instrukcemi
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Register;

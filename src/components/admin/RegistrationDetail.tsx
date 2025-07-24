import React from 'react';
import { TeamRegistration } from '../../config/admin';
import {
  X,
  User,
  Mail,
  Phone,
  MessageCircle,
  Users,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Gamepad2,
  Download,
  Image
} from 'lucide-react';

interface RegistrationDetailProps {
  registration: TeamRegistration;
  onClose: () => void;
  onStatusUpdate: (id: string, status: TeamRegistration['status']) => void;
}

const RegistrationDetail: React.FC<RegistrationDetailProps> = ({
  registration,
  onClose,
  onStatusUpdate
}) => {
  const handleStatusUpdate = (status: TeamRegistration['status']) => {
    onStatusUpdate(registration.id, status);
    // Auto-close popup after status update
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: TeamRegistration['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 border-yellow-500/30 text-yellow-400';
      case 'approved':
        return 'bg-green-600/20 border-green-500/30 text-green-400';
      case 'rejected':
        return 'bg-red-600/20 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-600/20 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusIcon = (status: TeamRegistration['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: TeamRegistration['status']): string => {
    switch (status) {
      case 'pending':
        return 'Čekající';
      case 'approved':
        return 'Schváleno';
      case 'rejected':
        return 'Zamítnuto';
      default:
        return 'Neznámý';
    }
  };

  const downloadLogo = () => {
    if (registration.logo) {
      const link = document.createElement('a');
      link.href = registration.logo.data;
      link.download = `${registration.teamName}_${registration.teamTag}_logo.${registration.logo.type.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-600 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{registration.teamName}</h2>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">#{registration.teamTag}</span>
                <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(registration.status)}`}>
                  {getStatusIcon(registration.status)}
                  <span>{getStatusText(registration.status)}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Team Info */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  Informace o Týmu
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Registrováno: {formatDate(registration.timestamp)}</span>
                  </div>
                  {registration.logo && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Image className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Logo týmu:</span>
                      </div>
                      <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-4">
                        <img 
                          src={registration.logo.data} 
                          alt={`${registration.teamName} logo`}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-600"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{registration.logo.name}</div>
                          <div className="text-sm text-gray-400">
                            {registration.logo.type} • {(registration.logo.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                        <button
                          onClick={downloadLogo}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          title="Stáhnout logo"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Captain Info */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  Kapitán Týmu
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">{registration.captainName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${registration.captainEmail}`} className="text-blue-400 hover:underline">
                      {registration.captainEmail}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${registration.captainPhone}`} className="text-blue-400 hover:underline">
                      {registration.captainPhone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{registration.captainDiscord}</span>
                  </div>
                </div>
              </div>

              {/* Coach Info */}
              {registration.coach.name && (
                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-purple-400" />
                    Trenér
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-medium">{registration.coach.name}</span>
                    </div>
                    {registration.coach.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${registration.coach.email}`} className="text-blue-400 hover:underline">
                          {registration.coach.email}
                        </a>
                      </div>
                    )}
                    {registration.coach.experience && (
                      <div className="flex items-center space-x-3">
                        <Gamepad2 className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{registration.coach.experience}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Main Players */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-400" />
                  Hlavní Sestava
                </h3>
                <div className="space-y-3">
                  {registration.players.map((player, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{player.name}</span>
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                          {player.role}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Summoner: {player.summonerName}</div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{player.nationality}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Substitutes */}
              {registration.substitutes.length > 0 && (
                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-400" />
                    Náhradníci
                  </h3>
                  <div className="space-y-3">
                    {registration.substitutes.map((player, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{player.name}</span>
                          <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded">
                            {player.role}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div>Summoner: {player.summonerName}</div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3" />
                            <span>{player.nationality}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agreements */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-4">Souhlasy</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {registration.agreeToRules ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-gray-300">Souhlas s pravidly</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {registration.agreeToStreaming ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-gray-300">Souhlas se streamováním</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {registration.notes && (
                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-bold text-white mb-4">Poznámky</h3>
                  <p className="text-gray-300">{registration.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-600 bg-gray-700/50">
          <div className="text-sm text-gray-400">
            ID: {registration.id}
          </div>
          <div className="flex items-center space-x-3">
            {registration.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Zamítnout</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Schválit</span>
                </button>
              </>
            )}
            {registration.status !== 'pending' && (
              <button
                onClick={() => handleStatusUpdate('pending')}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Clock className="w-4 h-4" />
                <span>Vrátit na čekající</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetail;
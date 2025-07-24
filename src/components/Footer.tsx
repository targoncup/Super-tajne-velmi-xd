import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const Footer: React.FC = () => {
  const { content } = useContent();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <img 
                  src="/image.png" 
                  alt="Targon Cup Oficiální Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Targon Cup</div>
                <div className="text-sm text-blue-400 font-medium">OFICIÁLNÍ</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Prémiová série League of Legends turnajů. Připojte se k nebeské soutěži a dokažte svou hodnotu mezi hvězdami.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Turnaj</h3>
            <ul className="space-y-3">
              <li><Link to="/tournament" className="text-gray-300 hover:text-white transition-colors duration-200">Rozvrh</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-200">Registrace</Link></li>
              <li><Link to="/rules" className="text-gray-300 hover:text-white transition-colors duration-200">Pravidla</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Pavouk</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Sledujte Nás</h3>
            <div className="grid grid-cols-3 gap-3">
              <a href="https://x.com/TargonCupTCO" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 hover:bg-black rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gray-700 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h.857c.429 0 .857.429.857.857v2.571c0 .429-.428.857-.857.857h-.857c-.429 0-.857-.428-.857-.857V5.571c0-.428.428-.857.857-.857zm0 5.143h.857c.429 0 .857.428.857.857v2.572c0 .428-.428.857-.857.857h-.857c-.429 0-.857-.429-.857-.857v-2.572c0-.429.428-.857.857-.857zm-5.714 0h.857c.429 0 .857.428.857.857v2.572c0 .428-.428.857-.857.857h-.857c-.429 0-.857-.429-.857-.857v-2.572c0-.429.428-.857.857-.857zm11.429 0h.857c.429 0 .857.428.857.857v2.572c0 .428-.428.857-.857.857h-.857c-.429 0-.857-.429-.857-.857v-2.572c0-.429.428-.857.857-.857zm-5.715 5.143h.857c.429 0 .857.429.857.857v2.572c0 .428-.428.857-.857.857h-.857c-.429 0-.857-.429-.857-.857v-2.572c0-.428.428-.857.857-.857z"/>
                  <path d="M20.067 0C22.175 0 24 1.825 24 3.933v16.134C24 22.175 22.175 24 20.067 24H3.933C1.825 24 0 22.175 0 20.067V3.933C0 1.825 1.825 0 3.933 0h16.134z"/>
                </svg>
              </a>
              <a href="https://discord.gg/6VXyev6K" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
              <a href="https://discord.gg/c9pRsbYCt2" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gray-700 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gray-700 hover:bg-black rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Targon Cup Oficiální. {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  )
}
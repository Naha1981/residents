export default function Footer() {
  return (
    <footer className="bg-metallic-gradient border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400">Police</div>
            <a 
              href="tel:10111" 
              className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              10111
            </a>
            <div className="text-xs text-gray-500">Nationwide Emergency</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400">Emergency Connect</div>
            <a 
              href="tel:0113755911" 
              className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              011 375 5911
            </a>
            <div className="text-xs text-gray-500">Ambulance & Fire</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400">Crime Stop</div>
            <a 
              href="tel:0860010111" 
              className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              086 001 0111
            </a>
            <div className="text-xs text-gray-500">Anonymous Reporting</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400">JMPD</div>
            <a 
              href="tel:0117589100" 
              className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              011 758 9100
            </a>
            <div className="text-xs text-gray-500">Metro Police</div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-4">
          <p className="text-center text-gray-400 text-sm">
            Made with ❤️ by <span className="font-semibold text-indigo-400">NahaInc</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Construction, Building2, Hospital } from 'lucide-react';

export default function ReportSelection() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-metallic-gradient px-4">
      <div className="max-w-6xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          What would you like to report?
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <Link 
            to="/crime-report"
            className="bg-metallic-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all transform hover:scale-105"
          >
            <Shield className="w-12 h-12 text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-white">Report Crime</h2>
            <p className="text-gray-300">
              Report suspicious activities, vandalism, or other criminal incidents.
            </p>
          </Link>

          <Link 
            to="/infrastructure-report"
            className="bg-metallic-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all transform hover:scale-105"
          >
            <Construction className="w-12 h-12 text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-white">Infrastructure Issue</h2>
            <p className="text-gray-300">
              Report damaged roads, broken street lights, or other infrastructure problems.
            </p>
          </Link>

          <Link 
            to="/hospital-report"
            className="bg-metallic-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all transform hover:scale-105"
          >
            <Hospital className="w-12 h-12 text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-white">Hospital Service</h2>
            <p className="text-gray-300">
              Report issues with hospital services, wait times, or treatment concerns.
            </p>
          </Link>

          <Link 
            to="/government-office-report"
            className="bg-metallic-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all transform hover:scale-105"
          >
            <Building2 className="w-12 h-12 text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-white">Government Office</h2>
            <p className="text-gray-300">
              Report issues with government services, procedures, or staff conduct.
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
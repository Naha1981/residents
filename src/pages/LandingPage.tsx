import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Construction, Hospital, Building2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-metallic-gradient px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              CivicGuard
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Your Community Safety Platform</p>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
          Report and Enhance Your Neighborhood
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 text-left"
          >
            <Shield className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Crime Reporting</h3>
              <p className="text-gray-300">
                Quickly report crimes with geolocation, photos, and descriptions. Stay updated with safety alerts in your area.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 text-left"
          >
            <Construction className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Infrastructure Issues</h3>
              <p className="text-gray-300">
                Report and track infrastructure damages like potholes, broken streetlights, and water leaks.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 text-left"
          >
            <Hospital className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Hospital Service Reports</h3>
              <p className="text-gray-300">
                Share your experiences at hospitals to help improve healthcare services.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 text-left"
          >
            <Building2 className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Government Office Services</h3>
              <p className="text-gray-300">
                Provide feedback on the service delivery at government offices to ensure better public service.
              </p>
            </div>
          </motion.div>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-indigo-500 transition-all shadow-lg group"
        >
          Submit Your Report
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
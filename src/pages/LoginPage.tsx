import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, name });
    navigate('/report-selection');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-metallic-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-metallic-800 p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-metallic-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}
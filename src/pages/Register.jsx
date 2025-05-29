import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [instrument, setInstrument] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!name || !email || !password || !confirmPassword || !instrument) {
      return setError('Please fill in all fields')
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }
    
    try {
      setLoading(true)
      await register(email, password, name, instrument)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }
  
  const instruments = [
    'Guitar',
    'Bass',
    'Drums',
    'Vocals',
    'Piano/Keyboard',
    'Violin',
    'Saxophone',
    'Trumpet',
    'Producer/Beatmaker',
    'DJ',
    'Other'
  ]
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      darkMode 
        ? 'bg-gradient-to-br from-dark to-dark-lighter' 
        : 'bg-gradient-to-br from-light to-light-darker'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <Link 
            to="/" 
            className={`flex items-center transition-colors ${
              darkMode 
                ? 'text-light/70 hover:text-primary-light' 
                : 'text-dark/70 hover:text-primary'
            }`}
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className={`backdrop-blur-sm rounded-xl p-8 border ${
          darkMode 
            ? 'bg-dark-lighter/90 border-gray-700/30 shadow-xl shadow-black/20' 
            : 'bg-white/90 border-light-darker/30 shadow-xl'
        }`}>
          <h1 className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-light' : 'text-dark'
          }`}>
            Create your account
          </h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-light/80' : 'text-dark/80'
                }`}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-dark-lighter/80 border-gray-700/50 text-light' 
                    : 'bg-white/80 border border-gray-200 text-dark'
                }`}
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-light/80' : 'text-dark/80'
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-dark-lighter/80 border-gray-700/50 text-light' 
                    : 'bg-white/80 border border-gray-200 text-dark'
                }`}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="instrument" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-light/80' : 'text-dark/80'
                }`}
              >
                Primary Instrument/Role
              </label>
              <select
                id="instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-dark-lighter/80 border-gray-700/50 text-light' 
                    : 'bg-white/80 border border-gray-200 text-dark'
                }`}
              >
                <option value="">Select your instrument</option>
                {instruments.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-light/80' : 'text-dark/80'
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-dark-lighter/80 border-gray-700/50 text-light' 
                    : 'bg-white/80 border border-gray-200 text-dark'
                }`}
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-light/80' : 'text-dark/80'
                }`}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent transition-all duration-200 ${
                  darkMode 
                    ? 'bg-dark-lighter/80 border-gray-700/50 text-light' 
                    : 'bg-white/80 border border-gray-200 text-dark'
                }`}
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className={darkMode ? 'text-light/70' : 'text-dark/70'}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className={darkMode ? 'text-primary-light hover:underline' : 'text-primary hover:underline'}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register

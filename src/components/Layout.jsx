import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../contexts/ThemeContext'

const Layout = () => {
  const { darkMode } = useTheme()
  
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <motion.main 
          className="flex-grow pt-20 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

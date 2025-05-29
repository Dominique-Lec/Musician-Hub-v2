import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMusic, FiMic, FiHeadphones, FiPlus, FiFilter } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import TrackList from '../components/TrackList'
import SpotifyGreenButton from '../components/SpotifyGreenButton'
import GreenAccentCard from '../components/GreenAccentCard'

const Library = () => {
  const { darkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('playlists')
  
  // Mock data for playlists
  const playlists = [
    {
      id: 1,
      title: 'My Favorites',
      description: 'All my favorite tracks',
      trackCount: 42,
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Chill Vibes',
      description: 'Relaxing music for focus',
      trackCount: 28,
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Workout Mix',
      description: 'High energy tracks for exercise',
      trackCount: 35,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Acoustic Sessions',
      description: 'Unplugged and raw performances',
      trackCount: 17,
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]
  
  // Mock data for tracks
  const tracks = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      genre: 'Pop',
      duration: '3:20',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'As It Was',
      artist: 'Harry Styles',
      album: "Harry's House",
      genre: 'Pop',
      duration: '2:47',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Heat Waves',
      artist: 'Glass Animals',
      album: 'Dreamland',
      genre: 'Indie',
      duration: '3:59',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Stay',
      artist: 'The Kid LAROI, Justin Bieber',
      album: 'F*CK LOVE 3: OVER YOU',
      genre: 'Pop',
      duration: '2:21',
      image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: 'Easy On Me',
      artist: 'Adele',
      album: '30',
      genre: 'Pop',
      duration: '3:44',
      image: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]
  
  // Mock data for artists
  const artists = [
    {
      id: 1,
      name: 'The Weeknd',
      genre: 'Pop/R&B',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Taylor Swift',
      genre: 'Pop',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Kendrick Lamar',
      genre: 'Hip-Hop',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'Billie Eilish',
      genre: 'Pop',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]
  
  // Tabs for the library
  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: <FiMusic /> },
    { id: 'tracks', label: 'Tracks', icon: <FiHeadphones /> },
    { id: 'artists', label: 'Artists', icon: <FiMic /> },
  ]
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Your Library</h1>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full ${
              darkMode 
                ? 'bg-dark-lighter text-gray-400 hover:text-primary' 
                : 'bg-light-darker/80 text-gray-600 hover:text-primary'
            }`}
          >
            <FiFilter />
          </motion.button>
          
          <SpotifyGreenButton icon={<FiPlus />}>
            Create New
          </SpotifyGreenButton>
        </div>
      </div>
      
      {/* Tabs - Spotify style */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : darkMode 
                  ? 'text-gray-400 hover:text-light hover:bg-dark-lighter/80' 
                  : 'text-gray-600 hover:text-dark hover:bg-light-darker/80'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content based on active tab */}
      <div className="mt-6">
        {activeTab === 'playlists' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <GreenAccentCard key={playlist.id} accentPosition="left">
                <div className="p-4">
                  <div className="aspect-square rounded-md overflow-hidden mb-4">
                    <img 
                      src={playlist.image} 
                      alt={playlist.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{playlist.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {playlist.description}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {playlist.trackCount} tracks
                  </p>
                </div>
              </GreenAccentCard>
            ))}
            
            {/* Create playlist card */}
            <motion.div 
              className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                darkMode ? 'bg-dark-lighter' : 'bg-light-darker/50'
              } cursor-pointer`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <FiPlus className="text-primary text-2xl" />
              </div>
              <p className="font-medium">Create Playlist</p>
            </motion.div>
          </div>
        )}
        
        {activeTab === 'tracks' && (
          <div>
            <TrackList tracks={tracks} />
          </div>
        )}
        
        {activeTab === 'artists' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <motion.div 
                key={artist.id}
                className="flex flex-col items-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-full aspect-square rounded-full overflow-hidden mb-4">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-center">{artist.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                  {artist.genre}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Library

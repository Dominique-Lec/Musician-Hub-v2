import { motion } from 'framer-motion'
import { FiTrendingUp, FiRadio, FiCalendar, FiGlobe } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import MusicCard from '../components/MusicCard'
import TrackList from '../components/TrackList'
import SpotifyGreenButton from '../components/SpotifyGreenButton'

const Explore = () => {
  const { darkMode } = useTheme()
  
  // Mock data for trending tracks
  const trendingTracks = [
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
  
  // Mock data for new releases
  const newReleases = [
    {
      id: 1,
      title: 'Midnights',
      artist: 'Taylor Swift',
      genre: 'Pop',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Un Verano Sin Ti',
      artist: 'Bad Bunny',
      genre: 'Latin',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Renaissance',
      artist: 'Beyoncé',
      genre: 'R&B',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Mr. Morale & The Big Steppers',
      artist: 'Kendrick Lamar',
      genre: 'Hip-Hop',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: 'Harry\'s House',
      artist: 'Harry Styles',
      genre: 'Pop',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]
  
  // Categories
  const categories = [
    { id: 1, name: 'Pop', color: 'from-pink-500 to-purple-500' },
    { id: 2, name: 'Rock', color: 'from-red-500 to-orange-500' },
    { id: 3, name: 'Hip-Hop', color: 'from-yellow-500 to-green-500' },
    { id: 4, name: 'Electronic', color: 'from-blue-500 to-indigo-500' },
    { id: 5, name: 'R&B', color: 'from-purple-500 to-pink-500' },
    { id: 6, name: 'Jazz', color: 'from-green-500 to-teal-500' },
    { id: 7, name: 'Classical', color: 'from-teal-500 to-blue-500' },
    { id: 8, name: 'Country', color: 'from-orange-500 to-yellow-500' },
  ]
  
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="mb-12">
        <div className={`rounded-2xl overflow-hidden relative ${darkMode ? 'bg-dark-lighter' : 'bg-light-darker/50'} p-8 md:p-12`}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-spotify opacity-90"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Discover New Music</h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Explore trending songs, new releases, and curated playlists from musicians around the world.
            </p>
            <SpotifyGreenButton size="lg">
              Start Exploring
            </SpotifyGreenButton>
          </div>
        </div>
      </section>
      
      {/* Trending Now Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-primary text-xl" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <Link to="/trending" className="text-primary text-sm font-medium hover:underline">
            Show all
          </Link>
        </div>
        
        <TrackList tracks={trendingTracks} />
      </section>
      
      {/* New Releases Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-primary text-xl" />
            <h2 className="text-2xl font-bold">New Releases</h2>
          </div>
          <Link to="/new-releases" className="text-primary text-sm font-medium hover:underline">
            Show all
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {newReleases.map((release) => (
            <MusicCard
              key={release.id}
              image={release.image}
              title={release.title}
              artist={release.artist}
              genre={release.genre}
              onClick={() => console.log(`Clicked on ${release.title}`)}
            />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiGlobe className="text-primary text-xl" />
            <h2 className="text-2xl font-bold">Browse Categories</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative h-32 rounded-lg overflow-hidden cursor-pointer`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color}`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Featured Playlists */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiRadio className="text-primary text-xl" />
            <h2 className="text-2xl font-bold">Featured Playlists</h2>
          </div>
          <Link to="/playlists" className="text-primary text-sm font-medium hover:underline">
            Show all
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {newReleases.map((release) => (
            <MusicCard
              key={release.id}
              image={release.image}
              title={`${release.genre} Mix`}
              artist="MuseLink"
              genre="Playlist"
              onClick={() => console.log(`Clicked on ${release.title}`)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Explore

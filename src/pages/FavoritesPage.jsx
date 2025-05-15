import React from 'react';
import { useUniverse } from '../contexts/UniverseContext';
import UniverseCard from '../components/UniverseCard';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { universes, favoriteUniverses } = useUniverse();
  
  // Get favorites
  const favoriteUniverseObjects = universes.filter(universe => 
    favoriteUniverses.includes(universe.id)
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Bookmark className="h-12 w-12 mx-auto mb-3" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Your Bookmarks</h1>
        <p className="text-xl text-white/70 max-w-xl mx-auto">
          Quick access to your favorite alternate realities.
        </p>
      </motion.div>
      
      {/* Favorites list */}
      {favoriteUniverseObjects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {favoriteUniverseObjects.map(universe => (
            <UniverseCard key={universe.id} universe={universe} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16 bg-black/30 backdrop-blur-sm rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Bookmark className="h-16 w-16 mx-auto mb-4 text-white/50" strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold mb-3">No bookmarks yet</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Explore the multiverse and bookmark your favorite universes to access them quickly.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
          >
            Explore Universes
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default FavoritesPage;
import React from 'react';
import { useUniverse } from '../contexts/UniverseContext';
import UniverseCard from '../components/UniverseCard';
import UniverseComparisonView from '../components/UniverseComparisonView';
import Particles from '../components/Particles';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const { universes, comparisonMode } = useUniverse();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Particles />
      
      {/* Header section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Compass className="h-12 w-12 mx-auto mb-3" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Explore the Multiverse</h1>
        <p className="text-xl text-white/70 max-w-xl mx-auto">
          Discover infinite realities and the possibilities that exist across the dimensional boundaries.
        </p>
      </motion.div>
      
      {/* Display comparison view when in comparison mode */}
      {comparisonMode ? (
        <UniverseComparisonView />
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {universes.map((universe) => (
            <UniverseCard key={universe.id} universe={universe} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ExplorePage;
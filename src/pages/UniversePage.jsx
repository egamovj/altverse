import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useUniverse } from '../contexts/UniverseContext';
import UniverseDetail from '../components/UniverseDetail';
import CharacterCard from '../components/CharacterCard';
import PortalTransition from '../components/PortalTransition';
import { characters } from '../data/characters';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const UniversePage = () => {
  const { id } = useParams();
  const { universes, selectUniverse } = useUniverse();
  const universe = universes.find(u => u.id === id);
  
  // Redirect if universe not found
  if (!universe) {
    return <Navigate to="/" replace />;
  }
  
  // Select universe on load
  React.useEffect(() => {
    selectUniverse(id);
  }, [id, selectUniverse]);
  
  // Get characters from this universe
  const universeCharacters = characters.filter(c => c.universeId === id);
  
  return (
    <PortalTransition>
      <div>
        <UniverseDetail universe={universe} />
        
        {/* Characters section */}
        {universeCharacters.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 mr-2" style={{ color: universe.accentColor }} />
                <h2 className="text-2xl font-semibold">Universe Inhabitants</h2>
              </div>
              <p className="text-white/70">Notable beings and residents of {universe.name}</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {universeCharacters.map(character => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  universe={universe}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </PortalTransition>
  );
};

export default UniversePage;
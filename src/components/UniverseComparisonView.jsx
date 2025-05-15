import React from 'react';
import { motion } from 'framer-motion';
import { useUniverse } from '../contexts/UniverseContext';
import { AlertTriangle, Calendar, Users, FlaskRound as Flask, Cpu } from 'lucide-react';

const UniverseComparisonView = () => {
  const { universes, comparedUniverses, toggleUniverseComparison } = useUniverse();
  
  // Get the selected universes for comparison
  const selectedUniverses = universes.filter(u => comparedUniverses.includes(u.id));
  
  // Handle edge cases
  if (selectedUniverses.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-center">
        <div>
          <p className="text-xl mb-3">Select up to 2 universes to compare</p>
          <p className="text-white/60">Click on any universe card to add it to the comparison</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {selectedUniverses.map((universe, index) => (
          <motion.div 
            key={universe.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className="rounded-xl overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${universe.backgroundColor} 0%, rgba(0,0,0,0.8) 100%)`,
                color: universe.textColor
              }}
            >
              {/* Header */}
              <div 
                className="relative aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${universe.imageUrl})` }}
              >
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(to top, ${universe.backgroundColor}CC 0%, ${universe.backgroundColor}66 100%)` 
                  }} 
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{universe.name}</h2>
                      <p className="text-white/80">{universe.shortDescription}</p>
                    </div>
                    
                    {universe.dangerLevel > 5 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-500/60 backdrop-blur-sm">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Level {universe.dangerLevel}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Key Facts</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Calendar className="h-5 w-5" style={{ color: universe.accentColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Discovered</p>
                        <p className="font-medium">{universe.yearDiscovered}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Users className="h-5 w-5" style={{ color: universe.accentColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Population</p>
                        <p className="font-medium">{universe.population}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Flask className="h-5 w-5" style={{ color: universe.accentColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Physics</p>
                        <p className="font-medium">{universe.physics}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Cpu className="h-5 w-5" style={{ color: universe.accentColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Technology</p>
                        <p className="font-medium">{universe.technology}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Unique Features</h3>
                  <ul className="space-y-1.5">
                    {universe.uniqueFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div 
                          className="mt-1.5 h-2 w-2 rounded-full mr-2"
                          style={{ backgroundColor: universe.accentColor }}
                        />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => toggleUniverseComparison(universe.id)}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center"
              aria-label="Remove from comparison"
            >
              ✕
            </button>
          </motion.div>
        ))}
        
        {/* Empty slot if only one universe is selected */}
        {selectedUniverses.length === 1 && (
          <motion.div 
            className="border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div>
              <p className="text-xl mb-2">Add another universe</p>
              <p className="text-white/60">Click on any universe card to add it to comparison</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UniverseComparisonView;
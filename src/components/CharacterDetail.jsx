import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const CharacterDetail = ({ character, universe }) => {
  if (!character || !universe) return null;
  
  // Define alignment styles
  const alignmentStyles = {
    good: {
      label: 'Good',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    },
    neutral: {
      label: 'Neutral',
      color: 'bg-amber-500',
      textColor: 'text-amber-500'
    },
    evil: {
      label: 'Evil',
      color: 'bg-rose-500',
      textColor: 'text-rose-500'
    }
  };
  
  const alignmentStyle = alignmentStyles[character.alignment];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Character image column */}
        <motion.div 
          className="lg:col-span-5 xl:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img 
              src={character.imageUrl} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
            />
          </div>
        </motion.div>
        
        {/* Character info column */}
        <motion.div 
          className="lg:col-span-7 xl:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Universe link */}
          <Link 
            to={`/universe/${universe.id}`}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm mb-4 transition-colors"
          >
            <Compass className="h-4 w-4 mr-1.5" style={{ color: universe.accentColor }} />
            <span>{universe.name}</span>
          </Link>
          
          {/* Character header */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{character.name}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-lg text-white/80">{character.species}</span>
              <span className={`px-2 py-0.5 rounded-full text-sm ${alignmentStyle.color}/20 ${alignmentStyle.textColor}`}>
                {alignmentStyle.label}
              </span>
            </div>
          </div>
          
          {/* Character details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Background</h2>
              <p className="text-white/80 leading-relaxed">{character.background}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Abilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {character.abilities.map((ability, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <div 
                      className="h-3 w-3 rounded-full mr-3"
                      style={{ backgroundColor: universe.accentColor }}
                    />
                    <span>{ability}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mt-8">
              <h2 className="text-xl font-semibold mb-3">Universe Connection</h2>
              <p className="text-white/80 mb-4">
                {character.name} exists within the {universe.name} universe, characterized by
                {' '}{universe.physics} and {universe.technology}.
              </p>
              <Link 
                to={`/universe/${universe.id}`}
                className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-black"
                style={{ backgroundColor: universe.accentColor }}
              >
                <Compass className="h-4 w-4 mr-1.5" />
                <span>Explore {universe.name}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterDetail;
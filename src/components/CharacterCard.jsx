import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CharacterCard = ({ character, universe }) => {
  const navigate = useNavigate();
  
  // Define alignment colors
  const alignmentColors = {
    good: 'bg-emerald-500',
    neutral: 'bg-amber-500',
    evil: 'bg-rose-500'
  };
  
  return (
    <motion.div 
      className="group rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={() => navigate(`/character/${character.id}`)}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Character image */}
        <img 
          src={character.imageUrl} 
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"
        />
        
        {/* Character info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${alignmentColors[character.alignment]}`} />
            <span className="text-sm text-white/80">{character.species}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{character.name}</h3>
        </div>
      </div>
      
      <div 
        className="p-4" 
        style={{ 
          backgroundColor: universe ? universe.backgroundColor : '#1f2937',
          color: universe ? universe.textColor : 'white'
        }}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {character.abilities.slice(0, 2).map((ability, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm"
            >
              {ability}
            </span>
          ))}
          {character.abilities.length > 2 && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/10">
              +{character.abilities.length - 2} more
            </span>
          )}
        </div>
        <p className="text-sm text-white/80 line-clamp-2">{character.background}</p>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
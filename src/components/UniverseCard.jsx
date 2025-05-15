import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck, AlertTriangle } from 'lucide-react';
import { useUniverse } from '../contexts/UniverseContext';
import { motion } from 'framer-motion';

const UniverseCard = ({ universe, size = 'medium' }) => {
  const navigate = useNavigate();
  const { toggleFavorite, selectUniverse, comparisonMode, toggleUniverseComparison, comparedUniverses } = useUniverse();
  
  const handleCardClick = () => {
    if (comparisonMode) {
      toggleUniverseComparison(universe.id);
    } else {
      selectUniverse(universe.id);
      navigate(`/universe/${universe.id}`);
    }
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(universe.id);
  };
  
  const isSelected = comparedUniverses.includes(universe.id);
  
  // Determine card size
  const sizeClasses = {
    small: "h-32 w-full",
    medium: "h-64 sm:h-80 w-full",
    large: "h-96 w-full"
  };
  
  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden ${sizeClasses[size]} cursor-pointer group`}
      onClick={handleCardClick}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 } 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${universe.imageUrl})` }} />
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(to top, ${universe.backgroundColor}DD 0%, ${universe.backgroundColor}77 50%, ${universe.backgroundColor}33 100%)` 
        }} 
      />
      
      {/* Card content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            {universe.isVisited && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm">
                Visited
              </span>
            )}
          </div>
          
          <button 
            onClick={handleFavoriteClick}
            className="p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label={universe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {universe.isFavorite ? (
              <BookmarkCheck className="h-5 w-5 text-white" />
            ) : (
              <Bookmark className="h-5 w-5 text-white/70" />
            )}
          </button>
        </div>
        
        <div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-semibold">{universe.name}</h3>
              <p className="text-sm text-white/80 line-clamp-2">{universe.shortDescription}</p>
            </div>
            
            {universe.dangerLevel > 5 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-500/70 backdrop-blur-sm">
                <AlertTriangle className="h-3 w-3" />
                <span>Level {universe.dangerLevel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Comparison mode highlight */}
      {comparisonMode && (
        <div className={`absolute inset-0 border-4 rounded-xl transition-colors ${
          isSelected ? 'border-white' : 'border-transparent'
        }`} />
      )}
      
      {/* Comparison selection indicator */}
      {comparisonMode && isSelected && (
        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-medium">
          {comparedUniverses.indexOf(universe.id) + 1}
        </div>
      )}
    </motion.div>
  );
};

export default UniverseCard;
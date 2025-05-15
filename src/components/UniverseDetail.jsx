import React from 'react';
import { motion } from 'framer-motion';
import { useUniverse } from '../contexts/UniverseContext';
import { Bookmark, BookmarkCheck, AlertTriangle, Calendar, Users, FlaskRound as Flask, Cpu } from 'lucide-react';

const UniverseDetail = ({ universe }) => {
  const { toggleFavorite } = useUniverse();
  
  if (!universe) return null;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Universe Header */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${universe.imageUrl})` }}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(to top, ${universe.backgroundColor}EE 0%, ${universe.backgroundColor}99 70%, ${universe.backgroundColor}66 100%)` 
          }} 
        />
        
        {/* Header content */}
        <div className="relative px-8 py-12 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{universe.name}</h1>
            <p className="text-xl text-white/80 max-w-xl">{universe.shortDescription}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {universe.dangerLevel > 5 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-red-500/60 backdrop-blur-sm">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Level {universe.dangerLevel}</span>
              </div>
            )}
            
            <button 
              onClick={() => toggleFavorite(universe.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              {universe.isFavorite ? (
                <>
                  <BookmarkCheck className="h-5 w-5" />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Bookmark
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Universe Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main description */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-white/80 leading-relaxed">{universe.description}</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Unique Features</h2>
            <ul className="space-y-3">
              {universe.uniqueFeatures.map((feature, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <div className="mt-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: universe.accentColor }} />
                  <span className="ml-3 text-white/90">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        {/* Stats sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Universe Data</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  <Calendar className="h-5 w-5" style={{ color: universe.accentColor }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Year Discovered</p>
                  <p className="font-medium">{universe.yearDiscovered}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  <Users className="h-5 w-5" style={{ color: universe.accentColor }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Population</p>
                  <p className="font-medium">{universe.population}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  <Flask className="h-5 w-5" style={{ color: universe.accentColor }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Physics</p>
                  <p className="font-medium">{universe.physics}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  <Cpu className="h-5 w-5" style={{ color: universe.accentColor }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Technology</p>
                  <p className="font-medium">{universe.technology}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: universe.accentColor, color: '#000' }}
          >
            <h3 className="text-lg font-semibold mb-2">Portal Status</h3>
            <p className="mb-3">This universe is currently accessible through dimensional portal technology.</p>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm mt-2">Portal stability: 85%</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UniverseDetail;
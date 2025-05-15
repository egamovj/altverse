import React, { useState, useMemo } from 'react';
import { characters } from '../data/characters';
import { useUniverse } from '../contexts/UniverseContext';
import CharacterCard from '../components/CharacterCard';
import { Users, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const CharactersPage = () => {
  const { universes } = useUniverse();
  const [universeFilter, setUniverseFilter] = useState('all');
  const [alignmentFilter, setAlignmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter characters based on filters and search
  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      // Apply universe filter
      if (universeFilter !== 'all' && character.universeId !== universeFilter) {
        return false;
      }
      
      // Apply alignment filter
      if (alignmentFilter !== 'all' && character.alignment !== alignmentFilter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          character.name.toLowerCase().includes(query) ||
          character.species.toLowerCase().includes(query) ||
          character.abilities.some(ability => ability.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [universeFilter, alignmentFilter, searchQuery]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Users className="h-12 w-12 mx-auto mb-3" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Multiversal Beings</h1>
        <p className="text-xl text-white/70 max-w-xl mx-auto">
          Explore the diverse inhabitants across alternate realities.
        </p>
      </motion.div>
      
      {/* Filters section */}
      <motion.div 
        className="mb-8 bg-black/30 backdrop-blur-sm rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search characters..."
              className="bg-white/10 text-white w-full pl-10 pr-4 py-2 rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Universe filter */}
          <div className="md:w-1/4">
            <label className="sr-only">Filter by Universe</label>
            <div className="relative">
              <select
                className="bg-white/10 text-white appearance-none w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                value={universeFilter}
                onChange={(e) => setUniverseFilter(e.target.value)}
              >
                <option value="all">All Universes</option>
                {universes.map(universe => (
                  <option key={universe.id} value={universe.id}>
                    {universe.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-white/50" />
              </div>
            </div>
          </div>
          
          {/* Alignment filter */}
          <div className="md:w-1/4">
            <label className="sr-only">Filter by Alignment</label>
            <div className="relative">
              <select
                className="bg-white/10 text-white appearance-none w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                value={alignmentFilter}
                onChange={(e) => setAlignmentFilter(e.target.value)}
              >
                <option value="all">All Alignments</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="evil">Evil</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Results count */}
      <motion.p 
        className="mb-6 text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Showing {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'}
      </motion.p>
      
      {/* Characters grid */}
      {filteredCharacters.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {filteredCharacters.map(character => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              universe={universes.find(u => u.id === character.universeId)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-2">No characters match your filters</p>
          <p className="text-white/60">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CharactersPage;
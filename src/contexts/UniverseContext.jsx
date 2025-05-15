import React, { createContext, useState, useContext, useEffect } from 'react';
import { universes } from '../data/universes';
import useLocalStorage from '../hooks/useLocalStorage';

const UniverseContext = createContext();

export function UniverseProvider({ children }) {
  const [currentUniverse, setCurrentUniverse] = useState(universes[0]);
  const [favoriteUniverses, setFavoriteUniverses] = useLocalStorage('favoriteUniverses', []);
  const [visitedUniverses, setVisitedUniverses] = useLocalStorage('visitedUniverses', 
    universes.filter(u => u.visited).map(u => u.id)
  );
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedUniverses, setComparedUniverses] = useState([]);

  const selectUniverse = (id) => {
    const universe = universes.find(u => u.id === id);
    if (universe) {
      setCurrentUniverse(universe);
      
      // Mark as visited if not already
      if (!visitedUniverses.includes(id)) {
        setVisitedUniverses([...visitedUniverses, id]);
      }
    }
  };

  const toggleFavorite = (id) => {
    if (favoriteUniverses.includes(id)) {
      setFavoriteUniverses(favoriteUniverses.filter(favId => favId !== id));
    } else {
      setFavoriteUniverses([...favoriteUniverses, id]);
    }
  };

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    if (!comparisonMode) {
      // Start with current universe in comparison
      setComparedUniverses(currentUniverse ? [currentUniverse.id] : []);
    } else {
      // Clear compared universes when exiting comparison mode
      setComparedUniverses([]);
    }
  };

  const toggleUniverseComparison = (id) => {
    if (comparedUniverses.includes(id)) {
      setComparedUniverses(comparedUniverses.filter(uId => uId !== id));
    } else {
      // Limit to comparing 2 universes maximum
      if (comparedUniverses.length < 2) {
        setComparedUniverses([...comparedUniverses, id]);
      } else {
        // Replace the second universe
        setComparedUniverses([comparedUniverses[0], id]);
      }
    }
  };

  // Make sure all our universes data is enhanced with favorite status
  const enhancedUniverses = universes.map(universe => ({
    ...universe,
    isFavorite: favoriteUniverses.includes(universe.id),
    isVisited: visitedUniverses.includes(universe.id)
  }));

  const value = {
    universes: enhancedUniverses,
    currentUniverse,
    selectUniverse,
    favoriteUniverses,
    toggleFavorite,
    comparisonMode,
    comparedUniverses,
    toggleComparisonMode,
    toggleUniverseComparison,
    visitedUniverses
  };

  return (
    <UniverseContext.Provider value={value}>
      {children}
    </UniverseContext.Provider>
  );
}

export function useUniverse() {
  const context = useContext(UniverseContext);
  if (context === undefined) {
    throw new Error('useUniverse must be used within a UniverseProvider');
  }
  return context;
}
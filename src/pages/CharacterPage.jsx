import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { useUniverse } from '../contexts/UniverseContext';
import CharacterDetail from '../components/CharacterDetail';
import PortalTransition from '../components/PortalTransition';

const CharacterPage = () => {
  const { id } = useParams();
  const { universes, selectUniverse } = useUniverse();
  
  // Find character and their universe
  const character = characters.find(c => c.id === id);
  
  if (!character) {
    return <Navigate to="/characters" replace />;
  }
  
  // Get character's universe
  const universe = universes.find(u => u.id === character.universeId);
  
  // Update current universe when viewing a character
  React.useEffect(() => {
    if (universe) {
      selectUniverse(universe.id);
    }
  }, [universe, selectUniverse]);
  
  return (
    <PortalTransition>
      <CharacterDetail character={character} universe={universe} />
    </PortalTransition>
  );
};

export default CharacterPage;
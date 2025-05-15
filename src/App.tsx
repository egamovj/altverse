import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UniverseProvider } from './contexts/UniverseContext';
import AppLayout from './components/Layout/AppLayout';
import ExplorePage from './pages/ExplorePage';
import UniversePage from './pages/UniversePage';
import CharactersPage from './pages/CharactersPage';
import CharacterPage from './pages/CharacterPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <UniverseProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<ExplorePage />} />
            <Route path="universe/:id" element={<UniversePage />} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="character/:id" element={<CharacterPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </UniverseProvider>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useUniverse } from '../../contexts/UniverseContext';
import { motion } from 'framer-motion';

const AppLayout = () => {
  const { currentUniverse } = useUniverse();
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col transition-colors duration-1000"
      style={{ 
        background: `linear-gradient(135deg, ${currentUniverse.backgroundColor} 0%, rgba(0,0,0,0.9) 100%)`,
        color: currentUniverse.textColor
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="px-8 py-4 border-t border-white/10 backdrop-blur-sm bg-black/20 text-sm text-white/70">
        <div className="max-w-6xl mx-auto">
          <p>Altverse Explorer © 2025 • Discover infinite possibilities across the multiverse</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default AppLayout;
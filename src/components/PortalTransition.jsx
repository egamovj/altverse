import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniverse } from '../contexts/UniverseContext';

const PortalTransition = ({ children }) => {
  const { currentUniverse } = useUniverse();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentUniverse.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Portal circle effect */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="rounded-full"
            style={{ backgroundColor: currentUniverse.accentColor }}
            initial={{ width: '100vw', height: '100vw' }}
            animate={{ width: 0, height: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
        </motion.div>
        
        {/* Content */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PortalTransition;
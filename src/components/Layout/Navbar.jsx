import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Users, Bookmark, GalleryHorizontalEnd } from 'lucide-react';
import { useUniverse } from '../../contexts/UniverseContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUniverse, comparisonMode, toggleComparisonMode } = useUniverse();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Make navbar more transparent on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-black/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Compass className="h-8 w-8 mr-2" strokeWidth={1.5} />
              <span className="text-xl font-semibold tracking-tight">Altverse</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" exact>
              Explore
            </NavLink>
            <NavLink to="/characters">
              Characters
            </NavLink>
            <NavLink to="/favorites">
              Favorites
            </NavLink>
            <button 
              onClick={toggleComparisonMode}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-all ${
                comparisonMode 
                  ? 'bg-white/20 text-white' 
                  : 'hover:bg-white/10'
              }`}
            >
              <GalleryHorizontalEnd className="w-4 h-4 mr-1.5" />
              {comparisonMode ? 'Exit Comparison' : 'Compare'}
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-xl bg-black/60">
              <MobileNavLink to="/" exact>
                <Compass className="h-5 w-5 mr-2" />
                Explore
              </MobileNavLink>
              <MobileNavLink to="/characters">
                <Users className="h-5 w-5 mr-2" />
                Characters
              </MobileNavLink>
              <MobileNavLink to="/favorites">
                <Bookmark className="h-5 w-5 mr-2" />
                Favorites
              </MobileNavLink>
              <button 
                onClick={toggleComparisonMode}
                className={`w-full flex items-center px-3 py-2 rounded-md text-base ${
                  comparisonMode 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                <GalleryHorizontalEnd className="h-5 w-5 mr-2" />
                {comparisonMode ? 'Exit Comparison' : 'Compare Universes'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ to, children, exact }) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <Link 
      to={to} 
      className={`px-3 py-1.5 rounded-full text-sm transition-all relative ${
        isActive 
          ? 'text-white' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full mx-3"
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, children, exact }) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <Link 
      to={to} 
      className={`flex items-center px-3 py-2 rounded-md text-base ${
        isActive 
          ? 'bg-white/20 text-white' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
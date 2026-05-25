import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container nav-container">
        <div className="nav-logo">
          <a href="#" className="hover-target">LIVOR</a>
        </div>
        
        <div className="nav-links hidden-mobile">
          <a href="#home" className="hover-target">Home</a>
          <a href="#collection" className="hover-target">Collection</a>
          <a href="#about" className="hover-target">Our Story</a>
        </div>

        <div className="nav-actions">
          <button className="icon-btn hidden-mobile hover-target">
            <ShoppingBag size={20} />
          </button>
          <button className="icon-btn mobile-menu-btn hover-target" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mobile-menu glass-panel"
          >
            <div className="mobile-menu-links">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#collection" onClick={() => setIsMobileMenuOpen(false)}>Collection</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

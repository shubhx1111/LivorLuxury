import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const menuContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.215, 0.61, 0.355, 1] 
    } 
  }
};

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

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mobile-menu"
          >
            <motion.div 
              variants={menuContainerVariants}
              initial="hidden"
              animate="show"
              className="mobile-menu-links"
            >
              {[
                { name: 'Home', href: '#home' },
                { name: 'Collection', href: '#collection' },
                { name: 'Our Story', href: '#about' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.a 
                  key={index} 
                  variants={menuItemVariants}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

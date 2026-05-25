import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">LIVOR</h2>
          <p className="footer-desc">Crafting memories and defining luxury through the art of perfumery.</p>
          <div className="social-links" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
            <a href="#" className="hover-target" aria-label="Instagram">IG</a>
            <a href="#" className="hover-target" aria-label="Facebook">FB</a>
            <a href="#" className="hover-target" aria-label="Twitter">TW</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#home" className="hover-target">Home</a>
          <a href="#collection" className="hover-target">Collection</a>
          <a href="#about" className="hover-target">Our Story</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><Mail size={18} /> info@livorluxury.com</p>
          <p><MapPin size={18} /> 123 Luxury Avenue, Paris, France</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Livor Luxury Perfumes. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

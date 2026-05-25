import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="about-image-wrapper"
        >
          <div className="about-image glass-panel">
            {/* Elegant placeholder or graphic */}
            <div className="image-overlay"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="about-content"
        >
          <h2 className="about-title">Our Story</h2>
          <div className="about-line"></div>
          <p className="about-text">
            Born from a passion for the extraordinary, Livor Luxury Perfumes is more than just a brand; it is an embodiment of art, elegance, and unyielding allure. Each fragrance is meticulously crafted using the rarest ingredients sourced from around the world.
          </p>
          <p className="about-text">
            We believe that a scent is a personal signature, an invisible aura that leaves a lasting legacy. Discover the essence of true luxury and let your fragrance speak before you do.
          </p>
          <button className="btn btn-solid hover-target">Read The Full Story</button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

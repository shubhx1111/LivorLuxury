import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import axios from 'axios';
import './Products.css';

const fallbackProducts = [
  { _id: '1', name: 'Dark Demon', price: 1899, description: 'An alluring blend of dark spices and deep woods, designed for the bold and fearless. The essence of the night captured in a bottle.', image: '/assets/dark-demon.png' },
  { _id: '2', name: 'Medusa', price: 1799, description: 'A captivating fragrance with venomous floral notes that mesmerize and enchant. A gaze into the abyss of luxury and untamed beauty.', image: '/assets/medusa.png' },
  { _id: '3', name: 'Skull', price: 1899, description: 'A sharp, edgy scent with a rebellious mix of leather and citrus. Leave a lasting impression that defies time and convention.', image: '/assets/skull.png' },
  { _id: '4', name: 'Peppa Bell', price: 1799, description: 'A sweet yet spicy aroma featuring vibrant pepper and delicate bellflower. A harmonious dance between innocence and provocation.', image: '/assets/peppabell.png' }
];

const Products = () => {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log('Using fallback products');
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="collection" className="products-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">The Collection</h2>
          <div className="section-line"></div>
          <p className="section-desc">Experience the pinnacle of luxury with our signature scents. Each fragrance tells a unique story.</p>
        </motion.div>

        <div className="products-list">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={product._id} className={`product-row ${isEven ? 'row-even' : 'row-odd'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="product-image-side"
                >
                  <div className="product-image-container glass-panel hover-target">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-overlay">
                      <button className="btn btn-solid quick-view hover-target">
                        <Eye size={18} style={{marginRight: '8px'}}/> View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="product-info-side"
                >
                  <h3 className="product-name-large">{product.name}</h3>
                  <div className="product-price-large">₹{product.price}</div>
                  <p className="product-desc-large">{product.description}</p>
                  
                  <div className="product-notes">
                    <div className="note-item">
                      <span className="note-label">Top Notes:</span>
                      <span className="note-value">Bergamot, Saffron, Pink Pepper</span>
                    </div>
                    <div className="note-item">
                      <span className="note-label">Heart Notes:</span>
                      <span className="note-value">Bulgarian Rose, Jasmine, Orchid</span>
                    </div>
                    <div className="note-item">
                      <span className="note-label">Base Notes:</span>
                      <span className="note-value">Oud, Vanilla, Madagascar Musk</span>
                    </div>
                  </div>

                  <div className="product-actions-large">
                    <button className="btn btn-solid hover-target add-btn">
                      <ShoppingBag size={20} style={{marginRight: '10px'}}/> Add to Cart
                    </button>
                    <button className="btn hover-target mobile-only-btn">
                      <Eye size={18} style={{marginRight: '8px'}}/> View Details
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;

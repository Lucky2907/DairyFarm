import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Products.css';

const products = [
  {
    id: 1,
    name: "Fresh Cow Milk (1 Litre)",
    description: "Pure, fresh cow milk delivered daily from our farm.",
    price: 50,
    image: "https://cdn.pixabay.com/photo/2017/06/02/18/24/milk-2368351_1280.jpg"
  },
  {
    id: 2,
    name: "Paneer (500g)",
    description: "Soft and fresh paneer made from our own dairy milk.",
    price: 320,
    image: "https://cdn.pixabay.com/photo/2020/09/18/17/03/paneer-5583127_1280.jpg"
  },
  {
    id: 3,
    name: "Curd (500g)",
    description: "Thick, creamy curd set in hygienic conditions.",
    price: 60,
    image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/yogurt-2297013_1280.jpg"
  },
  {
    id: 4,
    name: "Ghee (500ml)",
    description: "Traditional hand-churned ghee with a rich aroma.",
    price: 550,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/ghee-recipe.jpg"
  },
  {
    id: 5,
    name: "Butter (250g)",
    description: "Fresh, unsalted butter perfect for your breakfast.",
    price: 250,
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/butter-1239427_1280.jpg"
  },
  {
    id: 6,
    name: "Lassi (300ml)",
    description: "Refreshing sweet lassi made from farm-fresh curd.",
    price: 40,
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/03/lassi-recipe-1.jpg"
  },
  {
    id: 7,
    name: "Buttermilk (300ml)",
    description: "Cool and healthy buttermilk, perfect for summers.",
    price: 30,
    image: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Buttermilk-Recipe-500x500.jpg"
  },
  {
    id: 8,
    name: "Cheese (200g)",
    description: "Delicious cheese made from pure cow milk.",
    price: 400,
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/cheese-1239430_1280.jpg"
  },
  {
    id: 9,
    name: "Flavored Yogurt (150g)",
    description: "Creamy yogurt with natural fruit flavors.",
    price: 45,
    image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/yogurt-2297013_1280.jpg"
  },
  {
    id: 10,
    name: "Mango Shrikhand (200g)",
    description: "Traditional sweet shrikhand with mango flavor.",
    price: 60,
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/mango-shrikhand-1.jpg"
  }
];

const Products = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => ({
      ...prev,
      [productId]: newValue
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantities(prev => ({
        ...prev,
        [product.id]: 0
      }));
    }
  };

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) - 1)}
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={quantities[product.id] || 0}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              />
              <button
                onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) + 1)}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
              disabled={!quantities[product.id]}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
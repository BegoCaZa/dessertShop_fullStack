import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import ProductsContainer from './components/productsContainer/ProductsContainer';
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import { getAllDesserts, updateStock } from './lib/utils/api';

const App = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('DEFAULT');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(cart);

  useEffect(() => {
    fetchDesserts(setProducts);
    setLoading(false);
  }, []);

  const filteredProducts = filterProducts(filter, products);

  return (
    <div className='mainContainer'>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Header
            filter={filter}
            setFilter={setFilter}
            filteredProducts={filteredProducts}
          />
          <div className='main'>
            <ProductsContainer
              filteredProducts={filteredProducts}
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
            />
            <ShoppingCart
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
              handleStockUpdate={handleStockUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};

const fetchDesserts = async setProducts => {
  try {
    const allDesserts = await getAllDesserts();
    setProducts(allDesserts);
  } catch (error) {
    console.error('Error fetching desserts:', error);
    <h3>Error fetching desserts</h3>;
    setProducts([]); //array vacio si hay error
  }
};

const filterProducts = (filter, products) => {
  const productsCopy = [...products];
  if (filter === 'DEFAULT') {
    return productsCopy;
  }
  if (filter === 'NAME') {
    return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (filter === 'PRICE') {
    return productsCopy.sort((a, b) => a.price - b.price);
  }
  return productsCopy;
};

const removeFromCart = (setCart, product, cart) => {
  const updatedCart = cart.filter(item => item.id !== product.id);
  setCart(updatedCart);
};

const handleStockUpdate = async (id, quantity) => {
  try {
    const updatedStock = await updateStock(id, quantity);
    console.log('Stock updated successfully:', updatedStock);
    return updatedStock; //retorna el nuevo stock actualizado
    //va a regresar el stock actualizado de todos los postres
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export default App;

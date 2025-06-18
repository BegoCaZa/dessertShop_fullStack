import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import ProductsContainer from './components/productsContainer/ProductsContainer';
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import { getAllDesserts, updateStock } from './lib/utils/api';
import Modal from './components/modal/Modal';

const App = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('DEFAULT');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState();

  console.log(cart);

  useEffect(() => {
    fetchDesserts(setProducts);
    setLoading(false);
  }, []);

  const filteredProducts = filterProducts(filter, products);

  return (
    <div className='mainContainer'>
      <Modal>{modalContent}</Modal>
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
              updateStock={() => handleStockUpdate(cart, setProducts)}
              setModalContent={setModalContent}
              modalContent={modalContent}
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

const handleStockUpdate = async (cart, setProducts) => {
  try {
    const updatedStock = await updateStock(cart);
    console.log('Stock updated successfully:', updatedStock);
    setProducts(updatedStock); //retorna el nuevo stock actualizado
    //va a regresar el stock actualizado de todos los postres
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export default App;

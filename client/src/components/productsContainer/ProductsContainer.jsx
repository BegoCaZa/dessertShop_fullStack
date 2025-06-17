// import { PRODUCTS_INFO } from '../../constants/products-info';
import styles from './ProductsContainer.module.css';

const ProductsContainer = ({
  filteredProducts,
  cart,
  setCart,
  removeFromCart
}) => {
  //editar el estado del carrito

  return (
    <>
      <div className={styles.dessertsContainer}>
        {filteredProducts.map(product => {
          const productExists = cart.find(item => item.id === product.id);
          return (
            <div key={product.id} className={styles.card}>
              <picture>
                <source
                  media='(min-width:1440px)'
                  srcSet={product.imgDesktop}
                />
                <source media='(min-width:760px)' srcSet={product.imgTablet} />
                <source media='(min-width:360px)' srcSet={product.imgMobile} />
                <img
                  className={`${styles.productImage} ${
                    productExists ? styles.inCart : ''
                  }`}
                  src={product.imgMobile}
                />
              </picture>
              {/* //boton */}
              {/* condicional del if que NO ENTIENDO */}
              {productExists ? (
                <div className={styles.buttonAddToCartActive}>
                  <button
                    className={styles.buttonAddReduce}
                    onClick={() =>
                      decrementQuantity(
                        setCart,
                        productExists,
                        cart,
                        removeFromCart
                      )
                    }
                  >
                    <img
                      className={styles.iconAddReduce}
                      src='/assets/images/icon-decrement-quantity.svg'
                    />
                  </button>
                  <span>{productExists.quantity}</span>
                  <button
                    className={styles.buttonAddReduce}
                    onClick={() =>
                      incrementQuantity(setCart, productExists, cart)
                    }
                  >
                    <img
                      className={styles.iconAddReduce}
                      src='/assets/images/icon-increment-quantity.svg'
                    />
                  </button>
                </div>
              ) : (
                <button
                  className={styles.buttonAddToCart}
                  onClick={() => addToCart(setCart, product, cart)}
                >
                  <img
                    className={styles.icon}
                    src='./assets/images/icon-add-to-cart.svg'
                  />
                  <span>Add to cart</span>
                </button>
              )}
              {/* <button
              className={styles.buttonAddToCart}
              onClick={() => addToCart(setCart, product)}>
              <img
                className={styles.icon}
                src='./assets/images/icon-add-to-cart.svg'
              />
              <span>Add to cart</span>
            </button> */}
              <div className={styles.cardTextContainer}>
                <span className={styles.productSubtitle}>{product.name}</span>
                <span className={styles.productTitle}>{product.title}</span>
                <span className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

//tengo que verificar si el producto ya existe en el carrito
const addToCart = (setCart, product, cart) => {
  const updatedCart = [...cart, { ...product, quantity: 1 }];
  setCart(updatedCart); //este es el nuevo carrito
};

const incrementQuantity = (setCart, productExists, cart) => {
  const updatedCart = cart.map(product => {
    if (product.id === productExists.id) {
      product.quantity++;
    }
    return product;
  });

  setCart(updatedCart);
};

const decrementQuantity = (setCart, productExists, cart, removeFromCart) => {
  //eliminar
  if (productExists.quantity === 1) {
    removeFromCart(setCart, productExists, cart);

    return;
  }

  const updatedCart = cart.map(product => {
    if (product.id === productExists.id) {
      product.quantity--;
    }
    return product;
  });

  setCart(updatedCart);
};

// const removeFromCart = (setCart, product, cart) => {
//   const updatedCart = cart.filter(item => item.id !== product.id);
//   setCart(updatedCart);
// };

export default ProductsContainer;

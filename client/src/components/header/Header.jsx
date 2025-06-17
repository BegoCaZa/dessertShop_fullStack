import styles from './Header.module.css';

const Header = ({ filter, setFilter }) => {
  const filterOptions = ['DEFAULT', 'NAME', 'PRICE'];
  return (
    <div className={styles.header}>
      <span className={styles.headerTitle}>Desserts</span>
      <div className={styles.buttons}>
        {filterOptions.map(option => (
          <button
            key={option}
            className={`${styles.button} ${
              filter === option && `${styles.buttonActive}`
            }`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
        {/* <button className={styles.button} onClick={() => setFilter(option)}>
          Default
        </button>
        <button className={styles.button}>Name</button>
        <button className={styles.button}>Price</button> */}
      </div>
    </div>
  );
};
export default Header;

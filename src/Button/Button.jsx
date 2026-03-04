import styles from "./Button.module.css";

const Button = ({ name, category, image, price, items, setItems }) => {
  function addItemToCart(name) {
    const itemExists = items.find((item) => item.name === name);

    if (itemExists) {
      setItems(
        items.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setItems([...items, { name, category, price, image, quantity: 1 }]);
    }
  }

  function decrementQuantity(name) {
    const itemExists = items.find((item) => item.name === name);
    if (itemExists && itemExists.quantity > 1) {
      setItems(
        items.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    } else if (itemExists && itemExists.quantity === 1) {
      setItems(items.filter((item) => item.name !== name));
    }
  }

  function incrementQuantity(name) {
    setItems(
      items.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  const itemQuantity = items.find((item) => item.name === name)?.quantity || 0;

  return (
    <div
      className={styles.cart}
      style={
        itemQuantity > 0
          ? {
              backgroundColor: "#C73B0F",
              color: "#FFF",
            }
          : {}
      }
    >
      {itemQuantity === 0 ? (
        <img src="assets/images/icon-add-to-cart.svg" alt="add to cart icon" />
      ) : null}
      {itemQuantity === 0 ? (
        <p>
          <a className={styles.button} onClick={() => addItemToCart(name)}>
            Add to Cart
          </a>
        </p>
      ) : (
        <div className={styles.quantityControl}>
          <button onClick={() => decrementQuantity(name)}>−</button>
          <span>{itemQuantity}</span>
          <button onClick={() => incrementQuantity(name)}>+</button>
        </div>
      )}
    </div>
  );
};

export default Button;

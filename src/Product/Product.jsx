import styles from "./Product.module.css";
import Button from "../Button/Button";

const Product = ({ name, category, price, image, items, setItems }) => {
  const itemInCart = items.find((item) => item.name === name);
  const quantity = itemInCart?.quantity ?? 0;
  const imgStyle = quantity > 0 ? { border: "2px solid #C73B0F" } : undefined;

  return (
    <article className={styles.card}>
      <div className={styles.imgWrapper}>
        <div className={styles.cardImage}>
          <img
            className={styles.thumbnail}
            style={imgStyle}
            srcSet={`${image.mobile} 1x, ${image.tablet} 1.5x, ${image.desktop} 2x`}
            alt="products images"
          />
          <Button
            name={name}
            category={category}
            price={price}
            image={image}
            items={items}
            setItems={setItems}
          />
        </div>
      </div>
      <div className={styles.dessertInfo}>
        <p className={styles.category}>{name}</p>
        <p className={styles.subcategory}>{category}</p>
        <p className={styles.price}>${price}</p>
      </div>
    </article>
  );
};

export default Product;

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import styles from "./Products.module.css";
import getProducts from "../api/getProducts";

const Products = () => {
  const [items, setItems] = useState([]);

  const { isLoading, data } = useQuery({
    queryFn: getProducts,
    staleTime: 30000,
  });

  const onRemoveItem = (itemName) => {
    setItems(
      items
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.cardContainer}>
        {data.map(({ category, name, image, price }) => (
          <Product
            key={name}
            image={image}
            name={name}
            category={category}
            price={price}
            items={items}
            setItems={setItems}
          />
        ))}
      </section>
      <Cart items={items} setItems={setItems} onRemoveItem={onRemoveItem} />
    </div>
  );
};

export default Products;

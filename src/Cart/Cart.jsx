import { useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../Modal/Modal";
import classes from "../Modal/Modal.module.css";

const Cart = ({ items, setItems, onRemoveItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemoveItem = (itemName) => {
    onRemoveItem(itemName);
  };

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <article className={styles.cart}>
      <h1 className={styles.title}>
        Your Cart <span>({totalItems})</span>
      </h1>
      <div>
        <div>
          {items.length === 0 ? (
            <div className={styles.placeholder}>
              <div>
                <img
                  src="assets/images/illustration-empty-cart.svg"
                  alt="empty cart illustration"
                />
              </div>
              <p>Your added items will appear here</p>
            </div>
          ) : (
            items.map(({ category, name, quantity, price }) => (
              <article key={category} className={styles.name}>
                <div className={styles.category}>
                  <p>{name}</p>
                </div>
                <div className={styles.info}>
                  <div className={styles.itemInfo}>
                    <p>{quantity}x</p>
                    <p>@${price.toFixed(2)}</p>
                    <p>${(price * quantity).toFixed(2)}</p>
                  </div>
                  <div
                    className={styles.imageInfo}
                    onClick={() => handleRemoveItem(name)}
                    aria-label="Remove item"
                  >
                    <img
                      src="assets/images/icon-remove-item.svg"
                      alt="a remove icon"
                    />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
        {items.length > 0 ? (
          <>
            <div className={styles.total}>
              <p>Order total</p>
              <p className={styles.totalAmt}>${orderTotal.toFixed(2)}</p>
            </div>
            <div className={styles.deliveryInfo}>
              <div>
                <img src="assets/images/icon-carbon-neutral.svg" alt="" />
              </div>
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <p>
              <a className={styles.confirm} onClick={() => openModal()}>
                Confirm Order
              </a>
            </p>
          </>
        ) : null}
      </div>
      {isModalOpen && (
        <Modal>
          <article className={classes.modalCart}>
            {/* Title Section */}
            <div className={classes.modalTitleSection}>
              <div className={classes.modalCheckmark}>
                <img
                  src="assets/images/icon-order-confirmed.svg"
                  alt="order confirmed"
                />
              </div>
              <div className={classes.modalTextSection}>
                <h2 className={classes.modalTitle}>Order Confirmed</h2>
                <p className={classes.modalSubtitle}>
                  We hope you enjoy your food!
                </p>
              </div>
            </div>

            <div className={classes.modalItemsSection}>
              {items.map(({ category, name, quantity, price, image }) => (
                <div key={category}>
                  <div className={classes.modalItemRow}>
                    <div className={classes.modalItemLeft}>
                      <div className={classes.modalItemImage}>
                        <img src={image.thumbnail} alt={name} />
                      </div>
                      <div className={classes.modalItemInfo}>
                        <p className={classes.modalItemName}>{name}</p>
                        <div className={classes.modalItemPrice}>
                          <p>{quantity}x</p>
                          <p>@${price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <p className={classes.modalItemTotal}>
                      ${(price * quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className={classes.modalSeparator}></div>
                </div>
              ))}

              <div className={classes.modalOrderTotal}>
                <p>Order Total</p>
                <p className={classes.totalAmt}>${orderTotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              className={classes.modalButton}
              onClick={() => {
                setItems([]);
                setIsModalOpen(false);
              }}
            >
              Start New Order
            </button>
          </article>
        </Modal>
      )}
    </article>
  );
};

export default Cart;

/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { deleteCart } from '../../Redux/cart/cart_actions';
import { formatPrice } from '../../utils/formatPrice';
import { Player } from '@lottiefiles/react-lottie-player';

import IncreaseDecreaseButton from '../Buttons/IncreaseDecreaseButton/IncreaseDecreaseButton';
import BtnLink from '../Buttons/BtnLink/BtnLink';
import Title from '../Title/Title';

import styles from './CartTable.module.css';

const CartTable = () => {
  const { Carts } = useSelector((state) => state.cart);

  const url = 'https://assets9.lottiefiles.com/private_files/lf30_e3pteeho.json';
  const dispatch = useDispatch();

  let ListCart = [];
  let TotalCart = 0;

  Object.keys(Carts).forEach(function (id) {
    const { name, image, price, quantity, size } = Carts[id];
    TotalCart += quantity * price;
    ListCart.push({ id, name, image, price, quantity, size });
  });  

  function TotalPrice(price, qty) {
    return formatPrice(price * qty);
  }

  return (
    <section className="py-5">
      {ListCart.length !== 0 && (
        <div className="container">
          <div className="row pb-5">
            <Title title="your cart items" />
          </div>
        </div>
      )}
      {ListCart.length !== 0 && (
        <div className="container">
          <table className={styles.tableStyles}>
            <thead>
              <tr>
                <th className={styles.thStyles}>Product</th>
                <th className={styles.thStyles}></th>
                <th className={styles.thStyles}>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {ListCart.map((item, index) => (
                <tr key={index}>
                  <td className={styles.tdStyles}>
                    <div className={styles.cartInfo}>
                      <LazyLoadImage
                        className={`${styles.cartImg} lazy-load-image-background lazy-load-image-loaded`}
                        src={item.image}
                        alt={item.name}
                        effect="blur"
                      />

                      <div>
                        <p>{item.name}</p>
                        <h6>Size: {item.size}</h6>
                        <small>Price: {formatPrice(item.price)}</small>
                        <br />
                        <span onClick={() => dispatch(deleteCart(item.id))}>
                          Remove
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className={styles.tdStyles}>
                    <IncreaseDecreaseButton qty={item.quantity} itemKey={item.id} />
                  </td>

                  <td className={styles.tdStyles}>
                    {TotalPrice(item.price, item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.totalPrice}>
            <table className={styles.totalPriceTable}>
              <tfoot>
                <tr>
                  <td className={styles.tdStyles}>Total</td>
                  <td className={styles.tdStyles}>{formatPrice(TotalCart)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* empty cart Image */}
      {ListCart.length === 0 && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-10 col-md-6 mx-auto">
                <Player
                  src={url}
                  autoplay
                  loop
                  className={styles.emptyCartStyles}
                  alt="empty cart"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto" style={{ textAlign: 'center' }}>
                <BtnLink title="shop now" />
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default CartTable;

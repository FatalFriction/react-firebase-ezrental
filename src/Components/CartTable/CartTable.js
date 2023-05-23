import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deleteCart, resetCart } from '../../Redux/cart/cart_actions';
import { formatPrice } from '../../utils/formatPrice';
import { Player } from '@lottiefiles/react-lottie-player';
import IncreaseDecreaseButton from '../Buttons/IncreaseDecreaseButton/IncreaseDecreaseButton';
import BtnLink from '../Buttons/BtnLink/BtnLink';
import Title from '../Title/Title';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../Firebase';
import { useState } from 'react';

import styles from './CartTable.module.css';
import { useHistory } from 'react-router-dom';

import Calendar from '../../GCalendar/Calendar';
import { Button } from '@mui/material';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';

const CartTable = () => {
  const { Carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const url = 'https://assets9.lottiefiles.com/private_files/lf30_e3pteeho.json';

  const [selectedDates, setSelectedDates] = useState({});

  const handleCheckout = async () => {
    try {
      const transactionData = {
        carts: Object.keys(Carts).map((id) => {
          const { startDate, endDate } = selectedDates[id] || {};
          const startDateObj = startDate ? new Date(startDate) : null;
          const endDateObj = endDate ? new Date(endDate) : null;
  
          return {
            ...Carts[id],
            startDate: startDateObj ? Timestamp.fromDate(startDateObj) : null,
            endDate: endDateObj ? Timestamp.fromDate(endDateObj) : null,
          };
        }),
        totalCart: calculateTotalCart(Carts),
        orderCreated: serverTimestamp(),
        userID: auth.currentUser.uid,
      };
  
      // Perform validation
      const { carts } = transactionData;
      if (carts.some((cart) => !cart.startDate || !cart.endDate)) {
        toast.error('Please select start and end dates for all cart items.');
        return;
      }
  
      console.log('Transaction Data:', transactionData);
  
      const docRef = await addDoc(collection(db, 'order'), transactionData);
      console.log('Transaction added with ID:', docRef.id);
  
      dispatch(resetCart());
  
      history.push('/checkout/success');
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('An error occurred while processing your transaction.');
    }
  };
  
    
  const calculateTotalCart = (cartItems) => {
    let total = 0;
    Object.keys(cartItems).forEach((id) => {
      const { price, quantity } = cartItems[id];
      total += price * quantity;
    });
    return total;
  };


  const handleDateChange = async (itemId, date) => {
    if (typeof date === 'string') {
      const [startDateStr, endDateStr] = date.split('to').map((str) => str.trim());
  
      let startDate = null;
      let endDate = null;
  
      if (startDateStr && endDateStr && startDateStr !== endDateStr) {
        startDate = moment(startDateStr, 'MM-DD-YYYY').format('YYYY-MM-DD');
        endDate = moment(endDateStr, 'MM-DD-YYYY').format('YYYY-MM-DD');
      }
  
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        [itemId]: {
          startDate,
          endDate,
        },
      }));
    } else if (typeof date === 'object' && date.startDate && date.endDate) {
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        [itemId]: {
          startDate: moment(date.startDate).format('YYYY-MM-DD'),
          endDate: moment(date.endDate).format('YYYY-MM-DD'),
        },
      }));
    } else {
      // Handle invalid date format
      console.error('Invalid date format:', date);
    }
  };  

  return (
    <section className="py-5">
      {Object.keys(Carts).length !== 0 && (
        <div className="container">
          <div className="row pb-5">
            <Title title="your cart items" />
          </div>
        </div>
      )}
      {Object.keys(Carts).length !== 0 && (
        <div className="container">
          <table className={styles.tableStyles}>
            <thead>
              <tr>
                <th className={styles.thStyles}>Product</th>
                <th className={styles.thStyles}>Date</th>
                <th className={styles.thStyles}>Quantity</th>
                <th className={styles.thStyles}>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(Carts).map((id) => {
                const item = Carts[id];
                return (
                  <tr key={id}>
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
                          <span onClick={() => dispatch(deleteCart(id))}>Remove</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className={styles.tdStyles}>
                      <div>
                      <Calendar
                        mode="range"
                        selectedDate={selectedDates[id]}
                        setSelectedDate={(date) => handleDateChange(id, date)}
                      />
                      </div>
                    </td>

                    <td className={styles.tdStyles}>
                      <IncreaseDecreaseButton qty={item.quantity} itemKey={id} />
                    </td>

                    <td className={styles.tdStyles}>{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.totalPrice}>
            <table className={styles.totalPriceTable}>
              <tfoot>
                <tr>
                  <td className={styles.tdStyles}>Total</td>
                  <td className={styles.tdStyles}>{formatPrice(calculateTotalCart(Carts))}</td>
                </tr>
                <tr className={styles.btn}>
                  <td><Button variant="contained" endIcon={<Send />} onClick={handleCheckout} className={styles.checkout}>Checkout</Button></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
         
        </div>
      )}

      {/* empty cart Image */}
      {Object.keys(Carts).length === 0 && (
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

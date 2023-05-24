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
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';

const Cartshipment = ({ id, handleShipmentMethodChange }) => {
  const [shipmentMethod, setShipmentMethod] = useState('');

  const handleChange  = (e) => {
    setShipmentMethod(e.target.value);
    handleShipmentMethodChange(id, e.target.value);
  };
  
  return (
      <FormControl className={styles.shipmentMethodSelect} variant="standard" sx={{ minWidth: 200 }}>
      <InputLabel id={`select-label-${id}`}>Shipment Method</InputLabel>
        <Select required value={shipmentMethod} onChange={handleChange} labelId={`select-label-${id}`}>
          <MenuItem value="JNE">JNE</MenuItem>
          <MenuItem value="JNT">JNT</MenuItem>
          <MenuItem value="GrabSend">GrabSend</MenuItem>
          <MenuItem value="GoSend">GoSend</MenuItem>
        </Select>
      </FormControl>
  );
};

const CartTable = () => {
  const { Carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const url = 'https://assets9.lottiefiles.com/private_files/lf30_e3pteeho.json';

  const [selectedDates, setSelectedDates] = useState({});
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedMethods, setSelectedMethods] = useState({});

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
            UsershipmentMethod: selectedMethods[id],
            
          };
        }),
        totalCart: calculateTotalCart(Carts),
        orderCreated: serverTimestamp(),
        userName: auth.currentUser.displayName,
        userPhotoURL: auth.currentUser.photoURL,
        useremail: auth.currentUser.email,
        userAddress: address,
        userPhonenumber: phoneNumber,
      };
  
      // Perform validation
      const { carts,userAddress, userPhonenumber } = transactionData;
        
            // Check if start and end dates are selected for all cart items
            if (carts.some((cart) => !cart.startDate || !cart.endDate)) {
              toast.error('Please select start and end dates for all cart items.');
              return;
            }
        
            // Check if user name, address, phone number, and shipment method are provided
            if (!userAddress || !userPhonenumber) {
              toast.error('Please provide your address, and phone number.');
              return;
            }

            // Check if the phone number is valid
            const phoneNumberRegex = /^[0-9]{10,}$/; // Modify the regex pattern as per your phone number requirements
            if (!phoneNumberRegex.test(userPhonenumber)) {
              toast.error('Please enter a valid phone number.');
              return;
            }
      
            // Check if shipment method is selected for all cart items
            if (Object.values(selectedMethods).some((method) => !['JNE', 'JNT', 'GrabSend', 'GoSend'].includes(method))) {
              toast.error('Please select a valid shipment method for all cart items.');
              return;
            }     
  
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

  const handleShipmentMethodChange = (itemId, method) => {
    setSelectedMethods((prevShipmentMethods) => ({
      ...prevShipmentMethods,
      [itemId]: method,
    }));
  };

  const validateShipmentMethods = (carts, shipmentMethods) => {
    return carts.some((cart) => {
      const selectedMethod = shipmentMethods[cart.id];
      return !selectedMethod || !['JNE', 'JNT', 'GrabSend', 'GoSend'].includes(selectedMethod);
    });
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
        <div className="container" key="cart-table-container">
          <table className={styles.tableStyles}>
            <thead>
              <tr key="table-header">
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
                          <h6>Status: {item.availability}</h6>
                          <small>Price: {formatPrice(item.price)}</small>
                          <br />
                          <span onClick={() => dispatch(deleteCart(id))}>Remove</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className={styles.tdStyles}>
                      <span>
                      <Calendar
                        mode="range"
                        selectedDate={selectedDates[id]}
                        setSelectedDate={(date) => handleDateChange(id, date)}
                      />
                      <Cartshipment
                        id={id}
                        handleShipmentMethodChange={handleShipmentMethodChange}
                      />
                      </span>
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
                <tr>
                  <div className={styles.addressInput}>
                    <Input required type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <div className={styles.phoneNumberInput}>
                    <Input required type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>

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

import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deleteCart, setDocRef } from '../../Redux/cart/cart_actions';
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
import { Button, Input} from '@mui/material';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';
import Shipper from '../../Shipper/Shipper';
import axios from 'axios';


const CartTable = () => {
  const { Carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();  

  const url = 'https://assets9.lottiefiles.com/private_files/lf30_e3pteeho.json';

  const [selectedDates, setSelectedDates] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedData, setSelectedData] = useState(null);

  const handleUserPick = (obj) => {
    setSelectedData(obj);
  };
  
  const handleCheckout = async () => {

    if (selectedData === null) {
      toast.error('Please input your address before proceeding to checkout.');
      return;
    }

    try {
      const transactionData = {
        carts: Object.keys(Carts).map((id) => {
          const { startDate, endDate } = selectedDates[id] || {};
          const startDateObj = startDate ? new Date(startDate) : null;
          const endDateObj = endDate ? new Date(endDate) : null;
          
          const numdays = startDate && endDate ? moment.duration(moment(endDate).diff(moment(startDate))).asDays() : 0;
          
          const item = Carts[id]; // Retrieve the item object from Carts

          const subtotal = (item.price * item.quantity) * numdays; // Calculate the subtotal

          return {
            ...Carts[id],
            startDate: startDateObj ? Timestamp.fromDate(startDateObj) : null,
            endDate: endDateObj ? Timestamp.fromDate(endDateObj) : null,
            subtotal: subtotal,
          };
        }),
        totalCart: calculateTotalCart(Carts),
        timeStamp: serverTimestamp(),
        userName: auth.currentUser.displayName,
        userPhotoURL: auth.currentUser.photoURL,
        useremail: auth.currentUser.email,
        userid: auth.currentUser.uid,
        userPhonenumber: phoneNumber,
        deliverycost: selectedData.total_price,
      };
  
      // Perform validation
      const { carts, userPhonenumber } = transactionData;
        
            // Check if start and end dates are selected for all cart items
            if (carts.some((cart) => !cart.startDate || !cart.endDate)) {
              toast.error('Please select start and end dates for all cart items.');
              return;
            }
        
            // Check if user name, address, phone number, and shipment method are provided
            if (!userPhonenumber) {
              toast.error('Please provide your address, and phone number.');
              return;
            }

            // Check if the phone number is valid
            const phoneNumberRegex = /^[0-9]{10,}$/; // Modify the regex pattern as per your phone number requirements
            if (!phoneNumberRegex.test(userPhonenumber)) {
              toast.error('Please enter a valid phone number.');
              return;
            }

      const total = calculateTotalCart(Carts);
       
      const docRef = await addDoc(collection(db, 'order'), transactionData);
      dispatch(setDocRef(docRef.id)); // Dispatch the action to store the docRef in Redux
      // Create transaction using Midtrans API
      let ids = docRef.id
            
      const secret = process.env.REACT_APP_SERVER_KEY
      const encoded = btoa(secret + ":") 
      const AUTH_STRING = `Basic ${encoded}`

      let data = {
        transaction_details: {
          order_id: ids,
          gross_amount: total
        }
      }
      
      const datas = JSON.stringify(data)
      await axios.post('https://api.sandbox.midtrans.com/v1/payment-links',
        datas,  // No need to wrap datas in an object here
        {
          headers: {
            Authorization: AUTH_STRING,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          const { payment_url } = response.data;
          window.open(payment_url, "_blank")
          // console.log("received", response.data);  // Access response.data instead of response
        }).catch((error) => {
          console.log("error", error);
        });
      
      history.push('/');
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('An error occurred while processing your transaction.');
    }
  };

  const calculateTotalCart = (cartItems) => {
    let total = 0;
    
    Object.keys(cartItems).forEach((id) => {
      const { price, quantity } = cartItems[id];
      const { numdays } = selectedDates[id] || {}; // Get the number of days for the item
      
      const subtotal = numdays ? numdays * price * quantity : price * quantity; // Calculate the subtotal

      total += subtotal;
    });
    if(selectedData)
    {
      return total + selectedData?.total_price;
    }
    else {
      return total;
    }
  };
  
  const handleDateChange = async (itemId, date) => {
    if (typeof date === 'string') {
      const [startDateStr, endDateStr] = date.split('to').map((str) => str.trim());
      
      let startDate = null;
      let endDate = null;
      let numdays = null;

      if (startDateStr && endDateStr && startDateStr !== endDateStr) {
        startDate = moment(startDateStr, 'MM-DD-YYYY').format('YYYY-MM-DD');
        endDate = moment(endDateStr, 'MM-DD-YYYY').format('YYYY-MM-DD');

          if (startDate && endDate) {
            const startMoment = moment(startDate);
            const endMoment = moment(endDate);
            const duration = moment.duration(endMoment.diff(startMoment));
           numdays = duration.asDays();
          }
      }
  
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        [itemId]: {
          startDate,
          endDate,
          numdays,
        },
      }));
    } else if (typeof date === 'object' && date.startDate && date.endDate) {
      const startDate = moment(date.startDate).format('YYYY-MM-DD');
      const endDate = moment(date.endDate).format('YYYY-MM-DD');

      const startMoment = moment(startDate);
      const endMoment = moment(endDate);
      const duration = moment.duration(endMoment.diff(startMoment));
      const numdays = duration.asDays();
      
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        [itemId]: {
          startDate: moment(date.startDate).format('YYYY-MM-DD'),
          endDate: moment(date.endDate).format('YYYY-MM-DD'),
          numdays: numdays,
        },
      }));
    } else {
      // Handle invalid date format
      console.error('Invalid date format:', date);
    }

  };  

  const total = calculateTotalCart(Carts); // Calculate the total value

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
                        className={styles.calendar}
                        mode="range"
                        selectedDate={selectedDates[id]}
                        setSelectedDate={(date) => handleDateChange(id, date)}
                      />
                      </span>
                    </td>

                    <td className={styles.tdStyles}>
                      <IncreaseDecreaseButton qty={item.quantity} itemKey={id} />
                    </td>
                    <td className={styles.tdStyles}>{formatPrice((item.price * item.quantity) * (selectedDates[id]?.numdays || 1))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.totalPrice}>
            <table className={styles.totalPriceTable}>
              <tfoot>
                <tr>
                  <td className={styles.tdStyles}>Delivery Cost</td>
                  <td className={styles.tdStyles}>{selectedData ? formatPrice(selectedData.total_price) : "Not available"}</td>
                </tr>
                  <tr><br/></tr>
                <tr>
                  <td className={styles.tdStyles}>Total</td>
                  <td className={styles.tdStyles}>{formatPrice(calculateTotalCart(Carts))}</td>
                </tr>
                <tr>
                  <div className={styles.phoneNumberInput}>
                    <Input required type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className={styles.addressInput}>
                    <Shipper onUserPick={handleUserPick} itemval={total}/>
                  </div>
                </tr>
                <tr className={styles.btn}>
                  <td><Button variant="contained" endIcon={<Send />} onClick={handleCheckout} className={styles.checkout} >Checkout</Button></td>
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

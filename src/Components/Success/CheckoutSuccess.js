/** @jsxImportSource @emotion/react */

import { React } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useHistory } from 'react-router-dom';
import './Success.styles.css';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../Redux/cart/cart_actions';

const CheckoutSuccess = () => {
  const history = useHistory();
  const url = 'https://assets10.lottiefiles.com/packages/lf20_m3ixidnq.json';
  const docRef = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleclick = () => {
    dispatch(resetCart());
    history.push('/');
  };
  
  return ( 
    <div className="card">
      <Player
        autoplay
        loop
        src={url}
        alt="checkmarks"
        style={{
          width: '250px',
          height: '250px',
        }}
      />
      <h1 className='head'>You're booked!</h1>
      <p className='para'>We've Got Your Rental request<br /> Find all your booked services in My Bookings.</p>
      <p>Save your Transaction Number</p>
      <Button>{docRef.docRef}</Button>
      <br/>
      <Button
        size="large"
        variant="contained"
        style={{ backgroundColor: '#6a0dad', color: '#ffffff', 
                 borderRadius: '20px', width: '80%'}}
        onClick={handleclick}
      >
        Done
      </Button>
    </div>
  );
};

export default CheckoutSuccess;

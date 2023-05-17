/** @jsxImportSource @emotion/react */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { auth } from '../../../Firebase/index';

import SocialIcons from '../../SocialIcons/SocialIcons';

import { Player } from '@lottiefiles/react-lottie-player';
import headerBg from '../../../Assets/images/header-bg.png';

import {
  headerStyles,
  navStyles,
  contactStyles,
  socialIcons,
  navLogo,
  bgHeaderStyles,
} from './NavbarLogo.styles';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { clearCart } from '../../../Redux/cart/cart_actions';

const NavbarLogo = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [rerender,setRerender] = useState(false);
  const url = 'https://assets8.lottiefiles.com/packages/lf20_xoIVBD.json';

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName);
      } else {
        setUser(null);
        setDisplayName(null);
      }
    });

    return unsubscribe;
  }, [rerender]);

  useEffect(() => {
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 1000); // change this value as needed
  }, []);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        if (mounted) {
          dispatch({
            type: 'LOGOUT',
            payload: null,
          });
          dispatch(clearCart());
          console.log("logout success")
          history.push('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  return (
    <>
      <div css={headerStyles}>
        <div className="container">
          {/* Navbar */}
          <nav css={navStyles}>
            {/* auth icons */}
            {!user && (
              <div css={contactStyles}>
                <span
                  className="contact"
                  onClick={() => history.push('/login')}
                >
                  <AiOutlineUser size={25} />
                  <span>Login</span>
                </span>
              </div>
            )}

            {user && (
              <div
                css={contactStyles}
                style={{
                  marginRight: '2rem',
                }}
              >
                <span className="contact">
                  <span>Hello, {displayName}!</span>
                </span>
              </div>
            )}

            {user && (
              <div onClick={logoutHandler} css={contactStyles}>
                <span
                  className="contact"
                  onClick={logoutHandler}
                >
                  <IoLogOutOutline size={25} />
                  <span>Logout</span>
                </span>
              </div>
            )}

            {/* Logo */}
            <div css={navLogo} onClick={() => history.push('/')}>
              <Player autoplay loop src={url} alt="logo" />
            </div>
            {/* Social Icons */}
            <SocialIcons styles={socialIcons} />
          </nav>
        </div>
      </div>
      <div css={bgHeaderStyles}>
        <img src={headerBg} alt="header background" />
      </div>
    </>
  );
};

export default NavbarLogo;

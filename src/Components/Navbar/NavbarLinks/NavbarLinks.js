/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Firebase';

import ToggleIcon from '../../ToggleIcon/ToggleIcon';
import Sidebar from '../../Sidebar/Sidebar';
import { Player } from '@lottiefiles/react-lottie-player';

import { navLinks } from '../../../utils/navbarLinks';
import {
  headerStyles,
  navStyles,
  navLinksStyles,
  toggleIconStyles,
  cartIconStyles,
} from './NavbarLinks.styles';

const NavbarLinks = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const [user,setUser] = useState(null);
  const url = 'https://assets4.lottiefiles.com/packages/lf20_O1znIOC9aN.json';


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // update the user state when auth state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <header css={headerStyles}>
      <div className="container">
        <nav css={navStyles}>
          {/* toggle icon */}
          <span
            css={toggleIconStyles}
            onClick={() => setIsSidebarActive(!isSidebarActive)}
          >
            <ToggleIcon
              isSidebarActive={isSidebarActive}
              setIsSidebarActive={setIsSidebarActive}
            />
          </span>
          <span>
          </span>
          {/* Links */}
          <ul css={navLinksStyles}>
          {/* check if the user is signed in and navLink.id === 7
          if true, don't render the link*/}
            {navLinks.map((navLink) => (
              ((user && (navLink.id === 7 || navLink.id === 6)) ? null : (
              <li key={navLink.id}>
                <NavLink exact activeClassName="active-link" to={navLink.path}>
                  {navLink.text}
                </NavLink>
              </li>
            ))
            ))}
          </ul>
          {/* cart icon */}
          <span className="cart" onClick={() => history.push('/cart')}>
            <Player autoplay loop src={url} css={cartIconStyles}/>
            <span className="cart-count">{cart.numberCart}</span>
          </span>
        </nav>
      </div>
      <Sidebar
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
    </header>
  );
};

export default NavbarLinks;

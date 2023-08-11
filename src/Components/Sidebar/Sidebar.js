/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';

import logoImg from '../../Assets/images/logo.png';
import { navLinks } from '../../utils/navbarLinks';

import SocialIcons from '../SocialIcons/SocialIcons';

import {
  linkStyles,
  listStyles,
  logoStyles,
  sidebarStyles,
} from './Sidebar.styles';

const Sidebar = ({ isSidebarActive, setIsSidebarActive, user }) => {
  return (
    <aside css={sidebarStyles({ isSidebarActive })}>
      {/* logo */}
      <img src={logoImg} css={logoStyles} alt="logo" />
      {/* links */}
      <ul css={listStyles}>
        {navLinks.map(({ id, text, path }) => (
          // Check if the user is authenticated and the link should be skipped
          (user && (id === 7 || id === 6)) ||
          // Check if the user is not authenticated and the link is id 4
          (!user && id === 4) ? null : (
            <li key={id} onClick={() => setIsSidebarActive(false)}>
              <NavLink
                css={linkStyles}
                to={path}
                activeClassName="activeLink"
                exact
              >
                {text}
              </NavLink>
            </li>
          )
        ))}
      </ul>
      {/* social icons */}
      <SocialIcons />
    </aside>
  );
};

export default Sidebar;

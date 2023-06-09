import { css } from '@emotion/react';

export const headerStyles = css`
  background-color: var(--white-color);
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 666;
`;

export const navStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const contactStyles = css`
  /* display: none; */

  /* @media (min-width: 992px) {
    display: flex;
  } */

  .contact {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--grey-color);
    cursor: pointer;

    span {
      margin-left: 0.2rem;
    }
  }

  .social-icons {
    background: red;
    display: none;
  }
`;

export const navLogo = css`
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
  }
  
  img {
    display: block;
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
`;

export const socialIcons = css`
  display: none;

  @media (min-width: 992px) {
    display: flex;
  }
`;

export const bgHeaderStyles = css`
  background-color: var(--primary-color);
  display: none;

  img {
    width: 100%;
    display: block;
  }

  @media (min-width: 992px) {
    display: block;
  }
`;

/** @jsxImportSource @emotion/react */

import CheckoutSuccess from '../../Components/Success/CheckoutSuccess';

import { sectionStyles } from './SuccessScreen.styles';

const SuccessScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <CheckoutSuccess />
      </section>
    </>
  );
};

export default SuccessScreen;

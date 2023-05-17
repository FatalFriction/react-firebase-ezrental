/** @jsxImportSource @emotion/react */

import ForgotPasswordForm from '../../Components/Forms/ForgotPasswordForm/ForgotPasswordForm';

import { sectionStyles } from './ForgotPasswordScreen.styles';

const ForgotPasswordScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <ForgotPasswordForm />
      </section>
    </>
  );
};

export default ForgotPasswordScreen;

/** @jsxImportSource @emotion/react */

import LoginForm from '../../Components/Forms/LoginForm/LoginForm';

import { sectionStyles } from './LoginScreen.styles';

const LoginScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <LoginForm />
      </section>
    </>
  );
};

export default LoginScreen;

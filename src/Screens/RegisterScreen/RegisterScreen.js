/** @jsxImportSource @emotion/react */

import RegisterForm from '../../Components/Forms/RegisterForm/RegisterForm';

import { sectionStyles } from './RegisterScreen.styles';

const RegisterScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <RegisterForm />
      </section>
    </>
  );
};

export default RegisterScreen;

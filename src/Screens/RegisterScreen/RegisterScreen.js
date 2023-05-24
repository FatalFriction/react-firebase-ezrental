/** @jsxImportSource @emotion/react */

import RegisterForm from '../../Components/Forms/RegisterForm/RegisterForm';
import { userInputs } from '../../utils/formSource';

import { sectionStyles } from './RegisterScreen.styles';

const RegisterScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <RegisterForm inputs={userInputs} title="Sign Up"/>
      </section>
    </>
  );
};

export default RegisterScreen;

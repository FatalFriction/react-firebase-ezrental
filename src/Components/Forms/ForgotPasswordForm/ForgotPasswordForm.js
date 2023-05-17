/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';

import { auth } from '../../../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

import logoImg from '../../../Assets/images/logo.png';

import Input from '../Input/Input';
import Button from '../../Buttons/Button/Button';

import {
  formStyles,
  headerStyles,
  loadingStyle,
  logoStyles,
  textStyles,
  titleStyles,
  forgotPassowrdStyles,
  registerLinkStyles,
} from '../RegisterForm/Styles';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ForgotPasswordForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await sendPasswordResetEmail(auth,userEmail)
      .then(() => {
        setUserEmail('');
        setIsLoading(false);
        toast.success('Check your email for password reset link');
        history.push('/')
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} css={formStyles}>
      <div css={headerStyles}>
        <img
          css={logoStyles}
          src={logoImg}
          alt="logo"
          onClick={() => history.push('/')}
        />
        <h3 css={titleStyles}>Let's get you into your account</h3>
        <p css={textStyles}>Sign-in email address</p>
      </div>

      <Input
        inputID="email"
        type="email"
        placeholder="Enter your Email"
        label="Email"
        errorMessage="you must enter an email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />

      <div css={registerLinkStyles}>
        <span>Already have an Account?</span>
        <Link to="/login" css={forgotPassowrdStyles}>
          Login
        </Link>
      </div>

      <br />

      {!isLoading && (
        <Button bgColor="#F25387" width>
          Submit
        </Button>
      )}

      {isLoading && (
        <Button bgColor="#032F58" width>
          <span>
            <AiOutlineLoading size={15} css={loadingStyle} />
          </span>
        </Button>
      )}
    </form>
  );
};

export default ForgotPasswordForm;

/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';

import Button from '../../Buttons/Button/Button';
import Input from '../Input/Input';

import logoImg from '../../../Assets/images/logo.png';

import { auth } from '../../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import {
  formStyles,
  headerStyles,
  loadingStyle,
  logoStyles,
  registerLinkStyles,
  textStyles,
  titleStyles,
  forgotPassowrdStyles,
} from './Styles';

const RegisterForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // save user email in local storage
    const email = window.localStorage.getItem('emailForRegistration');
    const password = window.localStorage.getItem('passwordForRegistration');
    const name = window.localStorage.getItem('nameForRegistration');
  
    if (email && password && name) {
      setUserEmail(email);
      setUserPassword(password);
      setUserName(name);
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userName || !userEmail || !userPassword) {
      toast.error('Name & Email & Password are required');
      setIsLoading(false);
      return;
    }

    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(() => {
      // Signed in 
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
      toast.success(
        `Successfully registered!`
      );
      setIsLoading(false);
      // clear local storage
      window.localStorage.removeItem('emailForRegistration');
      window.localStorage.removeItem('nameForRegistration');
      window.localStorage.removeItem('passwordForRegistration');
      setUserEmail('');
      setUserPassword('');
      setUserName('');

      history.push('/login'); // redirect after successful registration
      
    }).catch((err) => {
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
        <h3 css={titleStyles}>Register</h3>
        <p css={textStyles}>Create a Ez Rental account</p>
      </div>
      {/*
      <Button width styles={googleBtnStyles}>
        <span>
          <FcGoogle size={15} /> <span>Sign In With Google</span>
        </span>
      </Button>

      <header css={lineStyles}>
        <div>Text between Lines</div>
      </header> */}

      <Input
        inputID="name"
        type="text"
        placeholder="Enter your Name"
        label="Name"
        errorMessage="you must enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
        inputID="email"
        type="email"
        placeholder="Enter your Email"
        label="Your Email"
        errorMessage="you must enter an email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />

<Input
        inputID="password"
        type="password"
        placeholder="Enter your password"
        label="Your password"
        errorMessage="you must enter an password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      {!isLoading && <Button width>Register</Button>}

      {isLoading && (
        <Button width>
          <span>
            <AiOutlineLoading size={15} css={loadingStyle} />
          </span>
        </Button>
      )}

      <br />

      <div css={registerLinkStyles}>
        <span>Already have an Account?</span>
        <Link to="/login" css={forgotPassowrdStyles}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;

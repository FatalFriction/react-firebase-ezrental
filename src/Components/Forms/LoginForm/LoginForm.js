/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';

import logoImg from '../../../Assets/images/logo.png';

import Button from '../../Buttons/Button/Button';
import { Facebook, Google } from 'react-bootstrap-icons';
import Input from '../Input/Input';

import { auth, metaprovider, provider } from '../../../Firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import {
  forgotPassowrdStyles,
  formStyles,
  headerStyles,
  loadingStyle,
  logoStyles,
  registerLinkStyles,
  signiconStyles,
  textStyles,
  titleStyles,
} from '../RegisterForm/Styles';

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => ({ ...state }));

  const handleGoogle = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          userEmailAddress: user.email,
          userDisplayName: user.displayName,
          token: idTokenResult.token,
        },
      });
  
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleFacebook = async () => {
  
    try {
      const result = await signInWithPopup(auth, metaprovider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          userEmailAddress: user.email,
          userDisplayName: user.displayName,
          token: idTokenResult.token,
        },
      });
  
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userAuth && userAuth.token) {
      history.push('/');
    }
  }, [history, userAuth]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          userEmailAddress: user.email,
          userDisplayName: user.displayName,
          token: idTokenResult.token,
        },
      });

      history.push('/');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} css={formStyles}>
      <div css={headerStyles}>
        <img
          css={logoStyles}
          src={logoImg}
          alt="logo"
          onClick={() => history.push('/')}
        />
        <h3 css={titleStyles}>Login</h3>
        <p css={textStyles}>using your Ez Rental account</p>
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

      <Input
        inputID="password"
        type="password"
        placeholder="Enter your Password"
        label="Password"
        errorMessage="you must enter a password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      <Link to="/forgot/password" css={forgotPassowrdStyles}>
        Forget password?
      </Link>
      <br />
      <br />

      {!isLoading && <Button width>Login</Button>}
      {isLoading && (
        <Button width>
          <span>
            <AiOutlineLoading size={15} css={loadingStyle} />
          </span>
        </Button>
      )}

      <br />
    </form>

        <Button width handleClick={handleGoogle}>
            <span>
              <Google size={24} css={signiconStyles}/> <span>Sign In With Google</span>
            </span>
          </Button>
    
        <br />

        <Button width handleClick={handleFacebook}>
            <span>
              <Facebook size={24} css={signiconStyles}/> <span>Sign In With Facebook</span>
            </span>
          </Button>
    
        <br />

        <div css={registerLinkStyles}>
          <span>Not register yet?</span>
            <Link to="/register" css={forgotPassowrdStyles}>
              Create an Account
            </Link>
      </div>
    </div>
  );
};

export default LoginForm;

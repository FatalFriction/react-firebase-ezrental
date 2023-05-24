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

import { auth, db, metaprovider, provider } from '../../../Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

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
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

const LoginForm = () => {
  
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { email, displayName } = user;
        const userData = {
          userEmailAddress: email,
          userDisplayName: displayName,
        };

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: userData,
        });

        history.push('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, history]);

  const handleGoogle = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      const userData = {
        email: user.email,
        displayName: user.displayName,
        SignInprovider: user.providerId,
        img: user.photoURL,
        token: idTokenResult.token,
        timeStamp: serverTimestamp(),
      };

      // Update Firestore with user data
      await setDoc(doc(collection(db, 'users'), user.uid), userData);

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: userData,
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
      console.log('token', idTokenResult);
  
      const userData = {
        email: user.email,
        displayName: user.displayName,
        SignInprovider: user.providerId,
        img: user.photoURL,
        token: idTokenResult.token,
        timeStamp: serverTimestamp(),
      };
  
      // Update Firestore with user data
      await setDoc(doc(collection(db, 'users'), user.uid), userData);
  
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: userData,
      });
  
      history.push('/');
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
  
        try {
          const result = await signInWithPopup(auth, provider);
  
          await result.user.linkWithCredential(pendingCred);
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
          console.log('token', idTokenResult);
  
          const userData = {
            email: user.email,
            displayName: user.displayName,
            SignInprovider: user.providerId,
            img: user.photoURL,
            token: idTokenResult.token,
            timeStamp: serverTimestamp(),
          };
  
          // Update Firestore with user data
          await setDoc(doc(collection(db, 'users'), user.uid), userData);
  
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: userData,
          });
  
          history.push('/');
        } catch (error) {
          // Handle the linking error
          toast.error(error.message);
          history.push('/login');
        }
      } else {
        // Handle other errors
        toast.error(error.message);
        history.push('/login');
      }
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

      const userData = {
        email: user.email,
        displayName: user.displayName,
        SignInprovider: user.providerId,
        img: user.photoURL,
        token: idTokenResult.token,
        timeStamp: serverTimestamp(),
      };

      // Update Firestore with user data
      await setDoc(doc(collection(db, 'users'), user.uid), userData);

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          userData
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

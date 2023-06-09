import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Player } from '@lottiefiles/react-lottie-player';

// scroll to top component
import ScrollToTop from './utils/ScrollToTop';

import {
  CartScreen,
  HomeScreen,
  RegisterScreen,
  LoginScreen,
  ForgotPasswordScreen,
  ProductsScreen,
  FilterProductsScreen,
  ServicesScreen,
  ContactScreen,
  SuccessScreen,
} from './Screens';

import { useDispatch } from 'react-redux';
import { auth } from './Firebase';
import { useEffect, useState } from 'react';

import { containerStyles } from '../src/Screens/FilterProductsScreen/FilterProductsScreen.styles';
import SearchModal from '../src/Components/SearchModal/SearchModal';
import { Fab, Zoom } from '@mui/material';
import NotFound from './Components/NotFound/NotFound';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            userEmailAddress: user.email,
            userDisplayName: user.displayName,
            token: idTokenResult.token,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const surl = 'https://assets5.lottiefiles.com/packages/lf20_4EjgStPG5C.json';
  const ssurl = 'https://assets9.lottiefiles.com/datafiles/2FbN5zpKi16aTHW/data.json';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFabClick = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/login">
          <LoginScreen />
          <ToastContainer />
        </Route>
      
        <Route exact path="/register">
          <RegisterScreen />
          <ToastContainer />
        </Route>

        <Route exact path="/forgot/password">
          <ForgotPasswordScreen />
          <ToastContainer />
        </Route>

        <Route exact path="/contact">
          <ContactScreen />
          <ToastContainer />
        </Route>
        {/* this empty tag to remove Navbar component from  Forms Screens */}
        <>
          <Zoom 
            in={true}
            timeout={{enter: 500, exit:500}}
            unmountOnExit
          >
          <div style={containerStyles}>
            <Fab
              size="large"
              sx={{
                backgroundColor: '#eddd5e',
                width: '80px',
                height: '80px',
              }}
              aria-label="search"
              onClick={handleFabClick}
            >
              {open ? <Player autoplay loop src={ssurl}/> : <Player autoplay loop src={surl} />}
            </Fab>
              <SearchModal open={open} handleClose={handleClose} />
            </div>
          </Zoom>
          
          <Navbar />

          <Switch>
          <Route exact path="/">
            <HomeScreen />
            <ToastContainer />
          </Route>

          <Route path="/our-products">
            <FilterProductsScreen />
            <ToastContainer />
          </Route>
          
          <Route exact path="/cart">
            <CartScreen />
            <ToastContainer />
          </Route>

          <Route exact path="/checkout/success">
            <SuccessScreen />
            <ToastContainer />
          </Route>

          <Route exact path="/products/:productsCategory">
            <ProductsScreen />
            <ToastContainer />
          </Route>

          <Route exact path="/services">
            <ServicesScreen />
            <ToastContainer />
          </Route>
          
          <Redirect to="/not-found" />
          </Switch>

          <Route path="/not-found" component={NotFound} />

          <Footer />
          
        </>
      </Switch>
    </Router>
    </>
  );
};

export default App;

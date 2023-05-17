import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

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
} from './Screens';
import { useDispatch } from 'react-redux';
import { auth } from './Firebase';
import { useEffect } from 'react';


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

  return (
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
          <Navbar />
          <Route exact path="/">
            <HomeScreen />
          </Route>

          <Route path="/our-products">
            <FilterProductsScreen />
          </Route>

          <Route exact path="/cart">
            <CartScreen />
          </Route>

          <Route exact path="/products/:productsCategory">
            <ProductsScreen />
          </Route>

          <Route exact path="/services">
            <ServicesScreen />
          </Route>

          <Footer />
        </>
      </Switch>
    </Router>
  );
};

export default App;

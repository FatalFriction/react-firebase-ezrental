import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addCart } from '../../../Redux/cart/cart_actions';
import AddToCartButton from '../../Buttons/AddToCartButton/AddToCartButton';
import { formatPrice } from '../../../utils/formatPrice';
import '../ProductsModalrss/modalstyle.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function ModalCard({ products }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const {
    img: productsImg,
    title: productsName,
    price: productsPrice,
    brand,
    size,
    availability,
    description,
  } = products;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 1500);
    }
  }, [isActive]);

  const onClickHandler = () => {
    if (availability === 'Out of stock') {
      return; // Do nothing if the product is out of stock
    }

    setIsActive(true);
    dispatch(addCart(products));
  };

  const isOutOfStock = availability === 'Out of stock';

  return (
    <Card raised={true} >
      <CardActionArea>
        <CardMedia component="img" height="400" image={productsImg} alt={productsName} />
        <CardContent>
          <Typography variant="h5" color="#212121" align="center">
            {formatPrice(productsPrice)}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="#043927" align="center">
            {productsName}
            <Typography variant="subtitle1" align="center" color="#878986" paragraph={true}>
              {description}
            </Typography>
            <Typography variant="body1" color="initial" align="center">
              {brand} Brand
              <Typography variant="body2">{size} Size</Typography>
            </Typography>
          </Typography>

          <Typography
            align="center"
            variant="body2"
            color={
              availability === 'Pre-order' ? '#E3B778' : availability === 'Out of stock' ? 'red' : '#0B6623'
            }
          >
            {availability}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isOutOfStock ? (
        <CardActions>
          <AddToCartButton
            onClickHandler={onClickHandler}
            isActive={isActive}
            className="cart-btn"
            disabled={true}
          />
        </CardActions>
      ) : (
        <Link to="/cart">
          <CardActions>
            <AddToCartButton onClickHandler={onClickHandler} isActive={isActive} className="cart-btn" />
          </CardActions>
        </Link>
      )}
    </Card>
  );
}

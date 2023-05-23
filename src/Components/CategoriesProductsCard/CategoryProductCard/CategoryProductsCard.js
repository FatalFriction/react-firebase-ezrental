/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { formatPrice } from '../../../utils/formatPrice';
import { addCart } from '../../../Redux/cart/cart_actions';

import AddToCartButton from '../../Buttons/AddToCartButton/AddToCartButton';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

import {
  cardStyles,
  footerStyles,
  imgContainerStyles,
  imgStyles,
  infoStyles,
  priceStyles,
  textStyles,
  titleStyles,
} from './CategoryProductsCard.styles';
import ModalCard from '../../ProductsCard/ProductsModalrss/ModalCard';
import { Box, Modal } from '@mui/material';
import { style } from '../../ProductsCard/ProductsCard.styles';

const CategoryProductsCard = ({ products }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let isMounted = true;

    if (isActive) {
      setTimeout(() => {
        if (isMounted) {
          setIsActive(false);
        }
      }, 1500);
    }

    return () => {
      isMounted = false;
    };
  }, [isActive]);

  const handleOpen = () => {
    setOpen(true);
  };

  const onClickHandler = () => {
    if (products.availability === 'Out of stock') {
      return; // exit the function without dispatching the action
    }
  
    setIsActive(true);
  
      // if product does not exist in cart, add it
      dispatch(addCart(products));
    
  };
  
  const { availability: productsavail, authenticity: productsauth, size: prodsize, price: productsPrice, img: productsImg, title: productsName, brand: productsBrand } = products;
  const isOutOfStock = productsavail === "Out of stock";

  return (
    <>
    <div css={cardStyles} className="mb-3">
      <div css={imgContainerStyles} onClick={handleOpen}>
        <LazyLoadImage
          src={productsImg}
          css={imgStyles}
          alt={productsName}
          effect="blur"
          className="lazy-load-image-background lazy-load-image-loaded"
        />
      </div>
      
      <div css={footerStyles}>
        <p css={titleStyles}>[{productsBrand}] {productsName.split(' ').slice(0, 4).join(' ')}</p>
        <p css={titleStyles}>
          {productsauth === 'on' ? <VerifiedUserIcon /> : <PrivacyTipIcon css={infoStyles} />} {productsauth === 'on' ? 'Original' : 'Fan-Art'} Authenticity 
        </p>
        <p css={priceStyles}>{formatPrice(productsPrice)}</p>
        <p css={[textStyles, productsavail === "Pre-order" ? { color: "orange" } : productsavail === "In stock" ? { color: "green" } : productsavail === "Out of stock" ? { color: "red" } : { color: "grey" }]}>
          {productsavail}
        </p>
        
        <p css={titleStyles}>{prodsize} Size</p>

        {/* Add To Card Button */}
        <AddToCartButton
          onClickHandler={onClickHandler}
          isActive={isActive}
          disabled={isOutOfStock}
        />

      </div>
    </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalCard products={products}/>
          </Box>
        </Modal>
    </>
  );
};

export default CategoryProductsCard;

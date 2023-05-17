/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import AddToCartButton from '../Buttons/AddToCartButton/AddToCartButton';

import { formatPrice } from '../../utils/formatPrice';

import { addCart } from '../../Redux/cart/cart_actions';

import {
  cardFooterStyles,
  cardStyles,
  fruitImageStyles,
  commonStyles,
  cardInfoStyles,
  style,
} from './ProductsCard.styles';
import { Box, Modal } from '@mui/material';
import ModalCard from './ProductsModalrss/ModalCard';

const ProductsCard = ({ products }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    img: productsImg,
    title: productsName,
    category: productsCategory,
    price: productsPrice,
    brand,
    size,
    availability,
    authenticity,
  } = products;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 1500);
    }
  }, [isActive]);

  const onClickHandler = () => {
    setIsActive(true);
    dispatch(addCart(products));
  };

  return (
    <>
      <div css={cardStyles}>
        {/* card image */}
          <LazyLoadImage
            css={fruitImageStyles}
            src={productsImg}
            alt={productsName}
            effect="blur"
            className="lazy-load-image-background lazy-load-image-loaded"
            onClick={handleOpen}
          />
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
        {/* card footer */}
        <div css={cardFooterStyles}>
          <div css={cardInfoStyles}>
            <span css={commonStyles}>{productsCategory}</span>
            <span css={commonStyles}>{productsName}</span>
            <span css={commonStyles}>{brand}</span>
            <span css={commonStyles}>{size}</span>
            <span css={commonStyles}>{availability}</span>
            <span css={commonStyles}>{authenticity}</span>
          </div>
          <span
            css={commonStyles}
            style={{
              marginTop: '1rem',
            }}
          >
            {formatPrice(productsPrice)}
          </span>
          {/* Add To Card Button */}
          <AddToCartButton
            onClickHandler={onClickHandler}
            isActive={isActive}
          />

        </div>
      </div>
    </>
  );
};

export default ProductsCard;

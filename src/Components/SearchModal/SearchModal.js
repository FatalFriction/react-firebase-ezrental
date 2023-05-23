/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/SearchProducts/products_actions';
import { Box, Card, Grid, Modal, Paper } from '@mui/material';
import { searchBoxStyle, searchInputStyle } from '../../Components/ProductsCard/ProductsCard.styles';
import ModalCard from '../../Components/ProductsCard/ProductsModalrss/ModalCard';
import { useEffect, useState } from 'react';
import { cardContainerStyles } from '../../Screens/FilterProductsScreen/FilterProductsScreen.styles';

const SearchModal = ({ open, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sproductsReducer);

  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearch = () => {
    dispatch(fetchProducts(searchQuery));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={searchBoxStyle}>
        <Paper
          sx={{
            p: 3,
            margin: 'auto',
            flexGrow: 1,
            backgroundColor: '#f5f0e9'
          }}
        >
          <Grid>
            <h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...searchInputStyle, textAlign: 'center', border: 'none' }}
                placeholder={'Search Your Costume on Ez Rental'}
              />
            </h2>
            {/* Render the product list only if 'products' is defined */}
            {products.products && Array.isArray(products.products) && (
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={3}
              >
                {products.products.map((product) => (
                  <Grid item xs={products.products.length === 1 ? 12 : 12} sm={products.products.length === 1 ? 12 : 9} md={products.products.length === 1 ? 12 : 6} lg={products.products.length === 1 ? 12 : 4} key={product.uid}>
                    <Card sx={cardContainerStyles}>
                      <ModalCard products={product} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SearchModal;

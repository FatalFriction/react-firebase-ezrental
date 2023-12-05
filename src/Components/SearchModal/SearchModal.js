import { useEffect, useState } from 'react';
import { Box, Card, Grid, IconButton, Modal, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/SearchProducts/products_actions';
import { searchBoxStyle, searchInputStyle } from '../../Components/ProductsCard/ProductsCard.styles';
import ModalCard from '../../Components/ProductsCard/ProductsModalrss/ModalCard';
import { cardContainerStyles } from '../../Screens/FilterProductsScreen/FilterProductsScreen.styles';

const SearchModal = ({ open, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sproductsReducer);

  useEffect(() => {
    if(!searchQuery || searchQuery.trim() === "") return

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
            backgroundColor: '#f5f0e9',
          }}
        >
          <Grid>
            <h2>
              <Grid container spacing={2}>
                <Grid item xs="auto">
                  <IconButton
                    color="info"
                    size="medium"
                    aria-label="onoff"
                    onClick={handleSearch}
                  >
                    {/* Add your search icon or button here */}
                  </IconButton>
                </Grid>
                <Grid item xs={11.5}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      ...searchInputStyle,
                      textAlign: 'center',
                      border: 'none',
                    }}
                    placeholder={'Search Your Costume on Ez Rental'}
                  />
                </Grid>
              </Grid>
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
                {products.products.slice(0,6).map((product) => (
                  <Grid
                    item
                    xs={products.products.length === 1 ? 12 : 12}
                    sm={products.products.length === 1 ? 12 : 9}
                    md={products.products.length === 1 ? 12 : 6}
                    lg={products.products.length === 1 ? 12 : 4}
                    key={product.uid}
                  >
                    <Card sx={cardContainerStyles}>
                      <ModalCard key={product.uid} products={product} />
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

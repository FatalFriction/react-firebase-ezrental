import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import CategoryProductsCard from '../../CategoriesProductsCard/CategoryProductCard/CategoryProductsCard';
import SkeletonProducts from '../../Skeletons/SkeletonProducts';
import AppCol from '../../Responsive/AppCol/AppCol';

import { fetchCategoriesProducts } from '../../../Redux/filterProducts/filterProducts_actions';

const FilterProducts = ({ selectproducts }) => {
  const {
    filterCategoriesproducts: { products },
    loading,
  } = useSelector((state) => state.filterproducts);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    dispatch(fetchCategoriesProducts(selectproducts)).then(() => {
      if (isMounted) {
        // Update state only if the component is still mounted
      }
    });
    return () => {
      isMounted = false;
    };
  }, [dispatch, selectproducts]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products && products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!loading ? (
        currentProducts &&
        currentProducts.map((product) => (
          <CategoryProductsCard key={product.uid} products={product} />
        ))
      ) : (
        [...Array(productsPerPage)].map((_, index) => (
          <AppCol key={index} cols="col-11 col-md-5 mx-auto mb-5">
            <SkeletonProducts />
          </AppCol>
        ))
      )}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default FilterProducts;

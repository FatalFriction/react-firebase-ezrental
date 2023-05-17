import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryProductsCard from '../../CategoriesProductsCard/CategoryProductCard/CategoryProductsCard'
import SkeletonProducts from '../../Skeletons/SkeletonProducts';

import { fetchCategoriesProducts } from '../../../Redux/filterProducts/filterProducts_actions';
import AppCol from '../../Responsive/AppCol/AppCol';

const FilterProducts = ({ selectproducts }) => {

  const {
    filterCategoriesproducts: { products },
    loading,
  } = useSelector((state) => state.filterproducts);
  const dispatch = useDispatch();

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


  return (
    <>
      {!loading
        ? products &&
          products.map((product) => (
            <CategoryProductsCard key={product.uid} products={product} />
          ))
        : [...Array(10)].map((_, index) => (
            <AppCol key={index} cols="col-11 col-md-5 mx-auto mb-5">
              <SkeletonProducts />
            </AppCol>
          ))}
    </>
  );
};

export default FilterProducts;

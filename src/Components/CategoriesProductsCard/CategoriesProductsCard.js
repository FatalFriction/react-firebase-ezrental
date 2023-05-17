import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchCategoriesProducts } from '../../Redux/categoriesProducts/categoriesProducts_actions';
import AppCol from '../Responsive/AppCol/AppCol';

import CategoryProductsCard from './CategoryProductCard/CategoryProductsCard';
import Skeletonproducts from '../Skeletons/SkeletonProducts';
import Title from '../Title/Title';

const CategoriesproductsCard = () => {
  const {
    categoriesproducts: { products },
    loading,
  } = useSelector((state) => state.categoriesproducts);

  const dispatch = useDispatch();
  const { productsCategory } = useParams();

  useEffect(() => {
    dispatch(fetchCategoriesProducts(productsCategory));
    console.log(productsCategory)
  }, [dispatch, productsCategory]);

  return (
    <>
      <section className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto">
              <Title title={`${productsCategory} products`} />
              <span>CATEGORIES PRODUCT CARD</span>
            </div>
          </div>
        </div>
      </section>

      {!loading
        ? products &&
          products.map((products) => (
            <AppCol
              key={products.idproducts}
              cols="col-11 col-md-6 col-lg-4 col-xl-3 mx-auto"
            >
              <CategoryProductsCard products={products} />
            </AppCol>
          ))
        : [...Array(20)].map((_, index) => (
            <AppCol
              key={index}
              cols="col-11 col-md-6 col-lg-4 col-xl-3 mx-auto mb-5"
            >
              <Skeletonproducts />
            </AppCol>
          ))}
    </>
  );
};

export default CategoriesproductsCard;

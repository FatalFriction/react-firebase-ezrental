import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductsCard from '../ProductsCard/ProductsCard';
import AppCol from '../Responsive/AppCol/AppCol';

import { fetchProducts } from '../../Redux/products/products_actions';

const Products = ({ slicer }) => {
  const { products, loading } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const first = ~~(Math.random() * (products.lenght - slicer) +1)
  const last = first + slicer

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {!loading &&
        products &&
        products
          .filter((product) => product.availability !== "Out of stock") // filter out products with availability "Out of stock"
          .slice(first, last)
          .map((product) => (
            <AppCol
              key={product.uid}
              cols="col-10 col-md-6 col-lg-4 col-xl-3 mx-auto mb-3"
            >
              <ProductsCard products={product} />
            </AppCol>
          ))}
    </>
  );
};

export default Products;

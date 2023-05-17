import { useState, useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import FilterItems from '../../Components/Filters/FilterItems/FilterItems';
import FilterProducts from '../../Components/Filters/FilterProducts/FilterProducts';
import bannerImg from '../../Assets/images/banners/banner5.jpg';
import { categories } from '../../utils/categories';

const FilterProductsScreen = () => {
  const [selectproducts, setSelectproducts] = useState(categories[0].categoryTitle);

  const handleChange = (inputText) => {
    setSelectproducts(inputText);
  };

  useEffect(() => {
    return () => {
      // Cleanup function
      setSelectproducts(categories[0].categoryTitle);
    };
  }, []);



  return (
    <>
      <Banner bannerImg={bannerImg} bannerHeight="35vh" overlay />

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <FilterItems handleChange={handleChange} />
            </div>
            <div className="col-md-9">
              <div>
                <div>
                  <div className="row">
                    <FilterProducts selectproducts={selectproducts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterProductsScreen;

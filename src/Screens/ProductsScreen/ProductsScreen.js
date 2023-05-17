import Banner from '../../Components/Banner/Banner';
import CategoriesproductsCard from '../../Components/CategoriesProductsCard/CategoriesProductsCard';
import SectionContainer from '../../Components/Responsive/SectionContainer/SectionContainer';

import bannerImg from '../../Assets/images/banners/banner1.jpg';

const productsScreen = () => {
  return (
    <>
      <Banner bannerImg={bannerImg} bannerHeight="40vh" />
      <SectionContainer padding="py-5">
        <CategoriesproductsCard />
      </SectionContainer>
    </>
  );
};

export default productsScreen;

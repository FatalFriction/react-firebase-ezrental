/** @jsxImportSource @emotion/react */

import BannerSlider from '../../Components/BannerSlider/BannerSlider';
import SectionContainer from '../../Components/Responsive/SectionContainer/SectionContainer';
import AppCol from '../../Components/Responsive/AppCol/AppCol';
import Title from '../../Components/Title/Title';
import ServicesCard from '../../Components/ServicesCard/ServicesCard';
import Brand from '../../Components/Brand/Brand';
import Box from '../../Components/Box/Box';
import Products from '../../Components/Products/Products';
import Modal from '../../Components/Modal/Modal';

import Categories from '../../Components/CategoryCart/Categories';

import { containerStyles } from './HomeScreen.styles';


const HomeScreen = () => {

  return (
    <>
      {/* [[[[[[[[ •• Banner Section •• ]]]]]]]] */}
      <BannerSlider />
      {/* [[[[[[[[ •• End Banner Section •• ]]]]]]]] */}

      {/* [[[[[[[[ •• Categories Card Section •• ]]]]]]]] */}
      {/* Title Component */}
      <SectionContainer padding="py-5">
        <AppCol cols="col-10 mx-auto">
          <Title title="Explore Our Products" subtitle="shop now" />
        </AppCol>
      </SectionContainer>
      {/* Category Card Component */}
      <SectionContainer padding="pb-3">
        <Categories />
      </SectionContainer>

      {/* [[[[[[[[ •• End Categories Card Section •• ]]]]]]]] */}

      {/* [[[[[[[[ •• products Section •• ]]]]]]]] */}
      {/* Title Component */}
      <SectionContainer padding="pt-5">
        <AppCol cols="col-10 mx-auto">
          <Title title="FEATURED PRODUCTS" subtitle="our products" />
        </AppCol>
      </SectionContainer>

      <SectionContainer padding="py-5">
        <Products slicer={8} />
      </SectionContainer>
      {/* [[[[[[[[ •• End products Section •• ]]]]]]]] */}

      {/* [[[[[[[[ •• Service Card Section •• ]]]]]]]] */}
      {/* Title Component */}
      <SectionContainer className="section-bg" padding="pt-5">
        <AppCol cols="col-10 mx-auto">
          <Title title="services we offer" subtitle="what we do" />
        </AppCol>
      </SectionContainer>

      {/* Services Card Component */}
      <SectionContainer className="section-bg" padding="py-5">
        <ServicesCard />
      </SectionContainer>
      {/* [[[[[[[[ •• End Service Card Section •• ]]]]]]]] */}

      {/* [[[[[[[[ •• Brand Section •• ]]]]]]]] */}
      {/* Title */}
      <SectionContainer padding="pt-5" className="section-bg">
        <AppCol cols="col-10 mx-auto">
          <Title title="Partners Who Trust Us" subtitle="Our Partners" />
        </AppCol>
      </SectionContainer>

      {/* Brand Component */}
      <Brand />

      {/* Box Component */}
      <SectionContainer padding="py-5" className="section-bg">
        <AppCol cols="col-11 col-md-6 mx-auto mb-3">
          <Box text="We Rent Best Costume Products" />
        </AppCol>
        <AppCol cols="col-11 col-md-6 mx-auto ">
          <Box text="We’ve 40 years experience in field" />
        </AppCol>
      </SectionContainer>

      <SectionContainer
        css={containerStyles}
        className="overflowHidden section-bg"
        padding="pb-5"
      >
        <AppCol cols="col-11 col-lg-7 col-xl-6 mx-auto">
          <Title title="Click on any picture below" className="mb-3" />
          <Modal />
        </AppCol>
      </SectionContainer>
      {/* [[[[[[[[ •• End Brand Section •• ]]]]]]]] */}
    </>
  );
};

export default HomeScreen;

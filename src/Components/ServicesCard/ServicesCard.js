/** @jsxImportSource @emotion/react */

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { servicesData } from '../../utils/servicesData';
import AppCol from '../Responsive/AppCol/AppCol';
import {
  cardHeaderStyles,
  cardStyles,
  imgContainerStyles,
  imgStyles,
  textStyles,
  titleStyles,
} from './ServicesCard.styls';

const ServicesCard = () => {
  return (
    <>
      {servicesData.map(({ id, title, text, serviceImg }) => (
        <AppCol key={id} cols="col-11 col-md-6 col-lg-4 col-xl-3 mx-auto mb-4">
          <div css={cardStyles}>
            <div css={cardHeaderStyles}>
              <h3 css={titleStyles}>{title}</h3>
              <p css={textStyles}>{text}</p>
            </div>
            <div css={imgContainerStyles}>
              <LazyLoadImage
                 css={[imgStyles, { height: '400px' }]} // Add height property to imgStyles object
                src={serviceImg}
                alt={title}
                effect="blur"
                className="lazy-load-image-background lazy-load-image-loaded"
              />
            </div>
          </div>
        </AppCol>
      ))}
    </>
  );
};

export default ServicesCard;

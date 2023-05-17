/** @jsxImportSource @emotion/react */

import AppCol from '../../Responsive/AppCol/AppCol';
import { Player } from '@lottiefiles/react-lottie-player';
import { offersInfo } from '../../../utils/offersInfo';

import {
  cardStyles,
  imgStyles,
  textStyles,
  titleStyles,
} from './OffersCard.styles';

const OffersCard = () => {
  return (
    <>
      {offersInfo.map(({ id, title, text, imageUrl }) => (
        <AppCol key={id} cols="col-11 col-md-6 col-lg-3 mx-auto mb-5">
          <div css={cardStyles}>
            <Player autoplay loop src={imageUrl} alt="animation" css={imgStyles} />
            <h4 css={titleStyles}>{title}</h4>
            <p css={textStyles}>{text}</p>
          </div>
        </AppCol>
      ))}
    </>
  );
};

export default OffersCard;

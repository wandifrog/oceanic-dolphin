import { images } from 'constants/Images.constant';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * Pokemon bouncing ball component.
 * @example
 * <PPokeBall />
 */
const PPokeBall = (): JSX.Element => {

  return (
    <PokeBallContainer>
      <PokeBallImage src={images.pokeBall} />
    </PokeBallContainer>
  );
};

const bounce = keyframes`
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0); }
  30%  { transform: scale(.9,1.1)   translateY(-70px); }
  50%  { transform: scale(1.05,.95) translateY(0); }
  57%  { transform: scale(1,1)      translateY(-7px); }
  64%  { transform: scale(1,1)      translateY(0); }
  100% { transform: scale(1,1)      translateY(0); }
`;
const PokeBallContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
  width: 100%;
`;
const PokeBallImage = styled.img`
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${bounce};
  animation-timing-function: ease;
  height: 120px;
  width: 120px;
`;

export default PPokeBall;

import { fontSize } from 'constants/Fonts.constant';
import { padding } from 'constants/Metrics.constant';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import useApp from 'hooks/App.hook';
import useFishCatalogue from 'hooks/FishCatalogue.hook';
import useTheme from 'hooks/Theme.hook';
import useTranslation from 'hooks/Translation.hook';
import HStack from 'components/HStack';
import PPokeBall from 'components/PPokeBall';
import Text from 'components/Text';
import VStack from 'components/VStack';

function FishCatalogue() {
  const [state, dispatch] = useApp();
  const { fishData, isLoading, isError } = useFishCatalogue();
  const { t } = useTranslation();
  const colors = useTheme();

  useEffect(() => {
    if (fishData) {
      dispatch({ type: 'UPDATE_FISH_LIST', data: fishData });
    }
  }, [fishData]);

  if (isLoading) return (
    <VStack align="center">
      <PPokeBall />
      <Text top={'10px'}>{t.global.loading}</Text>
    </VStack>
  );

  if (isError) return <Text>{t.global.errorSystem}</Text>;

  return state.fishList.length !== 0 ? (
    <CardContainer>
      {
        state.fishList.map((fish: Fish) => (
          <FishCard
            key={fish.uuid}
            style={{
              backgroundColor: colors.backgroundSecondary
            }}
          >
            <Text bottom={'4px'} size={fontSize.small}>
              {fish.komoditas} ({fish.area_kota}, {fish.area_provinsi})
            </Text>
            <HStack>
              <Text>{t.fishCatalogueTranslation.size}:</Text>
              <Text left={'4px'} bold>{fish.size}</Text>
            </HStack>
            <HStack>
              <Text>{t.fishCatalogueTranslation.price}:</Text>
              <Text left={'4px'} bold>Rp.{fish.price}</Text>
            </HStack>
          </FishCard>
        ))
      }
    </CardContainer>
  ) : (
    <Text top={'50px'} size={fontSize.large} bold center>
      {t.fishCatalogueTranslation.noFish}
    </Text>
  );
}

const CardContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto;
  justify-items: center;
  overflow: scroll;
  padding-bottom: 10px;
  padding: ${padding.content};
  width: 100%;
`;

const FishCard = styled.div`
  padding: ${padding.content};
  width: 100%;
`;

export default FishCatalogue;

import { fontFamily, fontSize } from 'constants/Fonts.constant';
import { stein } from 'constants/Stein.constant';
import { getSessionStorage } from 'functions/Utils.function';
import { useEffect, useState } from 'react';
import useApp from 'hooks/App.hook';
import useFetch from 'hooks/Fetch.hook';
import useTheme from 'hooks/Theme.hook';
import useTranslation from 'hooks/Translation.hook';
import HStack from 'components/HStack';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';
import Text from 'components/Text';

const FishFilterModal = ({
  visible,
  onCancel
}: {
  visible: boolean
  onCancel: () => void
}): JSX.Element => {
  const { data: getAreaData } = useFetch(stein.getArea);
  const { data: getFishSizeData } = useFetch(stein.getFishSize);
  const [_, dispatch] = useApp();
  const { t } = useTranslation();
  const colors = useTheme();

  const [fishArea, setFishArea] = useState<GetArea[]>([]);
  const [fishSize, setFishSize] = useState<GetFishSize[]>([]);
  const [fishFilter, setFishFilter] = useState({
    commodity: '',
    area: '',
    size: 0,
    minPrice: 0,
    maxPrice: 40000,
  });

  useEffect(() => {
    if (getAreaData !== null) setFishArea(getAreaData);
  }, [getAreaData]);

  useEffect(() => {
    if (getFishSizeData !== null) setFishSize(getFishSizeData);
  }, [getFishSizeData]);

  function _handleSubmit() {
    function filteredFish(fishArray: Fish[], fishData: {
      commodity: string;
      area: string;
      size: number;
      minPrice: number;
      maxPrice: number;
    }) {
      return fishArray.filter((fish: Fish) => {
        const commodityLowerCase = fishData.commodity?.toLowerCase();
        const komoditasLowerCase = fish.komoditas?.toLowerCase();
        if (commodityLowerCase && komoditasLowerCase !== commodityLowerCase) return false;
        if (fishData.area && fish.area_provinsi !== fishData.area) return false;
        if (+fishData.size && +fish.size !== +fishData.size) return false;
        if (fishData.minPrice && fish.price < fishData.minPrice) return false;
        if (fishData.maxPrice && fish.price > fishData.maxPrice) return false;
        return true;
      });
    }

    const fishList = getSessionStorage('fishList');
    const cloneFishList = structuredClone(fishList);
    const result = filteredFish(cloneFishList, fishFilter);
    dispatch({ type: 'UPDATE_FISH_LIST', data: result });
    onCancel();
  }

  return (
    <Modal visible={visible}>
      <Text bottom={'18px'} size={fontSize.large} bold>{t.fishCatalogueTranslation.filterTitle}</Text>
      <Input
        placeholder={t.fishCatalogueTranslation.commodity}
        color={colors.text}
        value={fishFilter.commodity}
        onChange={(e) => setFishFilter({
          ...fishFilter,
          commodity: e.target.value
        })}
      />
      <Select
        color={colors.text}
        value={fishFilter.size}
        onChange={(e) => setFishFilter({
          ...fishFilter,
          size: +e.target.value
        })}
      >
        <option value="">{t.fishCatalogueTranslation.size}</option>
        {
          fishSize.map((fish, index) => (
            <option key={index} color={colors.text} value={fish.size}>{fish.size}</option>
          ))
        }
      </Select>
      <Select
        color={colors.text}
        value={fishFilter.area}
        onChange={(e) => setFishFilter({
          ...fishFilter,
          area: e.target.value
        })}
      >
        <option value="">{t.fishCatalogueTranslation.area}</option>
        {
          fishArea.map((area, index) => (
            <option key={index} color={colors.text} value={area.city}>{area.city}</option>
          ))
        }
      </Select>
      <Text>{t.fishCatalogueTranslation.priceRange}</Text>
      <HStack align="center">
        <Input
          color={colors.text}
          value={fishFilter.minPrice}
          type="number"
          onChange={(e) => setFishFilter({
            ...fishFilter,
            minPrice: +e.target.value
          })}
        />
        <Text right={'5px'} left={'5px'}>-</Text>
        <Input
          color={colors.text}
          value={fishFilter.maxPrice}
          type="number"
          onChange={(e) => setFishFilter({
            ...fishFilter,
            maxPrice: +e.target.value
          })}
        />
      </HStack>
      <HStack top={'14px'} padding={'0 10px'} justify="space-between">
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => onCancel()}>{t.global.back}</Text>
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => _handleSubmit()}>{t.fishCatalogueTranslation.filterButton}</Text>
      </HStack>
    </Modal>
  );
};

export default FishFilterModal;

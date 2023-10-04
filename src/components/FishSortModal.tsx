import { fontFamily, fontSize } from 'constants/Fonts.constant';
import { useState } from 'react';
import useApp from 'hooks/App.hook';
import useTheme from 'hooks/Theme.hook';
import useTranslation from 'hooks/Translation.hook';
import HStack from 'components/HStack';
import Modal from 'components/Modal';
import Select from 'components/Select';
import Text from 'components/Text';

const FishSortModal = ({
  visible,
  onCancel
}: {
  visible: boolean
  onCancel: () => void
}): JSX.Element => {
  const [state, dispatch] = useApp();
  const { t } = useTranslation();
  const colors = useTheme();
  const [sortBy, setSortBy] = useState('');

  function _handleSubmit() {
    const fishList = state.fishList;
    const cloneFishList = structuredClone(fishList);

    let result;
    switch (sortBy) {
      case 'nameAscending':
        result = cloneFishList.sort((a: Fish, b: Fish) => a.komoditas?.localeCompare(b.komoditas));
        break;
      case 'nameDescending':
        result = cloneFishList.sort((a: Fish, b: Fish) => b.komoditas?.localeCompare(a.komoditas));
        break;
      case 'smallSize':
        result = cloneFishList.sort((a: Fish, b: Fish) => +a.size - +b.size);
        break;
      case 'largeSize':
        result = cloneFishList.sort((a: Fish, b: Fish) => +b.size - +a.size);
        break;
      case 'minPrice':
        result = cloneFishList.sort((a: Fish, b: Fish) => +a.price - +b.price);
        break;
      case 'maxPrice':
        result = cloneFishList.sort((a: Fish, b: Fish) => +b.price - +a.price);
        break;
      default:
        alert('Pilih pengurutan');
        return;
    }

    dispatch({ type: 'UPDATE_FISH_LIST', data: result });
    onCancel();
  }

  return (
    <Modal visible={visible}>
      <Text bottom={'18px'} size={fontSize.large} bold>{t.fishCatalogueTranslation.sortTitle}</Text>
      <Select
        color={colors.text}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">{t.fishCatalogueTranslation.sortBy}</option>
        <option value="nameAscending">{t.fishCatalogueTranslation.nameAscending}</option>
        <option value="nameDescending">{t.fishCatalogueTranslation.nameDescending}</option>
        <option value="smallSize">{t.fishCatalogueTranslation.smallSize}</option>
        <option value="largeSize">{t.fishCatalogueTranslation.largeSize}</option>
        <option value="minPrice">{t.fishCatalogueTranslation.minPrice}</option>
        <option value="maxPrice">{t.fishCatalogueTranslation.maxPrice}</option>
      </Select>
      <HStack top={'20px'} padding={'0 10px'} justify="space-between">
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => onCancel()}>{t.global.back}</Text>
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => _handleSubmit()}>{t.fishCatalogueTranslation.sortButton}</Text>
      </HStack>
    </Modal>
  );
};

export default FishSortModal;

import { fontFamily, fontSize } from 'constants/Fonts.constant';
import { useState } from 'react';
import { getSessionStorage } from 'functions/Utils.function';
import useApp from 'hooks/App.hook';
import useTheme from 'hooks/Theme.hook';
import useTranslation from 'hooks/Translation.hook';
import HStack from 'components/HStack';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Text from 'components/Text';

const FishFinderModal = ({
  visible,
  onCancel
}: {
  visible: boolean
  onCancel: () => void
}): JSX.Element => {
  const [_, dispatch] = useApp();
  const { t } = useTranslation();
  const colors = useTheme();
  const [fishName, setFishName] = useState('');

  function _onKeyEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') _handleSubmit();
  }

  function _handleSubmit() {
    const fishList = getSessionStorage('fishList');
    const cloneFishList = structuredClone(fishList);

    if (fishName === '') {
      dispatch({ type: 'UPDATE_FISH_LIST', data: cloneFishList });
    } else {
      const result = cloneFishList.filter((fish: Fish) => fish.komoditas?.toLowerCase() === fishName.toLowerCase());
      dispatch({ type: 'UPDATE_FISH_LIST', data: result });
    }
    onCancel();
  }

  return (
    <Modal visible={visible}>
      <Text bottom={'18px'} size={fontSize.large} bold>{t.fishCatalogueTranslation.searchTitle}</Text>
      <Input
        placeholder={t.fishCatalogueTranslation.searchPlaceholder}
        color={colors.text}
        value={fishName}
        autoFocus
        onChange={(e) => setFishName(e.target.value)}
        onKeyUp={(e) => _onKeyEnter(e)}
      />
      <HStack top={'20px'} padding={'0 10px'} justify="space-between">
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => onCancel()}>{t.global.back}</Text>
        <Text font={fontFamily.pokemonSolid} center
          onClick={() => _handleSubmit()}>{t.fishCatalogueTranslation.search}</Text>
      </HStack>
    </Modal>
  );
};

export default FishFinderModal;

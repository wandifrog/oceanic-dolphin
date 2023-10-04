import { fontSize } from 'constants/Fonts.constant';
import { padding } from 'constants/Metrics.constant';
import { useState } from 'react';
import useTranslation from 'hooks/Translation.hook';
import FishCatalogue from 'components/FishCatalogue';
import FishFilterModal from 'components/FishFilterModal';
import FishFinderModal from 'components/FishFinderModal';
import FishSortModal from 'components/FishSortModal';
import HStack from 'components/HStack';
import Text from 'components/Text';
import VStack from 'components/VStack';

type ShowModalType = null | 'finder' | 'sort' | 'filter'

const FishCataloguePage = (): JSX.Element => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<ShowModalType>(null);

  return (
    <VStack height={'calc(100% - 140px'}>
      <HStack padding={padding.content} justify="space-between" align="center">
        <Text size={fontSize.large}>{t.fishCatalogueTranslation.title}</Text>
        <HStack>
          <Text size={fontSize.small} onClick={() => setShowModal('finder')}>{t.fishCatalogueTranslation.search}&nbsp;</Text>
          <Text size={fontSize.small} onClick={() => setShowModal('sort')}>. {t.fishCatalogueTranslation.sort}&nbsp;</Text>
          <Text size={fontSize.small} onClick={() => setShowModal('filter')}>. {t.fishCatalogueTranslation.filter}</Text>
        </HStack>
      </HStack>
      <FishFinderModal
        visible={showModal === 'finder'}
        onCancel={() => setShowModal(null)}
      />
      <FishSortModal
        visible={showModal === 'sort'}
        onCancel={() => setShowModal(null)}
      />
      <FishFilterModal
        visible={showModal === 'filter'}
        onCancel={() => setShowModal(null)}
      />
      <FishCatalogue />
    </VStack>
  );
};

export default FishCataloguePage;

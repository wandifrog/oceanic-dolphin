import useApp from 'hooks/App.hook';
import globalTranslation from 'translations/Global.translation';
import homeTranslation from 'translations/Home.translation';
import fishCatalogueTranslation from 'translations/FishCatalogue.translation';
import addFishTranslation from 'translations/AddFish.translation';

function useTranslation() {
  const [state] = useApp();
  const { language } = state;

  const t = {
    global: globalTranslation[language],
    home: homeTranslation[language],
    fishCatalogueTranslation: fishCatalogueTranslation[language],
    addFish: addFishTranslation[language],
  };

  return { t, language };
}

export default useTranslation;

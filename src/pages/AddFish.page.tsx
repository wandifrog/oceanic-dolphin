import { fontFamily, fontSize } from 'constants/Fonts.constant';
import { padding } from 'constants/Metrics.constant';
import { stein } from 'constants/Stein.constant';
import { useEffect, useState } from 'react';
import { uuid } from 'functions/Utils.function';
import useFetch from 'hooks/Fetch.hook';
import useTheme from 'hooks/Theme.hook';
import useTranslation from 'hooks/Translation.hook';
import Input from 'components/Input';
import Select from 'components/Select';
import Text from 'components/Text';
import VStack from 'components/VStack';
import formValidation from 'functions/FormValidation.function';
import PPokeBall from 'components/PPokeBall';

const AddFishPage = (): JSX.Element => {
  const { data: getAreaData } = useFetch(stein.getArea);
  const { data: getFishSizeData } = useFetch(stein.getFishSize);
  const { t } = useTranslation();
  const colors = useTheme();

  const [fishArea, setFishArea] = useState<GetArea[]>([]);
  const [fishSize, setFishSize] = useState<GetFishSize[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [fishData, setFishData] = useState({
    komoditas: '',
    area_provinsi: '',
    area_kota: '',
    size: 0,
    price: 0,
  });

  useEffect(() => {
    if (getAreaData !== null) setFishArea(getAreaData);
  }, [getAreaData]);

  useEffect(() => {
    if (getFishSizeData !== null) setFishSize(getFishSizeData);
  }, [getFishSizeData]);

  function _handleSubmit() {
    const validationRules = {
      komoditas: {
        required: true,
        minLength: 4,
        maxLength: 20,
      },
      area_kota: {
        required: true,
      },
      size: {
        required: true,
        min: 10,
        max: 100000,
      },
      price: {
        required: true,
        min: 1000,
        max: 1000000,
      },
    };

    const validationResult = formValidation(fishData, validationRules);

    if (validationResult.isValid) {
      console.log('Validation passed');
      setLoading(true);
      sendFishData();
    } else {
      const keys = Object.keys(validationResult.errors);
      const values = Object.values(validationResult.errors);
      const firstKey = keys[0];
      const firstValue = values[0];
      const returnValue = `${firstKey}: ${firstValue}`;
      alert(returnValue);
    }
  }

  function sendFishData() {
    const url = stein.getFish;

    const payload = {
      ...fishData,
      tgl_parsed: new Date().toISOString(),
      timestamp: new Date().valueOf(),
      uuid: uuid(),
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([payload]),
    };

    fetch(url, fetchOptions)
      .finally(() => {
        setLoading(false);
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.updatedRange) {
          alert('Berhasil menambahkan data');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(t.global.errorSystem);
      });
  }

  if (isLoading) return (
    <VStack align="center">
      <PPokeBall />
      <Text top={'10px'}>{t.global.loading}</Text>
    </VStack>
  );

  return (
    <VStack padding={padding.content}>
      <Text bottom={'18px'} size={fontSize.large} bold>{t.addFish.pageTitle}</Text>
      <Text>{t.addFish.fishName}</Text>
      <Input
        placeholder={t.fishCatalogueTranslation.commodity}
        color={colors.text}
        value={fishData.komoditas}
        onChange={(e) => setFishData({
          ...fishData,
          komoditas: e.target.value
        })}
      />
      <Text>{t.addFish.size}</Text>
      <Select
        color={colors.text}
        value={fishData.size}
        onChange={(e) => setFishData({
          ...fishData,
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
      <Text>{t.addFish.area}</Text>
      <Select
        color={colors.text}
        value={fishData.area_kota}
        onChange={(e) => setFishData({
          ...fishData,
          area_kota: e.target.value
        })}
      >
        <option value="">{t.fishCatalogueTranslation.area}</option>
        {
          fishArea.map((area, index) => (
            <option key={index} color={colors.text} value={area.city}>{area.city}</option>
          ))
        }
      </Select>
      <Text>{t.addFish.price}</Text>
      <Input
        color={colors.text}
        value={fishData.price}
        type="number"
        min={1000}
        onChange={(e) => setFishData({
          ...fishData,
          price: +e.target.value
        })}
      />
      <Text
        top={'20px'}
        font={fontFamily.pokemonSolid}
        size={fontSize.large}
        onClick={() => _handleSubmit()}
        center
      >
        {t.addFish.buttonLabel}
      </Text>
    </VStack>
  );
};

export default AddFishPage;

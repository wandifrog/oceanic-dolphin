import { stein } from 'constants/Stein.constant';
import { fetcher, setSessionStorage } from 'functions/Utils.function';
import useSWR from 'swr';

const useFishCatalogue = () => {
  const { data, error, isLoading } = useSWR(stein.getFish, fetcher);
  // const fishList = getSessionStorage('fishList');
  // const shouldFetch = !!fishList;
  // const { data, error, isLoading } = useSWR(shouldFetch ? stein.getFish : null, fetcher);

  setSessionStorage('fishList', data);

  return {
    fishData: data,
    isLoading,
    isError: error
  };
};

export default useFishCatalogue;

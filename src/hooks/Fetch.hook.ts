import { useEffect, useState } from 'react';

type FetchOptionType = {
  method?: 'GET' | 'POST' | 'UPDATE' | 'DELETE'
  payload?: any
  cancelRequest?: boolean
  throttling?: number
}

function useFetch(url: string, fetchOptions: FetchOptionType = { // broken fetcher (cancel request issue, and some annoying developer experience)
  method: 'GET',
  payload: undefined,
  cancelRequest: false,
  throttling: 0
}) {
  const { payload, method, cancelRequest, throttling } = fetchOptions;
  const [data, setData] = useState<null | any>(null);
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  if (cancelRequest) return { data, loading: false, error };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: payload ? JSON.stringify(payload) : undefined
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const json: any = await response.json();

        setTimeout(() => {
          setData(json);
          setLoading(false);
        }, throttling);

      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;

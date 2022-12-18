import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetch = <T extends string, R = any>(url: T) => {
  const [response, setResponse] = useState<R | null>(null);

  useEffect(() => {
    if (!response) fetch(url);
  }, [url]);

  const fetch = useCallback(async (url: T) => {
    try {
      const { data } = await axios.get(url);
      return setResponse(data);
    } catch (e) {}
  }, []);

  return [response];
};
export default useFetch;

import React, { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    let options;

    //LEC GET requests cannot have a body!
    if (!requestConfig.method) {
      options = {};
    } else {
      options = {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
      };
    }

    try {
      const response = await fetch(requestConfig.url, options);
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      console.log(data);
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

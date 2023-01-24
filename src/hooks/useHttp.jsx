import React, { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    let options;

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
      //   const response = await fetch(requestConfig.url, {
      //     method: requestConfig.method ? requestConfig.method : 'GET',
      //     headers: requestConfig.headers ? requestConfig.headers : {},
      //     body: request.body ? JSON.stringify(requestConfig.body) : null,
      //   });
      const response = await fetch(requestConfig.url, options);
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
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

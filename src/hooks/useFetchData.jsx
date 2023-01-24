import React, { useState } from 'react';

const useFetchData = async (url, method, text) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  try {
    setIsLoading(true);
    setError(null);

    let options = '';
    if (method === 'POST') {
      options = {
        method: 'POST',
        body: JSON.stringify({ task: text }),
        headers: {
          'Content-type': 'application/json',
        },
      };
    }

    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`Request failed! (${res.status})`);

    const data = await res.json();

    return {
      data: data,
      loading: isLoading,
      error: error,
    };
  } catch (err) {
    console.error(err.message);
    setError(error.message);
    return {
      loading: isLoading,
      error: error,
    };
  }
};

export default useFetchData;

import React, { useEffect, useState } from 'react';

// Define an interface for the API response
interface LeetCodeApiResponse {
  totalSolved?: number;
  error?: string;
}

// Type guard for checking if an object is an Error
function isError(err: unknown): err is Error {
  return err instanceof Error;
}

const LeetCodeCard = () => {
  const [totalSolved, setTotalSolved] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update state based on API response
  function hasTotalSolved(obj: unknown): obj is LeetCodeApiResponse {
    return (obj as LeetCodeApiResponse)?.totalSolved !== undefined
        && typeof (obj as LeetCodeApiResponse).totalSolved === "number";
  }

  function hasError(obj: unknown): obj is LeetCodeApiResponse {
    return (obj as LeetCodeApiResponse)?.error !== undefined
        && typeof (obj as LeetCodeApiResponse).error === "string";
  }

  const updateStateFromResponse = (data: LeetCodeApiResponse | unknown) => {
    const totalSolvedExists = hasTotalSolved(data);
    const isError = hasError(data);
    if(totalSolvedExists){
        setTotalSolved(data.totalSolved ?? null);
        setError(data.error ?? null);
    } 
  };

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/LeetCode');
        if (!response.ok) {
          throw new Error('Network response was not ok'+{response}+'testing');
        }
        const data = await response.json();
        updateStateFromResponse(data);
      } catch (err) {
        if (isError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Total Problems Solved on LeetCode: {totalSolved}</p>
      )}
    </div>
  );
};

export default LeetCodeCard;

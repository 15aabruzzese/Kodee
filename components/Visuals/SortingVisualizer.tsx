import React, {useEffect, useState} from 'react';

interface BarStyle {
  height: string;
  backgroundColor: string;
}

interface SortingVisualizerProps {
  numBars: number;
  sortFunctionRef: React.Ref<() => void>;
}

const generateRandomArray = (numElements: number): number[] => {
  const maxBarHeight = 50;
  return Array.from({ length: numElements }, () => Math.floor(Math.random() * maxBarHeight) + 1);
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SortingVisualizer: React.FC<{ numBars: number }> = ({ numBars }) => {
  const [array, setArray] = useState<number[]>([]);
  const [barStyles, setBarStyles] = useState<BarStyle[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  

  useEffect(() => {

    resetArray();
  }, [numBars]);

  const resetArray = () => {
    const newArray = generateRandomArray(numBars);
    setArray(newArray);
    setBarStyles(newArray.map(height => ({ height: `${height}%`, backgroundColor: '#333' })));
  };

  const merge = async (arr: number[], low: number, mid: number, high: number) => {
    // Create copies of subarrays
    const n1 = mid - low + 1;
    const n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
      left[i] = arr[low + i];
    }
    for (let j = 0; j < n2; j++) {
      right[j] = arr[mid + 1 + j];
    }

    // Merge the temp arrays
    let i = 0,
      j = 0,
      k = low;

    while (i < n1 && j < n2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      await setBarStylesWithDelay(arr, k);
      k++;
    }

    // Copy the remaining elements of left[], if there are any
    while (i < n1) {
      arr[k] = left[i];
      await setBarStylesWithDelay(arr, k);
      i++;
      k++;
    }

    // Copy the remaining elements of right[], if there are any
    while (j < n2) {
      arr[k] = right[j];
      await setBarStylesWithDelay(arr, k);
      j++;
      k++;
    }
  };

  const mergeSort = async (arr: number[], l: number, r: number) => {
    if (l >= r) {
      return; // returns recursively
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const mergeSortHelper = async () => {
    if(!isSorting){
      setIsSorting(true); // Set sorting to true at the beginning
    let arr = [...array];
    await mergeSort(arr, 0, arr.length - 1);
    setIsSorting(false); // Set sorting to false when finished
    resetArrayAfterDelay(); // Reset the array after the sorting is complete
    }
  };

  const resetArrayAfterDelay = async () => {
    await sleep(500); // Wait for 500ms or however long you want before resetting
    resetArray();
    mergeSortHelper();
  };

  const setBarStylesWithDelay = async (arr: number[], k: number) => {
    setArray([...arr]);
    setBarStyles(arr.map((height, index) => ({
      height: `${height}%`,
      backgroundColor: index === k ? '#93c5fd' : '#333',
    })));
    await sleep(80);
  };

  
  return (
    <div>
      <div id="animation-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '150px', overflow: 'hidden' }}>
        {barStyles.map((style, idx) => (
          <div
            key={idx}
            style={{
              height: style.height,
              width: `calc(100% / ${numBars})`, // Dynamic width based on the number of bars
              backgroundColor: style.backgroundColor,
              marginRight: '2px',
              display: 'flex',
              flexDirection: 'column-reverse' // Keeps the bars' bottoms aligned if using borders or similar styling
            }}
          />
        ))}
      </div>
      {/* Disable button during sorting */}
      {/* <button onClick={mergeSortHelper} disabled={isSorting}>Start Merge Sort</button>
      
      <button onClick={resetArray}>Reset Array</button> */}
    </div>
  );
};

export default SortingVisualizer;
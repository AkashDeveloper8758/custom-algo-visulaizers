import { Button } from "@mui/material";
import { useState } from "react";
import { BlockItem } from "../components/block";

export default function Balancer() {
  const [numbersList, setNumbersList] = useState([]);
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [closestSum, setClosestSum] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getSplittedArray = (items) => {
    let totalSum = items.reduce((prev, curr) => prev + curr, 0);
    let halfSum = Math.floor(totalSum / 2);

    let closestSum = Infinity;
    let firstSubset = [];

    const getSubset = (i, subset) => {
      if (i == items.length) {
        let currSum = subset.reduce((prev, curr) => prev + curr, 0);
        if (Math.abs(currSum - halfSum) < Math.abs(closestSum - halfSum)) {
          closestSum = currSum;
          firstSubset = [...subset];
        }
        return;
      }
      getSubset(i + 1, subset);
      getSubset(i + 1, [...subset, items[i]]);
    };

    getSubset(0, []);
    setFirstHalf(firstSubset);
    for (let x of firstSubset) {
      let idx = items.indexOf(x);
      items.splice(idx, 1);
    }

    setFirstHalf(firstSubset);
    setSecondHalf(items);

    setClosestSum(Math.abs(closestSum * 2 - totalSum));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (Number.parseInt(inputValue) && inputValue < 100) {
      let newList = [Number.parseInt(inputValue), ...numbersList];
      setNumbersList(newList);
      setInputValue("");
      getSplittedArray([...newList]);
    }
  }
  function clearLists() {
    setNumbersList([]);
    setFirstHalf([]);
    setSecondHalf([]);
    setClosestSum(0);
  }

  return (
    <div className="p-8 flex-col items-center ">
      <div className=" self-center w-full border-t-2  p-4 border-b-2 m-4 text-sm ">
        Balancer will be divided the inputs int to 2 parts in such a way that
        the difference in their sum will be minimum as possible.
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <label className="mr-4">
            Enter your number:
            <input
              className="ml-4 outline rounded-sm p-2 w-24"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              min={0}
              max={100}
            />
          </label>
        </form>
        {numbersList.length > 0 && (
          <Button variant="outlined" onClick={clearLists}>
            {" "}
            Clear{" "}
          </Button>
        )}
      </div>

      <div className="p-8 flex w-full justify-center ">
        <div className="flex flex-wrap w-1/3 flex-1 justify-center ">
          {firstHalf.map((item) => {
            return <BlockItem number={item} />;
          })}
        </div>
        <BlockItem number={closestSum} isHighlight={true} />
        <div className="flex flex-wrap w-1/3 flex-1 justify-center ">
          {secondHalf.map((item) => {
            return <BlockItem number={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

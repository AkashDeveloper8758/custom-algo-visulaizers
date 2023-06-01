let outerArray = [1, 2, [3, 4, 5], 6, 7];
let arrayToFind = [3, 4, 5];
let foundArray = outerArray.find(arr => JSON.stringify(arr) === JSON.stringify(arrayToFind));

if (foundArray) {
  console.log("Array found at index", foundArray);
} else {
  console.log("Array not found");
}
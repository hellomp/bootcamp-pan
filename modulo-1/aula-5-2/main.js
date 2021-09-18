let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let result = document.getElementById("result");

document.addEventListener("input", () => {
  let sum = num1.valueAsNumber + num2.valueAsNumber;
  result.textContent = isNaN(sum) ? "Error" : sum;
});

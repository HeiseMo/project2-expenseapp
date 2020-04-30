document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

const crrncy = {
  EUR: { USD: 1.08, AUD: 1.67, TL: 7.55 },
  USD: { EUR: 0.92, AUD: 1.54, TL: 6.96 },
  AUD: { USD: 0.65, EUR: 0.6, TL: 4.54 },
  TL: { USD: 0.14, EUR: 0.13, AUD: 0.22 },
};

var btn = document.querySelector(".calculate-btn");
var baseCurrencyInput = document.getElementById("currency-1");
var secondCurrencyInput = document.getElementById("currency-2");
var amountInput = document.getElementById("amount");
var toShowAmount = document.querySelector(".given-amount");
var toShowBase = document.querySelector(".base-currency");
var toShowSecond = document.querySelector(".second-currency");
var toShowResult = document.querySelector(".final-result");
var showCalcBtn = document.querySelector(".show-calc-btn");
var currencyCalc = document.querySelector(".container-calculator");

function revealCalc() {
  currencyCalc.classList.toggle("reveal-calc");
  console.log("reveal calc");
}

function convertCurrency(event) {
  event.preventDefault();
  var amount = amountInput.value;
  var from = baseCurrencyInput.value;
  var to = secondCurrencyInput.value;
  var result = 0;

  try {
    if (from == to) {
      result = amount;
    } else {
      result = amount * crrncy[from][to];
    }
  } catch (err) {
    result = amount * (1 / crrncy[to][from]);
  }

  toShowSecond.textContent = to;
  toShowResult.textContent = result;
}

showCalcBtn.addEventListener("click", revealCalc);
btn.addEventListener("click", convertCurrency);

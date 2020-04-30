var modal = document.querySelector(".modal");
var trigger = document.querySelector(".addExpenseBtn");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

let expensePrice = document.querySelectorAll(".expenseSum");
console.log(expensePrice[3]);
let sortedPrice = expenseObject
  .map((val) => {
    return Number(val.price);
  })
  .sort((a, b) => a - b);
console.log(sortedPrice);

let purchaseDate = expenseObject.map((val) => {
  return val.expenseType;
});
let purchasePrice = expenseObject.map((val) => {
  return val.price;
});
sumOfPurchasePrice = 0;

function sumPrices(prices) {
  let myPrices = [...prices];
  for (let i = 0; i < myPrices.length; i++) {
    sumOfPurchasePrice += parseInt(myPrices[i])
  }
  return sumOfPurchasePrice;
}

document.getElementById("totalMoneySpent").innerHTML = sumPrices(purchasePrice);
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: purchaseDate,
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      data: purchasePrice,
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});
// var myChart = new Chart(ctx, {
//   type: "polarArea",
//   data: {
//     labels: purchaseDate,
//     datasets: [
//       {
//         label: "Price",
//         data: purchasePrice,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
// });
console.log(expenseObject);
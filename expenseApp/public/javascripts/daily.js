let purchaseDate = expenseObject.map((val) => {
  return val.expenseType;
});
let purchasePrice = expenseObject.map((val) => {
  return val.price;
});

sumOfPurchasePrice = 0;
function sumPrices(prices){
  let myPrices = [...prices];
  for(let i = 0; i < myPrices.length; i++){
    sumOfPurchasePrice += parseInt(myPrices[i])
  }
  return sumOfPurchasePrice;
}

document.getElementById("totalMoneySpent").innerHTML = sumPrices(purchasePrice);

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: purchaseDate,
    datasets: [
      {
        label: "Price",
        data: purchasePrice,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

// var ctx2 = document.getElementById("myChart2").getContext("2d");
// var myChart2 = new Chart(ctx2, {
//   type: "bar",
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
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

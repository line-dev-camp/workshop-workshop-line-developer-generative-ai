const { createCanvas } = require('canvas');
const { Chart, registerables } = require('chart.js');
const firebase = require('../util/firebase.util')

// Register the required components
Chart.register(...registerables);


exports.createChart = async (userId, messageId) => {

  const width = 600; // Width of the chart
  const height = 600; // Height of the chart
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Define your chart
  const charts = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Report Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  charts.draw();

  const buffer = canvas.toBuffer('image/png');
  const fileUrl = await firebase.saveImageToStorage(userId, messageId, buffer, 'png')

  return fileUrl

}
import React from 'react';

var LineChart = require("react-chartjs").Line;


export default class SavingsChart extends React.Component {
  render() {

  const chartOptions =
      {
          // scales: {
          //     yAxes: [{
          //         ticks: {
          //             beginAtZero:true,
          //             // Include a dollar sign in the ticks
          //             callback: function(value, index, values) {
          //                 return '$' + value;
          //             }
          //         }
          //     }]
          // },
          pointDot : false,
          responsive: true,
      };


  const chartData =
      {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
          datasets: [{
              label: 'With Solar',
              data: this.props.withSolar,
              fillColor: 'rgba(118, 211, 58, 0.2)',
              strokeColor: 'rgb(118, 211, 58)',
              pointHighlightFill: 'rgba(118, 211, 58, 0.3)',
              pointHighlightStroke: 'rgb(118, 211, 58)',
              borderWidth: 1
          },
          {
              label: 'Without Solar',
              data: this.props.withoutSolar,
              fillColor: 'rgb(141, 142, 146, 0.2)',
              strokeColor: 'rgb(141, 142, 146, 1)',
              pointHighlightFill: 'rgb(141, 142, 146, 0.3)',
              pointHighlightStroke: 'rgb(141, 142, 146, 1)',
              borderWidth: 1
          }
        ]
      };

    return <LineChart data={chartData} options={chartOptions}/>
  }
}
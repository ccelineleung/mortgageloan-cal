import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  monthlyPayment,
  HOA,
  homeInsurance,
  propertyTax,
  PMIFee,
  finalFees,
}) => {
  const data = {
    labels: ['Monthly Payment', 'HOA', 'Home Insurance', 'Property Tax', 'PMI'],
    datasets: [
      {
        label: 'Fee',
        data: [monthlyPayment, HOA, homeInsurance, propertyTax, PMIFee],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(201, 203, 207)',
        ],
      },
    ],
  };

  const options = {};

  //suppose to show data inside the circle ???
  //reference : https://www.youtube.com/watch?v=IqlmFSII8AY&ab_channel=ChartJS
  const textCenter = {
    id: 'textCenter',
    BeforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bolder 30px sans-serif';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `Total Monthly Payment: ${finalFees}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} plugins={[textCenter]}></Doughnut>
    </>
  );
};

export default DoughnutChart;

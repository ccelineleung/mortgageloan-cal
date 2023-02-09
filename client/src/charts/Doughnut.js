import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = () => {

    const data = {
        labels: ['monthlyPayment','HOA','homeInsurance','propertyTax','PMI'],
        datasets:[{
            label:'Poll',
            data:[3,6,3,2,1],
            backgroundColor:Object.values(Utils.CHART_COLORS),
            borderColor:Object.values(Utils.CHART_COLORS)
        }]
    }

    const options = {
        
    }
    
    return (
        <>
            <Doughnut data={data} options={options}></Doughnut>
        </>
    )
}

export default DoughnutChart;
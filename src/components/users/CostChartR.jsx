import React from 'react';
import { useContext } from "react";
import theContext from "../../context/mainContext/theContext"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function CostChartR() {
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const {
    nameCostSetR,
    ResourceSearchSet
  } = useContext(theContext);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Resource Name vs Cost Analysis',
    },
  },
};

console.log("Chart Js Entry dkksmksmx:", nameCostSetR)

const labels = ResourceSearchSet;

const data = {
  labels,
  datasets: [
    {
      label: 'Cost',
      data: nameCostSetR,
      
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};



  return <Bar options={options} data={data} />;
}

export default CostChartR
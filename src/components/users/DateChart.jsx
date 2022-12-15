import React from "react";
import { useContext } from "react";
import theContext from "../../context/mainContext/theContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

function CostChartR({ xAxisDataLabel }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { nameCostSet, nameCQSet, sortedDates } = useContext(theContext);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Application Name vs Cost and Consumed Quantity Analysis"
      }
    }
  };

  const labels = sortedDates;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cost",
        data: nameCostSet,

        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  return <Bar options={options} data={data} />;
}

export default CostChartR;

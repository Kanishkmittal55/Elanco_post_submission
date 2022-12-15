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

function NameChartR() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { nameCQSetR, ResourceSearchSet } = useContext(theContext);

  const options = {
    responsive: true,
    plugins: {
      scales: {
        x: {
          title: {
            color: "red",
            display: true,
            text: "Month"
          }
        }
      },
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Resource Name vs Consumed Quantity Graph"
      }
    }
  };

  console.log("Chart Js Entry dkksmksmx:", nameCQSetR);

  const labels = ResourceSearchSet;

  const data = {
    labels,
    datasets: [
      {
        label: "Consumed Quantity",
        data: nameCQSetR,

        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return <Bar options={options} data={data} />;
}

export default NameChartR;

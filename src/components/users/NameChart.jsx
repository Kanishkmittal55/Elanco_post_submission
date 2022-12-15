import React from "react";
import { useContext } from "react";
import theContext from "../../context/mainContext/theContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function NameChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { nameCQSet, AppSearchSet } = useContext(theContext);

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
        text: "Service Name with Consumed Quantity"
      }
    }
  };

  // Setting the Labels Dynamically
  const labels = AppSearchSet;

  // Setting the colors Dynamically
  const backgroundColor = [];
  const borderColor = [];
  AppSearchSet.map(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    backgroundColor.push("rgba(" + r + "," + g + "," + b + ",0.2");
    borderColor.push("rgba(" + r + "," + g + "," + b + ",0.2");
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Consumed Quantity",
        data: nameCQSet,

        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }
    ]
  };

  return <Pie options={options} data={data} />;
}

export default NameChart;

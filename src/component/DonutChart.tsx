import { type FC } from "react";
import { Doughnut } from "react-chartjs-2";
import type { ChartData } from "../utils/CategoryTypes";

interface DoughnutInt {
  data: ChartData;
}

const DonutChart: FC<DoughnutInt> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        labels: {
          padding: 10,
        },
      },
    },
  };
  

  return (
    <div style={{ height: "200px", width: "300px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;

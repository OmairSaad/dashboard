import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData } from "../utils/CategoryTypes";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: ChartData;
}

const DonutChart = ({ data }: DonutChartProps) => {
  return (
    <div style={{ height: "200px", width: "300px" }}>
      <Doughnut 
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            }
          }
        }}
      />
    </div>
  );
};

export default  DonutChart;
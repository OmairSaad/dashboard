import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData } from "../utils/CategoryTypes";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

//defined the type for the props of DonutChart component
interface DonutChartProps {
  data: ChartData;
}

// DonutChart component to render a donut chart using Chart.js and react-chartjs-2
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
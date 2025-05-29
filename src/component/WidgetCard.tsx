import { type FC } from "react";
import DonutChart from "./DonutChart";
import type { Widget } from "../utils/CategoryTypes";
import { X } from "lucide-react";
import { VscGraphLine } from "react-icons/vsc";

// type for the props of WidgetCard component
interface WidgetCardInt {
  ele: Widget;
  onRemove: (wid: string, catId: string) => void;
  catId: string;
}

export const WidgetCard: FC<WidgetCardInt> = ({ ele, catId, onRemove }) => {
  // Clone chartData safely to avoid mutation errors
  const clonedChartData = ele.chartData ? structuredClone(ele.chartData) : null;

  return (
    <div className="relative bg-white w-full min-w-[350px] shadow-md rounded-md h-[300px] p-5 group">
      <button 
        // evoke the onRemove function when the button is clicked
        onClick={() => onRemove(ele.id, catId)}
        className="absolute cursor-pointer top-3 right-3 p-1 rounded-full text-white hover:scale-[1.02]  bg-red-600 opacity-0 group-hover:opacity-100 transition"
      >
        <X size={18} />
      </button>

      <div>
        <h3 className="text-sm font-semibold">{ele.widgetName}</h3>
        <h3 className="text-sm  text-gray-600">{ele.widgetText}</h3>
        {!clonedChartData && (
          <div className="h-[calc(300px-80px)] flex flex-col justify-center items-center">
            <VscGraphLine size={30} />
            <p className="text-sm text-gray-500 mt-2">No chart available</p>
          </div>
        )}
      </div>

      {clonedChartData && (
        <div className="mt-3">
          {/* Render the DonutChart component with the cloned chart data */}
          <DonutChart data={clonedChartData} />
        </div>
      )}
    </div>
  );
};

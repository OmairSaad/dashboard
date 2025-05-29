// SidebarModal.tsx

import { type FC } from "react";
import WidgetsList from "./WidgetsList";
import { IoCloseSharp } from "react-icons/io5";

type Widget = {
  id: string;
  widgetName: string;
  widgetText: string;
  isVisible: boolean;
};

type Category = {
  id: string;
  name: string;
  widgets: Widget[];
};

interface SidebarModalProps {
  categories: Category[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  selectedWidgets: { [key: string]: boolean };
  handleCheckbox: (id: string) => void;
  handleConfirm: () => void;
  onClose: () => void;
}

const SidebarModal: FC<SidebarModalProps> = ({
  categories,
  activeTab,
  setActiveTab,
  selectedWidgets,
  handleCheckbox,
  handleConfirm,
  onClose,
}) => {
  const activeCategory = categories.find(cat => cat.id === activeTab);

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl p-3 sm:p-6 z-50 flex flex-col border-l border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className=" sm:text-xl font-semibold text-gray-700">Manage Widgets</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-xl hover:text-black transition cursor-pointer rounded-full p-1 hover:bg-gray-100 flex items-center justify-center w-8 h-8"
        >
         <IoCloseSharp />
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto mb-4">
        <div className="flex gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`cursor-pointer px-4 py-1 border rounded-full text-sm font-medium whitespace-nowrap transition ${cat.id === activeTab
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-700 hover:text-blue-500"
                }`}
            >
              {cat.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <WidgetsList activeCategory={activeCategory} handleCheckbox={handleCheckbox} selectedWidgets={selectedWidgets}  />

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onClose}
          className="px-4 py-1.5 cursor-pointer rounded-md border border-gray-400 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-1.5 cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SidebarModal;

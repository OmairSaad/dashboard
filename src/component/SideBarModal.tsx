// SidebarModal.tsx

import { type FC } from "react";

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
  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl p-6 z-50 flex flex-col border-l border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Manage Widgets</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-xl hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto mb-4">
        <div className="flex gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`cursor-pointer px-4 py-1 border rounded-full text-sm font-medium whitespace-nowrap transition ${
                cat.id === activeTab
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
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {categories
          .filter((cat) => cat.id === activeTab)
          .map((cat) => (
            <div key={cat.id}>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                {cat.name}
              </h3>
              <div className="space-y-3">
                {cat.widgets.map((widget) => (
                  <label
                    key={widget.id}
                    className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedWidgets[widget.id]}
                      onChange={() => handleCheckbox(widget.id)}
                      className="mt-1 cursor-pointer accent-blue-600"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {widget.widgetName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {widget.widgetText}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SidebarModal;

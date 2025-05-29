// components/AddWidgetModal.tsx

import React from "react";
import { MdOutlineClose } from "react-icons/md";

interface AddWidgetModalProps {
  widgetName: string;
  widgetText: string;
  setWidgetName: (value: string) => void;
  setWidgetText: (value: string) => void;
  onClose: () => void;
  onAdd: () => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  widgetName,
  widgetText,
  setWidgetName,
  setWidgetText,
  onClose,
  onAdd,
}) => {
  return (
    <div className="fixed inset-0 bg-[#0000004a] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-md w-full max-w-md shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-2 text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add New Widget</h2>
          <span onClick={onClose} className="cursor-pointer">
            <MdOutlineClose size={24} />
          </span>
        </div>
        <div className="mt-5 px-4">
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Widget Name"
            className="w-full border border-gray-200 bg-white focus:outline-gray-400 px-3 py-2 rounded-md mb-5"
          />

          <input
            type="text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            placeholder="Widget Text"
            className="w-full border border-gray-200 bg-white focus:outline-gray-400 px-3 py-2 rounded-md mb-5"
          />
        </div>

        <div className="flex justify-end gap-3 mb-4 px-4">
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;

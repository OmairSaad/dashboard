
import { type FC, useEffect, useState } from "react";
import { GoClockFill } from "react-icons/go";
import { HiDotsVertical, HiRefresh } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootSate } from "../store";
import {
  updateVisibleWidgets,
} from "../features/category/categorySlice";
import SidebarModal from "./SideBarModal";
import { notify } from "../utils/Notify";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootSate) => state.category);

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<{
    [key: string]: boolean;
  }>({});
  const [categData, setCategData] = useState(categories);



  useEffect(() => {
    setCategData(categories);
    setActiveTab(categories[0]?.id || "");
  }, [categories]);

  const updateInitialVisibleValue = () => {
    const initial: { [key: string]: boolean } = {};
    categories.forEach((cat) => {
      cat.widgets.forEach((w) => {
        initial[w.id] = w.isVisible;
      });
    });
    setSelectedWidgets(initial);
  };

  const handleCheckbox = (id: string) => {
    setSelectedWidgets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirm = () => {
    dispatch(updateVisibleWidgets(selectedWidgets));
    setShowSidebar(false);
    notify("Widgets updated!")
  };

  const openSidebar = () => {
    updateInitialVisibleValue();
    setShowSidebar(true);
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md z-10 w-full sticky top-0 left-0">
      <div className="font-semibold text-lg">CNAPP Dashboard</div>

      <div className="flex gap-x-4 items-center">
        <button
          onClick={openSidebar}
          className="bg-white cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-2 hover:bg-gray-100 transition"
        >
          <HiMiniPlus size={15} />
          Add
        </button>

        <button className="bg-white cursor-pointer p-2 border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiRefresh />
        </button>

        <button className="bg-white cursor-pointer p-2 border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiDotsVertical />
        </button>

        <div className="border border-blue-900 rounded-md p-2 flex items-center cursor-pointer">
          <span className="border-r-2 border-blue-900 pr-2 md:pr-0 md:border-0">
            <GoClockFill className="text-blue-900" />
          </span>

          <select className="hidden md:block text-blue-900 focus:outline-none pl-2 bg-transparent cursor-pointer text-sm">
            <option>Last 2 days</option>
            <option>1 day</option>
            <option>2 days</option>
          </select>
        </div>

      </div>

      {/* Sidebar */}
      {showSidebar && (
        <SidebarModal
          categories={categData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedWidgets={selectedWidgets}
          handleCheckbox={handleCheckbox}
          handleConfirm={handleConfirm}
          onClose={() => setShowSidebar(false)}
        />
      )}
    </header>
  );
};

export default Header;

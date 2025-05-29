
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
  // State variables for managing sidebar visibility, active tab, selected widgets, and categories
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootSate) => state.category);

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<{
    [key: string]: boolean;
  }>({});
  const [categData, setCategData] = useState(categories);

  // Effect to set initial category data and active tab when categories change
  // This will run when the component mounts or when categories change
  useEffect(() => {
    setCategData(categories);
    setActiveTab(categories[0]?.id || "");
  }, [categories]);

  // This function initializes the selectedWidgets state with the visibility status of each widget
  const updateInitialVisibleValue = () => {
    const initial: { [key: string]: boolean } = {};
    categories.forEach((cat) => {
      cat.widgets.forEach((w) => {
        initial[w.id] = w.isVisible;
      });
    });
    setSelectedWidgets(initial);
  };
  
  // This function handles the checkbox toggle for each widget
  const handleCheckbox = (id: string) => {
    setSelectedWidgets((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  // This function updates the visible widgets in the Redux store and closes the sidebar
  const handleConfirm = () => {
    dispatch(updateVisibleWidgets(selectedWidgets));
    setShowSidebar(false);
    notify("Widgets updated!", "success")
  };
  
  // This function opens the sidebar and initializes the selected widgets
  const openSidebar = () => {
    updateInitialVisibleValue();
    setShowSidebar(true);
  };


  if (showSidebar) {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
  }

  return (
    <header className="sm:flex justify-between items-center p-5 bg-white shadow-md z-10 w-full sticky top-0 left-0">
      <div className="font-bold text-lg mb-5 sm:mb-0">CNAPP Dashboard</div>

      <div className="flex gap-x-2 sm:gap-x-4 items-center justify-start">
        <button
          onClick={openSidebar}
          className="bg-white cursor-pointer px-2 h-[30px] border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-2 hover:bg-gray-100 transition"
        >
          <HiMiniPlus size={15} />
          Add
        </button>

        <button className="bg-white cursor-pointer px-2 h-[30px] border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiRefresh />
        </button>

        <button className="bg-white cursor-pointer px-2 h-[30px] border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiDotsVertical />
        </button>

        <div className="border border-blue-900 rounded-md px-2 h-[30px] flex items-center cursor-pointer">
          <span className="border-r-2 border-blue-900 pr-2 md:pr-0 md:border-0">
            <GoClockFill className="text-blue-900" />
          </span>

          <select className=" text-blue-900 focus:outline-none pl-2 bg-transparent cursor-pointer text-sm">
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

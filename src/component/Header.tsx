// import {  type FC } from "react";
// import { GoClockFill } from "react-icons/go";
// import { HiDotsVertical, HiRefresh } from "react-icons/hi";
// import { HiMiniPlus } from "react-icons/hi2";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../store";
// import { setSearchTerm } from "../features/category/categorySlice";

// const Header: FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const handleInput = (searchTerm:string) => {
//     dispatch(setSearchTerm(searchTerm));
//   }
//   return (
//     <header className="flex justify-between items-center p-5">
//       <div className="font-semibold ">CNAPP Dashboard</div>
//       <div className="flex gap-x-5">
//         <button className="bg-white cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-3">
//           Add Widget
//           <span>
//             <HiMiniPlus size={20} />
//           </span>
//         </button>
//         <button className="bg-white cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-3">
//           <HiRefresh />
//         </button>
//         <button className="bg-white cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-3">
//           <HiDotsVertical />
//         </button>
//         <div className="border border-blue-900 rounded-md p-2 flex items-center cursor-pointer">
//           <span className="border-r-2 border-blue-900 pr-2">
//             <GoClockFill />
//           </span>
//           <select className="text-bue-900 focus:outline-0 pl-2 cursor-pointer">
//             <option value="">lats 2 daya</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//           </select>
//         </div>
//         <input type="text" placeholder="search" onChange={(event)=> handleInput(event.target.value)} />
//       </div>




//       {/* SideBar */}
      
//     </header>
//   );
// };

// export default Header;


















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
          <HiMiniPlus size={18} />
          Add Widget
        </button>

        <button className="bg-white cursor-pointer p-2 border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiRefresh />
        </button>

        <button className="bg-white cursor-pointer p-2 border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 transition">
          <HiDotsVertical />
        </button>

        <div className="border border-blue-900 rounded-md p-2 flex items-center cursor-pointer">
          <span className="border-r-2 border-blue-900 pr-2">
            <GoClockFill />
          </span>
          <select className="text-blue-900 focus:outline-none pl-2 bg-transparent cursor-pointer">
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

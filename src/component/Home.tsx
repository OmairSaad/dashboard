import { type FC, useEffect, useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { WidgetCard } from "./WidgetCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootSate } from "../store";
import {
  addWidget,
  removeWidgets,
} from "../features/category/categorySlice";
import SearchBar from "./SearchBar";
import AddWidgetModal from "./AddWidgetModal";

const Home: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [catId, setCatId] = useState("");
  // const { searchTerm } = useSearch();
  // const [categories, setCategories] = useState(cadrData.categories);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, searchTerm } = useSelector(
    (state: RootSate) => state.category
  );
  const [filteredCategories, setFilteredCategories] = useState(categories);
  useEffect(() => {
    const ctgs = categories.filter((cat) =>
      cat.name.toLowerCase().trim().includes(searchTerm.trim().toLowerCase())
    );
    setFilteredCategories(ctgs);
  }, [searchTerm, categories]);

  // Move handlOnClik outside handleAddWidget
  const handlOnClik = (id: string) => {
    setCatId(id);
    setShowModal(true);
  };

  const handlRemoveWidget = (wid: string, catId: string) => {
    // const updatedCategories = categories.map((cat) => {
    //   if (cat.id === catId) {
    //     // Remove the widget from the matching category
    //     return {
    //       ...cat,
    //       widgets: cat.widgets.filter((w) => w.id !== wid),
    //     };
    //   }
    //   return cat;
    // });

    // // setCategories(updatedCategories);
    dispatch(removeWidgets({ catId: catId, wId: wid }));
  };

  const handleAddWidget = () => {
    if (widgetName.trim() === "" || widgetText.trim() === "") {
      alert("Fields can not be empty!");
      return;
    }

    dispatch(
      addWidget({
        catId: catId,
        widget: {
          widgetName: widgetName,
          widgetText: widgetText,
          id: Date.now().toString(),
          isVisible: true,
        },
      })
    );
    setShowModal(false);
    setWidgetName("");
    setWidgetText("");
  };

  if (showModal) {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
  }

  return (
    <div className="px-5 my-5">
      <SearchBar />

      {filteredCategories.map((item, index) => (
        <div key={index}>
          <h1 className=" font-semibold my-3">{item.name}</h1>
          <div className="flex justify-between gap-x-5 overflow-x-auto overflow-y-hidden custom-scroll pb-3">
            {item.widgets.map(
              (ele, i) =>
                ele.isVisible && (
                  <WidgetCard
                    key={i}
                    ele={ele}
                    catId={item.id}
                    onRemove={handlRemoveWidget}
                  />
                )
            )}
            <div className="bg-white w-full min-w-[300px] shadow-md rounded-md min-h-[200px] flex justify-center items-center">
              <button
                onClick={() => handlOnClik(item.id)}
                className="bg-white cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-500 flex items-center gap-x-3"
              >
                Add Widget
                <span>
                  <HiMiniPlus size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        // <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
        //   <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">
        //     <h2 className="text-lg font-semibold mb-4">Add New Widget</h2>

        //     <input
        //       type="text"
        //       value={widgetName}
        //       onChange={(e) => setWidgetName(e.target.value)}
        //       placeholder="Widget Name"
        //       className="w-full border px-3 py-2 rounded-md mb-3"
        //     />

        //     <input
        //       type="text"
        //       value={widgetText}
        //       onChange={(e) => setWidgetText(e.target.value)}
        //       placeholder="Widget Text"
        //       className="w-full border px-3 py-2 rounded-md mb-3"
        //     />

        //     <div className="flex justify-end gap-3 mt-4">
        //       <button
        //         onClick={() => setShowModal(false)}
        //         className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
        //       >
        //         Cancel
        //       </button>
        //       <button
        //         onClick={handleAddWidget}
        //         className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
        //       >
        //         Add
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <AddWidgetModal
          widgetName={widgetName}
          widgetText={widgetText}
          setWidgetName={setWidgetName}
          setWidgetText={setWidgetText}
          onClose={() => setShowModal(false)}
          onAdd={handleAddWidget}
        />
      )}
    </div>
  );
};

export default Home;

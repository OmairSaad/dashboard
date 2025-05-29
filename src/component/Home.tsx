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
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/Notify";

const Home: FC = () => {
  // State variables for managing modal and widget data
  // and dispatch for Redux actions
  const [showModal, setShowModal] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [catId, setCatId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { categories, searchTerm } = useSelector(
    (state: RootSate) => state.category
  );

  // Filtered categories based on search term
  // This will update whenever the search term or categories change
  const [filteredCategories, setFilteredCategories] = useState(categories);
  useEffect(() => {
    const ctgs = categories.filter((cat) =>
      cat.name.toLowerCase().trim().includes(searchTerm.trim().toLowerCase())
    );
    setFilteredCategories(ctgs);
  }, [searchTerm, categories]);
  
  // On clik addwidgetmodal opens and sets the category ID
  // This function is called when the "Add Widget" button is clicked
  const handlOnClik = (id: string) => {
    setCatId(id);
    setShowModal(true);
  };

  // Function to handle the removal of a widget
  const handlRemoveWidget = (wid: string, catId: string) => {
    // Dispatch the removeWidgets action with the category ID and widget ID
    dispatch(removeWidgets({ catId: catId, wId: wid }));
    notify("Widget deleted successfully!","success")
  };
  
  // Function to handle adding a new widget
  const handleAddWidget = () => {
    // Check if widget name and text are not empty
    if (widgetName.trim() === "" || widgetText.trim() === "") {
      notify("Widget Name and Text cannot be empty!", "error");
      return;
    }
    // Dispatch the addWidget action with the category ID and new widget data
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

    notify("Widget Added Succesfully!", "success")
  };
  
  // Effect to handle body styles when the modal is open or closed
  if (showModal) {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
  }

  return (
    <div className="px-5 my-5">
      {/* Toast container for notifications */}
      {/* This will display notifications on the screen */}
      < ToastContainer />
      {/* searchbar component */}
      <SearchBar />
      {filteredCategories.map((item, index) => (
        <div key={index}>
          <h1 className=" font-semibold my-3">{item.name}</h1>
          <div className="flex justify-between gap-x-5 overflow-x-auto overflow-y-hidden custom-scroll pb-3">
            {item.widgets.map(
              (ele, i) =>
                // Render each widget card if the widget is visible
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
        <AddWidgetModal
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

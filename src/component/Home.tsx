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

  const [showModal, setShowModal] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [catId, setCatId] = useState("");
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

  const handlOnClik = (id: string) => {
    setCatId(id);
    setShowModal(true);
  };

  const handlRemoveWidget = (wid: string, catId: string) => {
    // call dispatch method 
    dispatch(removeWidgets({ catId: catId, wId: wid }));
    notify("Widget deleted successfully!")
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

    notify("Widget Added Succesfully!")
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
      < ToastContainer />
      {/* searchbar component */}
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

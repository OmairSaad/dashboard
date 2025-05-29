import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, Widget } from "../../utils/CategoryTypes";
const initialCategories: Category[] = [
    {
      id: 'cat1',
      name: 'Category 1',
      widgets: [
        {
          id: 'widget1',
          widgetName: 'Widget One',
          widgetText: 'Some text',
          chartData: {
            labels: ["Work", "Sleep", "Exercise", "Leisure"],
            datasets: [
              {
                data: [40, 30, 10, 20],
                backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f472b6"],
                hoverBackgroundColor: [
                  "#10b981",
                  "#3b82f6",
                  "#eab308",
                  "#ec4899",
                ],
              },
            ],
          },
          isVisible:true
        },
      ],
    },
    // add more categories as needed
];
  
interface CategoryState {
  categories: Category[];
  searchTerm: string;
} 

  const initialState: CategoryState = {
    categories: initialCategories,
    searchTerm: "",
  };
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setSearchTerm(state, action:PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setCatgories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        addWidget(state, action:PayloadAction<{catId:string, widget:Widget}>) {
            const { catId, widget } = action.payload;
            const category = state.categories.find((cat) => cat.id == catId);
            if (category) {
                category.widgets.push(widget);
            }
        },

        removeWidgets(state, action:PayloadAction<{catId:string, wId:string}>) {
            const { catId, wId } = action.payload;
            const category = state.categories.find((cat) => cat.id == catId);
            if (category) {
              category.widgets = category.widgets.filter(
                (w) => w.id !== wId
              );
            }
            
        },

        updateVisibleWidgets(state, action:PayloadAction<{[wId:string]:boolean}>) {
            const selectedMap = action.payload;
            state.categories.forEach((cat) => {
                cat.widgets.forEach((w) => {
                    w.isVisible = !!selectedMap[w.id];
                })
            })
        }
    }
})

export const {setSearchTerm,addWidget,removeWidgets,setCatgories, updateVisibleWidgets} = categorySlice.actions;
export default categorySlice.reducer;
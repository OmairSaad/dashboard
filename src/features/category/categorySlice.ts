import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, Widget } from "../../utils/CategoryTypes";

// Initial categories and widgets data
// This can be replaced with data fetched from an API or a local JSON file
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

// Create a slice of the Redux store for categories
const categorySlice = createSlice({
    name: "category",
    initialState,
    // Define reducers to handle actions
    reducers: {
        // Action to set the search term
        setSearchTerm(state, action:PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        // Action to set categories
        setCatgories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        // Action to add a widget to a specific category
        addWidget(state, action:PayloadAction<{catId:string, widget:Widget}>) {
            const { catId, widget } = action.payload;
            const category = state.categories.find((cat) => cat.id == catId);
            if (category) {
                category.widgets.push(widget);
            }
        },
        // Action to remove widgets from a specific category
        removeWidgets(state, action:PayloadAction<{catId:string, wId:string}>) {
            const { catId, wId } = action.payload;
            const category = state.categories.find((cat) => cat.id == catId);
            if (category) {
              category.widgets = category.widgets.filter(
                (w) => w.id !== wId
              );
            }
            
        },
        // Action to update the visibility of widgets based on a map of widget IDs to visibility status
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
// Export the actions generated by createSlice
export const {setSearchTerm,addWidget,removeWidgets,setCatgories, updateVisibleWidgets} = categorySlice.actions;
// Export the reducer to be used in the store
export default categorySlice.reducer;
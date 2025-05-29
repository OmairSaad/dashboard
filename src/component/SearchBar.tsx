import { type FC } from 'react'
import { setSearchTerm } from '../features/category/categorySlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

const SearchBar: FC = () => {
      // Dispatch function to update the search term in the Redux store
      // This will be used to filter categories based on the search input
    const dispatch = useDispatch<AppDispatch>();
      const handleInput = (searchTerm: string) => {
        dispatch(setSearchTerm(searchTerm));
      };
  return (
    <div className="my-4 flex justify-end">
      <input
        type="text"
        placeholder="Search Category"
        // This input field allows users to search for categories by name
        onChange={(event) => handleInput(event.target.value)}
        className="border border-gray-100 w-full max-w-[350px] bg-white rounded-md px-3 py-2 focus:outline-gray-400"
      />
    </div>
  );
}

export default SearchBar;
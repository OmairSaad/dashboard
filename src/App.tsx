import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './utils/AllRoutes'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { setCatgories } from './features/category/categorySlice';



const App = (): React.ReactElement => {
  const router = createBrowserRouter(routes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetch('/mock.json').then(res => res.json()).then(res => dispatch(setCatgories(res.categories)));
  },[])
  return <RouterProvider router={router} />;
};

export default App

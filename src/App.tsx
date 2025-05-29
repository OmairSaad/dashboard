import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './utils/AllRoutes'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { setCatgories } from './features/category/categorySlice';

import './App.css';

const App = (): React.ReactElement => {
  //setup the router and dispatch with proper type
  const router = createBrowserRouter(routes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch categories from mock.json and dispatch to store
    fetch('/mock.json').then(res => res.json()).then(res => dispatch(setCatgories(res.categories)));
  },[])

  //Proide routing to the app
  return (
    <RouterProvider router={router} />
  )
};

export default App

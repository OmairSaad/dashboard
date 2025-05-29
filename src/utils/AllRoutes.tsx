import HomePage from "../pages/HomePage";
import RootLayout from "../pages/RootLayout";

//define the routes for the application
 const routes=[
    {
        path:'/',       // root path
        element:<RootLayout />,  // layout component
        children:[{   
            index:true,          // default route
            element:<HomePage />  // Home page component
        }]
    }
]

export default routes
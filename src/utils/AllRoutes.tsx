import HomePage from "../pages/HomePage";
import RootLayout from "../pages/RootLayout";

 const routes=[
    {
        path:'/',
        element:<RootLayout />,
        children:[{
            index:true,
            element:<HomePage />
        }]
    }
]

export default routes
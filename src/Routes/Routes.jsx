import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }

		],
	},
	{
		path: 'dashboard',
		element: <PrivateRoute>
			<Dashboard></Dashboard>
		</PrivateRoute>,
		errorElement: <ErrorPage></ErrorPage>,
		children:[
			// admin routes
			{
				path:'users',
				element:<AllUsers></AllUsers>
			}
		]
	}
]);

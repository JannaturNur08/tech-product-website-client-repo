import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "../Pages/Dashboard/Admin/Statistics/Statistics";
import Coupons from "../Pages/Dashboard/Admin/Coupons/Coupons";
import ModeratorRoute from "./ModeratorRoute";
import ReviewProducts from "../Pages/Dashboard/Moderator/ReviewProducts/ReviewProducts";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts/ReportedProducts";
import MyProfile from "../Pages/Dashboard/Users/MyProfile/MyProfile";
import AddProduct from "../Pages/Dashboard/Users/AddProduct/AddProduct";
import MyProducts from "../Pages/Dashboard/Users/MyProducts/MyProducts";
import UpdateProduct from "../Pages/Dashboard/Users/UpdateProduct.jsx/UpdateProduct";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import Products from "../Pages/Products/Products";
import Payment from "../Pages/Dashboard/Users/MyProfile/Payment";
import UpdateCoupon from "../Pages/Dashboard/Admin/Coupons/UpdateCoupon";

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
				path: "login",
				element: <Login></Login>,
			},
			{
				path: "signup",
				element: <SignUp></SignUp>,
			},
			{
				path: "products",
				element: <Products></Products>,
			},
			{
				path: "productDetails/:id",
				element: (
					<PrivateRoute>
						<ProductDetails></ProductDetails>
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(
						`https://b8a12-server-side-jannatur-nur08.vercel.app/products/${params.id}`
					),
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			// user routes
			{
				path: "myProfile",
				element: <MyProfile></MyProfile>,
			},
			{
				path: "addProduct",
				element: <AddProduct></AddProduct>,
			},
			{
				path: "myProducts",
				element: <MyProducts></MyProducts>,
			},
			{
				path: "updateProducts/:id",
				element: <UpdateProduct></UpdateProduct>,
				loader: ({ params }) =>
					fetch(
						`https://b8a12-server-side-jannatur-nur08.vercel.app/products/${params.id}`
					),
			},
			{
				path: "payment",
				element: <Payment></Payment>,
			},

			// admin routes
			{
				path: "statistics",
				element: (
					<AdminRoute>
						<Statistics></Statistics>
					</AdminRoute>
				),
			},
			{
				path: "users",
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: "coupons",
				element: (
					<AdminRoute>
						<Coupons></Coupons>
					</AdminRoute>
				),
			},
			{
				path: "updateCoupon/:id",
				element: <AdminRoute>
					<UpdateCoupon></UpdateCoupon>
				</AdminRoute>,
				loader: ({ params }) =>
					fetch(
						`https://b8a12-server-side-jannatur-nur08.vercel.app/coupons/${params.id}`
					),
			},

			// moderator routes
			{
				path: "reviewProducts",
				element: (
					<ModeratorRoute>
						<ReviewProducts></ReviewProducts>
					</ModeratorRoute>
				),
			},
			{
				path: "reportedProducts",
				element: (
					<ModeratorRoute>
						<ReportedProducts></ReportedProducts>
					</ModeratorRoute>
				),
			},
		],
	},
]);

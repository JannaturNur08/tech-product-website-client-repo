import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";


const Main = () => {
	return (
		<div className="flex flex-col min-h-screen m-0">
			<div>
			<Navbar></Navbar>
			</div>
			<div className="flex-1">
			<Outlet></Outlet>
			</div>
			<div className="mt-auto">
			<Footer></Footer>
			</div>
		</div>
	);
};

export default Main;

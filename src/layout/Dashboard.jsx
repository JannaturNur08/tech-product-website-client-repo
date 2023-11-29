import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { RiCoupon5Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdPreview } from "react-icons/md";
import { MdReport } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const Dashboard = () => {
	const { user } = useAuth();
	//get isAdmin from the database
	const [isAdmin] = useAdmin();
	// const isAdmin = true;
	const [isModerator] = useModerator();

	return (
		<div className="flex">
			{/* dashboard side bar */}
			<div className="w-64 min-h-screen bg-primary text-white">
				<ul className="menu p-4">
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/statistics">
									<FaHome></FaHome>
									Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/users">
									<FaUsers></FaUsers>
									All Users
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/coupons">
									<RiCoupon5Line />
									Coupons
								</NavLink>
							</li>
						</>
					) : isModerator ? (
						<>
						
							<li>
								<NavLink to="/dashboard/reviewProducts">
									<MdPreview />
									Review Products
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reportedProducts">
									<MdReport />
									Reported Products
								</NavLink>
							</li>
						</>
					) : user ? (
						<>
							<li>
								<NavLink to="/dashboard/myProfile">
									<CgProfile />
									My Profile
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/addProduct">
									<FaUtensils></FaUtensils>
									Add Products
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/myProducts">
									<FaShoppingCart></FaShoppingCart>
									My Products
								</NavLink>
							</li>
						</>
					) : null}
					<div className="divider"></div>
					<li>
						<NavLink to="/">
							<FaHome></FaHome>
							Home
						</NavLink>
					</li>
				</ul>
				;
			</div>
			{/* dashboard content */}
			<div className="flex-1 p-8">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default Dashboard;

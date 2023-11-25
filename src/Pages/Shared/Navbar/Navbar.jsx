import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
	const { user, logOut } = useAuth();
	const isAdmin = true;
	console.log(user);
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => console.log(error));
	};

	const navOptions = (
		<>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/products">Our Products</Link>
			</li>

			

			<li>
				<Link to="/login">Login</Link>
			</li>
		</>
	);
	return (
		<div>
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">Tech</a>
				</div>
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							{navOptions}
						</ul>
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{navOptions}</ul>
				</div>
				<div className="navbar-end">
                {user ? (
					<>
						<div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src={user.photoURL}
									/>
								</div>
							</label>
							<ul
								tabIndex={0}
								className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
								<li>
									<a className="justify-between">
										{user.displayName}
									</a>
								</li>
								<li>
									{" "}
									{user && isAdmin && (
										<li>
											<Link to="/dashboard/adminHome">
												Dashboard
											</Link>
										</li>
									)}
									{user && !isAdmin && (
										<li>
											<Link to="/dashboard/userHome">
												Dashboard
											</Link>
										</li>
									)}
								</li>
								<li>
									<button
										onClick={handleLogOut}
										className="btn btn-ghost">
										LogOut
									</button>
								</li>
							</ul>
						</div>
					</>
				) : (
					""
				)}
                </div>
			</div>
		</div>
	);
};

export default Navbar;

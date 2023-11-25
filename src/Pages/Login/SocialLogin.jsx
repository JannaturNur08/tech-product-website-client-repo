import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
	const { googleLogIn } = useAuth();
	const axiosPublic = useAxiosPublic();
	const navigate = useNavigate();
	const handleGoogleSignIn = () => {
		googleLogIn()
			.then((result) => {
				console.log(result.user);
				const userInfo = {
					name: result.user?.displayName,
					email: result.user?.email,
					role: "user",
				};
				axiosPublic.post("/users", userInfo).then((res) => {
					console.log(res.data);
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "User Google Logged in successfully.",
						showConfirmButton: false,
						timer: 1500,
					});
					navigate("/");
				});
			})
			.catch((error) => console.log(error));
	};
	return (
		<div>
			<div className=" mt-3 ">
				<button
					onClick={handleGoogleSignIn}
					className="btn btn-outline ">
					<FcGoogle className="text-3xl"></FcGoogle>
					Login with Google
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;

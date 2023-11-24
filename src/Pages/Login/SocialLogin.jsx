import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import {FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { googleLogIn} = useAuth();
    const handleGoogleSignIn = () => {
        googleLogIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
					title: "Success!",
					text: "logged in Successfully",
					icon: "success",
					confirmButtonText: "Confirmed",
				});
            })
            .catch(error => console.log(error))
    }
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
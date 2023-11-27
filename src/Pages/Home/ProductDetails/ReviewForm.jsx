import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { MdAddCard } from "react-icons/md";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ReviewForm = ({ productId, reviewsRefetch }) => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = async (data) => {
		console.log(data);
        if (data.name && data.rating && data.description) {
            const newReview = {
                productId: productId,
                name: data.name,
                rating: data.rating,
                comment: data.description,
            };
    
            try {
                const productRes = await axiosPublic.post("/api/reviews", newReview);
    
                if (productRes.data.insertedId) {
                    // show success popup
                    reset();
    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review is added to the database.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
    
                    reviewsRefetch();
                }
            } catch (error) {
                console.error("Error adding review to the database:", error);
            }
        }
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full my-6">
					<label className="label">
						<span className="label-text">User Name</span>
					</label>
					<input
						type="text"
						readOnly
						{...register("name", { required: true })}
						required
						defaultValue={user.displayName}
						className="input input-bordered w-full"
					/>
				</div>

				<div className="form-control w-full my-6">
					<label className="label">
						<span className="label-text">Rating</span>
					</label>
					<input
						type="text"
						placeholder="Give Your Rating.."
						{...register("rating", { required: true })}
						required
						className="input input-bordered w-full"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Review Description</span>
					</label>
					<textarea
						{...register("description", { required: true })}
						className="textarea textarea-bordered h-24"
						placeholder="Description"></textarea>
				</div>

				<button className="btn bg-primary text-white mt-5">
					Submit <MdAddCard />
				</button>
			</form>
		</div>
	);
};

export default ReviewForm;

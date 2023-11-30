import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useSortByAccepted from "../../../hooks/useSortByAccepted";
import { BiUpvote, BiDownvote } from "react-icons/bi";

import Swal from "sweetalert2";


const TrendingCard = ({ item }) => {
	const { product_name, timestamp, tags, image, vote, _id, ownerEmail,hasVoted,hasDownVoted } =
		item;
	const { user } = useAuth();
	console.log(tags);

	const axiosPublic = useAxiosPublic();
	const [products, refetch] = useSortByAccepted();
	// const [hasVoted, setHasVoted] = useState(false);
	// const [hasDownVoted, setHasDownVoted] = useState(false);
	
	
	const handleUpvote = async (productId) => {
		console.log("button clicked inside featured button");
		if(!hasVoted){
			try {
				await axiosPublic.patch(`/api/upvote/${productId}`, {
					vote: vote + 1,
				});
	
				// Update the state with the new status
				const newProducts = products.map((product) =>
					product._id === productId
						? { ...product, vote: vote + 1, hasVoted: true }
						: product
				);
				console.log(newProducts);
	
				refetch(newProducts);
				  // Notify the user with SweetAlert
				  Swal.fire({
					icon: 'success',
					title: 'Upvoted!',
					text: 'Thank you for your vote!',
				  });
				
				console.log(newProducts);
			} catch (error) {
				console.error(
					`Error marking product ${productId} as featured:`,
					error
				);
			}
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'You can upvote only once!',
			  });
		}
	};
	const handleDownVote = async (productId) => {
		console.log("button clicked inside featured button");
	if(!hasDownVoted){
		try {
			if (vote > 0) {
				await axiosPublic.patch(`/api/upvote/${productId}`, {
					vote: vote - 1,
				});

				// Update the state with the new status
				const newProducts = products.map((product) =>
					product._id === productId
						? { ...product, vote: vote - 1 , hasDownVoted: true}
						: product
				);
				console.log(newProducts);

				refetch(newProducts);
				Swal.fire({
					icon: 'success',
					title: 'Downvoted!',
					text: 'Thank you for your vote!',
				  });
				console.log(newProducts);
				
			}
		} catch (error) {
			console.error(
				`Error marking product ${productId} as featured:`,
				error
			);
		}
	}
	else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'You can downvote only once!',
		  });
	}
	};
	return (
		<div>
			
				<div className="card w-96 h-[550px] bg-base-100 ">
					<figure className="px-10 pt-10">
						<img src={image} alt="Album" className="rounded-lg" />
					</figure>
					<div className="card-body">
						<Link to={`/productDetails/${_id}`}>
							<h2 className="card-title max-w-[400px]">
								{product_name}
							</h2>
						</Link>
						<div className="space-y-2">
							{ Array.isArray(tags)?tags.map((tag, index) => (
								<p key={index} className="text-blue-500">
									#{tag}
								</p>
							)) : null}
						</div>
						<div>
							<p>{timestamp}</p>
						</div>
						<div className="card-actions justify-start">
							<div className="flex gap-3">
							{user ? (
								<>
									<button
										className="btn btn-ghost text-xl"
										onClick={() => handleUpvote(_id)}
										disabled={ user?.email === ownerEmail}>
										<BiUpvote /> {vote}
									</button>
									<button
										className="btn btn-ghost text-xl"
										onClick={() => handleDownVote(_id)}
										disabled={ user?.email === ownerEmail}>
										<BiDownvote />
									</button>
								</>
							) : (
								<Link to="/login" className="btn btn-outline">
									Login To Vote <BiUpvote /> {vote}
								</Link>
							)}
							</div>
						</div>
					</div>
				</div>
			
		</div>
	);
};

export default TrendingCard;

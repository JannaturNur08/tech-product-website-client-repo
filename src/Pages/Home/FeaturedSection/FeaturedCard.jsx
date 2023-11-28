import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useSortByTimestampFeatured from "../../../hooks/useSortByTimestampFeatured";
import useAuth from "../../../hooks/useAuth";
const FeaturedCard = ({ item }) => {
	const { user, loading } = useAuth();
	const { product_name, timestamp, tags, image, vote, _id, ownerEmail } =
		item;
	const axiosPublic = useAxiosPublic();
	const [products, refetch] = useSortByTimestampFeatured();
	if (loading) {
		refetch();
	}

	const handleUpvote = async (productId) => {
		console.log("button clicked inside featured button");
		try {
			await axiosPublic.patch(`/api/upvote/${productId}`, {
				vote: vote + 1,
			});

			// Update the state with the new status
			const newProducts = products.map((product) =>
				product._id === productId
					? { ...product, vote: vote + 1 }
					: product
			);
			console.log(newProducts);

			refetch(newProducts);
			console.log(newProducts);
		} catch (error) {
			console.error(
				`Error marking product ${productId} as featured:`,
				error
			);
		}
	};
	const handleDownVote = async (productId) => {
		console.log("button clicked inside featured button");
		try {
			if (vote > 0) {
				await axiosPublic.patch(`/api/upvote/${productId}`, {
					vote: vote - 1,
				});

				// Update the state with the new status
				const newProducts = products.map((product) =>
					product._id === productId
						? { ...product, vote: vote - 1 }
						: product
				);
				console.log(newProducts);

				refetch(newProducts);
				console.log(newProducts);
			}
		} catch (error) {
			console.error(
				`Error marking product ${productId} as featured:`,
				error
			);
		}
	};
	return (
		<div>
			<div className="card  lg:card-side bg-base-100 ">
				<figure>
					<img
						src={image}
						alt="Album"
						className="bg-[#1111110C]  rounded-lg  px-10 lg:w-auto w-9/12 lg:h-[300px]"
					/>
				</figure>
				<div className="card-body">
					<Link to={`/productDetails/${_id}`}>
						<h2 className="card-title max-w-[200px]">
							{product_name}
						</h2>
					</Link>
					<div className="space-y-3">
						{tags.map((tag, index) => (
							<p key={index} className="text-blue-500">
								#{tag}
							</p>
						))}
					</div>
					<div>
						<p>{timestamp}</p>
					</div>
					<div className="card-actions justify-start">
						{ user ? (
							<>
								<button
									className="btn btn-ghost text-xl"
									onClick={() => handleUpvote(_id)}
									disabled={user?.email === ownerEmail}>
									<BiUpvote /> {vote}
								</button>
								<button
									className="btn btn-ghost text-xl"
									onClick={() => handleDownVote(_id)}
									disabled={user?.email === ownerEmail}>
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
	);
};

export default FeaturedCard;

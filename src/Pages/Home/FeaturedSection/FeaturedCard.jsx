import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
const FeaturedCard = ({ item, refetch }) => {
	const { product_name, timestamp, tags, image, vote, _id } = item;
	refetch();
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
						<h2 className="card-title">{product_name}</h2>
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
						<button className="btn btn-ghost text-xl">
							<BiUpvote /> {vote}
						</button>
						<button className="btn btn-ghost text-xl">
							<BiDownvote />
							{vote}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedCard;

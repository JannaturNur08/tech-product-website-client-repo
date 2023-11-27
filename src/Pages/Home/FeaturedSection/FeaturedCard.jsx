import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Tooltip,
} from "@material-tailwind/react";
import { BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";
const FeaturedCard = ({ item, refetch }) => {
	const { product_name, timestamp, tags, image, vote,_id } = item;
	refetch();
	return (
		<div>
			<Card className="w-full  shadow-lg ">
				<CardHeader floated={false} color="blue-gray">
					<img src={image} />
					<div className=" absolute " />
				</CardHeader>
				<CardBody>
					<div className=" text-3xl  pt-10 pl-5 text-left">
						<Typography
							variant="h5"
							color="blue-gray"
							className="font-medium">
							<Link to={`/productDetails/${_id}`} >{product_name}</Link>
						</Typography>
					</div>
					<Typography
						color="gray"
						className="mt-5 pl-5 text-left text-blue-700">
						{tags.map((tag, index) => (
							<p key={index}>#{tag}</p>
						))}
					</Typography>
					<div className="group mt-5 inline-flex flex-wrap items-center gap-3">
						<Tooltip content="And +20 more">
							<span className="cursor-pointer  p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
								{timestamp}
							</span>
						</Tooltip>
					</div>
					<div className="mb-5 mt-10 ml-5">
						<button className="btn rounded-3xl text-xl">
							Upvote
							<BiUpvote />
							{vote}
						</button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default FeaturedCard;

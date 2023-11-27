import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
// import { Rating } from "@smastrom/react-rating";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useProducts from "../../../hooks/useProducts";

const ProductDetails = () => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const [products, refetch] = useProducts();
	const productDetails = useLoaderData();
	const {
		product_name,
		timestamp,
		tags,
		image,
		vote,
		_id,
		ownerEmail,
		description,
		facebook_external_link,
		google_external_link,
	} = productDetails;

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

    const handleReport = async (productId) => {
		console.log("button clicked inside featured button");
		try {
			await axiosPublic.patch(`/api/report/${productId}`, {
				report: "reported",
			});
			console.log(products);

			// Update the state with the new status
			const newProducts = products.map((product) =>
				product._id === productId
					? { ...product, report: "reported" }
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
			if(vote>0){
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
			<Helmet>
				<title>Product Details</title>
			</Helmet>
			<div>
				<div className="flex mx-auto container lg:mt-24 lg:gap-10">
					<div>
						<img src={image} alt="" />
					</div>

					<div className="space-y-5 lg:pt-16">
						<h2 className="font-mercellus lg:text-4xl">
							{product_name}
						</h2>

						<div className=" flex gap-3">
							{tags.map((tag, index) => (
								<p key={index} className="text-blue-500">
									#{tag}
								</p>
							))}
						</div>
						<div className="space-y-2">
							<div>
								<p>{timestamp} </p>
								<a href="">{facebook_external_link}</a>
								<a href="">{google_external_link}</a>
								<p className="font-jost text-xl">
									{description}
								</p>
							</div>

							<div className="flex gap-10">
								<div>
									<button
										className="btn btn-ghost text-xl"
										onClick={() => handleUpvote(_id)}
										disabled={user?.email === ownerEmail}>
										<BiUpvote /> {vote}
									</button>
									<button className="btn btn-ghost text-xl"
                                    onClick={() => handleDownVote(_id)}
                                    disabled={user?.email === ownerEmail}
                                    >
										<BiDownvote />
									</button>
								</div>
								<div>
									<button className="btn bg-red-600 text-white text-xl" onClick={() => handleReport(_id)}>Report</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="font-mercellus text-3xl">Reviews</h2>
				</div>
				{/* <div className="grid grid-cols-2 mt-10 gap-3">
							{reviews.map((review, idx) => (
								<div key={idx}>
									<div className="flex flex-row gap-5">
										<p className="font-mercellus text-xl font-medium">
											{review.userName}
										</p>
										<div className="flex flex-row gap-2">
											<p className="text-2xl">
												({review.rating})
											</p>
											<div className="pt-1">
												<Rating
													style={{ maxWidth: 100 }}
													readOnly
													orientation="horizontal"
													value={review.rating}
												/>
											</div>
										</div>
									</div>

									<p>{review.comment}</p>
								</div>
							))}
						</div> */}
			</div>
		</div>
	);
};

export default ProductDetails;

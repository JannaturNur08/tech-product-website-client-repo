import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import { Helmet } from "react-helmet-async";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import useProductsById from "../../../hooks/useProductsById";
import useReviews from "../../../hooks/useReviews";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
// import Rating from "react-rating";

const ProductDetails = () => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const productDetails = useLoaderData();
	const productId = productDetails._id;
	const [products, refetch] = useProductsById(productId);
	const [reviews, reviewsRefetch] = useReviews(productId);
	const [isReviewFormVisible, setReviewFormVisibility] = useState(false);
	console.log(products);
	const handleReviewButtonClick = () => {
		setReviewFormVisibility(!isReviewFormVisible);
	};

	const handleUpvote = async (productId) => {
		console.log("button clicked inside featured button");
		try {
			await axiosPublic.patch(`/api/upvote/${productId}`, {
				vote: products.vote + 1,
			});

			// Update the state with the new status
			const updatedProducts = {
				...products,
				vote: products.vote + 1,
			};

			refetch(updatedProducts);
			console.log(updatedProducts);
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

			// Update the state with the new status
			const updatedProducts = {
				...products,
				report: "reported",
			};

			refetch(updatedProducts);
			console.log(updatedProducts);
		} catch (error) {
			console.error(
				`Error marking product ${productId} as reported:`,
				error
			);
		}
	};

	const handleDownVote = async (productId) => {
		console.log("button clicked inside featured button");
		try {
			if (products.vote > 0) {
				await axiosPublic.patch(`/api/upvote/${productId}`, {
					vote: products.vote - 1,
				});

				// Update the state with the new status
				const updatedProducts = {
					...products,
					vote: products.vote - 1,
				};

				refetch(updatedProducts);
				console.log(updatedProducts);
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
			{/* ... (other parts of the component) */}
			<div className="mx-auto container ">
				<div className="flex lg:mt-24 lg:gap-10">
					<div>
						<img src={products.image} alt="" />
					</div>

					<div className="space-y-5 lg:pt-16">
						<h2 className="font-mercellus lg:text-4xl">
							{products.product_name}
						</h2>

						<div className=" flex gap-3">
							{products.tags &&
								Array.isArray(products.tags) &&
								products.tags.map((tag, index) => (
									<p key={index} className="text-blue-500">
										#{tag}
									</p>
								))}
						</div>
						<div className="space-y-3">
							<p>{products.timestamp} </p>
							<div className="flex gap-5 text-xl">
								<a href={products.facebook_external_link}>
									<FaFacebook />
								</a>
								<a href={products.google_external_link}>
									<FaGoogle />
								</a>
							</div>
							<p className="font-jost text-xl">
								{products.description}
							</p>

							<div className="flex gap-10">
								<div className="flex gap-5">
									<button
										className="btn btn-ghost text-xl"
										onClick={() =>
											handleUpvote(products._id)
										}
										disabled={
											user?.email === products.ownerEmail
										}>
										<BiUpvote /> {products.vote}
									</button>
									<button
										className="btn btn-ghost text-xl"
										onClick={() =>
											handleDownVote(products._id)
										}
										disabled={
											user?.email === products.ownerEmail
										}>
										<BiDownvote />
									</button>
								</div>

								<div
									style={{
										color:
											products.report === "reported"
												? "red"
												: " ",
									}}
									className="text-xl font-bold">
									{products?.report === "reported" ? (
										"Reported"
									) : (
										<button
											onClick={() =>
												handleReport(products._id)
											}
											hidden={
												products?.report === "reported"
											}
											className="btn bg-red-600 text-white text-xl">
											Report
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* get reviews from database */}
				<div className="lg:ml-20">
					<h2 className="font-mercellus text-3xl">Reviews</h2>
					{/* post review */}
					<div>
						<button
							className="btn btn-info text-xl text-white mt-5"
							onClick={handleReviewButtonClick}>
							 {isReviewFormVisible ? 'Hide Review Form' : 'Post Review'}
						</button>
						{isReviewFormVisible && (
							// Render your review form component here
							<ReviewForm
								productId={productId}
								reviewsRefetch={reviewsRefetch}></ReviewForm>
						)}
					</div>
					<div>
						{ reviews.length >0 ? (
							<div className="mt-10 border-2 p-10 rounded-2xl">
								{reviews.map((review, idx) => (
									<div key={idx} className="mb-10">
										<div className="flex gap-5">
                                            <div>
                                            <img src={user.photoURL} alt=""  className="w-[100px] h-[100px] rounded-full "/>
											
                                            </div>
											<div >
                                            <p className="font-mercellus text-3xl font-medium">
												{review.name}
											</p>
												
												<div className="pt-1 flex gap-1">
                                                
													
												
													<Rating
														style={{
															maxWidth: 150,
														}}
														readOnly
														orientation="horizontal"
														value={review.rating}
													/>
                                                    <div className="text-2xl">({review.rating})</div>
												</div>
											</div>
										</div>

										<p className="mt-4 text-xl">{review.comment}</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-2xl mt-10 font-bold text-textColor">No Reviews Yet</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

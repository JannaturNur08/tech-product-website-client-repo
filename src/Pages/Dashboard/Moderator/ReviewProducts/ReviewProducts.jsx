import { Link } from "react-router-dom";
import useProducts from "../../../../hooks/useProducts";

import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ReviewProducts = () => {
	const [products, refetch] = useProducts();
	const axiosPublic = useAxiosPublic();

	const handleAccept = async (productId) => {
		try {
			await axiosPublic.patch(`api/products/${productId}`, {
				status: "accepted",
			});

			// Update the state with the new status
			const newProducts = products.map((product) =>
				product._id === productId
					? { ...product, status: "accepted" }
					: product
			);

			refetch(newProducts);
		} catch (error) {
			console.error(`Error accepting product ${productId}:`, error);
		}
	};

	const handleReject = async (productId) => {
		try {
			await axiosPublic.patch(`api/products/${productId}`, {
				status: "rejected",
			});

			// Update the state with the new status
			const newProducts = products.map((product) =>
				product._id === productId
					? { ...product, status: "rejected" }
					: product
			);

			refetch(newProducts);
		} catch (error) {
			console.error(`Error rejecting product ${productId}:`, error);
		}
	};

	const handleFeatured = async (productId) => {
		try {
			await axiosPublic.patch(`/api/products/${productId}`, {
				Featured: true,
			});

			// Update the state with the new status
			const newProducts = products.map((product) =>
				product._id === productId
					? { ...product, Featured: true }
					: product
			);

			refetch(newProducts);
		} catch (error) {
			console.error(
				`Error marking product ${productId} as featured:`,
				error
			);
		}
	};
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table  w-full">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Product Name</th>

							<th>Details</th>
							<th>Accept</th>
							<th>Reject</th>
							<th>Featured</th>
						</tr>
					</thead>
					<tbody>
						{products.map((item, index) => (
							<tr key={item._id}>
								<th>{index + 1}</th>
								<th>{item.product_name}</th>

								<th>
									<Link to={`/productDetails/${item._id}`}>
										<button className="btn btn-ghost btn-md bg-blue-500 text-white">
											View Details
										</button>
									</Link>
								</th>
								<th>
									{item.status === "accepted" ? (
										"Accepted"
									) : (
										<button
											onClick={() =>
												handleAccept(item._id)
											}
											className="btn bg-green-500 btn-md text-white">
											Accept
										</button>
									)}
								</th>
								<th>
									{item.status === "rejected" ? (
										"Rejected"
									) : (
										<button
											onClick={() =>
												handleReject(item._id)
											}
											className="btn bg-red-500 btn-md text-white">
											Reject
										</button>
									)}
								</th>
								<th>
									{item.Featured === true ? (
										"Featured"
									) : (
										<button
											onClick={() =>
												handleFeatured(item._id)
											}
											className="btn btn-outline btn-accent btn-md text-white">
											Make Featured
										</button>
									)}
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ReviewProducts;

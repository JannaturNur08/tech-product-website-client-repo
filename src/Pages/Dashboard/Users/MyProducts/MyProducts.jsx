import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useMyProducts from "../../../../hooks/useMyProducts";
import { FaEdit, FaTrashAlt, FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyProducts = () => {
	const [myProducts, refetch] = useMyProducts();
	const axiosPublic = useAxiosPublic();
	console.log(myProducts);

	const handleUpdate = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosPublic.patch(`/products/${id}`).then((res) => {
					if (res.data.modifiedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your product has been updated.",
							icon: "success",
						});
					}
				});
			}
		});
	};
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosPublic.delete(`/products/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your product has been deleted.",
							icon: "success",
						});
					}
				});
			}
		});
	};
	return (
		<div>
			<div>
				<div className="overflow-x-auto">
					<table className="table  w-full">
						{/* head */}
						<thead>
							<tr>
								<th>#</th>
								<th>Product Name</th>
								<th>Product Image</th>
								<th>Number of Votes</th>
								<th>Status</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{myProducts.map((item, index) => (
								<tr key={item._id}>
									<th>{index + 1}</th>
									<th>{item.product_name}</th>

									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={item.image}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
										</div>
									</td>
									<td>{item.vote}</td>
									<td>{item.status}</td>
									<th>
                                    <Link to={`/dashboard/updateProducts/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-md bg-blue-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
									</th>
									<th>
										<button
											onClick={() =>
												handleDelete(item._id)
											}
											className="btn btn-ghost btn-lg">
											<FaTrashAlt className="text-red-600"></FaTrashAlt>
										</button>
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MyProducts;

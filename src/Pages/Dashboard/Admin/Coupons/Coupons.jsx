import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useCoupons from "../../../../hooks/useCoupons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Coupons = () => {
	const [coupons, refetch] = useCoupons();
    const axiosSecure = useAxiosSecure();

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
				axiosSecure.delete(`/coupons/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your Coupon has been deleted.",
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
								<th>Coupon Code</th>
								<th>Expiry Date</th>
								<th>Discount Amount</th>

								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{coupons.map((item, index) => (
								<tr key={item._id}>
									<td>{index + 1}</td>
									<td>{item.coupon_code}</td>

									<td>{item.expiry_date}</td>
									<td>{item.discount_amount}</td>

									<th>
										<Link
											to={`/dashboard/updateProducts/${item._id}`}>
											<button className="btn btn-ghost btn-md bg-blue-500">
												<FaEdit
													className="text-white 
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

export default Coupons;

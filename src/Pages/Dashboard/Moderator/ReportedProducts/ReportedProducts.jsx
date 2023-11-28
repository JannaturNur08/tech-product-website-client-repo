import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ReportedProducts = () => {
    const axiosSecure = useAxiosSecure();

	const { refetch, data: products = [] } = useQuery({
		queryKey: ["reportedProducts"],
		queryFn: async () => {
			const res = await axiosSecure.get("/api/reportedProducts");
            return res.data;
		},
	});

    const handleDelete = (productId) => {
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
				axiosSecure.delete(`/api/reportedProduct/${productId}`).then((res) => {
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your User has been deleted.",
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

							<th>Details</th>
							<th>Accept</th>
							
							
						</tr>
					</thead>
					<tbody>
						{ Array.isArray(products)?products.map((item, index) => (
							<tr key={item._id}>
								<th>{index + 1}</th>
								<th>{item.product_name}</th>

								<th>
									<Link to={`/productDetails/${item._id}`}>
										<button className="btn btn-ghost btn-md bg-white text-blue-400">
											View Details
										</button>
									</Link>
								</th>
								<th style={{ color: item.status === 'accepted' ? "green" : "" }}>
                                <button
										onClick={() => handleDelete(item._id)}
										className="btn btn-ghost btn-lg">
										<FaTrashAlt className="text-red-600"></FaTrashAlt>
									</button>
								</th>
							
							
							</tr>
						)) : null}
					</tbody>
				</table>
			</div>
		</div>
        </div>
    );
};

export default ReportedProducts;
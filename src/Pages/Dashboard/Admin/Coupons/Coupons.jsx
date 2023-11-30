import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useCoupons from "../../../../hooks/useCoupons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddCard } from "react-icons/md";

const Coupons = () => {
	const [coupons, refetch] = useCoupons();
	const axiosSecure = useAxiosSecure();
	const [isCouponFormVisible, setCouponFormVisibility] = useState(false);

	const handleCouponAddClick = () => {
		setCouponFormVisibility(!isCouponFormVisible);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty: resetForm },
	} = useForm();

	//add coupon
	const onSubmit = async (data) => {
		const coupon = {
			coupon_code: data.coupon_code,
			expiry_date: data.expiry_date,
			discount_amount: parseInt(data.discount_amount),
			description: data.description,
		};
		//

		const CouponRes = await axiosSecure.post("/coupons", coupon);

		if (CouponRes.data.insertedId > 0) {
			// show success popup
			if (resetForm) {
				reset();
			}

			refetch();
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Coupon is added to the database.",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	//delete coupon
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
				{/* add coupon */}
				<div>
					<button
						className="btn btn-info text-xl text-white mt-5"
						onClick={handleCouponAddClick}>
						{isCouponFormVisible
							? "Hide Coupon Form"
							: "Add Coupon"}
					</button>
					{isCouponFormVisible && (
						// Render your coupon form component here
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-control w-full my-6">
								<label className="label">
									<span className="label-text">
										Coupon Code
									</span>
								</label>
								<input
									type="text"
									{...register("coupon_code", {
										required: true,
									})}
									required
									className="input input-bordered w-full"
								/>
							</div>
							<div className="form-control w-full my-6">
								<label className="label">
									<span className="label-text">
										Expiry Date
									</span>
								</label>
								<input
									type="date"
									placeholder="Expiry Date"
									{...register("expiry_date", {
										required: true,
									})}
									required
									className="input input-bordered w-full"
								/>
							</div>

							<div className="form-control w-full my-6">
								<label className="label">
									<span className="label-text">
										Discount Amount
									</span>
								</label>
								<input
									type="number"
									{...register("discount_amount", {
										required: true,
									})}
									required
									className="input input-bordered w-full"
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Description
									</span>
								</label>
								<textarea
									{...register("description", {
										required: true,
									})}
									className="textarea textarea-bordered h-24"
									placeholder="Description"></textarea>
							</div>

							<button className="btn bg-primary text-white mt-5 mb-10">
								Submit <MdAddCard />
							</button>
						</form>
					)}
				</div>

				{/* review tabular form */}
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
											to={`/dashboard/updateCoupon/${item._id}`}>
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

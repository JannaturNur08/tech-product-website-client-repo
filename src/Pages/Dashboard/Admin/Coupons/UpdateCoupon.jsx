import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

import Swal from "sweetalert2";
import { MdAddCard } from "react-icons/md";
import { useEffect } from "react";

const UpdateCoupon = () => {
	const { _id, coupon_code, expiry_date, discount_amount, description } =
		useLoaderData();
	const axiosSecure = useAxiosSecure();

	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues: {
			coupon_code,
			expiry_date,
			discount_amount,
			description,
		},
	});
	const onSubmit = async (data) => {
		const coupon = {
			coupon_code: data.coupon_code,
			expiry_date: data.expiry_date,
			discount_amount: parseInt(data.discount_amount),
			description: data.description,
		};
		//
		console.log(data.timestamp);
		const CouponRes = await axiosSecure.patch(`/coupons/${_id}`, coupon);

		if (CouponRes.data.modifiedCount > 0) {
			// show success popup
			reset();
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: 'Data is updated to the coupon.',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	// Use useEffect to set default values after component is mounted
	useEffect(() => {
		setValue("coupon_code", coupon_code);
		setValue("expiry_date", expiry_date);
		setValue("discount_amount", discount_amount);
		setValue("description", description);
	}, [coupon_code, expiry_date, discount_amount, description, setValue]);

	return (
		<div>
			<h2>Update Coupon here</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full my-6">
					<label className="label">
						<span className="label-text">Coupon Code</span>
					</label>
					<input
						type="text"
						defaultValue={coupon_code}
						{...register("coupon_code", { required: true })}
						required
						className="input input-bordered w-full"
					/>
				</div>
				<div className="form-control w-full my-6">
					<label className="label">
						<span className="label-text">Expiry Date</span>
					</label>
					<input
						type="date"
						placeholder="Expiry Date"
						defaultValue={expiry_date}
						{...register("expiry_date", { required: true })}
						required
						className="input input-bordered w-full"
					/>
				</div>

				<div className="form-control w-full my-6">
					<label className="label">
						<span className="label-text">Discount Amount</span>
					</label>
					<input
						type="number"
						defaultValue={discount_amount}
						{...register("discount_amount", { required: true })}
						required
						className="input input-bordered w-full"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<textarea
						{...register("description", { required: true })}
						className="textarea textarea-bordered h-24"
						defaultValue={description}
						placeholder="Description"></textarea>
				</div>

				<button className="btn bg-primary text-white">
					Submit <MdAddCard />
				</button>
			</form>
		</div>
	);
};

export default UpdateCoupon;

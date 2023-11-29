import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOut = () => {
	const { user } = useAuth();
	const [clientSecret, setClientSecret] = useState("");
	const axiosSecure = useAxiosSecure();
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [discount, setDiscount] = useState(0);
	const [transactionId, setTransactionId] = useState("");
	const subscriptionAmount = 100;

    useEffect(() => {
        if (subscriptionAmount > 0) {
          axiosSecure.post('/create-payment-intent', { price: subscriptionAmount })
            .then(res => {
              console.log(res.data.clientSecret);
              setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
              console.error('Error fetching client secret:', err);
            });
        }
      }, [axiosSecure, subscriptionAmount]);

	//apply coupon
	const handleApplyCoupon = () => {
		if (couponCode) {
			axiosSecure
				.post("/api/validate-coupon", { couponCode })
				.then((res) => {
					if (res.data.isValid) {
						setDiscount(res.data.discount);
						setError("");
					} else {
						setDiscount(0);
						setError("Invalid coupon code. Please try again.");
					}
				})
				.catch((error) => {
					console.error(error);
					setError("Coupon validation failed. Please try again.");
				});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (!card) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("[error]", error);
			setError(error.message);
		} else {
			console.log("[PaymentMethod]", paymentMethod);
			setError("");
		}

		// Confirm payment
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || "anonymous",
						name: user?.displayName || "anonymous",
					},
				},
			});

		if (confirmError) {
			console.log("confirm error");
		} else {
			console.log("payment intent", paymentIntent);
			if (paymentIntent.status === "succeeded") {
				console.log("transaction id", paymentIntent.id);
				setTransactionId(paymentIntent.id);

				// Now save the payment in the database
				const payment = {
					email: user.email,
					price: calculateAmountAfterDiscount(discount),
					transactionId: paymentIntent.id,
					date: new Date(),

					status: "subscribed",
				};

				try {
					const res = await axiosSecure.post("/payments", payment);
					console.log("payment saved", res.data);

					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Thank you for subscribing!",
						showConfirmButton: false,
						timer: 1500,
					});
					// navigate('/dashboard/paymentHistory');
				} catch (saveError) {
					console.error("Error saving payment:", saveError);
				}
			}
		}
	};

	const calculateAmountAfterDiscount = (discount, amount) => {
		return amount - (amount * discount) / 100;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="form-control w-full my-6 flex flex-row gap-2">
					<label className="label">
						<span className="label-text">Coupon Code:</span>
					</label>
					<input
						type="text"
						value={couponCode}
						onChange={(e) => setCouponCode(e.target.value)}
						className="input input-bordered "
					/>
					<button
						onClick={handleApplyCoupon}
						className="btn btn-outline btn-accent">
						Apply Coupon
					</button>
				</div>

				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button
					type="submit"
					disabled={!stripe || !clientSecret}
					className="btn bg-primary text-white px-5 py-2 mt-5">
					Subscribe
				</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{discount > 0 && (
				<p style={{ color: "green" }}>Discount Applied: {discount}%</p>
			)}
			{transactionId && (
				<p className="text-green-600">
					Your transaction id : {transactionId}
				</p>
			)}
		</div>
	);
};

export default CheckOut;

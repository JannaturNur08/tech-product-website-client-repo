const CouponCard = ({ coupon}) => {
	const { coupon_code, expiry_date, discount_amount, description } = coupon;
    console.log(coupon);
    
	return (
		<div>
			<div className="card  bg-base-100 w-96  p-10">
				<div className="card-body">
					<h2 className="card-title text-[#F544C7]">{discount_amount}% OFF</h2>
					<h4 >Use Coupon Code <span className="ml-2 font-bold">{coupon_code}</span></h4>
					<p>{expiry_date}</p>
					<p className="h-[100px] text-sm">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default CouponCard;

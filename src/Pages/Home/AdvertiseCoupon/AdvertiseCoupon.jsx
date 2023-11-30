import Slider from "react-slick";
import TilteSection from "../../../components/TitleSection/TilteSection";
import useCoupons from "../../../hooks/useCoupons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CouponCard from "./CouponCard";


const AdvertiseCoupon = () => {
	const [coupons, refetch] = useCoupons();
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        autoplay: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		  ]
      };
	
	// useEffect(() => {
	// 	refetch();
	// }, [refetch]);
	return (
		<div className="mx-auto container mb-10">
			<TilteSection title="Coupon For Subscription"></TilteSection>
			<div className="mx-auto container">
            <Slider {...settings}>
					{Array.isArray(coupons)
						? coupons.map((coupon) => (
								<CouponCard
									key={coupon._id}
									coupon={coupon}
									refetch={refetch}></CouponCard>
						  ))
						: null}
                        </Slider>
				
			</div>
		</div>
	);
};

export default AdvertiseCoupon;

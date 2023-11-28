import { Link } from "react-router-dom";
import TilteSection from "../../../components/TitleSection/TilteSection";

import TrendingCard from "./TrendingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSortByAccepted from "../../../hooks/useSortByAccepted";
import { useEffect } from "react";


const TrendingSection = () => {
	const settings = {
		dots: true,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		speed: 1000,
		autoplaySpeed: 1000,
		cssEase: "linear",
	};

	const [products, refetch] = useSortByAccepted();
	const sortedProducts = Array.isArray(products)?products.sort((a,b)=> {
		return a.vote > b.vote ? -1 : 1;
	}) : null;
	
	useEffect(()=> {
		refetch();
	}
		
		,[refetch])
	return (
		<div className="mx-auto container mb-10">
			<TilteSection title="Trending Products"></TilteSection>
			<div className=" gap-5 my-16 mx-auto container">
				<Slider {...settings}>
					{Array.isArray(sortedProducts)
						? sortedProducts
								.slice(0, 6)
								.map((item) => (
									<TrendingCard
										key={item._id}
										item={item}
										refetch={refetch}></TrendingCard>
								))
						: null}
				</Slider>

				
			</div>
			<Link to="/products" className="flex justify-center">
					<button className=" btn bg-primary text-white px-5 py-2">
						Show All Products
					</button>
				</Link>
		</div>
	);
};

export default TrendingSection;

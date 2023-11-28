import { Link } from "react-router-dom";
import TilteSection from "../../../components/TitleSection/TilteSection";
import useSortByVoteTrending from "../../../hooks/useSortByVoteTrending";
import TrendingCard from "./TrendingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSortByAccepted from "../../../hooks/useSortByAccepted";


const TrendingSection = () => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 1000,
		cssEase: "linear",
	};

	const [products, refetch] = useSortByAccepted();
	const sortedProducts = Array.isArray(products)?products.sort((a,b)=> {
		return a.vote > b.vote ? -1 : 1;
	}) : null;
	
	refetch();
	return (
		<div>
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
			<Link to="/products">
					<button className=" btn bg-primary text-white">
						Show All Products
					</button>
				</Link>
		</div>
	);
};

export default TrendingSection;

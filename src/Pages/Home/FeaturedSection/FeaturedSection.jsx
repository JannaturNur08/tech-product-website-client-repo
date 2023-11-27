
import FeaturedCard from "./FeaturedCard";
import useSortByTimestampFeatured from "../../../hooks/useSortByTimestampFeatured";
import TilteSection from "../../../components/TitleSection/TilteSection";

const FeaturedSection = () => {
	const [products] = useSortByTimestampFeatured();
    console.log(products);
	

	

	return (
		<div>
			<TilteSection title="Featured Products"></TilteSection>
			<div className="grid md:grid-cols-2 gap-10 my-16 mx-auto container">
				{ products?.slice(0,6).map((item) => (
					<FeaturedCard key={item._id} item={item} ></FeaturedCard>
				))}
			</div>
		</div>
	);
};

export default FeaturedSection;

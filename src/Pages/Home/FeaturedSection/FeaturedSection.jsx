import FeaturedCard from "./FeaturedCard";
// import useSortByTimestampFeatured from "../../../hooks/useSortByTimestampFeatured";
import TilteSection from "../../../components/TitleSection/TilteSection";
import { useEffect } from "react";
import useSortByAccepted from "../../../hooks/useSortByAccepted";
// import { useEffect } from "react";

const FeaturedSection = () => {
	// const [featuredProducts, refetch] = useSortByTimestampFeatured();
	const [products, refetch] = useSortByAccepted();
	const featuredProducts = products.filter(product => product.featured === 'featured');
	const sortedProducts = Array.isArray(featuredProducts)?featuredProducts.sort((a,b)=> {
		return a.timestamp > b.timestamp ? -1 : 1;
	}) : null;
	
	useEffect(()=> {
		refetch();
	}
		
		,[refetch])

	return (
		<div>
			<TilteSection title="Featured Products"></TilteSection>
			<div className="grid md:grid-cols-2 gap-10 my-16 mx-auto container">
				{Array.isArray(sortedProducts)
					? sortedProducts
							.slice(0, 4)
							.map((item) => (
								<FeaturedCard
									key={item._id}
									item={item}
									refetch={refetch}></FeaturedCard>
							))
					: null}
			</div>
		</div>
	);
};

export default FeaturedSection;

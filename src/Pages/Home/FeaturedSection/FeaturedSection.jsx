
import FeaturedCard from "./FeaturedCard";
import useSortByTimestampFeatured from "../../../hooks/useSortByTimestampFeatured";
import TilteSection from "../../../components/TitleSection/TilteSection";
import { useEffect } from "react";

const FeaturedSection = () => {
	const [products,refetch] = useSortByTimestampFeatured();
	//refetch();
    //console.log(products);
	
	useEffect(()=> {
		refetch();
	}
		
		,[refetch])

	

	return (
		<div>
			<TilteSection title="Featured Products"></TilteSection>
			<div className="grid md:grid-cols-2 gap-10 my-16 mx-auto container">
			{Array.isArray(products)
					? products.slice(0, 4).map((item) => (
							<FeaturedCard
								key={item._id}
								item={item}
								refetch={refetch}
							></FeaturedCard>
					  ))
					: null}
			</div>
		</div>
	);
};

export default FeaturedSection;

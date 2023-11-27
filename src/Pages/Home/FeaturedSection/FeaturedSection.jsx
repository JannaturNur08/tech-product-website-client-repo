
import FeaturedCard from "./FeaturedCard";
import useSortByTimestampFeatured from "../../../hooks/useSortByTimestampFeatured";

const FeaturedSection = () => {
	const [products, refetch] = useSortByTimestampFeatured();
    console.log(products);
	

	

	return (
		<div>
			<h2>Featured Section</h2>
			<div className="grid md:grid-cols-2 gap-10 my-16">
				{products.map((item) => (
					<FeaturedCard key={item._id} item={item} refetch={refetch}></FeaturedCard>
				))}
			</div>
		</div>
	);
};

export default FeaturedSection;

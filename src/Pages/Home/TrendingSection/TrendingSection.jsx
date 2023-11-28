import { Link } from "react-router-dom";
import TilteSection from "../../../components/TitleSection/TilteSection";
import useSortByVoteTrending from "../../../hooks/useSortByVoteTrending";
import TrendingCard from "./TrendingCard";

const TrendingSection = () => {
   
	const [products, refetch] = useSortByVoteTrending();
	refetch();
	return (
		<div>
			<TilteSection title="Trending Products"></TilteSection>
			<div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5 my-16 mx-auto container">
				{Array.isArray(products)
					? products
							.slice(0, 6)
							.map((item) => (
								<TrendingCard
									key={item._id}
									item={item}
									refetch={refetch}></TrendingCard>
							))
					: null}
					<Link to='/products'>
      <button className=" btn bg-primary text-white">Show All Products</button></Link>
			</div>
			
		</div>
	);
};

export default TrendingSection;

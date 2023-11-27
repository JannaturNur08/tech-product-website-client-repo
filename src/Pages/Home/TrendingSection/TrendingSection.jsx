import TilteSection from "../../../components/TitleSection/TilteSection";
import useSortByVoteTrending from "../../../hooks/useSortByVoteTrending";
import TrendingCard from "./TrendingCard";

const TrendingSection = () => {
    refetch();
	const [products, refetch] = useSortByVoteTrending();
	return (
		<div>
			<TilteSection title="Trending Products"></TilteSection>
			<div className="grid md:grid-cols-2 gap-10 my-16 mx-auto container">
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
			</div>
		</div>
	);
};

export default TrendingSection;

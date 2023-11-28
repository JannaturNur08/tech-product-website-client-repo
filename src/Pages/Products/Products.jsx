import useSortByAccepted from "../../hooks/useSortByAccepted";
import ProductCard from "./ProductCard";

const Products = () => {
	const [products, refetch] = useSortByAccepted();
    refetch();
	return (
		<div>
			<h2>This is Products Page</h2>
			<div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:gap-10 my-16 mx-auto container ">
				{Array.isArray(products)
					? products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}></ProductCard>
					  ))
					: null}
			</div>
		</div>
	);
};

export default Products;

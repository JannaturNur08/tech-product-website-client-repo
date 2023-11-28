import { useRef, useState } from "react";
import useSortByAccepted from "../../hooks/useSortByAccepted";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Products = () => {
    const axiosPublic = useAxiosPublic();
	const [products, refetch] = useSortByAccepted();
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    const {  data: searchProducts = [] } = useQuery({
		queryKey: ["searchProducts", search],
		queryFn: async () => {
			const res = await axiosPublic.get(
				`/searchProducts?search=${search}`
			);
			return res.data;
		},
	});
    
    const handleSearch = () => {
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
        refetch();
    }
	return (
		<div className="mx-auto container">
			<h2>This is Products Page</h2>
            <div className="form-control mt-32">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered pt-2" />
                        <button onClick={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
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

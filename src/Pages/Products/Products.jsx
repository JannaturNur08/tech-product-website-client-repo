import { useRef, useState } from "react";
import useSortByAccepted from "../../hooks/useSortByAccepted";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Products = () => {
	const axiosPublic = useAxiosPublic();
	const [products] = useSortByAccepted();
	const searchRef = useRef(null);
	const [search, setSearch] = useState("");

	const [currentPage,setCurrentPage] = useState(0);
	const itemsPerPage = 20;

	const { refetch, data: searchProducts = [] } = useQuery({
		queryKey: ["searchProducts", search, currentPage],
		queryFn: async () => {
			const res = await axiosPublic.get(
				`/searchProducts/${encodeURIComponent(search)}?page=${currentPage}&size=${itemsPerPage}`
			);
			return res.data;
		},
	});
	console.log(currentPage);
	let count = 100;
	console.log(count);
	const numberOfPages = Math.ceil(count / itemsPerPage);
	console.log(numberOfPages);
	const pages = [...Array(numberOfPages).keys()];
	console.log(pages);

	const handleSearch = () => {
		setSearch(searchRef.current.value);
		setCurrentPage(0);
		refetch();
	};
	const handlePrevPage = () => {
		if(currentPage>0){
            setCurrentPage(prevState=> prevState-1);
        }
	};

	const handleNextPage = () => {
		if (currentPage < numberOfPages -1) {
			setCurrentPage((nextState) => nextState + 1);
			refetch();
		}
		console.log('next page clicked');
	};
	const getPageProducts = () => {
		const start = currentPage * itemsPerPage;
		const end = start + itemsPerPage;
		return products.slice(start, end);
	  };

	return (
		<div className="mx-auto container">
			<h2>This is Products Page</h2>
			<div className="form-control mt-32">
				<div className="input-group">
					<input
						type="text"
						ref={searchRef}
						placeholder="Search…"
						className="input input-bordered pt-2"
					/>
					<button onClick={handleSearch} className="btn btn-square">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:gap-10 my-16 mx-auto container ">
				{Array.isArray(searchProducts) && search.length > 0
					? searchProducts.map((product) => (
							<ProductCard
								key={product._id}
								product={product}></ProductCard>
					  ))
					: getPageProducts().map((product) => (
							<ProductCard
								key={product._id}
								product={product}></ProductCard>
					  ))}
			</div>

			<div className="flex justify-center mb-10 gap-5">
				<button
					className="btn px-5 py-2 text-xl btn-outline"
					onClick={handlePrevPage}
					>
					Prev
				</button>
				<button className="btn px-5 py-2 text-xl btn-outline" onClick={handleNextPage}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Products;

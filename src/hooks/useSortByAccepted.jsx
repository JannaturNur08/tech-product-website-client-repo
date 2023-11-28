import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSortByAccepted = () => {
    const axiosPublic = useAxiosPublic();

	const { refetch, data: products = [] } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axiosPublic.get("/api/acceptedProducts");
            return res.data;
		},
	});
	return [products, refetch];
};

export default useSortByAccepted;
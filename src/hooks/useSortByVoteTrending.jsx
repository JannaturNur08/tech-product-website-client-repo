import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSortByVoteTrending = () => {
    const axiosPublic = useAxiosPublic();

	const { refetch, data: products = [] } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axiosPublic.get("/api/trendingProducts");
            return res.data;
		},
	});
	return [products, refetch];
};

export default useSortByVoteTrending;
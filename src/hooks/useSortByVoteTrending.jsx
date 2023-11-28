import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSortByVoteTrending = () => {
    const axiosPublic = useAxiosPublic();

	const { refetch, data: productsTrending = [] } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axiosPublic.get("/api/trendingProducts");
            return res.data;
		},
	});
	return [productsTrending, refetch];
};

export default useSortByVoteTrending;
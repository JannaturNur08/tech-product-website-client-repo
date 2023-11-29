import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSortByTimestampFeatured = () => {
	const axiosPublic = useAxiosPublic();

	const { refetch, data: featuredProducts = [] } = useQuery({
		queryKey: ["featuredProducts"],
		queryFn: async () => {
			const res = await axiosPublic.get("/api/featuredProducts");
            return res.data;
		},
	});
	return [featuredProducts, refetch];
};

export default useSortByTimestampFeatured;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useReviews = (productId) => {
    const axiosPublic = useAxiosPublic();

	const {  refetch: reviewsRefetch , data: reviews = [] } = useQuery({
		queryKey: ["reviews",productId],
		queryFn: async () => {
			const res = await axiosPublic.get(`/api/reviews/${productId}`);
			return res.data;
		},
	});

	return [reviews, reviewsRefetch];
};

export default useReviews;
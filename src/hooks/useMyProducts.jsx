import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyProducts = () => {
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const { refetch, data: myProducts = [] } = useQuery({
		queryKey: ["myProducts", user?.email],
		queryFn: async () => {
			const res = await axiosPublic.get(
				`/myProducts?email=${user.email}`
			);
			return res.data;
		},
	});

	return [myProducts, refetch];
};

export default useMyProducts;

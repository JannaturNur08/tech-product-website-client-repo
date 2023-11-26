import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSortByPendingProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const res = await axiosPublic.get("/products");
          const sortedData = res.data.sort((a, b) => {
            // Custom sorting logic based on "status"
            const statusOrder = { pending: 0, accepted: 1, rejected: 2 };
            return statusOrder[a.status] - statusOrder[b.status];
          });
          return sortedData;
        },
    });
    return [products,refetch];
};

export default useSortByPendingProducts;
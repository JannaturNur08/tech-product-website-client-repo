import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";


const useCoupons = () => {
    const axiosPublic = useAxiosPublic();
   const { refetch , data: coupons =[]} = useQuery({
        queryKey:  ["coupons"],
        queryFn: async ()=>{
            const res = await axiosPublic.get("/coupons");
			return res.data;
        }
   })
   return [coupons,refetch];
};

export default useCoupons;
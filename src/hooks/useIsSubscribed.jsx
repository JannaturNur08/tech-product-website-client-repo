
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useIsSubscribed = () => {
    const { user,loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data : isSubscribe  } = useQuery({
        queryKey: [user?.email, 'isSubscribe'],
        enabled: !loading && !!localStorage.getItem('token'),
        queryFn: async ()=> {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            console.log(res.data);
            return res.data?.subscribed;
        }
    })
    return [isSubscribe ];
};

export default useIsSubscribed;
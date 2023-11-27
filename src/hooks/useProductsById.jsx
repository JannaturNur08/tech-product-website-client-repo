import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useProductsById = () => {
    const axiosPublic = useAxiosPublic();

	const { refetch, data: products = [] } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axiosPublic.get(`/products/${_id}`);
			return res.data;
		},
	});

	return [products, refetch];
};

export default useProductsById;
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Chart } from "react-google-charts";
import { Helmet } from "react-helmet-async";

const Statistics = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: statistics = {} } = useQuery({
		queryKey: ["adminStatistic"],
		queryFn: async () => {
			const res = await axiosSecure.get("/adminStatistic");
			return res.data;
		},
	});

	const data = [
		[ "Statistics",  "Admin"],
		[ "Total Users",  statistics.users],
		[ "Total Products",  statistics.product],
		[ "Total Reviews",  statistics.reviews],
		
	];

	const options = {
		title: "Admin Statistics",
	};

	console.log(statistics);
	return (
		<div>
			<Helmet>
				<title>Admin Dashboard</title>
			</Helmet>
			<h2 className="text-3xl mt-10">
				<span>Hi, Welcome </span>
				{user?.displayName ? user.displayName : "Back"}
			</h2>
			<div className="mt-10">
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-figure text-secondary">
							<FaUsers className="text-3xl"></FaUsers>
						</div>
						<div className="stat-title">Total Users</div>
						<div className="stat-value">{statistics.users}</div>
						<div className="stat-desc">↗︎ 400 (22%)</div>
					</div>

					<div className="stat">
						<div className="stat-figure text-secondary">
							<MdOutlineProductionQuantityLimits className="text-3xl" />
						</div>
						<div className="stat-title">Total Products</div>
						<div className="stat-value">{statistics.product}</div>
						<div className="stat-desc">↗︎ 400 (22%)</div>
					</div>
					<div className="stat">
						<div className="stat-figure text-secondary">
							<MdRateReview className="text-3xl" />
						</div>
						<div className="stat-title">Total Reviews</div>
						<div className="stat-value">{statistics.reviews}</div>
						<div className="stat-desc">↗︎ 400 (22%)</div>
					</div>
				</div>

				<div>
					<Chart
						chartType="PieChart"
						data={data}
						options={options}
						width={"100%"}
						height={"400px"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Statistics;

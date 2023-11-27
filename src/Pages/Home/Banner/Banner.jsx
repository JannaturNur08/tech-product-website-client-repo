const Banner = () => {
	return (
		<div className="w-full">
			<div className="relative">
				<img src="https://i.ibb.co/Q9S8N5K/Mask-group.png" alt="" />
				<div className="absolute  top-40 space-y-5 ml-10">
					<h2 className="   text-white text-6xl font-bold">
						Connecting People <br /> and Technology
					</h2>
					<p className="font-jost text-sm text-white max-w-[500px]">
						Explore the ever-evolving world of technology on our
						blog. From the latest innovations to insightful
						analyses, we bring you a curated blend of information
						and inspiration. Stay ahead in the digital realm with
						our tech-savvy content, covering everything from gadgets
						to cutting-edge trends
					</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;

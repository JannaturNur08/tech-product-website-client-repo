const Banner = () => {
	return (
		<div className="mt-10">
			<div className="w-full ">
			<div className="relative">
				<img src="https://i.ibb.co/Q9S8N5K/Mask-group.png" alt="" className="h-[250px] md:h-auto" />
				<div className="absolute bottom-8 lg:top-40 lg:space-y-5 ml-10 lg:mt-10">
					<h2 className="   text-white lg:text-6xl text-2xl font-bold">
						Connecting People <br /> and Technology
					</h2>
					<p className="font-jost text-sm text-white lg:max-w-[500px]">
						Explore the ever-evolving world of technology on our
						blog. From the latest innovations to insightful
						analyses, we bring you a curated blend of information
						and inspiration.
					</p>
				</div>
			</div>
		</div>
		</div>
	);
};

export default Banner;

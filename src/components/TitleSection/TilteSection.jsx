const TilteSection = ({ title, subTitle }) => {
	return (
		<div>
			<div className="mx-auto text-center md:w-4/12 my-8 font-jakarta font-bold">
				<p className=" mb-2 text-base">{subTitle}</p>
				<h3 className="text-3xl uppercase  py-4">{title}</h3>
			</div>
		</div>
	);
};

export default TilteSection;



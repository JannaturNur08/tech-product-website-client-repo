
import { Helmet } from "react-helmet-async";
import AdvertiseCoupon from "../AdvertiseCoupon/AdvertiseCoupon";
import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import TrendingSection from "../TrendingSection/TrendingSection";


const Home = () => {
   
    return (
        <div className="overflow-x-hidden">
            <Helmet>
				<title>Home || MatraTech</title>
			</Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <TrendingSection></TrendingSection>
            <AdvertiseCoupon></AdvertiseCoupon>
        </div>
    );
};

export default Home;
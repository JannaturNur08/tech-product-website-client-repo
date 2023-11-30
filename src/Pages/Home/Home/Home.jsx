
import AdvertiseCoupon from "../AdvertiseCoupon/AdvertiseCoupon";
import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import TrendingSection from "../TrendingSection/TrendingSection";


const Home = () => {
   
    return (
        <div className="overflow-x-hidden">
            <h2>this is home</h2>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <TrendingSection></TrendingSection>
            <AdvertiseCoupon></AdvertiseCoupon>
        </div>
    );
};

export default Home;
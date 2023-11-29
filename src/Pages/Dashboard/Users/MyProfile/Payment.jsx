import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import TilteSection from "../../../../components/TitleSection/TilteSection";
//load publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);
const Payment = () => {
    return (
        <div>
            <TilteSection title="Subscribe" subTitle="Please Subscribe For Membership"></TilteSection>
            
            <div>
               <Elements stripe={stripePromise}>
                   <CheckOut></CheckOut>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;
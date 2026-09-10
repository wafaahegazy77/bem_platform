import Download from "@/components/home/Download/Download";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Faqs from "@/components/pricing/Faqs/Faqs";
import PricingHeader from "@/components/pricing/PricingHeader/PricingHeader";
import PricingPlans from "@/components/pricing/PricingPlans/PricingPlans";

export default function PricingPage() {
    return (
        <>
            <Navbar />
            <main>
                <PricingHeader />
                <PricingPlans />


                <Faqs />
                <Download />
            </main>
            <Footer />
        
        </>

    );
}
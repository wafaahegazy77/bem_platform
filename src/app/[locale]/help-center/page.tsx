import Navbar from "@/components/layout/Navbar";
import Categories from "@/components/help-center/Categories/Categories";
import CreateOrganization from "@/components/help-center/CreateOrganization/CreateOrganization";
import Footer from "@/components/layout/Footer";
import Faqs from "@/components/pricing/Faqs/Faqs";
import Download from "@/components/home/Download/Download";
import HelpCenterContact from "@/components/help-center/HelpCenterContact/HelpCenterContact";

export default function HelpCenterPage() {
    return (
        <>
            <Navbar />

            <main>
                <CreateOrganization />
                <Categories />
                <div className="bg_linear_light">
                    <Faqs />
                </div>
                <HelpCenterContact />
                <Download />
            </main>

            <Footer />
        </>
    );
}
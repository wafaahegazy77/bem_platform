import Features from "@/components/home/Features/Features";
import Hero from "@/components/home/Hero/Hero";
import TeamLink from "@/components/home/TeamLink/TeamLink";
import Download from "@/components/home/Download/Download";
import WhyUs from "@/components/home/WhyUs/WhyUs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <Features />
                <WhyUs />
                <TeamLink/>
                <Download />
            </main>

            <Footer />
        </>
    );
}
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Privacy from "@/components/privacy/Privacy/Privacy";
import Footer from "@/components/layout/Footer";

export default async function PrivacyPage() {
    const locale = await getLocale();

    const response = await api.getPage("privacy", locale);
    const page = response?.data;

    return (
        <>
            <Navbar />

            <main>
                <Privacy page={page} />
            </main>

            <Footer />
        </>
    );
}
    import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Terms from "@/components/terms/Terms/Terms";
import Footer from "@/components/layout/Footer";

export default async function TermsPage() {
    const locale = await getLocale();

    const response = await api.getPage("terms", locale);
    const page = response?.data;

    return (
        <>
            <Navbar />

            <main>
                <Terms page={page} />
            </main>

            <Footer />
        </>
    );
}
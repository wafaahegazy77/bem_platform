import { getTranslations } from "next-intl/server";
import "./_Terms.scss";
import TermsAccordion from "../TermsAccordion/TermsAccordion";

type TermsPageData = {
    id: number;
    key: string;
    title: string;
    content: string;
};

type TermsSection = {
    title: string;
    content: string;
};

const parseSections = (content: string): TermsSection[] => {
    const sections: TermsSection[] = [];

    const parts = content.split(/<h4[^>]*>/i);

    parts.slice(1).forEach((part) => {
        const titleMatch = part.match(
            /^([\s\S]*?)<\/h4>/i
        );

        if (!titleMatch) {
            return;
        }

        const title = titleMatch[1].trim();

        const sectionContent = part
            .replace(titleMatch[0], "")
            .trim();

        sections.push({
            title,
            content: sectionContent,
        });
    });

    return sections;
};

const Terms = async ({
    page,
}: {
    page?: TermsPageData;
}) => {
    const t = await getTranslations("terms");

    const sections = page?.content
        ? parseSections(page.content)
        : [];

    return (
        <div className="terms-page">
            <section className="terms-hero">
                <div className="container">
                    <div className="terms-hero-content text-center">
                        <span className="terms-badge">
                            {t("badge")}
                        </span>

                        <h1 className="terms-title fsz-40 fw-600 mb-4">
                            {page?.title}
                        </h1>

                        <p className="terms-description fsz-15 cr-666 fw-500">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="terms-content">
                <div className="container">
                    <TermsAccordion sections={sections} />
                </div>
            </section>
        </div>
    );
};

export default Terms;
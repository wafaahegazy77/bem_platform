import { getTranslations } from "next-intl/server";
import "./_Privacy.scss";
import PrivacyContent from "../PrivacyContent/PrivacyContent";
import PrivacySidebar from "../PrivacySidebar/PrivacySidebar";
import PrivacyContact from "../PrivacyContact/PrivacyContact";

type PrivacyPageData = {
    id: number;
    key: string;
    title: string;
    content: string;
};

type PrivacySection = {
    id: number;
    title: string;
    content: string;
};

const parsePrivacyContent = (
    content: string
): {
    intro: string;
    sections: PrivacySection[];
} => {
    const sections: PrivacySection[] = [];

    const parts = content.split(/<h4[^>]*>/i);

    const intro = parts[0]?.trim() || "";

    parts.slice(1).forEach((part, index) => {
        const titleMatch = part.match(
            /^([\s\S]*?)<\/h4>/i
        );

        if (!titleMatch) {
            return;
        }

        sections.push({
            id: index + 1,
            title: titleMatch[1].trim(),
            content: part
                .replace(titleMatch[0], "")
                .trim(),
        });
    });

    return {
        intro,
        sections,
    };
};

const Privacy = async ({
    page,
}: {
    page?: PrivacyPageData;
}) => {
    const t = await getTranslations("privacy");

    const parsed = page?.content
        ? parsePrivacyContent(page.content)
        : {
              intro: "",
              sections: [],
          };

    return (
        <div className="privacy-page">
            <section className="privacy-hero">
                <div className="container">
                    <div className="privacy-hero-content text-center">
                        <span className="privacy-badge">
                            {t("badge")}
                        </span>

                        <h1 className="privacy-title fsz-40 fw-600 mb-4">
                            {page?.title}
                        </h1>

                        <p className="privacy-description fsz-15 cr-666 fw-500 col-lg-6 mx-auto">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="privacy-content">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-3 privacy-sidebar-column">
                            <PrivacySidebar
                                sections={parsed.sections}
                            />
                        </div>

                        <div className="col-lg-9">
                            <PrivacyContent
                                intro={parsed.intro}
                                sections={parsed.sections}
                            />

                            <div id="privacy-contact">
                                <PrivacyContact />
                            </div>
                        </div>
                    </div>

                    
                </div>
            </section>
        </div>
    );
};

export default Privacy;
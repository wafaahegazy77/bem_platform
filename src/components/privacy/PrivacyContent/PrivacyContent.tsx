"use client";

import "./_PrivacyContent.scss";

type PrivacySection = {
    id: number;
    title: string;
    content: string;
};

const PrivacyContent = ({
    intro,
    sections,
}: {
    intro: string;
    sections: PrivacySection[];
}) => {
    return (
        <div className="privacy-main-content">
            {intro && (
                <div
                    className="privacy-intro"
                    dangerouslySetInnerHTML={{
                        __html: intro,
                    }}
                />
            )}

            <div className="privacy-sections">
                {sections.map((section) => (
                    <section
                        className="privacy-section"
                        id={`privacy-section-${section.id}`}
                        key={section.id}
                    >
                        <h2 className="privacy-section-title">
                            <span className="privacy-section-icon">
                                <i className="fa-light fa-file-lines" />
                            </span>

                            <span>
                                {section.title}
                            </span>
                        </h2>

                        <div
                            className="privacy-section-content"
                            dangerouslySetInnerHTML={{
                                __html: section.content,
                            }}
                        />
                    </section>
                ))}
            </div>
        </div>
    );
};

export default PrivacyContent;
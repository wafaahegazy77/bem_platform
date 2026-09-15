"use client";

import { useState } from "react";
import "./_TermsAccordion.scss";

type TermsSection = {
    title: string;
    content: string;
};

const TermsAccordion = ({
    sections,
}: {
    sections: TermsSection[];
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleSection = (index: number) => {
        setOpenIndex((current) =>
            current === index ? null : index
        );
    };

    return (
        <div className="terms-accordion col-lg-10 mx-auto">
            {sections.map((section, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        className={`terms-item ${
                            isOpen ? "active" : ""
                        }`}
                        key={`${section.title}-${index}`}
                    >
                        <button
                            type="button"
                            className="terms-item-header"
                            onClick={() =>
                                toggleSection(index)
                            }
                            aria-expanded={isOpen}
                        >
                            <span className="terms-item-icon">
                                <i className="fa-light fa-file-lines" />
                            </span>

                            <span className="terms-item-title">
                                {section.title}
                            </span>

                            <span className="terms-item-arrow">
                                <i className="fa-light fa-chevron-down" />
                            </span>
                        </button>

                        <div className="terms-item-content-wrapper">
                            <div className="terms-item-content">
                                <div
                                    className="terms-content-inner"
                                    dangerouslySetInnerHTML={{
                                        __html: section.content,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TermsAccordion;
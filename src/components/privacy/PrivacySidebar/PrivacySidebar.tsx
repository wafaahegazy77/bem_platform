"use client";

import { useEffect, useState } from "react";
import "./_PrivacySidebar.scss";
import { useTranslations } from "next-intl";

type PrivacySection = {
    id: number;
    title: string;
    content: string;
};

const PrivacySidebar = ({
    sections,
}: {
    sections: PrivacySection[];
}) => {
    const t = useTranslations("privacy");

    const [activeId, setActiveId] = useState(
        sections[0]?.id
    );

    useEffect(() => {
        const sectionElements = sections
            .map((section) =>
                document.getElementById(
                    `privacy-section-${section.id}`
                )
            )
            .filter(
                (element): element is HTMLElement =>
                    Boolean(element)
            );

        const contactElement =
            document.getElementById("privacy-contact");

        const handleScroll = () => {
            const scrollPosition =
                window.scrollY + 150;

            let currentId = sections[0]?.id;

            sectionElements.forEach((element) => {
                if (
                    element.offsetTop <= scrollPosition
                ) {
                    currentId = Number(
                        element.id.replace(
                            "privacy-section-",
                            ""
                        )
                    );
                }
            });

            if (
                contactElement &&
                contactElement.offsetTop <= scrollPosition
            ) {
                currentId = 0;
            }

            setActiveId(currentId);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, [sections]);

    const scrollToSection = (id: number) => {
        setActiveId(id);

        const element = document.getElementById(
            `privacy-section-${id}`
        );

        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const scrollToContact = () => {
        setActiveId(0);

        const element =
            document.getElementById("privacy-contact");

        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <aside className="privacy-sidebar">
            <div className="privacy-sidebar-list">
                <h6 className="mb-4 fw-400 cr-777 fsz-14">
                    {t("index")}
                </h6>

                {sections.map((section) => (
                    <button
                        type="button"
                        key={section.id}
                        className={`privacy-sidebar-item ${
                            activeId === section.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            scrollToSection(section.id)
                        }
                    >
                        <span className="privacy-sidebar-icon">
                            <i className="fa-light fa-file-lines" />
                        </span>

                        <span className="privacy-sidebar-title">
                            {section.title}
                        </span>

                        <i className="fa-light fa-chevron-left" />
                    </button>
                ))}

                <button
                    type="button"
                    className={`privacy-sidebar-item ${
                        activeId === 0 ? "active" : ""
                    }`}
                    onClick={scrollToContact}
                >
                    <span className="privacy-sidebar-icon">
                        <i className="fa-light fa-envelope" />
                    </span>

                    <span className="privacy-sidebar-title">
                        {t("contactSidebr")}
                    </span>

                    <i className="fa-light fa-chevron-left" />
                </button>
            </div>
        </aside>
    );
};

export default PrivacySidebar;
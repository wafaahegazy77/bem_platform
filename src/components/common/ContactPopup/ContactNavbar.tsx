"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ContactPopup from "./ContactPopup";

const ContactNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("navbar");

    useEffect(() => {
        document.body.style.overflow = isOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                className="contact-btn butn hvr-txt-trans px-4"
                onClick={() => setIsOpen(true)}
            >
                <div
                    className="txt px-2"
                    data-text={t("contact")}
                >
                    <span>{t("contact")}</span>
                </div>
            </button>

            <ContactPopup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default ContactNavbar;
"use client";

import { useTranslations } from "next-intl";
import "./_ContactPopup.scss";

type ContactPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ContactPopup = ({
    isOpen,
    onClose,
}: ContactPopupProps) => {
    const t = useTranslations("contactPopup");

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="contact-popup-overlay"
            onClick={onClose}
        >
            <div
                className="contact-popup"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="contact-popup-header">
                    <button
                        type="button"
                        className="contact-popup-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <i className="fa-light fa-xmark" />
                    </button>

                    <div className="contact-popup-heading">
                        <div className="contact-popup-icon">
                            <i className="fa-light fa-circle-question" />
                        </div>

                        <div>
                            <h2>{t("title")}</h2>
                            <p>{t("description")}</p>
                        </div>
                    </div>
                </div>

                <div className="contact-popup-body">
                    <a
                        href="mailto:sales@beem.sa"
                        className="contact-popup-item"
                    >
                        <div className="contact-popup-item-icon">
                            <i className="fa-light fa-envelope" />
                        </div>

                        <div className="contact-popup-item-content">
                            <span>{t("sales")}</span>
                            <strong>sales@beem.sa</strong>
                        </div>

                        <i className="fa-light fa-chevron-left contact-popup-arrow" />
                    </a>

                    <a
                        href="mailto:support@beem.sa"
                        className="contact-popup-item"
                    >
                        <div className="contact-popup-item-icon">
                            <i className="fa-light fa-headset" />
                        </div>

                        <div className="contact-popup-item-content">
                            <span>{t("support")}</span>
                            <strong>support@beem.sa</strong>
                        </div>

                        <i className="fa-light fa-chevron-left contact-popup-arrow" />
                    </a>
                </div>

                <p className="contact-popup-footer">
                    {t("footer")}
                </p>
            </div>
        </div>
    );
};

export default ContactPopup;
import { getTranslations } from "next-intl/server";
import "./_PrivacyContact.scss";

const PrivacyContact = async () => {
    const t = await getTranslations("privacy.contact");

    return (
        <section className="privacy-contact privacy-section">
            <h2 className="privacy-section-title">
                <span className="privacy-section-icon">
                    <i className="fa-light fa-envelope" />
                </span>

                {t("title")}
            </h2>

            <div className="row">
                <div className="col-lg-4 col-md-4">
                    <div className="privacy-contact-card">
                        <div className="privacy-contact-icon">
                            <i className="fa-light fa-headset" />
                        </div>

                        <div>
                            <h3>{t("technicalTitle")}</h3>
                            <a href="mailto:support@beem.sa">
                                support@beem.sa
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="privacy-contact-card">
                        <div className="privacy-contact-icon">
                            <i className="fa-light fa-envelope" />
                        </div>

                        <div>
                            <h3>{t("generalTitle")}</h3>
                            <a href="mailto:info@beem.sa">
                                info@beem.sa
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="privacy-contact-card">
                        <div className="privacy-contact-icon">
                            <i className="fa-light fa-file-lines" />
                        </div>

                        <div>
                            <h3>{t("legalTitle")}</h3>
                            <a href="mailto:legal@beem.sa">
                                legal@beem.sa
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyContact;
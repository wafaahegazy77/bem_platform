"use client";

import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import PhoneInput from "@/components/common/PhoneInput/PhoneInput";

const BasicApplicationForm = () => {
    const t = useTranslations("application");
    const router = useRouter();

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        router.push("/success/?type=basic");
    };

    return (
        <div className="application-form">
            <div className="application-form-header">
                <h1 className="fsz-40 fw-600">
                    {t("basicTitle")}
                </h1>

                <p className="fsz-20 cr-999">
                    {t("basicDescription")}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2 className="form-section-title fsz-18 fw-600">
                        <i className="fa-light fa-building" />
                        {t("organizationDetails")}
                    </h2>

                    <div className="form-group">
                        <label>
                            {t("organizationName")}
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "organizationNamePlaceholder"
                            )}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("organizationType")}
                                    <span className="required">
                                        *
                                    </span>
                                </label>

                                <select
                                    className="form-control form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        {t("select")}
                                    </option>

                                    <option value="government">
                                        {t("government")}
                                    </option>

                                    <option value="education">
                                        {t("education")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("sector")}
                                    <span className="required">
                                        *
                                    </span>
                                </label>

                                <select
                                    className="form-control form-select"
                                    defaultValue=""
                                    required
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        {t("select")}
                                    </option>

                                    <option value="education">
                                        {t("education")}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title fsz-18 fw-600">
                        <i className="fa-light fa-user" />
                        {t("adminDetails")}
                    </h2>

                    <div className="form-group">
                        <label>
                            {t("adminName")}
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "adminNamePlaceholder"
                            )}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            {t("adminPhone")}
                            <span className="required">
                                *
                            </span>
                        </label>

                        <PhoneInput />
                    </div>

                    <div className="form-group">
                        <label>
                            {t("jobTitle")}
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "jobTitlePlaceholder"
                            )}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            {t("officialEmail")}
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder={t(
                                "officialEmailPlaceholder"
                            )}
                            required
                        />
                    </div>
                </div>

                <div className="application-form-actions">
                    <button
                        type="submit"
                        className="butn primary_butn rounded-pill hvr-txt-trans fw-bold w-100"
                    >
                        <div
                            className="txt px-3"
                            data-text={t(
                                "submitApplication"
                            )}
                        >
                            <span>
                                {t("submitApplication")}
                            </span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BasicApplicationForm;
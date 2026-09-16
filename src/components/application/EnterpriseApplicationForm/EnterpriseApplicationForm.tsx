import { getTranslations } from "next-intl/server";

const EnterpriseApplicationForm = async () => {
    const t = await getTranslations("application");

    return (
        <div className="application-form">
            <div className="application-form-header">
                <h1 className="fsz-40 fw-600">
                    {t("enterpriseTitle")}
                </h1>

                <p className="fsz-20 cr-999">
                    {t("enterpriseDescription")}
                </p>
            </div>

            <form>
                <div className="form-section">
                    <h2 className="form-section-title fsz-18 fw-600">
                        <i className="fa-light fa-building" />
                        {t("organizationDetails")}
                    </h2>

                    <div className="form-group">
                        <label>
                            {t("organizationName")}
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "organizationNamePlaceholder"
                            )}
                        />

                        <small>
                            {t("organizationNameHint")}
                        </small>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("organizationType")}
                                </label>

                                <select
                                    className="form-control form-select"
                                    defaultValue=""
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
                                </label>

                                <select
                                    className="form-control form-select"
                                    defaultValue=""
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

                    <div className="form-group">
                        <label>
                            {t("usersCount")}
                        </label>

                        <select
                            className="form-control form-select"
                            defaultValue=""
                        >
                            <option
                                value=""
                                disabled
                            >
                                {t("select")}
                            </option>

                            <option value="1-20">
                                {t("usersRange")}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title fsz-18 fw-600">
                        <i className="fa-light fa-user" />
                        {t("adminDetails")}
                    </h2>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("adminName")}
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "adminNamePlaceholder"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("adminPhone")}
                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder={t(
                                        "adminPhonePlaceholder"
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("jobTitle")}
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "jobTitlePlaceholder"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("adminEmail")}
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder={t(
                                        "adminEmailPlaceholder"
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            {t("source")}
                        </label>

                        <select
                            className="form-control form-select"
                            defaultValue=""
                        >
                            <option
                                value=""
                                disabled
                            >
                                {t("select")}
                            </option>

                            <option value="social">
                                {t("social")}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="application-form-actions">
                    <button
                        type="submit"
                        className="butn primary_butn rounded-pill hvr-txt-trans fw-bold w-100"
                    >
                        <div
                            className="txt px-3"
                            data-text={t("contactTeam")}
                        >
                            <span>
                                {t("contactTeam")}
                            </span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EnterpriseApplicationForm;
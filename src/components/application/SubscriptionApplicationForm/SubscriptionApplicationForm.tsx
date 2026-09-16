"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Country = {
    value: string;
    label: string;
    flag: string;
};

const countries: Country[] = [
    {
        value: "saudi-arabia",
        label: "السعودية",
        flag: "https://flagcdn.com/w40/sa.png",
    },
    {
        value: "egypt",
        label: "مصر",
        flag: "https://flagcdn.com/w40/eg.png",
    },
];

const SubscriptionApplicationForm = () => {
    const t = useTranslations("application");
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCountry, setSelectedCountry] =
        useState("saudi-arabia");

    const country =
        countries.find(
            (item) =>
                item.value === selectedCountry
        ) || countries[0];

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const packageCode =
            searchParams.get("package");

        if (!packageCode) {
            return;
        }

        router.push(
            `/checkout?package=${encodeURIComponent(
                packageCode
            )}`
        );
    };

    return (
        <div className="application-form">
            <div className="application-form-header">
                <h1 className="fsz-40 fw-600">
                    {t("subscriptionTitle")}
                </h1>

                <p className="fsz-20 cr-999">
                    {t("subscriptionDescription")}
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
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "organizationNamePlaceholder"
                            )}
                        />

                        <small>
                            {t(
                                "organizationNameHint"
                            )}
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
                </div>

                <div className="form-section">
                    <h2 className="form-section-title fsz-18 fw-600">
                        <i className="fa-light fa-credit-card" />
                        {t("billingDetails")}
                    </h2>

                    <div className="form-group">
                        <label>
                            {t("officialCompanyName")}
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "officialCompanyNamePlaceholder"
                            )}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group country-form-group">
                                <label>
                                    {t("country")}
                                </label>

                                <div className="country-select">
                                    <img
                                        src={country.flag}
                                        alt={country.label}
                                        className="country-flag"
                                    />

                                    <select
                                        className="form-control form-select"
                                        value={
                                            selectedCountry
                                        }
                                        onChange={(event) =>
                                            setSelectedCountry(
                                                event.target.value
                                            )
                                        }
                                    >
                                        {countries.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.value
                                                    }
                                                    value={
                                                        item.value
                                                    }
                                                >
                                                    {item.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("city")}
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "cityPlaceholder"
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("address")}
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "addressPlaceholder"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    {t("taxNumber")}
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "taxNumberPlaceholder"
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="application-form-actions">
                    <button
                        type="submit"
                        className="butn primary_butn rounded-pill hvr-txt-trans fw-bold w-100"
                    >
                        <div
                            className="txt px-3"
                            data-text={t("next")}
                        >
                            <span>{t("next")}</span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubscriptionApplicationForm;
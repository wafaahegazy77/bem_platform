"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { Link } from "@/i18n/routing";
import AuthLayout from "../AuthLayout/AuthLayout";
import "./_Register.scss";

type CountryOption = {
    value: string;
    label: string;
    code: string;
};

const countries: CountryOption[] = [
    {
        value: "saudi_arabia",
        label: "Saudi Arabia",
        code: "SA",
    },
    {
        value: "egypt",
        label: "Egypt",
        code: "EG",
    },
];

const Register = () => {
    const t = useTranslations("register");

    const [country, setCountry] = useState<CountryOption | null>(null);

    return (
        <AuthLayout>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="auth-card">
                        <div className="register">
                            <div className="register-header text-center mb-5">
                                <h1 className="title fsz-40 fw-500">
                                    {t("title")}
                                    <span className="color_primary">
                                        {" "}
                                        {t("Beem")}{" "}
                                    </span>
                                </h1>

                                <p className="description fsz-20 cr-999 mt-10">
                                    {t("description")}
                                </p>
                            </div>

                            <form className="register-form mt-35">
                                <div className="form-section">
                                    <h2 className="section-title fsz-22 fw-600 mb-4">
                                        <span className="section-icon color_primary">
                                            <i className="fa-light fa-building"></i>
                                        </span>
                                        {t("organization_details")}
                                    </h2>

                                    <div className="form-group">
                                        <label htmlFor="organizationName">
                                            {t("organization_name")}
                                        </label>

                                        <input
                                            id="organizationName"
                                            type="text"
                                            className="form-control"
                                            placeholder={t(
                                                "organization_name_placeholder"
                                            )}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="organizationType">
                                                    {t("organization_type")}
                                                </label>

                                                <select
                                                    id="organizationType"
                                                    className="form-control form-select"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        {t("select")}
                                                    </option>

                                                    <option value="company">
                                                        {t("company")}
                                                    </option>

                                                    <option value="government">
                                                        {t("government")}
                                                    </option>

                                                    <option value="non_profit">
                                                        {t("non_profit")}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="organizationSize">
                                                    {t("organization_size")}
                                                </label>

                                                <select
                                                    id="organizationSize"
                                                    className="form-control form-select"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        {t("select")}
                                                    </option>

                                                    <option value="small">
                                                        {t("small")}
                                                    </option>

                                                    <option value="medium">
                                                        {t("medium")}
                                                    </option>

                                                    <option value="large">
                                                        {t("large")}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="country">
                                                    {t("country")}
                                                </label>

                                                <Select<CountryOption>
                                                    instanceId="country-select"
                                                    inputId="country"
                                                    value={country}
                                                    options={countries}
                                                    onChange={(option) =>
                                                        setCountry(option)
                                                    }
                                                    placeholder={t("select")}
                                                    isSearchable={false}
                                                    classNamePrefix="country"
                                                    formatOptionLabel={(
                                                        option
                                                    ) => (
                                                        <div className="country-option">
                                                            <ReactCountryFlag
                                                                countryCode={
                                                                    option.code
                                                                }
                                                                svg
                                                                className="country-flag"
                                                            />

                                                            <span>
                                                                {option.value ===
                                                                "saudi_arabia"
                                                                    ? t(
                                                                          "saudi_arabia"
                                                                      )
                                                                    : t(
                                                                          "egypt"
                                                                      )}
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="city">
                                                    {t("city")}
                                                </label>

                                                <select
                                                    id="city"
                                                    className="form-control form-select"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        {t("select")}
                                                    </option>

                                                    <option value="riyadh">
                                                        {t("riyadh")}
                                                    </option>

                                                    <option value="jeddah">
                                                        {t("jeddah")}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">
                                            {t("address")}
                                        </label>

                                        <input
                                            id="address"
                                            type="text"
                                            className="form-control"
                                            placeholder={t(
                                                "address_placeholder"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="form-section mt-30">
                                    <h2 className="section-title fsz-22 fw-600 mb-4">
                                        <span className="section-icon color_primary">
                                            <i className="fa-light fa-user"></i>
                                        </span>
                                        {t("admin_details")}
                                    </h2>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="adminName">
                                                    {t("admin_name")}
                                                </label>

                                                <input
                                                    id="adminName"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t(
                                                        "admin_name_placeholder"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">
                                                    {t("phone")}
                                                </label>

                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder={t(
                                                        "phone_placeholder"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="jobTitle">
                                                    {t("jobTitle")}
                                                </label>

                                                <input
                                                    id="jobTitle"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t("jobTitle")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    {t("email")}
                                                </label>

                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder={t(
                                                        "email_placeholder"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="terms">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        name="terms"
                                    />

                                    <label htmlFor="terms">
                                        {t("agree")}
                                        <Link href="/terms">
                                            {t("terms")}
                                        </Link>
                                        {t("and")}
                                        <Link href="/privacy">
                                            {t("privacy")}
                                        </Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="register-submit butn primary_butn w-100 mt-20"
                                >
                                    <div
                                        className="txt"
                                        data-text={t("submit")}
                                    >
                                        <span>{t("submit")}</span>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="auth-page-footer">
                        <span>{t("already_have_account")}</span>{" "}
                        <Link href="/login">
                            {t("login")}
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Register;
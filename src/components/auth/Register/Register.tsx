"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AuthLayout from "../AuthLayout/AuthLayout";
import Reveal from "@/components/animations/Reveal";
import CountryInput from "@/components/common/CountryInput/CountryInput";
import PhoneInput from "@/components/common/PhoneInput/PhoneInput";
import "./_Register.scss";

const Register = () => {
    const t = useTranslations("register");

    return (
        <AuthLayout>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <Reveal
                        animation="fade-up"
                        amount={0.15}
                    >
                        <div className="auth-card">
                            <div className="register">
                                <div className="register-header text-center mb-5">
                                    <Reveal
                                        animation="fade-down"
                                        amount={0.2}
                                    >
                                        <h1 className="title fsz-40 fw-500">
                                            {t("title")}
                                            <span className="color_primary">
                                                {" "}
                                                {t("Beem")}{" "}
                                            </span>
                                        </h1>
                                    </Reveal>

                                    <Reveal
                                        animation="fade-up"
                                        delay={0.1}
                                        amount={0.2}
                                    >
                                        <p className="description fsz-20 cr-999 mt-10">
                                            {t("description")}
                                        </p>
                                    </Reveal>
                                </div>

                                <form className="register-form mt-35">
                                    <Reveal
                                        animation="fade-left"
                                        amount={0.1}
                                    >
                                        <div className="form-section">
                                            <h2 className="section-title fsz-22 fw-600 mb-4">
                                                <span className="section-icon color_primary">
                                                    <i className="fa-light fa-building"></i>
                                                </span>
                                                {t(
                                                    "organization_details"
                                                )}
                                            </h2>

                                            <div className="form-group">
                                                <label htmlFor="organizationName">
                                                    {t(
                                                        "organization_name"
                                                    )}
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
                                                            {t(
                                                                "organization_type"
                                                            )}
                                                        </label>

                                                        <select
                                                            id="organizationType"
                                                            className="form-control form-select"
                                                            defaultValue=""
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                {t(
                                                                    "select"
                                                                )}
                                                            </option>

                                                            <option value="company">
                                                                {t(
                                                                    "company"
                                                                )}
                                                            </option>

                                                            <option value="government">
                                                                {t(
                                                                    "government"
                                                                )}
                                                            </option>

                                                            <option value="non_profit">
                                                                {t(
                                                                    "non_profit"
                                                                )}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="organizationSize">
                                                            {t(
                                                                "organization_size"
                                                            )}
                                                        </label>

                                                        <select
                                                            id="organizationSize"
                                                            className="form-control form-select"
                                                            defaultValue=""
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                {t(
                                                                    "select"
                                                                )}
                                                            </option>

                                                            <option value="small">
                                                                {t(
                                                                    "small"
                                                                )}
                                                            </option>

                                                            <option value="medium">
                                                                {t(
                                                                    "medium"
                                                                )}
                                                            </option>

                                                            <option value="large">
                                                                {t(
                                                                    "large"
                                                                )}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="country">
                                                            {t(
                                                                "country"
                                                            )}
                                                        </label>

                                                        <CountryInput />
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
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                {t(
                                                                    "select"
                                                                )}
                                                            </option>

                                                            <option value="riyadh">
                                                                {t(
                                                                    "riyadh"
                                                                )}
                                                            </option>

                                                            <option value="jeddah">
                                                                {t(
                                                                    "jeddah"
                                                                )}
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
                                    </Reveal>

                                    <Reveal
                                        animation="fade-right"
                                        delay={0.1}
                                        amount={0.1}
                                    >
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
                                                            {t(
                                                                "admin_name"
                                                            )}
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
                                                        <label>
                                                            {t("phone")}
                                                        </label>

                                                        <PhoneInput />
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
                                                            placeholder={t(
                                                                "jobTitle"
                                                            )}
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
                                    </Reveal>

                                    <Reveal
                                        animation="fade-up"
                                        delay={0.15}
                                        amount={0.1}
                                    >
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
                                    </Reveal>

                                    <Reveal
                                        animation="zoom-in-up"
                                        delay={0.2}
                                        amount={0.1}
                                    >
                                        <button
                                            type="submit"
                                            className="register-submit butn primary_butn w-100 mt-20"
                                        >
                                            <div
                                                className="txt"
                                                data-text={t("submit")}
                                            >
                                                <span>
                                                    {t("submit")}
                                                </span>
                                            </div>
                                        </button>
                                    </Reveal>
                                </form>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal
                        animation="fade-up"
                        delay={0.15}
                        amount={0.1}
                    >
                        <div className="auth-page-footer">
                            <span>
                                {t("already_have_account")}
                            </span>{" "}
                            <Link href="/login">
                                {t("login")}
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Register;
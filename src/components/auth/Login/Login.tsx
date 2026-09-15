"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { Link } from "@/i18n/routing";
import AuthLayout from "../AuthLayout/AuthLayout";
import "./_Login.scss";
import Image from "next/image";

type LoginMethod = "phone" | "email" | "qr";

type CountryOption = {
    value: string;
    label: string;
    code: string;
};

const countries: CountryOption[] = [
    {
        value: "sa",
        label: "+966",
        code: "SA",
    },
    {
        value: "eg",
        label: "+20",
        code: "EG",
    },
];

const Login = () => {
    const t = useTranslations("login");
    const [activeMethod, setActiveMethod] =
        useState<LoginMethod>("phone");

    const [country, setCountry] = useState<CountryOption>(
        countries[0]
    );

    return (
        <AuthLayout>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="auth-card">
                        <div className="login">
                            <div className="login-header text-center mb-5">
                                <h1 className="title fsz-40 fw-500">
                                    {t("title")}
                                    <span className="color_primary">
                                        {" "}
                                        {t("Beem")}
                                    </span>
                                </h1>

                                <p className="description fsz-20 cr-999 mt-10">
                                    {t("description")}
                                </p>
                            </div>

                            <div className="login-tabs">
                                <button
                                    type="button"
                                    className={
                                        activeMethod === "phone"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveMethod("phone")
                                    }
                                >
                                    <i className="fa-light fa-phone" />
                                    <span>{t("phone_tab")}</span>
                                </button>

                                <button
                                    type="button"
                                    className={
                                        activeMethod === "email"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveMethod("email")
                                    }
                                >
                                    <i className="fa-light fa-envelope" />
                                    <span>{t("email_tab")}</span>
                                </button>

                                <button
                                    type="button"
                                    className={
                                        activeMethod === "qr"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveMethod("qr")
                                    }
                                >
                                    <i className="fa-light fa-qrcode" />
                                    <span>{t("qr_tab")}</span>
                                </button>
                            </div>

                            {activeMethod === "phone" && (
                                <div className="login-method">
                                    <div className="login-form">
                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                {t("phone")}
                                            </label>

                                            <div className="phone-field">
                                                <div className="country-select">
                                                    <Select
                                                        value={country}
                                                        options={countries}
                                                        onChange={(option) => {
                                                            if (option) {
                                                                setCountry(option);
                                                            }
                                                        }}
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
                                                                    {
                                                                        option.label
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    />
                                                </div>

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

                                        <button
                                            type="button"
                                            className="login-next butn primary_butn w-100"
                                        >
                                            <div
                                                className="txt"
                                                data-text={t("next")}
                                            >
                                                <span>{t("next")}</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeMethod === "email" && (
                                <div className="login-method">
                                    <div className="login-form">
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

                                        <button
                                            type="button"
                                            className="login-next butn primary_butn w-100"
                                        >
                                            <div
                                                className="txt"
                                                data-text={t("next")}
                                            >
                                                <span>{t("next")}</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeMethod === "qr" && (
                                <div className="login-method qr-login">
                                    <p className="qr-description">
                                        {t("qr_description")}
                                    </p>

                                    <div className="qr-code">
                                        <div className="qr-code">
                                            <Image
                                                src="/images/qr.png"
                                                alt="QR Code"
                                                width={190}
                                                height={190}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="login-next butn primary_butn w-100"
                                    >
                                        <div
                                            className="txt"
                                            data-text={t("next")}
                                        >
                                            <span>{t("next")}</span>
                                        </div>
                                    </button>
                                </div>
                            )}

                            <div className="login-divider">
                                <span>{t("or")}</span>
                            </div>

                            <button
                                type="button"
                                className="sso-button"
                            >
                                {t("sso")}
                            </button>

                            <p className="login-terms">
                                {t("terms_description")}{" "}
                                <Link href="/terms">
                                    {t("terms")}
                                </Link>{" "}
                                {t("and")}{" "}
                                <Link href="/privacy">
                                    {t("privacy")}
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="auth-page-footer">
                        <span>{t("no_account")}</span>{" "}
                        <Link href="/register">
                            {t("create_account")}
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
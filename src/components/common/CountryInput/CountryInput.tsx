"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import "./_CountryInput.scss";

type CountryOption = {
    value: string;
    label: string;
    code: string;
};

const countryCodes = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG",
    "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB",
    "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW",
    "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM",
    "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM",
    "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ",
    "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE",
    "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF",
    "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP",
    "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
    "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL",
    "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR",
    "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT",
    "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ",
    "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS",
    "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI",
    "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW",
    "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR",
    "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF",
    "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL",
    "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES",
    "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ",
    "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC",
    "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU",
    "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "XK",
];

const CountryInput = () => {
    const t = useTranslations("register");
    const locale = useLocale();

    const [country, setCountry] =
        useState<CountryOption | null>(null);

    const countries = useMemo<CountryOption[]>(() => {
        const displayNames = new Intl.DisplayNames(
            [locale === "ar" ? "ar" : "en"],
            {
                type: "region",
            }
        );

        return countryCodes
            .map((code) => ({
                value: code.toLowerCase(),
                label: displayNames.of(code) || code,
                code,
            }))
            .sort((a, b) =>
                a.label.localeCompare(b.label)
            );
    }, [locale]);

    return (
        <div className="country-input">
            <Select<CountryOption>
                instanceId="country-select"
                inputId="country"
                value={country}
                options={countries}
                onChange={(option) =>
                    setCountry(option)
                }
                placeholder={t("select")}
                isSearchable
                isClearable
                classNamePrefix="country"
                menuPortalTarget={
                    typeof document !== "undefined"
                        ? document.body
                        : undefined
                }
                menuPosition="fixed"
                menuPlacement="auto"
                menuShouldScrollIntoView={false}
                closeMenuOnScroll={false}
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 99999,
                    }),
                    menu: (base) => ({
                        ...base,
                        marginTop: 5,
                        borderRadius: 10,
                        overflow: "hidden",
                    }),
                    menuList: (base) => ({
                        ...base,
                        maxHeight: 300,
                        padding: 0,
                        overflowY: "auto",
                        overscrollBehavior: "contain",
                    }),
                }}
                formatOptionLabel={(option) => (
                    <div className="country-option">
                        <ReactCountryFlag
                            countryCode={option.code}
                            svg
                            className="country-flag"
                        />

                        <span>{option.label}</span>
                    </div>
                )}
            />
        </div>
    );
};

export default CountryInput;
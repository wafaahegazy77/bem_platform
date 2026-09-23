"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import Select, {
    SingleValue,
    StylesConfig,
} from "react-select";
import ReactCountryFlag from "react-country-flag";
import { countries } from "country-data-list";
import "./_PhoneInput.scss";

type CountryOption = {
    value: string;
    label: string;
    dialCode: string;
    code: string;
};

const PhoneInput = () => {
    const locale = useLocale();

    const countryOptions = useMemo<CountryOption[]>(() => {
        const displayNames = new Intl.DisplayNames(
            [locale === "ar" ? "ar" : "en"],
            {
                type: "region",
            }
        );

        return countries.all
            .filter(
                (country) =>
                    country.alpha2 &&
                    country.name &&
                    country.countryCallingCodes?.length
            )
            .map((country) => ({
                value: country.alpha2,
                label:
                    displayNames.of(country.alpha2) ||
                    country.name,
                dialCode:
                    country.countryCallingCodes[0],
                code: country.alpha2,
            }))
            .sort((a, b) =>
                a.label.localeCompare(
                    b.label,
                    locale === "ar" ? "ar" : "en"
                )
            );
    }, [locale]);

    const defaultCountry =
        countryOptions.find(
            (country) => country.code === "SA"
        ) || countryOptions[0];

    const [selectedCountry, setSelectedCountry] =
        useState<CountryOption | null>(
            defaultCountry
        );

    const customStyles: StylesConfig<
        CountryOption,
        false
    > = {
        control: (base, state) => ({
            ...base,
            minHeight: 60,
            height: 60,
            border: state.isFocused
                ? "1px solid var(--primary)"
                : "1px solid #e7e9ee",
            borderRadius: "6px 0 0 6px",
            boxShadow: "none",
            backgroundColor: "#fff",
            cursor: "pointer",
        }),

        valueContainer: (base) => ({
            ...base,
            padding: "0 10px",
        }),

        singleValue: (base) => ({
            ...base,
            margin: 0,
            color: "#222",
            fontSize: 13,
            fontWeight: 500,
        }),

        indicatorsContainer: (base) => ({
            ...base,
            height: 60,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            padding: "0 8px",
            color: "#aab4c2",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        menuPortal: (base) => ({
            ...base,
            zIndex: 99999,
        }),

        menu: (base) => ({
            ...base,
            zIndex: 99999,
            marginTop: 4,
            border: "1px solid #e7e9ee",
            borderRadius: 6,
            boxShadow:
                "0 10px 30px rgba(42, 76, 145, 0.08)",
            overflow: "hidden",
        }),

        menuList: (base) => ({
            ...base,
            padding: 0,
            maxHeight: 250,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
        }),

        option: (base, state) => ({
            ...base,
            display: "flex",
            alignItems: "center",
            padding: "10px 12px",
            backgroundColor: state.isSelected
                ? "#f2f6ff"
                : state.isFocused
                  ? "#f8f9ff"
                  : "#fff",
            color: "#222",
            fontSize: 13,
            cursor: "pointer",
        }),
    };

    const formatOptionLabel = (
        option: CountryOption
    ) => {
        return (
            <div className="phone-country-option">
                <ReactCountryFlag
                    countryCode={option.code}
                    svg
                />

                <span className="phone-country-dial">
                    {option.dialCode}
                </span>
            </div>
        );
    };

    const filterOption = (
        option: {
            data: CountryOption;
        },
        inputValue: string
    ) => {
        const search = inputValue
            .trim()
            .toLowerCase();

        if (!search) {
            return true;
        }

        const country = option.data;

        const label = country.label.toLowerCase();
        const dialCode =
            country.dialCode.toLowerCase();
        const dialCodeWithoutPlus =
            dialCode.replace(/^\+/, "");
        const code = country.code.toLowerCase();
        const value = country.value.toLowerCase();

        return (
            label.includes(search) ||
            dialCode.includes(search) ||
            dialCodeWithoutPlus.includes(search) ||
            code.includes(search) ||
            value.includes(search)
        );
    };

    const handleCountryChange = (
        option: SingleValue<CountryOption>
    ) => {
        setSelectedCountry(option);
    };

    return (
        <div className="phone-input" dir="ltr">
            <div className="phone-country">
                <Select<CountryOption>
                    instanceId="phone-country-select"
                    inputId="phone-country"
                    value={selectedCountry}
                    options={countryOptions}
                    onChange={handleCountryChange}
                    styles={customStyles}
                    filterOption={filterOption}
                    formatOptionLabel={formatOptionLabel}
                    isSearchable
                    classNamePrefix="phone-select"
                    placeholder=""
                    isRtl={false}
                    menuPortalTarget={
                        typeof document !== "undefined"
                            ? document.body
                            : undefined
                    }
                    menuPosition="fixed"
                    menuPlacement="auto"
                    menuShouldScrollIntoView={false}
                    menuShouldBlockScroll={false}
                    captureMenuScroll={false}
                    closeMenuOnScroll={false}
                    maxMenuHeight={250}
                    minMenuHeight={120}
                />
            </div>

            <input
                type="tel"
                className="form-control"
                placeholder="5X XXX XXXX"
                dir={locale === "ar" ? "rtl" : "ltr"}
                required
            />
        </div>
    );
};

export default PhoneInput;
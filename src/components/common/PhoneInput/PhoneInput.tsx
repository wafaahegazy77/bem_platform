"use client";

import { useMemo, useState } from "react";
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
    const countryOptions = useMemo<CountryOption[]>(() => {
        return countries.all
            .filter(
                (country) =>
                    country.alpha2 &&
                    country.name &&
                    country.countryCallingCodes?.length
            )
            .map((country) => ({
                value: country.alpha2,
                label: country.name,
                dialCode:
                    country.countryCallingCodes[0],
                code: country.alpha2,
            }))
            .sort((a, b) =>
                a.label.localeCompare(b.label)
            );
    }, []);

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

            "&:hover": {
                borderColor: state.isFocused
                    ? "var(--primary)"
                    : "#e7e9ee",
            },
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

        menu: (base) => ({
            ...base,
            zIndex: 100,
            marginTop: 4,
            border: "1px solid #e7e9ee",
            borderRadius: 6,
            boxShadow:
                "0 10px 30px rgba(42, 76, 145, 0.08)",
            overflow: "hidden",
        }),

        menuList: (base) => ({
            ...base,
            maxHeight: 250,
            padding: 0,
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
        option: CountryOption,
        meta: {
            context: "menu" | "value";
        }
    ) => {
        if (meta.context === "value") {
            return (
                <div className="phone-country-value">
                    <ReactCountryFlag
                        countryCode={option.code}
                        svg
                    />

                    <span>{option.dialCode}</span>
                </div>
            );
        }

        return (
            <div className="phone-country-option">
                <ReactCountryFlag
                    countryCode={option.code}
                    svg
                />

                <span className="phone-country-name">
                    {option.label}
                </span>

                <span className="phone-country-dial">
                    {option.dialCode}
                </span>
            </div>
        );
    };

    const handleCountryChange = (
        option: SingleValue<CountryOption>
    ) => {
        setSelectedCountry(option);
    };

    return (
        <div className="phone-input">
            <div className="phone-country">
                <Select
                    value={selectedCountry}
                    options={countryOptions}
                    onChange={handleCountryChange}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                    isSearchable
                    classNamePrefix="phone-select"
                    placeholder=""
                />
            </div>

            <input
                type="tel"
                className="form-control"
                placeholder="5X XXX XXXX"
                required
            />
        </div>
    );
};

export default PhoneInput;
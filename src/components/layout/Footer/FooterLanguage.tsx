"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";

const FooterLanguage = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const changeLocale = (nextLocale: "ar" | "en") => {
        setOpen(false);

        if (nextLocale !== locale) {
            router.replace(pathname, {
                locale: nextLocale,
            });
        }
    };

    return (
        <div className={`language-dropdown ${open ? "open" : ""}`}>

            <button
                type="button"
                className="lang d-flex align-items-center radius-100 px-3 py-2"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span>
                    <i className="fal fa-globe globe mx-2"></i>

                    <span className="txt">
                        {locale === "ar" ? "عربي" : "English"}
                    </span>
                </span>


                
                <i className="fal fa-angle-up arrow"></i>
            </button>

            <div className="language-menu">

                <button
                    type="button"
                    className={locale === "ar" ? "active" : ""}
                    onClick={() => changeLocale("ar")}
                >
                    عربي
                </button>

                <button
                    type="button"
                    className={locale === "en" ? "active" : ""}
                    onClick={() => changeLocale("en")}
                >
                    English
                </button>

            </div>

        </div>
    );
};

export default FooterLanguage;
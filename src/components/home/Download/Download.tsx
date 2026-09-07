import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import "./_Download.scss";

const Download = async () => {
    const locale = await getLocale();
    const t = await getTranslations("download");

    const response = await api.getPage("download", locale);
    const data = response.data;

    const apps = [
        {
            name: t("apple"),
            icon: "/images/icons/apple.svg",
            href: "#",
        },
        {
            name: t("google"),
            icon: "/images/icons/google.svg",
            href: "#",
        },
        {
            name: t("windows"),
            icon: "/images/icons/windows.svg",
            href: "#",
        },
        {
            name: t("mac"),
            icon: "/images/icons/mac.svg",
            href: "#",
        },
    ];

    return (
        <section className="download pb-80">
            <div className="container">

                <div className="download-box radius-40 p-40 d-flex align-items-center justify-content-between">

                    <div className="info">
                        <h3 className="fsz-30 fw-800">
                            {data.first_title}
                        </h3>

                        <div className="text fsz-20 fw-500 mt-10">
                            {data.second_title}
                        </div>
                    </div>

                    <div className="apps d-flex gap-3">

                        {apps.map((app) => (
                            <a
                                href={app.href}
                                key={app.name}
                                className="app-item radius-15 overflow-hidden text-center"
                            >
                                <div className="ico df-center">
                                    <img
                                        src={app.icon}
                                        alt={app.name}
                                        className="icon-40"
                                    />
                                </div>

                                <span className="label bg_primary d-block fsz-14 fw-500">
                                    {app.name}
                                </span>
                            </a>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Download;
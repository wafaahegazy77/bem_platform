import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { api } from "@/lib/api";
import "./_Categories.scss";

type Service = {
    code: string;
    slug: string;
    name: string;
    icon: string | null;
    theme_color: string | null;
    homepage?: {
        first_description: string | null;
        second_description: string | null;
        image: string | null;
    };
};

type CategoryPage = {
    first_title: string;
    second_title: string;
};

const categorySlugs = [
    "personal_use",
    "messages",
    "meetings",
    "calendar",
    "documents",
    "contacts",
];

const Categories = async () => {
    const locale = await getLocale();
    const t = await getTranslations("helpCenter");

    const [pageResponse, servicesResponse] = await Promise.all([
        api.getPage("help_center_categories", locale),
        api.getServices(locale),
    ]);

    const pageData = pageResponse?.data as CategoryPage | undefined;

    const services: Service[] = Array.isArray(servicesResponse?.data)
        ? servicesResponse.data
        : [];

    const categories = categorySlugs
        .map((slug) =>
            services.find((service) => service.slug === slug)
        )
        .filter((service): service is Service => Boolean(service));

    return (
        <section className="help-center-categories">
            <div className="container">
                <div className="categories-header text-center">
                    <h2 className="title fsz-40 fw-600">
                        {pageData?.first_title}
                    </h2>

                    <p className="description fsz-15 cr-999 mt-10">
                        {pageData?.second_title}
                    </p>
                </div>

                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            key={category.code}
                            href={`/services/${category.slug}`}
                            className="category-card"
                        >
                            <div
                                className="category-icon"
                                style={{
                                    backgroundColor: category.theme_color
                                        ? `${category.theme_color}18`
                                        : undefined,
                                }}
                            >
                                {category.icon && (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                    />
                                )}
                            </div>

                            <h3 className="category-title fsz-18 fw-600">
                                {category.name}
                            </h3>

                            <p className="category-description fsz-13 cr-999">
                                {category.homepage?.first_description}
                            </p>

                            <span className="category-link">
                                {t("articles")}
                                <i className="fa-light fa-arrow-left" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
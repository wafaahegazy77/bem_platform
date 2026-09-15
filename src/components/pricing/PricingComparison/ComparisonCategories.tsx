"use client";

import { useEffect, useState } from "react";

type PackageFeature = {
    key: string;
    title: string;
    field_type: string;
    value: string | boolean | number | null;
};

type FeatureCategory = {
    id: number;
    name: string;
    features: PackageFeature[];
};

type Package = {
    code: string;
    title: string;
    feature_categories: FeatureCategory[];
};

type ComparisonCategoriesProps = {
    categories: FeatureCategory[];
    packages: Package[];
};

const ComparisonCategories = ({
    categories,
    packages,
}: ComparisonCategoriesProps) => {
    const [activeCategory, setActiveCategory] = useState(
        categories[0]?.id ?? null
    );

    useEffect(() => {
        const handleScroll = () => {
            let currentCategory = categories[0]?.id ?? null;

            categories.forEach((category) => {
                const element = document.getElementById(
                    `comparison-category-${category.id}`
                );

                if (element && element.getBoundingClientRect().top <= 160) {
                    currentCategory = category.id;
                }
            });

            setActiveCategory(currentCategory);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [categories]);

    const handleCategoryClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        categoryId: number
    ) => {
        event.preventDefault();

        const element = document.getElementById(
            `comparison-category-${categoryId}`
        );

        if (!element) return;

        setActiveCategory(categoryId);

        window.scrollTo({
            top:
                element.getBoundingClientRect().top +
                window.scrollY -
                120,
            behavior: "smooth",
        });
    };

    const getFeatureValue = (
        plan: Package,
        categoryId: number,
        featureKey: string
    ) => {
        const category = plan.feature_categories?.find(
            (item) => item.id === categoryId
        );

        const feature = category?.features?.find(
            (item) => item.key === featureKey
        );

        if (!feature) {
            return "—";
        }

        if (feature.field_type === "boolean") {
            return feature.value === true ? (
                <i className="fas fa-check"></i>
            ) : (
                "—"
            );
        }

        if (
            feature.value === null ||
            feature.value === undefined ||
            feature.value === ""
        ) {
            return "—";
        }

        return feature.value;
    };

    return (
        <div className="comparison-body">

            <div className="row">

                <div className="col-lg-2 mb-30">
                    <ul className="comparison-links list-unstyled">

                        {categories.map((category) => (
                            <li key={category.id}>
                                <a
                                    href={`#comparison-category-${category.id}`}
                                    className={
                                        activeCategory === category.id
                                            ? "active"
                                            : ""
                                    }
                                    onClick={(event) =>
                                        handleCategoryClick(
                                            event,
                                            category.id
                                        )
                                    }
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>

                <div className="col-lg-10">

                    {categories.map((category) => (
                        <div
                            className="comparison-category"
                            id={`comparison-category-${category.id}`}
                            key={category.id}
                        >

                            <h3 className="fsz-18 fw-700 color_primary mb-15">
                                {category.name}
                            </h3>

                            <div className="comparison-rows">

                                {category.features.map((feature) => (
                                    <div
                                        className="comparison-row row align-items-center"
                                        key={feature.key}
                                    >

                                        <div className="col-4">
                                            <span className="fsz-14 fw-500">
                                                {feature.title}
                                            </span>
                                        </div>

                                        {packages.map((plan) => (
                                            <div
                                                className="col-4 text-center fsz-14"
                                                key={`${plan.code}-${feature.key}`}
                                            >
                                                {getFeatureValue(
                                                    plan,
                                                    category.id,
                                                    feature.key
                                                )}
                                            </div>
                                        ))}

                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default ComparisonCategories;
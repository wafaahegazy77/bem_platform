import type { CSSProperties } from "react";
import "./_ServiceFeature.scss";

type ServiceFeatureProps = {
    feature: {
        id: number;
        title: string;
        description: string | null;
        image: string | null;
        format: "image_first" | "image_last" | "image_below";
        placement: number;
    };
    themeColor: string;
    isLast: boolean;
};

const ServiceFeature = ({
    feature,
    themeColor,
    isLast,
}: ServiceFeatureProps) => {
    return (
        <section>
            <div className="container">
                <div
                    className={`service-feature ${feature.format} ${
                        isLast ? "last-feature" : ""
                    }`}
                    style={
                        {
                            "--theme-color": themeColor,
                        } as CSSProperties
                    }
                >
                    <div className="feature-content">

                        <div className="feature-text">
                            <h2 className="fsz-35">
                                {feature.title}
                            </h2>

                            {feature.description && (
                                <div className="description col-lg-11">
                                    {feature.description}
                                </div>
                            )}
                        </div>

                        {feature.image && (
                            <div className="feature-image">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceFeature;
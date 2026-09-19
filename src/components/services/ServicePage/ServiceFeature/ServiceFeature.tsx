import type { CSSProperties } from "react";
import "./_ServiceFeature.scss";
import Reveal from "@/components/animations/Reveal";

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
    const textAnimation =
        feature.format === "image_first"
            ? "fade-right-blur"
            : feature.format === "image_last"
            ? "fade-left-blur"
            : "fade-up-blur";

    const imageAnimation =
        feature.format === "image_first"
            ? "fade-left-blur"
            : feature.format === "image_last"
            ? "fade-right-blur"
            : "zoom-in-up";

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

                        <Reveal
                            animation={textAnimation}
                            duration={1.1}
                        >
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
                        </Reveal>

                        {feature.image && (
                            <Reveal
                                animation={imageAnimation}
                                delay={0.15}
                                duration={1.2}
                            >
                                <div className="feature-image">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                    />
                                </div>
                            </Reveal>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceFeature;
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
};

const ServiceFeature = ({ feature }: ServiceFeatureProps) => {
    return (
        <section className={`service-feature ${feature.format}`}>
            <div className="container">
                <div className="feature-content">

                    <div className="feature-text">
                        <h2 className="fsz-35">
                            {feature.title}
                        </h2>

                        {feature.description && (
                            <div className="description">
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
        </section>
    );
};

export default ServiceFeature;
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import "./_WhyUs.scss";
import Reveal from "@/components/animations/Reveal";

const WhyUs = async () => {
    const locale = await getLocale();

    const [pageResponse, whyBeemResponse] =
        await Promise.all([
            api.getPage("why_beem", locale),
            api.getWhyBeem(locale),
        ]);

    const pageData = pageResponse.data;
    const whyBeem = whyBeemResponse.data || [];

    const cardAnimations = [
        "fade-left-blur",
        "fade-up-blur",
        "fade-right-blur",
        "fade-right-blur",
        "fade-down-blur",
        "fade-left-blur",
    ] as const;

    return (
        <section className="why-us section-padding">
            <div className="container">

                <div className="title-wrapper text-center col-lg-6 mx-auto mb-5">

                    <Reveal
                        animation="fade-down-blur"
                    >
                        <h2 className="fsz-45 fw-600 color_secondary">
                            {pageData.first_title}
                        </h2>
                    </Reveal>

                    <Reveal
                        animation="fade-up"
                        delay={0.15}
                    >
                        <div className="text fsz-18 color_secondary mt-30">
                            {pageData.second_title}
                        </div>
                    </Reveal>

                </div>

                <div className="content mt-60">

                    <div className="row">

                        {whyBeem.map(
                            (
                                item: any,
                                index: number
                            ) => (
                                <div
                                    className="col-lg-4 col-md-6 mb-30"
                                    key={item.id}
                                >
                                    <Reveal
                                        animation={
                                            cardAnimations[
                                                index %
                                                    cardAnimations.length
                                            ]
                                        }
                                        delay={
                                            0.08 +
                                            (index %
                                                3) *
                                                0.12
                                        }
                                    >
                                        <div className="why-card">

                                            <h4 className="title fsz-30 fw-600">
                                                {
                                                    item.title
                                                }
                                            </h4>

                                            <div className="text fsz-16 mt-15 color_secondary">
                                                {
                                                    item.description
                                                }
                                            </div>

                                        </div>
                                    </Reveal>
                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyUs;
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import "./_WhyUs.scss";

const WhyUs = async () => {
    const locale = await getLocale();

    const [pageResponse, whyBeemResponse] = await Promise.all([
        api.getPage("why_beem", locale),
        api.getWhyBeem(locale),
    ]);

    const pageData = pageResponse.data;
    const whyBeem = whyBeemResponse.data || [];

    return (
        <section className="why-us section-padding">
            <div className="container">

                <div className="title-wrapper text-center col-lg-6 mx-auto mb-5">

                    <h2 className="fsz-45 fw-600 color_secondary">
                        {pageData.first_title}
                    </h2>

                    <div className="text fsz-18 cr-666 mt-30">
                        {pageData.second_title}
                    </div>

                </div>

                <div className="content mt-60">

                    <div className="row">

                        {whyBeem.map((item: any) => (
                            <div
                                className="col-lg-4 col-md-6 mb-30"
                                key={item.id}
                            >
                                <div className="why-card">

                                    <h4 className="title fsz-30 fw-600">
                                        {item.title}
                                    </h4>

                                    <div className="text fsz-16 mt-15">
                                        {item.description}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyUs;
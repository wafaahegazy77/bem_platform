import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import "./_TeamLink.scss";
import TeamLinkAnimation from "./TeamLinkAnimation";

const TeamLink = async () => {
    const locale = await getLocale();

    const [pageResponse, servicesResponse] = await Promise.all([
        api.getPage("interactive", locale),
        api.getServices(locale),
    ]);

    const pageData = pageResponse.data;
    const services = (servicesResponse.data || []).slice(0, 8);

    return (
        <section className="team-link section-padding">
            <div className="container">

                <div className="title-wrapper text-center col-lg-6 mx-auto mb-5">
                    <h2 className="fsz-45 fw-600 ">
                        <span className="color_primary d-block mb-2"> {pageData.first_title} </span> 
                        {pageData.second_title}
                    </h2>
                </div>

                <TeamLinkAnimation services={services} />

            </div>
        </section>
    );
};

export default TeamLink;
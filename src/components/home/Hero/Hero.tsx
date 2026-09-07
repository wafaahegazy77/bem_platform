import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import "./_Hero.scss";
import Reveal from "@/components/animations/Reveal";

const Hero = async () => {
    const locale = await getLocale();

    const response = await api.getPage("hero", locale);
    const data = response.data;

    return (
        <section className="hero_section">
            <div className="container">
                <div className="col-lg-5 mx-auto">
                    <div className="txt_box text-center">
                        <Reveal animation="fade-up" trigger="load">
                            <h1 className="title fw-bold cr-blue fsz-55 mb-4">
                                {data.title}
                            </h1>
                        </Reveal>

                        <div
                            className="description"
                            dangerouslySetInnerHTML={{
                                __html: data.content || "",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
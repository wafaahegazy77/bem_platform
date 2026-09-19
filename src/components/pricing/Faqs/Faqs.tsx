import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import "./_Faqs.scss";
import Reveal from "@/components/animations/Reveal";

type FAQ = {
    code: string;
    question: string;
    answer: string;
};

const Faqs = async () => {
    const locale = await getLocale();
    const t = await getTranslations("faq");

    const response = await api.getFaqs(locale);
    const faqs: FAQ[] = response.data || [];

    return (
        <section className="faq pb-120">
            <div className="container">

                <div className="row">

                    <div className="col-lg-3">

                        <Reveal
                            animation="fade-left-blur"
                            duration={1.1}
                        >
                            <div className="faq-title col-lg-6">
                                <h2 className="fsz-40 fw-600 color_primary mb-0">
                                    {t("title")}
                                </h2>
                            </div>
                        </Reveal>

                    </div>

                    <div className="col-lg-9">

                        <Reveal
                            animation="fade-right-blur"
                            duration={1.1}
                        >
                            <div
                                className="accordion"
                                id="faqAccordion"
                            >
                                {faqs.map((faq, index) => {
                                    const faqId = `faq-${faq.code}`;

                                    return (
                                        <Reveal
                                            key={faq.code}
                                            animation={
                                                index % 2 === 0
                                                    ? "fade-right"
                                                    : "fade-left"
                                            }
                                            delay={0.1 + index * 0.08}
                                            duration={0.8}
                                        >
                                            <div className="accordion-item">

                                                <h2 className="accordion-header">
                                                    <button
                                                        className={`accordion-button fsz-16 fw-700 ${
                                                            index !== 0
                                                                ? "collapsed"
                                                                : ""
                                                        }`}
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${faqId}`}
                                                        aria-expanded={
                                                            index === 0
                                                        }
                                                        aria-controls={
                                                            faqId
                                                        }
                                                    >
                                                        <span className="ico radius-100 dnf-center me-15">
                                                            <i className="fal fa-plus plus-icon"></i>
                                                            <i className="fal fa-minus minus-icon"></i>
                                                        </span>

                                                        <span className="question">
                                                            {
                                                                faq.question
                                                            }
                                                        </span>
                                                    </button>
                                                </h2>

                                                <div
                                                    id={faqId}
                                                    className={`accordion-collapse collapse ${
                                                        index === 0
                                                            ? "show"
                                                            : ""
                                                    }`}
                                                    data-bs-parent="#faqAccordion"
                                                >
                                                    <div
                                                        className="accordion-body cr-666 fsz-15"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                faq.answer,
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </Reveal>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Faqs;
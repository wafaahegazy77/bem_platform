import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import "./_CreateOrganization.scss";
import Reveal from "@/components/animations/Reveal";

type Step = {
    id: number;
    name: string;
    description: string;
    icon: string | null;
};

type CreateOrganizationData = {
    id: number;
    key: string;
    first_title: string;
    second_title: string;
    steps: Step[];
};

const CreateOrganization = async () => {
    const locale = await getLocale();
    const t = await getTranslations("helpCenter");

    const response = await api.getPage("create_organization", locale);

    const data = response?.data as CreateOrganizationData | undefined;

    return (
        <section className="create-organization">
            <div className="container">

                <div className="create-organization-content text-center">

                    <Reveal
                        animation="zoom-in"
                        duration={0.9}
                    >
                        <div className="help-badge">
                            <span>{t("badge")}</span>
                        </div>
                    </Reveal>

                    <Reveal
                        animation="fade-down-blur"
                        delay={0.1}
                        duration={1.1}
                    >
                        <h1 className="title fsz-40 fw-600">
                            {data?.first_title}
                        </h1>
                    </Reveal>

                    <Reveal
                        animation="fade-up"
                        delay={0.2}
                        duration={1}
                    >
                        <p className="description fsz-15 cr-999 mt-20">
                            {data?.second_title}
                        </p>
                    </Reveal>

                    <div className="steps row justify-content-center">

                        {data?.steps?.map((step, index) => (
                            <div
                                className="col-lg-4 col-md-4 col-12"
                                key={step.id}
                            >
                                <Reveal
                                    animation={
                                        index % 3 === 0
                                            ? "fade-left-blur"
                                            : index % 3 === 1
                                            ? "fade-up-blur"
                                            : "fade-right-blur"
                                    }
                                    delay={
                                        0.15 +
                                        index * 0.12
                                    }
                                    duration={1}
                                >
                                    <div className="step-card">

                                        <div className="step-card-top">

                                            <span className="step-number">
                                                {t("step")}{" "}
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <div className="step-icon">
                                                <i className="fa-light fa-user-plus" />
                                            </div>

                                        </div>

                                        <h2 className="step-title fsz-18 fw-600">
                                            {step.name}
                                        </h2>

                                        <p className="step-description fsz-16 cr-666 mt-3">
                                            {
                                                step.description
                                            }
                                        </p>

                                    </div>
                                </Reveal>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default CreateOrganization;
"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Reveal from "@/components/animations/Reveal";

import "swiper/css";

type Service = {
    code: string;
    name: string;
    homepage?: {
        hero_image?: string | null;
        image?: string | null;
    };
};

type HeroSliderProps = {
    services: Service[];
};

const HeroSlider = ({
    services,
}: HeroSliderProps) => {
    const slides = services.filter(
        (service) =>
            service.homepage?.hero_image ||
            service.homepage?.image
    );

    return (
        <div className="hero-slider">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                centeredSlides
                speed={1500}
                pagination={false}
                navigation={false}
                mousewheel={false}
                keyboard
                // autoplay={{
                //     delay: 4000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: false,
                // }}
                loop={slides.length > 1}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    787: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4.2,
                    },
                }}
                className="hero_swiper"
            >
                {slides.map((service, index) => (
                    <SwiperSlide key={service.code}>
                        <Reveal
                            animation="fade-up-blur"
                            // delay={index * 0.08}
                            duration={1.2}
                            once
                            amount={0.2}
                            trigger="view"
                        >
                            <div className="img">
                                <img
                                    src={
                                        service.homepage
                                            ?.hero_image ||
                                        service.homepage
                                            ?.image ||
                                        ""
                                    }
                                    alt={service.name}
                                    className="img-cover"
                                />
                            </div>
                        </Reveal>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
document.addEventListener("DOMContentLoaded", () => {
    const servicesSwiper = document.querySelector(".services-swiper");

    if (servicesSwiper && window.Swiper) {
        new Swiper(servicesSwiper, {
            slidesPerView: 1.15,
            spaceBetween: 16,
            grabCursor: true,
            breakpoints: {
                640: {
                    slidesPerView: 1.6,
                },
                900: {
                    slidesPerView: 2.2,
                },
                1200: {
                    slidesPerView: 2.8,
                },
            },
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".service-showcase-card").forEach((card) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        });
    } else {
        document.querySelectorAll(".service-showcase-card").forEach((item) => {
            item.style.opacity = "1";
            item.style.transform = "none";
        });
    }
});
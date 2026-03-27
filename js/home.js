document.addEventListener("DOMContentLoaded", () => {
    const tiltCards = document.querySelectorAll(".tilt-card");
    const floatingCards = document.querySelectorAll(".floating-card");
    const testimonialsSwiper = document.querySelector(".testimonials-swiper");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    if (testimonialsSwiper && window.Swiper) {
        const testimonialsPagination = testimonialsSwiper.querySelector(".testimonials-swiper__pagination");

        new Swiper(testimonialsSwiper, {
            loop: true,
            loopAdditionalSlides: 3,
            loopedSlides: 3,
            slidesPerGroup: 1,
            grabCursor: true,
            speed: 650,
            spaceBetween: 20,
            slidesPerView: 1,
            roundLengths: true,
            watchOverflow: false,
            observer: true,
            observeParents: true,
            pagination: {
                el: testimonialsPagination,
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1120: {
                    slidesPerView: 3,
                },
            },
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        floatingCards.forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -14 : 14,
                duration: 2.8 + index * 0.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        gsap.utils.toArray(".process-card").forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        once: true,
                    },
                }
            );
        });

        gsap.utils.toArray(".stat-card").forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        once: true,
                    },
                }
            );
        });

        const quoteForm = document.querySelector(".quote-form");
        if (quoteForm) {
            gsap.fromTo(
                quoteForm,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: quoteForm,
                        start: "top 88%",
                        once: true,
                    },
                }
            );
        }
    } else {
        document
            .querySelectorAll(".process-card, .stat-card, .quote-form")
            .forEach((item) => {
                item.style.opacity = "1";
                item.style.transform = "none";
            });
    }
});

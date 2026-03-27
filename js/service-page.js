document.addEventListener("DOMContentLoaded", () => {
    const factorCards = document.querySelectorAll(".service-factors__grid article");
    const statCards = document.querySelectorAll(".service-hero__stats article");
    const noteCards = document.querySelectorAll(".service-note-card");

    const enableTilt = (elements, maxRotate = 5) => {
        elements.forEach((element) => {
            element.addEventListener("mousemove", (event) => {
                const rect = element.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * maxRotate;
                const rotateX = ((y - centerY) / centerY) * -maxRotate;

                element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform = "";
            });
        });
    };

    if (window.innerWidth > 991) {
        enableTilt(factorCards, 4.5);
        enableTilt(statCards, 3.5);
        enableTilt(noteCards, 3);
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const heroCopy = document.querySelector(".service-hero__copy");
        if (heroCopy) {
            gsap.fromTo(
                heroCopy,
                { opacity: 0, y: 36 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                }
            );
        }

        const heroStats = document.querySelectorAll(".service-hero__stats article");
        if (heroStats.length) {
            gsap.fromTo(
                heroStats,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out",
                    stagger: 0.12,
                    clearProps: "opacity,transform",
                    delay: 0.2,
                }
            );
        }

        gsap.utils.toArray(".service-note-card, .service-factors__grid article, .faq-item").forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 86%",
                        once: true,
                    },
                }
            );
        });

        const compareBand = document.querySelector(".service-compare-band__inner");
        if (compareBand) {
            gsap.fromTo(
                compareBand,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: compareBand,
                        start: "top 82%",
                        once: true,
                    },
                }
            );
        }
    } else {
        document
            .querySelectorAll(".service-hero__copy, .service-hero__stats article, .service-note-card, .service-factors__grid article, .faq-item, .service-compare-band__inner")
            .forEach((item) => {
                item.style.opacity = "1";
                item.style.transform = "none";
            });
    }
});
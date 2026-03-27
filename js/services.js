document.addEventListener("DOMContentLoaded", () => {
    const servicesSwiper = document.querySelector(".services-swiper");
    const counterValues = document.querySelectorAll(".popular-counter__value");

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

    const formatCount = (value) =>
        new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target || 0);
        if (!target) return;

        const duration = 1400;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);

            counter.textContent = formatCount(current);

            if (progress < 1) {
                requestAnimationFrame(step);
                return;
            }

            counter.textContent = formatCount(target);
        };

        requestAnimationFrame(step);
    };

    if (counterValues.length) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const node = entry.target;
                    if (node.dataset.animated === "true") return;

                    node.dataset.animated = "true";
                    animateCounter(node);
                    obs.unobserve(node);
                });
            },
            { threshold: 0.4 }
        );

        counterValues.forEach((counter) => observer.observe(counter));
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

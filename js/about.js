document.addEventListener("DOMContentLoaded", () => {
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const largeCard = document.querySelector(".story-card--large");
        if (largeCard) {
            gsap.fromTo(
                largeCard,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: largeCard,
                        start: "top 82%",
                        once: true,
                    },
                }
            );
        }

        gsap.utils
            .toArray(".mini-story-card, .model-steps article, .not-card")
            .forEach((item) => {
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
    } else {
        document
            .querySelectorAll(".story-card--large, .mini-story-card, .model-steps article, .not-card")
            .forEach((item) => {
                item.style.opacity = "1";
                item.style.transform = "none";
            });
    }
});
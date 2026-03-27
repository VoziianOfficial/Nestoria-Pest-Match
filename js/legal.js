document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".legal-sidebar__card a");
    const legalBlocks = document.querySelectorAll(".legal-block");

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            sidebarLinks.forEach((item) => item.classList.remove("is-active"));
            link.classList.add("is-active");
        });
    });

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const heroCopy = document.querySelector(".legal-hero__copy");
        if (heroCopy) {
            gsap.fromTo(
                heroCopy,
                { opacity: 0, y: 26 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                }
            );
        }

        const heroPanelCards = document.querySelectorAll(".legal-hero__panel article");
        if (heroPanelCards.length) {
            gsap.fromTo(
                heroPanelCards,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.12,
                    clearProps: "opacity,transform",
                    delay: 0.15,
                }
            );
        }

        legalBlocks.forEach((block) => {
            gsap.fromTo(
                block,
                { opacity: 0, y: 22 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 86%",
                        once: true,
                    },
                }
            );
        });
    } else {
        document
            .querySelectorAll(".legal-hero__copy, .legal-hero__panel article, .legal-block")
            .forEach((item) => {
                item.style.opacity = "1";
                item.style.transform = "none";
            });
    }
});
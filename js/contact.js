document.addEventListener("DOMContentLoaded", () => {
    const mapCard = document.querySelector(".contact-map-card__visual");

    if (mapCard && window.innerWidth > 991) {
        mapCard.addEventListener("mousemove", (event) => {
            const rect = mapCard.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 4;
            const rotateX = ((y - centerY) / centerY) * -4;

            mapCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        mapCard.addEventListener("mouseleave", () => {
            mapCard.style.transform = "";
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".contact-option-card, .contact-side-card").forEach((item) => {
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
                        start: "top 87%",
                        once: true,
                    },
                }
            );
        });
    } else {
        document
            .querySelectorAll(".contact-option-card, .contact-side-card")
            .forEach((item) => {
                item.style.opacity = "1";
                item.style.transform = "none";
            });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".site-header");
    const progressBar = document.querySelector(".site-progress");
    const navToggle = document.querySelector(".nav-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu__close");
    const dropdown = document.querySelector(".mobile-menu__dropdown");
    const dropdownToggle = document.querySelector(".mobile-menu__dropdown-toggle");
    const cookieBar = document.getElementById("cookie-bar");
    const cookieButtons = document.querySelectorAll("[data-cookie-action]");
    const forms = document.querySelectorAll("form[data-form-type]");
    const successModal = document.getElementById("success-modal");
    const successModalClose = document.querySelector(".success-modal__close");

    if (window.lucide) {
        lucide.createIcons();
    }

    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 40,
        });
    }

    const handleScrollUI = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (header) {
            header.classList.toggle("is-scrolled", scrollTop > 10);
        }

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    };

    handleScrollUI();
    window.addEventListener("scroll", handleScrollUI);

    if (mobileMenu) {
        const isHidden = mobileMenu.getAttribute("aria-hidden") !== "false";
        if (isHidden) {
            mobileMenu.setAttribute("inert", "");
        }
    }

    const openMenu = () => {
        if (!mobileMenu || !navToggle) return;
        mobileMenu.classList.add("is-open");
        mobileMenu.removeAttribute("inert");
        mobileMenu.setAttribute("aria-hidden", "false");
        navToggle.setAttribute("aria-expanded", "true");
        body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!mobileMenu || !navToggle) return;
        if (document.activeElement && mobileMenu.contains(document.activeElement)) {
            navToggle.focus();
        }
        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenu.setAttribute("inert", "");
        navToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
    };

    navToggle?.addEventListener("click", openMenu);
    mobileMenuClose?.addEventListener("click", closeMenu);

    mobileMenu?.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });

    document.querySelectorAll(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => closeMenu());
    });

    dropdownToggle?.addEventListener("click", () => {
        if (!dropdown || !dropdownToggle) return;
        const isOpen = dropdown.classList.toggle("is-open");
        dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });

    const COOKIE_KEY = "nestoria-policy-choice";
    const cookieChoice = localStorage.getItem(COOKIE_KEY);

    if (!cookieChoice && cookieBar) {
        cookieBar.classList.add("is-visible");
    }

    cookieButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.cookieAction || "accept";
            localStorage.setItem(COOKIE_KEY, action);
            cookieBar?.classList.remove("is-visible");
        });
    });

    const openSuccessModal = () => {
        if (!successModal) return;
        successModal.classList.add("is-open");
        successModal.setAttribute("aria-hidden", "false");
        body.classList.add("modal-open");
    };

    const closeSuccessModal = () => {
        if (!successModal) return;
        successModal.classList.remove("is-open");
        successModal.setAttribute("aria-hidden", "true");
        body.classList.remove("modal-open");
    };

    successModalClose?.addEventListener("click", closeSuccessModal);

    successModal?.addEventListener("click", (event) => {
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            form.reset();
            openSuccessModal();
        });
    });

    // FAQ toggle fallback/global behavior
    const faqButtons = document.querySelectorAll(".faq-question");
    faqButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            if (!item) return;

            const isOpen = item.classList.contains("is-open");

            document.querySelectorAll(".faq-item").forEach((faqItem) => {
                faqItem.classList.remove("is-open");
                const faqBtn = faqItem.querySelector(".faq-question");
                faqBtn?.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
});

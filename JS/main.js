document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // NAVBAR HIDE / SHOW ON SCROLL
    // ===============================

    const navbar = document.querySelector("header");
    let lastScrollTop = 0;

    if (navbar) {
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Hide on scroll down
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add("nav-hidden");
            } else {
                navbar.classList.remove("nav-hidden");
            }

            // Add shrink effect
            if (scrollTop > 50) {
                navbar.classList.add("nav-scrolled");
            } else {
                navbar.classList.remove("nav-scrolled");
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // ===============================
    // THEME TOGGLE (WITH SAVE)
    // ===============================

    const toggle = document.querySelector(".theme-toggle");

    if (toggle) {

        // Load saved theme
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            toggle.textContent = "🌙";
        } else {
            toggle.textContent = "☀";
        }

        toggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                toggle.textContent = "🌙";
                localStorage.setItem("theme", "light");
            } else {
                toggle.textContent = "☀";
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // ===============================
    // MOBILE MENU
    // ===============================

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            mobileNav.classList.toggle("nav-open");
            menuToggle.classList.toggle("open");
        });
    }

    // ===============================
    // PROJECT FILTER
    // ===============================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    if (filterButtons.length > 0 && projectItems.length > 0) {

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {

                // Active button styling
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filter = button.getAttribute("data-filter");

                projectItems.forEach(item => {
                    if (item.classList.contains(filter)) {
                        item.classList.remove("hide");
                    } else {
                        item.classList.add("hide");
                    }
                });

            });
        });
    }

    // ===============================
    // LIGHTBOX (ONLY ONE SYSTEM)
    // ===============================

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImg && lightboxClose && projectItems.length > 0) {

        projectItems.forEach(item => {

            // For image elements
            const img = item.tagName === "IMG" ? item : item.querySelector("img");

            if (img) {
                item.addEventListener("click", () => {
                    lightbox.classList.add("show");
                    lightboxImg.src = img.src;
                });
            }

        });

        // Close button
        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("show");
        });

        // Click outside image closes
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("show");
            }
        });

        // ESC key closes
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                lightbox.classList.remove("show");
            }
        });
    }

});
// ===============================
// ADVANCED LOOPING TYPEWRITER
// ===============================

const typeElement = document.getElementById("typewriter");

if (typeElement) {

    const text = "I’m Adeel Mujtaba Khan — a Web Developer and Graphic Designer specializing in UI design, branding and photo editing. I specialize in crafting modern digital experiences and visual identities that feel clean sophisticated and intentional. Every project is approached with disciplin, clarity and respect for the brand it represents. I focus on building clean, modern and impactful visual experiences that combine strategy with aesthetics. In the world of noise, My goal is to creat designs that not only look refined but also communicate purpose and build trust. Let's creat somthing that speaks before you have to.";

    let index = 0;
    let isDeleting = false;

    function typeEffect() {

        if (!isDeleting) {
            // Typing
            typeElement.textContent = text.substring(0, index + 1);
            index++;

            if (index === text.length) {
                setTimeout(() => isDeleting = true, 1500); // pause before deleting
            }
        } else {
            // Deleting
            typeElement.textContent = text.substring(0, index - 1);
            index--;

            if (index === 0) {
                isDeleting = false;
            }
        }

        setTimeout(typeEffect, isDeleting ? 20 : 35);
    }

    typeEffect();
}


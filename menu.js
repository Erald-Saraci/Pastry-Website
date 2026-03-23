document.addEventListener("DOMContentLoaded", () => {
    // 1. LIGHTBOX LOGIC
    const items = document.querySelectorAll(".menu-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");

    items.forEach(item => {
        item.addEventListener("click", () => {
            // Find the image inside the clicked card
            const img = item.querySelector("img");
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    // 2. SCROLL ANIMATION LOGIC (Fade In)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adds a slight delay to each card so they cascade in
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); 
                // Stop observing once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Target all elements with the 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});
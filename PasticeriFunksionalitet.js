document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // 1. DYNAMIC CSS (Smooth Zoom & Reveal Animations)
    // ======================================================
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- 1. ALIVE SCROLL ANIMATIONS --- */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* --- 2. SMOOTH ZOOM ANIMATION DEFINITION --- */
        @keyframes smoothZoom {
            0% { opacity: 0; transform: scale(0.85); }
            100% { opacity: 1; transform: scale(1); }
        }

        /* --- NEW: THE CLASS THAT TRIGGERS THE ZOOM --- */
        .lightbox-img.trigger-zoom {
            animation: smoothZoom 0.4s ease-out forwards;
        }
    `;
    document.head.appendChild(style);


    // ======================================================
    // 2. "ALIVE" SCROLL OBSERVER
    // ======================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); 
            }
        });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll("h2, .Catch-Line, .AroundTekst, .Contact-Split-Section, .Menu-Section, .Social-Icons, .Butonat");
    
    revealElements.forEach(el => {
        el.classList.add('reveal'); 
        observer.observe(el);       
    });


    // ======================================================
    // 3. INFINITE GALLERY SETUP (CLONING)
    // ======================================================
    const track = document.querySelector('.Imazhet');
    
    if (track) {
        // We clone the images so the CSS animation has a second set to loop into
        const originalImages = Array.from(track.children);
        originalImages.forEach(img => {
            const clone = img.cloneNode(true);
            // Mark it as a clone just in case we need to style it differently later
            clone.classList.add('clone'); 
            track.appendChild(clone);
        });
    }


   // ======================================================
    // 4. LIGHTBOX LOGIC (Fixed with Event Delegation)
    // ======================================================
    
    // 1. Create the lightbox HTML elements dynamically
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `<span class="lightbox-close">&times;</span><img class="lightbox-img" src="">`;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const galleryContainer = document.querySelector('.Imazhet'); // The container that holds images

    // 2. Event Delegation: Listen to clicks on the CONTAINER, not individual images
    if (galleryContainer) {
        galleryContainer.addEventListener('click', (e) => {
            // Check if the thing clicked was an IMG
            if (e.target.tagName === 'IMG') {
                lightboxImg.src = e.target.src; // Copy image source
                lightbox.classList.add('visible'); // Show popup (CSS handles zoom)
            }
        });
    }

    // 3. Close Logic
    const closeLightbox = () => {
        lightbox.classList.remove('visible');
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close if clicking the dark background (but not the image itself)
    lightbox.addEventListener('click', (e) => { 
        if(e.target === lightbox) closeLightbox(); 
    });


    // ======================================================
    // 5. GOOGLE REVIEW & CLIPBOARD LOGIC
    // ======================================================
    const googleButton = document.getElementById('submit-to-google');
    const reviewTextArea = document.getElementById('user-review-text');

    if (googleButton && reviewTextArea) {
        googleButton.addEventListener('click', () => {
            const reviewText = reviewTextArea.value;

            if (reviewText.trim() === "") {
                alert("Ju lutem shkruani vlerësimin tuaj përpara se të vazhdoni!");
                return;
            }

            navigator.clipboard.writeText(reviewText).then(() => {
                alert("Vlerësimi u kopjua automatikisht! Tani thjesht bëni 'Paste' te faqja e Google Maps që do të hapet.");
                const googleReviewLink = "https://search.google.com/local/writereview?placeid=ChIJ8YqN_i8SThMR9Ena-mD_PDU";
                window.open(googleReviewLink, '_blank');
            }).catch(err => {
                window.open("https://search.google.com/local/writereview?placeid=ChIJ8YqN_i8SThMR9Ena-mD_PDU", '_blank');
            });
        });
    }


    // ======================================================
    // 6. NAVIGATION SCROLL LOGIC
    // ======================================================
    document.querySelectorAll('.Butonat p').forEach(item => {
        item.addEventListener('click', () => {
            const text = item.innerText.toLowerCase();
            const today = new Date().getDay(); 
            
            if(text.includes('kontakt')) {
                const footer = document.getElementById('footer-anchor');
                if(footer) footer.scrollIntoView({ behavior: 'smooth' });
            } 
            else if(text.includes('menu') || text.includes('specialitete')) {
                const menu = document.getElementById('menu-anchor');
                if(menu) menu.scrollIntoView({ behavior: 'smooth' });
            } 
            else if(text.includes('evente')) {
                if (today === 0) {
                    alert("Sot është e diel! Jemi hapur me orar të shkurtër (deri në 14:00). Për evente, na kontaktoni nesër ose na shkruani një email!");
                } else {
                    alert("Për evente, ju lutem na kontaktoni në seksionin më poshtë!");
                }
                const footer = document.getElementById('footer-anchor');
                if(footer) footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
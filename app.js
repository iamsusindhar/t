// --- MOBILE NAVIGATION LOGIC ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu");
const navLinks = document.querySelectorAll(".menu li a");

// Toggle Menu on Click
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // Prevent scrolling when menu is open
    document.body.classList.toggle("no-scroll");
});

// Close Menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

// About us section number counter

const counters = document.querySelectorAll('.about-metrics .number');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.count;
    let current = 0;

    const increment = target / 40;

    const update = () => {
        current += increment;
        if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
        } else {
        el.textContent = target;
        }
    };

    update();
    counterObserver.unobserve(el);
    });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));



// Services revealing animation

document.getElementById('view-more-btn').addEventListener('click', function() {
const moreServices = document.getElementById('more-services');
const btnContainer = this.parentElement;
// 1. Add the class to trigger the CSS transition
moreServices.classList.add('reveal');
// 2. Fade out the button nicely
this.classList.add('fade-out');
// 3. Remove button from layout after fade completes (optional cleanup)
setTimeout(() => {
    btnContainer.style.display = 'none';
}, 300);
});



// How we work section animation (Hover for Desktop, Click for Mobile)
const steps = document.querySelectorAll('.step');

steps.forEach(step => {
    // Desktop: Hover to expand
    step.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        }
    });

    // Mobile: Click to expand
    step.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            // Remove active class from all others
            steps.forEach(s => s.classList.remove('active'));
            // Add active class to clicked step
            step.classList.add('active');
        }
    });
});

// Why choose us section logic  
const items = document.querySelectorAll('.logic-item');
const text = document.getElementById('logicText');

items.forEach(item => {
    item.addEventListener('mouseenter', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    text.style.opacity = 0;
    setTimeout(() => {
        text.textContent = item.dataset.text;
        text.style.opacity = 1;
    }, 120);
    });
});


// --- INITIALIZE SWIPER ---
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,      // Mobile: Show 1 card
    spaceBetween: 30,      // Gap between cards
    loop: true,            // Infinite Loop
    grabCursor: true,      // Hand cursor for dragging
    autoplay: {
        delay: 3000,       // Auto-slide every 3 seconds
        disableOnInteraction: false, // Continue after user touches it
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,   // Click dots to navigate
    },
    breakpoints: {
        768: {
            slidesPerView: 2, // Tablet: Show 2 cards
        },
        1024: {
            slidesPerView: 3, // Desktop: Show 3 cards
        },
    },
});

// Ribbon Ceremony 

// document.addEventListener("DOMContentLoaded", function() {
//     const overlay = document.getElementById('opening-overlay');
//     // --- CHANGE 1: Force it to show every time ---
//     overlay.style.display = 'flex';
//     initRibbon(); 
//     function initRibbon() {
//         const container = document.getElementById('ribbon-container');
//         const left = document.querySelector('.ribbon-left');
//         const right = document.querySelector('.ribbon-right');
//         const knot = document.querySelector('.ribbon-knot');
//         const scissors = document.getElementById('scissor-cursor');
//         const hint = document.querySelector('.tap-hint');
//         // Scissors follow mouse/touch
//         document.addEventListener('mousemove', (e) => {
//             scissors.style.left = e.clientX + 'px';
//             scissors.style.top = e.clientY + 'px';
//         });           
//         // Interaction: Cut the Ribbon
//         function cutRibbon(e) {
//             // 1. Play Confetti
//             confetti({
//                 particleCount: 150,
//                 spread: 70,
//                 origin: { y: 0.6 },
//                 colors: ['#FFD700', '#D32F2F', '#FFFFFF']
//             });
//             // 2. Animate Ribbon parts flying away
//             left.classList.add('cut-left');
//             right.classList.add('cut-right');
//             knot.classList.add('pop-knot');
//             hint.style.opacity = '0';
//             // 3. Fade out the dark overlay
//             overlay.classList.add('fade-out');
//             // --- CHANGE 2: Removed localStorage.setItem here ---
//             // 4. Remove from DOM after animation
//             setTimeout(() => {
//                 overlay.style.display = 'none';
//             }, 1500);
//         }
//         // Trigger on click of the knot
//         knot.addEventListener('click', cutRibbon);
//         knot.addEventListener('touchstart', cutRibbon);
//     }
// });




// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});
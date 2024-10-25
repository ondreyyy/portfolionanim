// Inicializace GSAP pluginů
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);

// 1. Manuální rozdělení textu na písmena
function splitTextToSpans(textElement) {
    const text = textElement.textContent;
    const characters = text.split(' ');
    textElement.innerHTML = characters.map(char => `<span class="char">${char}</span>`).join('');
}

// Rozdělení nadpisu na jednotlivá písmena
const titleElement = document.querySelector('.title');
splitTextToSpans(titleElement);

// Animace jednotlivých písmen
gsap.to(".char", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".title-section",
        start: "top center",
        toggleActions: "play none none reverse"
    }
});

gsap.to(".test", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".title-section",
        start: "top center",
        toggleActions: "play none none reverse"
    }
});

// 2. Animace kruhu po definované cestě pomocí MotionPathPlugin
gsap.to(".circle", {
    duration: 4,
    motionPath: {
        path: [{ x: 0, y: 0 }, { x: 200, y: -100 }, { x: 400, y: 0 }, { x: 200, y: 100 }, { x: 0, y: 0 }],
        curviness: 1.25,
        autoRotate: true
    },
    repeat: -1,
    ease: "power1.inOut"
});

// 3. Horizontální scroll
gsap.to('.horizontal-content', {
    xPercent: -100 * (document.querySelectorAll('.box').length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.horizontal-scroll',
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: true,
    }
});

// 4. Draggovatelný box
Draggable.create(".draggable-box", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: ".horizontal-scroll",
    inertia: true
});

// 5. Návrat k vertikálnímu scrollování po 300vh
gsap.fromTo('.resume-text',
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.vertical-resume',
            start: 'top center',
            end: 'top 100px',
            scrub: true,
        }
    }
);
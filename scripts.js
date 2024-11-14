// Fade in sections on scroll
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});
// Change navbar background color on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// Create the custom cursor element and append it to the body
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Function to create waves of squares with delay
let lastWaveTime = 0;
const waveDelay = 300; // Time between waves in milliseconds (300ms = 0.3 seconds)

function createWave(x, y) {
    const currentTime = Date.now();

    // Only create a wave if the delay has passed
    if (currentTime - lastWaveTime > waveDelay) {
        const wave = document.createElement('div');
        wave.classList.add('cursor-wave');
        document.body.appendChild(wave);
        wave.style.left = `${x - 10}px`; // Center the wave on the cursor
        wave.style.top = `${y - 10}px`;

        // Remove the wave after animation completes (2 seconds)
        setTimeout(() => {
            wave.remove();
        }, 2000); // Matches the wave animation duration

        // Update the time of the last wave creation
        lastWaveTime = currentTime;
    }
}

// Mousemove event to update cursor position
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    // Create waves at cursor position
    createWave(e.pageX, e.pageY);
});


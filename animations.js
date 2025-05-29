// Initialize animations when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const elements = ['#morphing', '#particles', '#grid', '#path', '#staggering', '#fireworks', '#wave', '#logo', '#cursor-follow', '#timeline'];
    let currentIndex = 0;

    // Setup typing animation
    const phrases = [
        "Transform shapes with morphing...",
        "Create particle systems...",
        "Animate grid layouts...",
        "Follow complex paths...",
        "Stagger animations beautifully...",
        "Generate firework effects...",
        "Create wave patterns...",
        "Animate logos dynamically...",
        "Follow cursor movements...",
        "Build complex timelines..."
    ];
    let phraseIndex = 0;
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');

    function typePhrase(phrase) {
        let charIndex = 0;
        typingText.textContent = '';
        
        function type() {
            if (charIndex < phrase.length) {
                typingText.textContent += phrase.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // Setup showcase animations
    const sequences = {
        morphing: () => {
            anime({
                targets: '#morphing',
                borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '50% 20% 80% 50% / 25% 75% 25% 75%',
                    '67% 33% 33% 67% / 33% 33% 67% 67%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%'
                ],
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                duration: 3000,
                easing: 'easeInOutQuad',
                loop: true
            });
        },

        particles: () => {
            const particlesContainer = document.querySelector('#particles');
            particlesContainer.innerHTML = '';
            
            for (let i = 0; i < 50; i++) {
                const dot = document.createElement('div');
                dot.classList.add('particle-dot');
                particlesContainer.appendChild(dot);
                
                anime({
                    targets: dot,
                    translateX: () => anime.random(-200, 200),
                    translateY: () => anime.random(-200, 200),
                    scale: [0, 1],
                    opacity: [1, 0],
                    duration: () => anime.random(1000, 2000),
                    delay: () => anime.random(0, 1000),
                    loop: true
                });
            }
        },

        grid: () => {
            const gridContainer = document.querySelector('#grid');
            gridContainer.innerHTML = '';
            
            for (let i = 0; i < 64; i++) {
                const item = document.createElement('div');
                item.classList.add('grid-item');
                gridContainer.appendChild(item);
            }

            anime.timeline({
                targets: '.grid-item',
                loop: true
            })
            .add({
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(50, {
                    grid: [8, 8],
                    from: 'center'
                }),
                duration: 800,
                easing: 'easeOutExpo'
            })
            .add({
                scale: [1, 0.5],
                rotate: 180,
                delay: anime.stagger(100, {
                    grid: [8, 8],
                    from: 'center'
                }),
                duration: 1000,
                easing: 'easeInOutQuad'
            })
            .add({
                scale: [0.5, 1],
                rotate: 360,
                delay: anime.stagger(50, {
                    grid: [8, 8],
                    from: 'center'
                }),
                duration: 1000,
                easing: 'easeInOutQuad'
            });
        },

        path: () => {
            anime({
                targets: '.moving-object',
                translateX: {
                    value: 350,
                    duration: 2000
                },
                translateY: {
                    value: [-30, 0],
                    duration: 2000
                },
                rotate: {
                    value: '1turn',
                    duration: 2000
                },
                loop: true,
                easing: 'easeInOutSine'
            });
        },

        staggering: () => {
            const container = document.querySelector('#staggering');
            container.innerHTML = '';
            
            for (let i = 0; i < 100; i++) {
                const dot = document.createElement('div');
                dot.style.width = '100%';
                dot.style.height = '100%';
                dot.style.background = 'var(--primary-gradient)';
                dot.style.borderRadius = '2px';
                container.appendChild(dot);
            }

            anime({
                targets: '#staggering > div',
                scale: [
                    {value: .1, easing: 'easeOutSine', duration: 500},
                    {value: 1, easing: 'easeInOutQuad', duration: 1200}
                ],
                delay: anime.stagger(100, {grid: [10, 10], from: 'center'}),
                loop: true
            });
        },

        fireworks: () => {
            const container = document.querySelector('#fireworks');
            container.innerHTML = '';
            
            function createFirework(x, y) {
                const particles = [];
                const particleCount = 30;
                const colors = ['#FF3366', '#FF6B6B', '#FFD93D'];
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('firework');
                    container.appendChild(particle);
                    particles.push(particle);
                    
                    const angle = (i / particleCount) * Math.PI * 2;
                    const velocity = 100 + Math.random() * 100;
                    const size = 3 + Math.random() * 3;
                    
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    
                    anime({
                        targets: particle,
                        translateX: [
                            {value: x, duration: 0},
                            {value: x + Math.cos(angle) * velocity, duration: 1000, delay: 100}
                        ],
                        translateY: [
                            {value: y, duration: 0},
                            {value: y + Math.sin(angle) * velocity, duration: 1000, delay: 100}
                        ],
                        scale: [
                            {value: 0, duration: 0},
                            {value: 1, duration: 200},
                            {value: 0, duration: 800, delay: 100}
                        ],
                        easing: 'easeOutExpo',
                        complete: () => {
                            container.removeChild(particle);
                        }
                    });
                }
            }

            function createFireworkSequence() {
                const containerRect = container.getBoundingClientRect();
                const positions = [
                    {x: containerRect.width * 0.2, y: containerRect.height * 0.2},
                    {x: containerRect.width * 0.8, y: containerRect.height * 0.3},
                    {x: containerRect.width * 0.5, y: containerRect.height * 0.5},
                    {x: containerRect.width * 0.3, y: containerRect.height * 0.7},
                    {x: containerRect.width * 0.7, y: containerRect.height * 0.8}
                ];

                let index = 0;
                
                function launchNext() {
                    if (container.parentNode) {  // Check if container still exists
                        const pos = positions[index];
                        createFirework(pos.x, pos.y);
                        index = (index + 1) % positions.length;
                        
                        // Create trail effect
                        const trail = document.createElement('div');
                        trail.classList.add('firework');
                        container.appendChild(trail);
                        
                        anime({
                            targets: trail,
                            translateX: pos.x,
                            translateY: [containerRect.height, pos.y],
                            scale: [0.5, 0],
                            opacity: [1, 0],
                            duration: 500,
                            easing: 'easeOutExpo',
                            complete: () => {
                                container.removeChild(trail);
                            }
                        });
                        
                        setTimeout(launchNext, 300);
                    }
                }
                
                launchNext();
            }

            createFireworkSequence();
        },

        wave: () => {
            const container = document.querySelector('#wave');
            container.innerHTML = '';
            
            for (let i = 0; i < 20; i++) {
                const dot = document.createElement('div');
                dot.classList.add('wave-dot');
                container.appendChild(dot);
                
                anime({
                    targets: dot,
                    translateY: [
                        {value: 30, duration: 500},
                        {value: -30, duration: 500}
                    ],
                    delay: i * 100,
                    loop: true,
                    direction: 'alternate',
                    easing: 'easeInOutSine'
                });
            }
        },

        logo: () => {
            const container = document.querySelector('#logo');
            container.innerHTML = '';
            
            for (let i = 0; i < 5; i++) {
                const line = document.createElement('div');
                line.classList.add('logo-line');
                container.appendChild(line);
                
                anime({
                    targets: line,
                    rotate: [
                        {value: i * 72, duration: 0},
                        {value: i * 72 + 360, duration: 2000}
                    ],
                    scale: [
                        {value: 0, duration: 0},
                        {value: 1, duration: 1000},
                        {value: 0, duration: 1000}
                    ],
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        },

        'cursor-follow': () => {
            const container = document.querySelector('#cursor-follow');
            container.innerHTML = '';
            
            for (let i = 0; i < 5; i++) {
                const dot = document.createElement('div');
                dot.classList.add('cursor-dot');
                container.appendChild(dot);
                
                anime({
                    targets: dot,
                    translateX: [
                        {value: 100, duration: 1000},
                        {value: 300, duration: 1000},
                        {value: 300, duration: 1000},
                        {value: 100, duration: 1000}
                    ],
                    translateY: [
                        {value: 100, duration: 1000},
                        {value: 100, duration: 1000},
                        {value: 300, duration: 1000},
                        {value: 300, duration: 1000}
                    ],
                    delay: i * 200,
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        },

        timeline: () => {
            const container = document.querySelector('#timeline');
            container.innerHTML = '';
            
            for (let i = 0; i < 5; i++) {
                const item = document.createElement('div');
                item.classList.add('timeline-item');
                container.appendChild(item);
            }

            anime.timeline({loop: true})
                .add({
                    targets: '.timeline-item',
                    scale: [0, 1],
                    delay: anime.stagger(200),
                    duration: 1000
                })
                .add({
                    targets: '.timeline-item',
                    translateY: [-30, 30],
                    delay: anime.stagger(100),
                    duration: 1000
                })
                .add({
                    targets: '.timeline-item',
                    translateY: [30, 0],
                    scale: [1, 0],
                    delay: anime.stagger(100),
                    duration: 1000
                });
        }
    };

    // Function to show next animation
    function showNext() {
        // Hide all elements
        elements.forEach(el => {
            anime.set(el, {
                opacity: 0,
                scale: 0.8
            });
        });

        // Show and animate current element
        const current = elements[currentIndex];
        anime({
            targets: current,
            opacity: 1,
            scale: 1,
            duration: 800,
            easing: 'easeOutExpo'
        });

        // Update typing text
        typePhrase(phrases[currentIndex]);

        // Start the sequence
        sequences[current.substring(1)]();

        // Setup next
        currentIndex = (currentIndex + 1) % elements.length;
        setTimeout(showNext, 4000);
    }

    // Start the showcase
    showNext();
});

// Function to create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);

        // Random position and size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.opacity = Math.random() * 0.5;

        // Animate each particle
        anime({
            targets: particle,
            translateX: () => anime.random(-100, 100),
            translateY: () => anime.random(-100, 100),
            scale: () => [0.5, 1],
            opacity: () => [particle.style.opacity, 0],
            duration: () => anime.random(3000, 6000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    }
}

// Add particle styles
const style = document.createElement('style');
style.textContent = `
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    .particle {
        position: absolute;
        background: linear-gradient(135deg, #FF3366 0%, #FF6B6B 100%);
        border-radius: 50%;
    }
`;

// Showcase Animations
function initShowcaseAnimations() {
    // Initialize animations
    const elements = ['#morphing', '#particles', '#grid', '#path'];
    let currentIndex = 0;

    // Setup showcase animations
    const sequences = {
        morphing: () => {
            anime({
                targets: '#morphing',
                borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '50% 20% 80% 50% / 25% 75% 25% 75%',
                    '67% 33% 33% 67% / 33% 33% 67% 67%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%'
                ],
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                duration: 3000,
                easing: 'easeInOutQuad',
                loop: true
            });
        },
        
        particles: () => {
            const particlesContainer = document.querySelector('#particles');
            // Create more particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle-dot';
                particlesContainer.appendChild(particle);
            }

            anime({
                targets: '#particles .particle-dot',
                translateX: () => anime.random(-400, 400),
                translateY: () => anime.random(-200, 200),
                scale: () => anime.random(1, 3),
                opacity: [0.3, 1],
                duration: () => anime.random(1000, 2000),
                delay: anime.stagger(20),
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutQuad'
            });
        },

        grid: () => {
            const gridContainer = document.querySelector('#grid');
            // Clear existing grid items
            gridContainer.innerHTML = '';
            // Create grid items
            for (let i = 0; i < 64; i++) {
                const item = document.createElement('div');
                item.className = 'grid-item';
                gridContainer.appendChild(item);
            }

            anime({
                targets: '.grid-item',
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(50, {
                    grid: [8, 8],
                    from: 'center'
                }),
                duration: 800,
                easing: 'easeOutExpo',
                loop: true,
                direction: 'alternate'
            });
        },

        path: () => {
            const path = anime.path('#path path');
            anime({
                targets: '.moving-object',
                translateX: path('x'),
                translateY: path('y'),
                rotate: path('angle'),
                easing: 'linear',
                duration: 3000,
                loop: true
            });
        }
    };

    // Function to show next animation
    function showNext() {
        // Hide all elements
        elements.forEach(el => {
            anime.set(el, {
                opacity: 0,
                scale: 0.8
            });
        });

        // Show and animate current element
        const current = elements[currentIndex];
        anime({
            targets: current,
            opacity: 1,
            scale: 1,
            duration: 600,
            easing: 'easeOutExpo'
        });

        // Start the sequence
        sequences[current.substring(1)]();

        // Setup next
        currentIndex = (currentIndex + 1) % elements.length;
        setTimeout(showNext, 3000);
    }

    // Add typing animation
    const phrases = [
        "Design anything you can imagine...",
        "Bring your ideas to life...",
        "Let AI handle the animation...",
        "Your imagination is the only limit..."
    ];
    let phraseIndex = 0;
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    function typePhrase(phrase) {
        let charIndex = 0;
        typingText.textContent = '';
        
        function type() {
            if (charIndex < phrase.length) {
                typingText.textContent += phrase[charIndex];
                charIndex++;
                setTimeout(type, 50);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (typingText.textContent.length > 0) {
                typingText.textContent = typingText.textContent.slice(0, -1);
                setTimeout(erase, 25);
            } else {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(() => typePhrase(phrases[phraseIndex]), 500);
            }
        }
        
        type();
    }

    // Start typing animation
    typePhrase(phrases[0]);

    // Animate cursor
    anime({
        targets: '.cursor',
        opacity: [1, 0],
        duration: 600,
        easing: 'steps(2)',
        loop: true
    });

    // Start the sequence
    showNext();
} 
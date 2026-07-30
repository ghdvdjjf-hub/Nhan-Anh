document.addEventListener('DOMContentLoaded', () => {
    // ---- Confetti System ----
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 2 - 1;
            this.color = Math.random() > 0.5 ? '#FFC93C' : '#F9A826'; // Yellow/Gold colors
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 4 - 2;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.7; // "rơi nhẹ như tuyết" - soft feel
            // Draw small rectangles (confetti)
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size * 1.5);
            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < 70; i++) {
        particles.push(new Confetti());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateConfetti);
    }
    animateConfetti();

    // ---- Page Flow Management ----
    const pageFollow = document.getElementById('page-follow');
    const pageLoading = document.getElementById('page-loading');
    const pageResult = document.getElementById('page-result');
    const btnFollow = document.getElementById('btn-follow');
    
    // Animation elements
    const progressBar = document.getElementById('progress-bar');
    const charRunning = document.getElementById('char-running');
    const charScholarship = document.getElementById('char-scholarship');
    const charGraduated = document.getElementById('char-graduated');

    function switchPage(hidePage, showPage) {
        hidePage.classList.remove('active');
        setTimeout(() => {
            showPage.classList.add('active');
        }, 500); // Wait for fade out
    }

    btnFollow.addEventListener('click', () => {
        // Open Facebook in new tab
        window.open('http://facebook.com/SMAEMedia.HaUI?locale=vi_VN', '_blank');
        
        // Transition to Loading Page
        switchPage(pageFollow, pageLoading);
        startLoadingSequence();
    });

    function startLoadingSequence() {
        const totalDuration = 15000; // 30 seconds
        const updateInterval = 50;
        let elapsed = 0;

        // Progress bar interval
        const timer = setInterval(() => {
            elapsed += updateInterval;
            const progress = (elapsed / totalDuration) * 100;
            progressBar.style.width = `${progress}%`;

            // Move the character along the progress bar
            const progressCharacter = document.getElementById('progress-character');
            if (progressCharacter) {
                progressCharacter.style.left = `${progress}%`;
            }
            
            // At 28.5 seconds, transform to graduate
            if (elapsed >= 28500 && charGraduated.classList.contains('hidden')) {
                charRunning.classList.add('hidden');
                charGraduated.classList.remove('hidden');
            }

            if (elapsed >= totalDuration) {
                clearInterval(timer);
                // Wait a tiny bit to show the graduate form before switching to final page
                setTimeout(() => {
                    switchPage(pageLoading, pageResult);
                }, 1500);
            }
        }, updateInterval);
    }
});

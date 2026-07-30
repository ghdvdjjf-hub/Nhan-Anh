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

    const TOTAL_TIME = 15000;

function showPage(page){

    pageFollow.classList.remove("active");
    pageLoading.classList.remove("active");
    pageResult.classList.remove("active");

    page.classList.add("active");

}

function checkFollowStatus(){

    const followTime = Number(localStorage.getItem("followTime"));

    if(!followTime) return;

    const passed = Date.now() - followTime;

    if(passed >= TOTAL_TIME){

        localStorage.removeItem("followTime");

        showPage(pageResult);

    }else{

        showPage(pageLoading);

        startLoadingSequence(TOTAL_TIME - passed);

    }

}

btnFollow.onclick = function(){

    localStorage.setItem("followTime", Date.now());

    window.open(
        "https://www.facebook.com/SMAEMedia.HaUI?locale=vi_VN",
        "_blank"
    );

};

    function startLoadingSequence(remainingTime){

    progressBar.style.width = "0%";

    charRunning.classList.remove("hidden");
    charGraduated.classList.add("hidden");

    const progressCharacter =
        document.getElementById("progress-character");

    let elapsed = TOTAL_TIME - remainingTime;

    const timer = setInterval(()=>{

        elapsed += 50;

        const progress =
            Math.min(elapsed / TOTAL_TIME * 100,100);

        progressBar.style.width = progress + "%";

        if(progressCharacter){

            progressCharacter.style.left =
                progress + "%";

        }

        if(progress >= 90 &&
            charGraduated.classList.contains("hidden")){

            charRunning.classList.add("hidden");
            charGraduated.classList.remove("hidden");

        }

        if(elapsed >= TOTAL_TIME){

            clearInterval(timer);

            localStorage.removeItem("followTime");

            setTimeout(()=>{

                showPage(pageResult);

            },1000);

        }

    },50);

}
window.addEventListener("pageshow", checkFollowStatus);

window.addEventListener("focus", checkFollowStatus);

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        checkFollowStatus();
    }
});

checkFollowStatus();
});

const images = [
    'fotos/35eff3ef-d1a1-402d-9b81-c141db1a8600.jpg',
    'fotos/4f9dd7b4-1525-43ba-bf32-f27a98ab0011.jpg',
    'fotos/638D65C4-0FC4-4C50-9427-2B8469DFCC10.jpg',
    'fotos/6893c86e-5d11-45df-868f-3d016e99cd5e.jpg',
    'fotos/7ae6f6a2-a0b7-49c9-82fa-94915288f801.jpg',
    'fotos/B91270FB-759A-4485-87A2-84EE184948F0.JPG',
    'fotos/D44A44E3-F198-441D-AEE9-C0F816F8DC80.jpg',
    'fotos/IMG_0316.jpg',
    'fotos/IMG_0918.PNG',
    'fotos/IMG_1236.jpg',
    'fotos/IMG_1455.JPG',
    'fotos/IMG_1942.jpg',
    'fotos/IMG_20231026_222440.jpg',
    'fotos/IMG_20231120_194252.jpg',
    'fotos/IMG_2045.jpg',
    'fotos/IMG_2092.jpg',
    'fotos/IMG_2512.jpg',
    'fotos/IMG_3064.jpg',
    'fotos/IMG_3218.jpg',
    'fotos/IMG_4156.jpg',
    'fotos/IMG_4352.jpg',
    'fotos/IMG_4742.jpg',
    'fotos/IMG_4750.jpg',
    'fotos/IMG_4812.JPG',
    'fotos/IMG_5142.jpg',
    'fotos/IMG_5586.jpg',
    'fotos/IMG_5746.jpg',
    'fotos/IMG_6653.jpg',
    'fotos/IMG_6968.jpg',
    'fotos/Imagen1.png',
    'fotos/a5012082-81e8-4644-992b-97c9ea0f294e.jpg',
    'fotos/c1243540-fec2-4cde-b40f-01aac2fd204f.jpg',
    'fotos/c91d93eb-41ff-4364-af01-5ce28a685b65.jpg',
    'fotos/d02e847c-e7bf-42dc-a030-57dfed6baea0.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
    const collage = document.getElementById('collage');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const heartsBg = document.getElementById('hearts-bg');

    let currentIdx = 0;
    let popInterval;

    // Generate floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartsBg.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 300);

    function triggerFinalSurprise() {
        // Wait a bit after the last photo appears
        setTimeout(() => {
            const header = document.querySelector('header');
            collage.classList.add('fade-out');
            header.classList.add('fade-out');

            // Prepare word-by-word animation
            const surpriseText = document.getElementById('surprise-text');
            const words = surpriseText.innerText.split(' ');
            surpriseText.innerHTML = words.map((word, i) =>
                `<span style="animation-delay: ${1.5 + (i * 0.3)}s">${word}</span>`
            ).join(' ');

            // After fade out, show the gift
            setTimeout(() => {
                collage.classList.add('hidden');
                header.classList.add('hidden');
                const surpriseContainer = document.getElementById('surprise-container');
                surpriseContainer.classList.remove('hidden');

                // FINAL STEP: Message -> Ducks -> Video
                setTimeout(() => {
                    surpriseContainer.classList.add('fade-out');
                    setTimeout(() => {
                        surpriseContainer.classList.add('hidden');
                        const finalMsg = document.getElementById('final-message-container');
                        finalMsg.classList.remove('hidden');

                        // DUCK FINALE START
                        setTimeout(() => {
                            finalMsg.classList.add('fade-out');
                            heartsBg.classList.add('heart-fade-out');

                            setTimeout(() => {
                                finalMsg.classList.add('hidden');
                                // Reveal sky wrapper for the cloud video scene
                                const skyCont = document.getElementById('sky-container');
                                skyCont.classList.remove('hidden');

                                // Auto-play video after the cloud frame finishes popping in
                                setTimeout(() => {
                                    const video = document.getElementById('final-video');
                                    video.play();
                                    resetBtn.style.display = 'inline-block';
                                    resetBtn.style.zIndex = "4000";
                                }, 6200);
                            }, 3000);
                        }, 5000); // Show final message for 5s
                    }, 3000);
                }, 10000);
            }, 3000);
        }, 2000);
    }

    function spawnPhoto() {
        if (currentIdx >= images.length) {
            clearInterval(popInterval);
            triggerFinalSurprise();
            return;
        }

        const imgPath = images[currentIdx];
        currentIdx++;

        const polaroid = document.createElement('div');
        polaroid.classList.add('polaroid');

        const width = 180 + Math.random() * 140;
        const height = width * 1.25;

        const maxX = collage.clientWidth - width;
        const maxY = collage.clientHeight - height;

        const x = Math.max(0, Math.random() * maxX);
        const y = Math.max(0, Math.random() * maxY);
        const rotation = (Math.random() - 0.5) * 45;

        polaroid.style.width = width + 'px';
        polaroid.style.height = height + 'px';
        polaroid.style.left = x + 'px';
        polaroid.style.top = y + 'px';
        polaroid.style.setProperty('--rot', rotation + 'deg');

        const img = document.createElement('img');
        img.src = './' + imgPath;

        img.onload = () => {
            polaroid.appendChild(img);
            collage.appendChild(polaroid);
        };

        img.onerror = () => {
            console.error("Error loading:", imgPath);
        };
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        currentIdx = 0;
        collage.innerHTML = '';
        collage.classList.remove('fade-out', 'hidden');
        document.querySelector('header').classList.remove('fade-out', 'hidden');
        document.getElementById('surprise-container').classList.add('hidden');
        document.getElementById('surprise-container').classList.remove('fade-out');
        document.getElementById('final-message-container').classList.add('hidden');
        document.getElementById('final-message-container').classList.remove('fade-out');

        document.getElementById('sky-container').classList.add('hidden');
        const video = document.getElementById('final-video');
        video.pause();
        video.currentTime = 0;

        heartsBg.classList.remove('heart-fade-out');
        popInterval = setInterval(spawnPhoto, 400);
    });

    resetBtn.addEventListener('click', () => {
        resetBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        collage.innerHTML = '';
        collage.classList.remove('fade-out', 'hidden');
        document.querySelector('header').classList.remove('fade-out', 'hidden');
        document.getElementById('surprise-container').classList.add('hidden');
        document.getElementById('surprise-container').classList.remove('fade-out');
        document.getElementById('final-message-container').classList.add('hidden');
        document.getElementById('final-message-container').classList.remove('fade-out');

        document.getElementById('sky-container').classList.add('hidden');
        const video = document.getElementById('final-video');
        video.pause();
        video.currentTime = 0;

        heartsBg.classList.remove('heart-fade-out');
        currentIdx = 0;
    });
});

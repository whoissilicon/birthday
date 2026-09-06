/**
 * CUSTOMIZABLE DATA SECTION
 */
const birthdayData = {
    // Target user's exact name
    name: "Naila Islam Shifa",

    // Path to the final photograph
    finalImage: "images/final.jpg",

    // Personality Questions & Responses (Stage 3)
    questions: [
        {
            question: "Be honest… which one sounds most like you?",
            options: [
                { text: "I’ll sleep early tonight.", reaction: "Okay… noted. 😌" },
                { text: "One more episode.", reaction: "Classic move. 🍿" },
                { text: "One more scroll.", reaction: "We've all been there.📱" },
                { text: "I have no idea how it became 3 AM.", reaction: "Thought so. 🌙" }
            ]
        },
        {
            question: "If you suddenly got a completely free day, what would you choose?",
            options: [
                { text: "Sleep", reaction: "Pure bliss. 🛌" },
                { text: "Go somewhere", reaction: "Wanderlust wins. ✈️" },
                { text: "Spend time with people", reaction: "Connection over everything. ✨" },
                { text: "Just disappear from everyone for a while", reaction: "A peaceful retreat. 🍃" }
            ]
        },
        {
            question: "Which matters more?",
            options: [
                { text: "A perfect photograph", reaction: "Capturing a moment forever." },
                { text: "A perfect memory", reaction: "Interesting choice… Maybe that explains why some moments are worth keeping." }
            ]
        },
        {
            question: "One last thing… Do you think some ordinary days become special only when you look back at them?",
            options: [
                { text: "Yes", reaction: "Perspective changes everything." },
                { text: "Maybe", reaction: "Time has a quiet way of showing us." },
                { text: "Absolutely", reaction: "And today might just be one of them." }
            ]
        }
    ],

    // Interactive Timeline Memories (Stage 5)
    memories: [
        {
            date: "14 March",
            image: "images/memory1.jpg",
            title: "That day",
            caption: "Some moments become special without asking permission."
        },
        {
            date: "27 April",
            image: "images/memory1.jpg",
            title: "A quiet moment",
            caption: "Another ordinary day that ended up sticking around in memory."
        },
        {
            date: "09 June",
            image: "images/memory1.jpg",
            title: "Unplanned laughter",
            caption: "The best times are usually the ones that weren't scheduled."
        },
        {
            date: "21 August",
            image: "images/memory1.jpg",
            title: "Looking back",
            caption: "Proof that time passes, but good feelings don't."
        },
        {
            date: "03 October",
            image: "images/memory1.jpg",
            title: "A simple chapter",
            caption: "Just one of many reasons to celebrate this story."
        }
    ],

    // Personal Birthday Message (Stage 8)
    letterText: `Dear Naila,

Some people come into our lives and somehow make ordinary moments feel a little more special.

Today is a reminder of one simple thing — your existence itself is something worth celebrating.

I hope this new year of your life brings you more reasons to smile, more moments that become beautiful memories, and the courage to keep becoming the person you want to be.

May the things you quietly wish for find their way to you. May the difficult days become easier, the good days become unforgettable, and may you always have people around you who genuinely care about you.

Keep your kindness, keep your smile, keep dreaming, and never underestimate how far you can go.

Happy Birthday, Naila Islam Shifa.

I hope this year becomes one of those chapters you'll look back on and smile about.

Stay happy. Stay curious. And keep being you. ❤️`
};

/* --- CORE APPLICATION LOGIC --- */

let currentStage = 1;
let currentQuestionIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    setupStage4();
    setupTimeline();
    setupFinalStage();
});

// Navigation Function
function goToStage(stageNum) {
    const currentEl = document.querySelector('.stage.active');
    if (currentEl) {
        currentEl.classList.remove('active');
    }

    setTimeout(() => {
        if (currentEl) currentEl.style.display = 'none';

        let nextStageId = `stage-${stageNum}`;
        const nextEl = document.getElementById(nextStageId);
        
        if (nextEl) {
            nextEl.style.display = 'block';
            setTimeout(() => {
                nextEl.classList.add('active');
            }, 50);
        }
        currentStage = stageNum;

        // Custom Stage Triggers
        if (stageNum === 3) loadQuestion(0);
    }, 400);
}

// Stage 2: Name Input Handling (Flexible Name Matching)
function handleNameSubmit(event) {
    event.preventDefault();
    const inputVal = document.getElementById("name-input").value.trim().toLowerCase();
    const feedback = document.getElementById("name-feedback");

    const allowedNames = ["naila", "naila islam", "shifa", "naila islam shifa"];

    if (allowedNames.includes(inputVal)) {
        feedback.innerText = "Hmm… That sounds familiar. But I need one more confirmation.";
        setTimeout(() => {
            goToStage(3);
        }, 1800);
    } else {
        feedback.innerText = "Interesting… but I don't think that's who I was looking for.";
        document.getElementById("name-input").value = "";
    }
}

// Stage 3: Personality Questions Logic
function loadQuestion(index) {
    currentQuestionIdx = index;
    const container = document.getElementById("question-container");
    const qData = birthdayData.questions[index];

    let html = `
        <p class="subtitle text-center mb-sm">Question ${index + 1} of ${birthdayData.questions.length}</p>
        <h2 class="title text-center mb-md">“${qData.question}”</h2>
        <div class="options-list">
    `;

    qData.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="selectOption(${idx})">${opt.text}</button>`;
    });

    html += `</div><div id="question-reaction" class="feedback-text text-center mt-md"></div>`;
    container.innerHTML = html;
}

function selectOption(optIndex) {
    const qData = birthdayData.questions[currentQuestionIdx];
    const reactionEl = document.getElementById("question-reaction");
    
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.style.pointerEvents = "none");
    
    reactionEl.innerText = qData.options[optIndex].reaction;

    setTimeout(() => {
        if (currentQuestionIdx + 1 < birthdayData.questions.length) {
            loadQuestion(currentQuestionIdx + 1);
        } else {
            goToStage(4);
        }
    }, 1600);
}

// Stage 4 Setup
function setupStage4() {
    document.getElementById("identified-name").innerText = birthdayData.name;
    document.getElementById("birthday-name-display").innerText = birthdayData.name.toUpperCase();
}

// Stage 5: Interactive Timeline
function setupTimeline() {
    const container = document.getElementById("timeline-buttons");
    container.innerHTML = "";

    birthdayData.memories.forEach((mem, index) => {
        const btn = document.createElement("button");
        btn.className = "date-btn";
        btn.innerText = mem.date;
        btn.onclick = () => showMemory(index, btn);
        container.appendChild(btn);
    });
}

function showMemory(index, element) {
    document.querySelectorAll(".date-btn").forEach(b => b.classList.remove("active"));
    element.classList.add("active");

    const mem = birthdayData.memories[index];
    const viewer = document.getElementById("memory-viewer");
    const img = document.getElementById("memory-image");
    const title = document.getElementById("memory-title");
    const caption = document.getElementById("memory-caption");

    viewer.style.opacity = 0;

    setTimeout(() => {
        img.src = mem.image;
        title.innerText = mem.title;
        caption.innerText = mem.caption;
        viewer.classList.remove("hidden");
        viewer.style.opacity = 1;
    }, 300);
}

// Stage 6 Part 2 Toggle
function showStage6Part2() {
    goToStage("6-part2");
}

// Stage 7 Reveal
function triggerGrandReveal() {
    const step1 = document.getElementById("reveal-step-1");
    const step2 = document.getElementById("reveal-step-2");

    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    triggerCelebratoryParticles();
}

// Stage 8: Typewriter Letter
function startTypewriter() {
    const letterEl = document.getElementById("letter-content");
    const actionsEl = document.getElementById("letter-actions");
    letterEl.innerHTML = "";
    
    let i = 0;
    const text = birthdayData.letterText;
    const speed = 25;

    function type() {
        if (i < text.length) {
            letterEl.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            actionsEl.classList.remove("opacity-0");
        }
    }
    type();
}

const originalGoToStage = goToStage;
goToStage = function(stageNum) {
    originalGoToStage(stageNum);
    if (stageNum === 8) {
        setTimeout(startTypewriter, 600);
    }
};

// Stage 9 Setup
function setupFinalStage() {
    document.getElementById("final-image").src = birthdayData.finalImage;
    const firstName = birthdayData.name.split(" ")[0];
    document.getElementById("final-name-span").innerText = firstName;
}

function restartExperience() {
    currentQuestionIdx = 0;
    document.getElementById("name-input").value = "";
    document.getElementById("name-feedback").innerText = "";
    document.getElementById("memory-viewer").classList.add("hidden");
    document.getElementById("reveal-step-1").classList.remove("hidden");
    document.getElementById("reveal-step-2").classList.add("hidden");
    document.getElementById("letter-actions").classList.add("opacity-0");
    goToStage(1);
}

// Graceful Image Fallback System
function handleImageError(imgElement) {
    const parent = imgElement.parentElement;
    imgElement.style.display = "none";
    
    if (!parent.querySelector(".placeholder-box")) {
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder-box";
        placeholder.style.cssText = "width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#6b7280; font-size:0.85rem; background:rgba(255,255,255,0.02); text-align:center; padding:10px;";
        placeholder.innerText = "[ Image Memory Placeholder ]";
        parent.appendChild(placeholder);
    }
}

// Background Particle Engine (Canvas)
let particles = [];
let particleMode = "subtle";

function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y -= p.speedY;
            if (p.y < 0) p.y = canvas.height;

            ctx.fillStyle = particleMode === "gold" 
                ? `rgba(212, 175, 55, ${p.opacity})` 
                : `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

function triggerCelebratoryParticles() {
    particleMode = "gold";
    const canvas = document.getElementById("particles-canvas");
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            size: Math.random() * 3.5 + 1,
            speedY: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2
        });
    }
}


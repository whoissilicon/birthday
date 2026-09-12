document.addEventListener('DOMContentLoaded', () => {

  // --- DATA SOURCES ---
  const validNames = ['naila', 'shifa', 'naila islam', 'naila islam shifa'];

  const questionsData = [
    {
      title: "What's your usual choice?",
      subtitle: "Pick one.",
      options: [
        { text: "Stay home", feedback: "Hmm. Interesting." },
        { text: "Go outside", feedback: "Okay. Noted." }
      ]
    },
    {
      title: "Pick one.",
      subtitle: "No wrong answers.",
      options: [
        { text: "Tea", feedback: "I had a feeling." },
        { text: "Coffee", feedback: "That makes sense." }
      ]
    },
    {
      title: "What sounds better?",
      subtitle: "Be honest.",
      options: [
        { text: "A quiet day", feedback: "Okay. Noted." },
        { text: "A busy day", feedback: "Hmm. Interesting." }
      ]
    },
    {
      title: "Be honest...",
      subtitle: "How good is your memory?",
      options: [
        { text: "Pretty good", feedback: "We'll see about that." },
        { text: "Depends", feedback: "Fair enough." }
      ]
    },
    {
      title: "One last thing...",
      subtitle: "Would you keep going if something interesting was waiting?",
      options: [
        { text: "Of course", feedback: "Good answer." },
        { text: "Maybe", feedback: "Fair enough." }
      ]
    }
  ];

  const memoriesData = [
    { date: "08.06.23", fullDate: "06 AUG 2023", img: "images/memory1.jpg", caption: "Remember this one?" },
    { date: "08.22.23", fullDate: "22 AUG 2023", img: "images/memory2.jpg", caption: "Still remember this?" },
    { date: "08.31.23", fullDate: "31 AUG 2023", img: "images/memory3.jpg", caption: "This was a good day." },
    { date: "10.23.23", fullDate: "23 OCT 2023", img: "images/memory4.jpg", caption: "Feels like a while ago." },
    { date: "10.29.23", fullDate: "29 OCT 2023", img: "images/memory5.jpg", caption: "Yeah... this one." },
    { date: "11.11.23", fullDate: "11 NOV 2023", img: "images/memory6.jpg", caption: "Another memory." },
    { date: "03.16.24", fullDate: "16 MAR 2024", img: "images/memory7.jpg", caption: "Remember this one?" },
    { date: "07.17.24", fullDate: "17 JUL 2024", img: "images/memory8.jpg", caption: "Still remember this?" },
    { date: "07.19.24", fullDate: "19 JUL 2024", img: "images/memory9.jpg", caption: "This was a good day." },
    { date: "09.21.24", fullDate: "21 SEP 2024", img: "images/memory10.jpg", caption: "Feels like a while ago." },
    { date: "12.09.24", fullDate: "09 DEC 2024", img: "images/memory11.jpg", caption: "Yeah... this one." },
    { date: "12.25.24", fullDate: "25 DEC 2024", img: "images/memory12.jpg", caption: "Another memory." },
    { date: "12.27.24", fullDate: "27 DEC 2024", img: "images/memory13.jpg", caption: "This one is a little different." },
    { date: "01.26.25", fullDate: "26 JAN 2025", img: "images/memory14.jpg", caption: "Remember this one?" },
    { date: "01.27.25", fullDate: "27 JAN 2025", img: "images/memory15.jpg", caption: "Still remember this?" },
    { date: "04.15.25", fullDate: "15 APR 2025", img: "images/memory16.jpg", caption: "This was a good day." },
    { date: "10.27.25", fullDate: "27 OCT 2025", img: "images/memory17.jpg", caption: "Feels like a while ago." },
    { date: "11.15.25", fullDate: "15 NOV 2025", img: "images/memory18.jpg", caption: "Another good memory." },
    { date: "12.01.25", fullDate: "01 DEC 2025", img: "images/memory19.jpg", caption: "Remember this?" },
    { date: "12.15.25", fullDate: "15 DEC 2025", img: "images/memory20.jpg", caption: "Good times." },
    { date: "01.10.26", fullDate: "10 JAN 2026", img: "images/memory21.jpg", caption: "Still looks great." },
    { date: "01.20.26", fullDate: "20 JAN 2026", img: "images/memory22.jpg", caption: "A special day." },
    { date: "02.05.26", fullDate: "05 FEB 2026", img: "images/memory23.jpg", caption: "Unforgettable." },
    { date: "02.20.26", fullDate: "20 FEB 2026", img: "images/memory24.jpg", caption: "Almost at the end." }
  ];

  // --- AUDIO SETUP (Live Catbox Link) ---
  const bgAudio = document.getElementById('backgroundMusic');
  if (bgAudio) {
    bgAudio.volume = 0.5;
  }

  // --- STATE ---
  let currentQuestionIndex = 0;
  let currentMemoryIndex = 0;

  // --- UTILS: SCREEN SWITCHING ---
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }
  }

  // --- UTILS: TYPEWRITER EFFECT ---
  function typeSequence(containerId, lines, doneCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    let lineIdx = 0;

    function typeLine() {
      if (lineIdx < lines.length) {
        const p = document.createElement('p');
        p.className = 'typewriter-line';
        container.appendChild(p);

        let charIdx = 0;
        const text = lines[lineIdx];

        const timer = setInterval(() => {
          if (charIdx < text.length) {
            p.textContent += text.charAt(charIdx);
            charIdx++;
          } else {
            clearInterval(timer);
            lineIdx++;
            setTimeout(typeLine, 400);
          }
        }, 35);
      } else if (doneCallback) {
        doneCallback();
      }
    }

    typeLine();
  }

  // --- SCREEN 1: MYSTERY INTRO ---
  function initIntro() {
    const introLines = [
      "We are looking for someone.",
      "Someone specific.",
      "We don't know if you've found this page by accident...",
      "...or if it was meant to find you.",
      "So before we continue...",
      "We need to ask you something."
    ];

    typeSequence('typewriter-intro', introLines, () => {
      const nextBtn = document.getElementById('btn-intro-next');
      if (nextBtn) nextBtn.classList.remove('hidden');
    });
  }

  const introNextBtn = document.getElementById('btn-intro-next');
  if (introNextBtn) {
    introNextBtn.addEventListener('click', () => {
      showScreen('screen-name');
      initNameScreen();
    });
  }

  // --- SCREEN 2: NAME INPUT ---
  function initNameScreen() {
    const formContainer = document.getElementById('name-form-container');
    const nameError = document.getElementById('name-error');
    const nameInput = document.getElementById('name-input');
    
    if (formContainer) formContainer.classList.add('hidden');
    if (nameError) nameError.classList.add('hidden');
    if (nameInput) nameInput.value = '';

    const nameLines = [
      "First things first.",
      "What's your name?"
    ];

    typeSequence('typewriter-name', nameLines, () => {
      if (formContainer) formContainer.classList.remove('hidden');
    });
  }

  const submitNameBtn = document.getElementById('btn-submit-name');
  if (submitNameBtn) {
    submitNameBtn.addEventListener('click', handleNameSubmit);
  }
  
  const nameInputEl = document.getElementById('name-input');
  if (nameInputEl) {
    nameInputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleNameSubmit();
    });
  }

  function handleNameSubmit() {
    const inputEl = document.getElementById('name-input');
    if (!inputEl) return;
    const inputVal = inputEl.value.trim().toLowerCase();
    const isMatch = validNames.some(name => inputVal.includes(name));

    if (isMatch) {
      showScreen('screen-questions');
      initQuestions();
    } else {
      const errorEl = document.getElementById('name-error');
      if (errorEl) errorEl.classList.remove('hidden');
    }
  }

  // --- SCREEN 3: NATURAL QUESTIONS ---
  function initQuestions() {
    currentQuestionIndex = 0;
    const qIntro = document.getElementById('typewriter-question-intro');
    const qContainer = document.getElementById('question-container');
    const qFeedback = document.getElementById('question-feedback');

    if (qIntro) qIntro.innerHTML = '';
    if (qContainer) qContainer.classList.add('hidden');
    if (qFeedback) qFeedback.classList.add('hidden');

    displayQuestion(currentQuestionIndex);
  }

  function displayQuestion(index) {
    const qData = questionsData[index];
    const container = document.getElementById('question-container');
    const optionsContainer = document.getElementById('question-options');
    const titleEl = document.getElementById('question-title');
    const subtitleEl = document.getElementById('question-subtitle');

    if (!container || !optionsContainer) return;

    if (titleEl) titleEl.textContent = qData.title;
    if (subtitleEl) subtitleEl.textContent = qData.subtitle;
    optionsContainer.innerHTML = '';

    qData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleOptionClick(opt.feedback));
      optionsContainer.appendChild(btn);
    });

    container.classList.remove('hidden');
  }

  function handleOptionClick(feedbackText) {
    const qContainer = document.getElementById('question-container');
    if (qContainer) qContainer.classList.add('hidden');
    
    const feedbackBox = document.getElementById('question-feedback');
    if (feedbackBox) {
      feedbackBox.textContent = feedbackText;
      feedbackBox.classList.remove('hidden');
    }

    setTimeout(() => {
      if (feedbackBox) feedbackBox.classList.add('hidden');
      currentQuestionIndex++;
      if (currentQuestionIndex < questionsData.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        showScreen('screen-confirmation');
        initConfirmation();
      }
    }, 1200);
  }

  // --- SCREEN 4: IDENTITY CONFIRMATION ---
  function initConfirmation() {
    const confirmReveal = document.getElementById('confirm-reveal');
    if (confirmReveal) confirmReveal.classList.add('hidden');

    const confirmLines = [
      "Okay.",
      "I think we have enough.",
      "Name checked.",
      "A few answers checked.",
      "Yes."
    ];

    typeSequence('typewriter-confirm', confirmLines, () => {
      if (confirmReveal) confirmReveal.classList.remove('hidden');
    });
  }

  const enterBtn = document.getElementById('btn-enter');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      showScreen('screen-hub');
    });
  }

  // --- SCREEN 5: MAIN HUB ROUTING ---
  document.querySelectorAll('.hub-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetScreen = card.getAttribute('data-target');
      if (targetScreen) {
        showScreen(targetScreen);
        if (targetScreen === 'screen-memories') {
          initMemories();
          if (bgAudio) {
            bgAudio.play().catch(e => console.log("Audio autoplay restricted:", e));
          }
        } else {
          if (bgAudio) bgAudio.pause();
        }
        if (targetScreen === 'screen-suspense') initSuspense();
      }
    });
  });

  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      if (bgAudio) bgAudio.pause();
      showScreen('screen-hub');
    });
  });

  // --- SECTION 01: MEMORIES ---
  function initMemories() {
    const selector = document.getElementById('date-selector');
    if (!selector) return;
    selector.innerHTML = '';

    memoriesData.forEach((item, index) => {
      const chip = document.createElement('button');
      chip.className = `date-chip ${index === 0 ? 'active' : ''}`;
      chip.textContent = item.date;
      chip.addEventListener('click', () => selectMemory(index));
      selector.appendChild(chip);
    });

    selectMemory(0);
  }

  function selectMemory(index) {
    currentMemoryIndex = index;
    const data = memoriesData[index];

    const img = document.getElementById('memory-img');
    if (!img) return;
    const placeholder = img.nextElementSibling;
    img.style.display = 'block';
    if(placeholder) placeholder.style.display = 'none';

    img.src = data.img;
    const memDate = document.getElementById('memory-date');
    const memCaption = document.getElementById('memory-caption');
    const memCounter = document.getElementById('memory-counter');

    if (memDate) memDate.textContent = data.fullDate;
    if (memCaption) memCaption.textContent = data.caption;
    if (memCounter) memCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${memoriesData.length}`;

    const chips = document.querySelectorAll('.date-chip');
    chips.forEach((chip, idx) => {
      chip.classList.toggle('active', idx === index);
      if (idx === index) {
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  const prevMemBtn = document.getElementById('btn-prev-memory');
  if (prevMemBtn) {
    prevMemBtn.addEventListener('click', () => {
      if (currentMemoryIndex > 0) {
        selectMemory(currentMemoryIndex - 1);
      }
    });
  }

  const nextMemBtn = document.getElementById('btn-next-memory');
  if (nextMemBtn) {
    nextMemBtn.addEventListener('click', () => {
      if (currentMemoryIndex < memoriesData.length - 1) {
        selectMemory(currentMemoryIndex + 1);
      }
    });
  }

  // --- SECTION 02: LITTLE THINGS (CARD FLIP) ---
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // --- SECTION 03: SURPRISE LETTER ---
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.addEventListener('click', () => {
      const front = envelope.querySelector('.envelope-front');
      const content = envelope.querySelector('.letter-content');
      if (front && content && !front.classList.contains('hidden')) {
        front.classList.add('hidden');
        content.classList.remove('hidden');
      }
    });
  }

  // --- SECTION 04 & BUILD-UP: SUSPENSE ---
  function initSuspense() {
    const suspenseBtn = document.getElementById('btn-suspense-next');
    if (suspenseBtn) suspenseBtn.classList.add('hidden');

    const suspenseLinesPart1 = [
      "Okay...",
      "That's almost everything.",
      "Almost."
    ];

    typeSequence('typewriter-suspense', suspenseLinesPart1, () => {
      const btn = document.getElementById('btn-suspense-next');
      if (btn) {
        btn.classList.remove('hidden');
        btn.onclick = () => runBuildUp();
      }
    });
  }

  function runBuildUp() {
    const suspenseBtn = document.getElementById('btn-suspense-next');
    if (suspenseBtn) suspenseBtn.classList.add('hidden');

    const suspenseLinesPart2 = [
      "You probably thought that was the whole thing.",
      "It wasn't.",
      "There's one last thing."
    ];

    typeSequence('typewriter-suspense', suspenseLinesPart2, () => {
      const btn = document.getElementById('btn-suspense-next');
      if (btn) {
        btn.textContent = "Show me →";
        btn.classList.remove('hidden');
        btn.onclick = () => runFinalSequence();
      }
    });
  }

  function runFinalSequence() {
    const suspenseBtn = document.getElementById('btn-suspense-next');
    if (suspenseBtn) suspenseBtn.classList.add('hidden');

    const finalBuildUpLines = [
      "We started by looking for someone.",
      "We found her.",
      "Then we went through a few memories.",
      "A few random things.",
      "And one small letter.",
      "But there was always one reason for all of this.",
      "Her birthday."
    ];

    typeSequence('typewriter-suspense', finalBuildUpLines, () => {
      const btn = document.getElementById('btn-suspense-next');
      if (btn) {
        btn.textContent = "Continue →";
        btn.classList.remove('hidden');
        btn.onclick = () => {
          showScreen('screen-birthday');
          initBirthdayReveal();
        };
      }
    });
  }

  // --- SCREEN 7: BIRTHDAY REVEAL ---
  function initBirthdayReveal() {
    const date = document.getElementById('reveal-date');
    const hbd = document.getElementById('reveal-hbd');
    const name = document.getElementById('reveal-fullname');
    const sub = document.getElementById('reveal-sub');
    const btn = document.getElementById('btn-to-final-photo');

    if (date) date.classList.add('hidden');
    if (hbd) hbd.classList.add('hidden');
    if (name) name.classList.add('hidden');
    if (sub) sub.classList.add('hidden');
    if (btn) btn.classList.add('hidden');

    setTimeout(() => { if (date) date.classList.remove('hidden'); }, 400);
    setTimeout(() => { if (hbd) hbd.classList.remove('hidden'); }, 1200);
    setTimeout(() => { if (name) name.classList.remove('hidden'); }, 2000);
    setTimeout(() => { if (sub) sub.classList.remove('hidden'); }, 2800);
    setTimeout(() => { if (btn) btn.classList.remove('hidden'); }, 3600);
  }

  const toFinalPhotoBtn = document.getElementById('btn-to-final-photo');
  if (toFinalPhotoBtn) {
    toFinalPhotoBtn.addEventListener('click', () => {
      showScreen('screen-final-photo');
    });
  }

  const toEndBtn = document.getElementById('btn-to-end');
  if (toEndBtn) {
    toEndBtn.addEventListener('click', () => {
      showScreen('screen-end');
      initEndScreen();
    });
  }

  // --- SCREEN 9: END & RESTART ---
  function initEndScreen() {
    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) restartBtn.classList.add('hidden');

    const endLines = [
      "That's it.",
      "You made it to the end.",
      "Happy Birthday, Naila. :)"
    ];

    typeSequence('typewriter-end', endLines, () => {
      if (restartBtn) restartBtn.classList.remove('hidden');
    });
  }

  const restartBtnEl = document.getElementById('btn-restart');
  if (restartBtnEl) {
    restartBtnEl.addEventListener('click', () => {
      if (bgAudio) bgAudio.pause();
      if (envelope) {
        const front = envelope.querySelector('.envelope-front');
        const content = envelope.querySelector('.letter-content');
        if (front) front.classList.remove('hidden');
        if (content) content.classList.add('hidden');
      }

      document.querySelectorAll('.flip-card').forEach(card => card.classList.remove('flipped'));

      showScreen('screen-intro');
      initIntro();
    });
  }

  // Initialize App
  initIntro();
});

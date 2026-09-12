document.addEventListener("DOMContentLoaded", () => {

  const music = document.getElementById("backgroundMusic");
  const typeSound = document.getElementById("typeSound");
  const musicModal = document.getElementById("musicModal");
  const allowMusicBtn = document.getElementById("allowMusic");
  const denyMusicBtn = document.getElementById("denyMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");

  let isPlaying = false;
  let musicPermissionAsked = false;

  function playMusic() {
    if (!music) return;
    music.volume = 0.35;
    
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        if (musicToggleBtn) {
          musicToggleBtn.textContent = "🔊";
          musicToggleBtn.style.display = "inline-block";
        }
      }).catch(error => {
        console.log("Audio play failed:", error);
        isPlaying = false;
        if (musicToggleBtn) {
          musicToggleBtn.textContent = "🔇";
          musicToggleBtn.style.display = "inline-block";
        }
      });
    }
  }

  function pauseMusic() {
    if (!music) return;
    music.pause();
    isPlaying = false;
    if (musicToggleBtn) {
      musicToggleBtn.textContent = "🔇";
      musicToggleBtn.style.display = "inline-block";
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.style.display = "none";
  }

  if (allowMusicBtn) {
    allowMusicBtn.addEventListener("click", () => {
      playMusic();
      if (musicModal) musicModal.classList.add("hidden-modal");
    });
  }

  if (denyMusicBtn) {
    denyMusicBtn.addEventListener("click", () => {
      pauseMusic();
      if (musicModal) musicModal.classList.add("hidden-modal");
    });
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  const validNames = [
    "naila",
    "shifa",
    "naila islam",
    "naila islam shifa"
  ];

  const questions = [
    {
      title: "Be honest… which one sounds most like you?",
      subtitle: "Pick one.",
      options: [
        "I'll sleep early tonight.",
        "One more episode.",
        "One more scroll.",
        "I have no idea how it became 3 AM."
      ]
    },
    {
      title: "If you suddenly got a completely free day, what would you choose?",
      subtitle: "No wrong answers.",
      options: [
        "Sleep",
        "Go somewhere",
        "Spend time with people",
        "Just disappear from everyone for a while"
      ]
    },
    {
      title: "Which matters more?",
      subtitle: "Interesting question.",
      options: [
        "A perfect photograph",
        "A perfect memory"
      ]
    },
    {
      title: "One last thing…",
      subtitle: "Do you think some ordinary days become special only when you look back at them?",
      options: [
        "Yes",
        "Maybe",
        "Absolutely"
      ]
    }
  ];

  const memories = [
    { date: "06.08.23", fullDate: "06 AUG 2023", img: "images/memory1.jpg", title: "A beginning", caption: "Where the story first quietly started to unfold." },
    { date: "22.08.23", fullDate: "22 AUG 2023", img: "images/memory2.jpg", title: "A gentle step", caption: "Another ordinary day that ended up sticking around in memory." },
    { date: "31.08.23", fullDate: "31 AUG 2023", img: "images/memory3.jpg", title: "Quiet moments", caption: "Unplanned conversations and simple clarity." },
    { date: "14.09.23", fullDate: "14 SEP 2023", img: "images/memory18.jpg", title: "Afternoon calm", caption: "Slow hours spent talking about absolutely nothing at all." },
    { date: "05.10.23", fullDate: "05 OCT 2023", img: "images/memory19.jpg", title: "Unexpected smiles", caption: "Little surprises that made the whole week better." },
    { date: "23.10.23", fullDate: "23 OCT 2023", img: "images/memory4.jpg", title: "Shared time", caption: "Proof that time passes, but good feelings don't." },
    { date: "29.10.23", fullDate: "29 OCT 2023", img: "images/memory5.jpg", title: "First meet", caption: "The day we finally met in person and created a core memory." },
    { date: "11.11.23", fullDate: "11 NOV 2023", img: "images/memory6.jpg", title: "Unplanned laughter", caption: "The best times are usually the ones that weren't scheduled." },
    { date: "04.12.23", fullDate: "04 DEC 2023", img: "images/memory20.jpg", title: "Chilly breeze", caption: "Finding warmth in simple company as the season changed." },
    { date: "16.03.24", fullDate: "16 MAR 2024", img: "images/memory7.jpg", title: "Spring memory", caption: "A bright day worth holding on to." },
    { date: "17.07.24", fullDate: "17 JUL 2024", img: "images/memory8.jpg", title: "Midsummer chapter", caption: "Moments becoming special without asking permission." },
    { date: "19.07.24", fullDate: "19 JUL 2024", img: "images/memory9.jpg", title: "Good company", caption: "Just one of many reasons to celebrate this story." },
    { date: "21.09.24", fullDate: "21 SEP 2024", img: "images/memory10.jpg", title: "Autumn warmth", caption: "Reflecting on how quickly time moves." },
    { date: "09.12.24", fullDate: "09 DEC 2024", img: "images/memory11.jpg", title: "Winter reflection", caption: "Finding comfort in shared memories." },
    { date: "25.12.24", fullDate: "25 DEC 2024", img: "images/memory12.jpg", title: "Year-end magic", caption: "A cozy moment at the end of the year." },
    { date: "27.12.24", fullDate: "27 DEC 2024", img: "images/memory13.jpg", title: "Revisiting those days", caption: "Recently visited the place to remember those days." },
    { date: "14.01.25", fullDate: "14 JAN 2025", img: "images/memory21.jpg", title: "Quiet evening", caption: "Watching the sky fade into a peaceful twilight." },
    { date: "26.01.25", fullDate: "26 JAN 2025", img: "images/memory14.jpg", title: "New year chapter", caption: "Starting a new year with cherished memories." },
    { date: "27.01.25", fullDate: "27 JAN 2025", img: "images/memory15.jpg", title: "A calm day", caption: "Quiet peace and simple gratitude." },
    { date: "18.02.25", fullDate: "18 FEB 2025", img: "images/memory22.jpg", title: "Random snapshots", caption: "Capturing everyday magic that usually goes unnoticed." },
    { date: "15.04.25", fullDate: "15 APR 2025", img: "images/memory16.jpg", title: "Spring sunshine", caption: "Capturing a brand-new page of the journey." },
    { date: "20.06.25", fullDate: "20 JUN 2025", img: "images/memory23.jpg", title: "Slowing down", caption: "A lazy afternoon where nothing else mattered." },
    { date: "27.10.25", fullDate: "27 OCT 2025", img: "images/memory17.jpg", title: "Looking back", caption: "Reflecting on two years of wonderful moments." },
    { date: "12.12.25", fullDate: "12 DEC 2025", img: "images/memory24.jpg", title: "Closing thoughts", caption: "Another year well spent and deeply appreciated." }
  ];

  let questionIndex = 0;
  let memoryIndex = 0;

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });
    const screen = document.getElementById(id);
    if (screen) {
      screen.classList.add("active");
    }
    window.scrollTo(0, 0);
  }

  function typeText(elementId, lines, callback) {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = "";
    let lineIndex = 0;

    function writeLine() {
      if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
      }
      const line = document.createElement("p");
      line.className = "typewriter-line";
      container.appendChild(line);
      const text = lines[lineIndex];
      let charIndex = 0;

      const timer = setInterval(() => {
        line.textContent += text.charAt(charIndex);
        
        if (typeSound && text.charAt(charIndex) !== " ") {
          typeSound.currentTime = 0;
          typeSound.play().catch(e => {});
        }

        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(timer);
          lineIndex++;
          setTimeout(writeLine, 300);
        }
      }, 30);
    }
    writeLine();
  }

  function startIntro() {
    const button = document.getElementById("introBtn");
    if (!button) return;
    button.classList.add("hidden");
    typeText(
      "introText",
      [
        "We are looking for someone.",
        "Someone very specific.",
        "We don't know if you found this page by accident...",
        "...or if it was meant to find you.",
        "So before we continue...",
        "We need to ask you something."
      ],
      () => {
        button.classList.remove("hidden");
      }
    );
  }

  if (musicModal) {
    musicModal.classList.add("hidden-modal");
  }
  startIntro();

  const introBtn = document.getElementById("introBtn");
  if (introBtn) {
    introBtn.addEventListener("click", () => {
      showScreen("nameScreen");
      startNameScreen();
    });
  }

  function startNameScreen() {
    const form = document.getElementById("nameForm");
    const error = document.getElementById("nameError");
    const input = document.getElementById("nameInput");
    if (!form || !input) return;
    form.classList.add("hidden");
    if (error) error.classList.add("hidden");
    input.value = "";

    typeText(
      "nameText",
      ["First things first.", "What's your name?"],
      () => {
        form.classList.remove("hidden");
        input.focus();
      }
    );
  }

  function submitName() {
    const inputField = document.getElementById("nameInput");
    if (!inputField) return;
    const input = inputField.value.trim().toLowerCase();
    const valid = validNames.some(name => input === name || input.includes(name));

    if (!valid) {
      const error = document.getElementById("nameError");
      if (error) error.classList.remove("hidden");
      return;
    }

    showScreen("questions");
    startQuestions();
  }

  const nameBtn = document.getElementById("nameBtn");
  if (nameBtn) {
    nameBtn.addEventListener("click", submitName);
  }

  const nameInput = document.getElementById("nameInput");
  if (nameInput) {
    nameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        submitName();
      }
    });
  }

  function startQuestions() {
    questionIndex = 0;
    showQuestion();
  }

  function showQuestion() {
    const question = questions[questionIndex];
    const qNum = document.getElementById("questionNumber");
    const qTitle = document.getElementById("questionTitle");
    const qSub = document.getElementById("questionSubtitle");

    if (qNum) qNum.textContent = `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / ${questions.length}`;
    if (qTitle) qTitle.textContent = question.title;
    if (qSub) qSub.textContent = question.subtitle;

    const options = document.getElementById("options");
    const feedback = document.getElementById("feedback");
    if (!options) return;

    options.innerHTML = "";
    if (feedback) feedback.classList.add("hidden");
    options.style.opacity = "1";
    options.style.pointerEvents = "auto";

    question.options.forEach(optionText => {
      const button = document.createElement("button");
      button.className = "option";
      button.textContent = optionText;
      button.addEventListener("click", () => chooseOption(optionText));
      options.appendChild(button);
    });
  }

  function chooseOption(optionText) {
    const options = document.getElementById("options");
    const feedback = document.getElementById("feedback");
    if (options) {
      options.style.pointerEvents = "none";
      options.style.opacity = "0.4";
    }

    let message = "Interesting choice.";
    if (optionText === "I have no idea how it became 3 AM.") {
      message = "Thought so. 🌙";
    } else if (optionText === "Sleep") {
      message = "Pure bliss. 🛌";
    } else if (optionText === "Go somewhere") {
      message = "Wanderlust wins. ✈️";
    } else if (optionText === "A perfect memory") {
      message = "Maybe that's why some moments are worth keeping.";
    } else if (optionText === "Absolutely") {
      message = "And today might just be one of them.";
    }

    if (feedback) {
      feedback.textContent = message;
      feedback.classList.remove("hidden");
    }

    setTimeout(() => {
      questionIndex++;
      if (questionIndex < questions.length) {
        showQuestion();
      } else {
        showScreen("confirmation");
        startConfirmation();
      }
    }, 1200);
  }

  function startConfirmation() {
    const box = document.getElementById("confirmBox");
    if (box) box.classList.add("hidden");
    typeText(
      "confirmText",
      ["Okay.", "I think we have enough.", "Name checked.", "A few answers checked.", "Yes."],
      () => {
        if (box) box.classList.remove("hidden");
      }
    );
  }

  const enterBtn = document.getElementById("enterBtn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      showScreen("file");
    });
  }

  document.querySelectorAll(".file-card").forEach(card => {
    card.addEventListener("click", () => {
      const target = card.dataset.open;
      showScreen(target);
      
      if (target === "memories") {
        playMusic();
        initMemories();
      }

      if (target === "last") {
        startLastThing();
      }
    });
  });

  document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      showScreen("file");
    });
  });

  function initMemories() {
    const selector = document.getElementById("dateSelector");
    if (!selector) return;
    selector.innerHTML = "";
    memoryIndex = 0;

    memories.forEach((memory, index) => {
      const button = document.createElement("button");
      button.className = "date";
      button.textContent = memory.date;
      button.addEventListener("click", () => selectMemory(index));
      selector.appendChild(button);
    });

    selectMemory(0);
  }

  function selectMemory(index) {
    if (index < 0 || index >= memories.length) return;
    memoryIndex = index;
    const memory = memories[index];

    const image = document.getElementById("memoryImg");
    const fallback = document.getElementById("imageFallback");

    if (image && fallback) {
      image.style.display = "block";
      fallback.classList.add("hidden");
      image.src = memory.img;

      image.onerror = () => {
        image.style.display = "none";
        fallback.classList.remove("hidden");
      };
    }

    const mCounter = document.getElementById("memoryCounter");
    const mDate = document.getElementById("memoryDate");
    const mTitle = document.getElementById("memoryTitle");
    const mCaption = document.getElementById("memoryCaption");

    if (mCounter) mCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${memories.length}`;
    if (mDate) mDate.textContent = memory.fullDate;
    if (mTitle) mTitle.textContent = memory.title;
    if (mCaption) mCaption.textContent = memory.caption;

    document.querySelectorAll(".date").forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });
  }

  const prevMemory = document.getElementById("prevMemory");
  if (prevMemory) {
    prevMemory.addEventListener("click", () => {
      if (memoryIndex > 0) selectMemory(memoryIndex - 1);
    });
  }

  const nextMemory = document.getElementById("nextMemory");
  if (nextMemory) {
    nextMemory.addEventListener("click", () => {
      if (memoryIndex < memories.length - 1) selectMemory(memoryIndex + 1);
    });
  }

  document.querySelectorAll(".flip").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  const envelope = document.getElementById("envelope");
  if (envelope) {
    envelope.addEventListener("click", () => {
      const envFront = document.getElementById("envelopeFront");
      const letterContent = document.getElementById("letterContent");
      if (envFront) envFront.classList.add("hidden");
      if (letterContent) letterContent.classList.remove("hidden");
    });
  }

  function startLastThing() {
    const button = document.getElementById("lastBtn");
    if (!button) return;
    button.classList.add("hidden");
    typeText(
      "lastText",
      ["Okay...", "That's almost everything.", "Almost."],
      () => {
        button.textContent = "Continue →";
        button.classList.remove("hidden");
        button.onclick = startLastPart;
      }
    );
  }

  function startLastPart() {
    const button = document.getElementById("lastBtn");
    if (!button) return;
    button.classList.add("hidden");
    typeText(
      "lastText",
      ["You probably thought that was the whole thing.", "It wasn't.", "There's one last thing."],
      () => {
        button.textContent = "Show me →";
        button.classList.remove("hidden");
        button.onclick = finalBuildUp;
      }
    );
  }

  function finalBuildUp() {
    const button = document.getElementById("lastBtn");
    if (!button) return;
    button.classList.add("hidden");
    typeText(
      "lastText",
      [
        "We started by looking for someone.",
        "We found her.",
        "Then we went through a few memories.",
        "A few random things.",
        "And one small letter.",
        "But there was always one reason for all of this.",
        "Her birthday."
      ],
      () => {
        button.textContent = "Continue →";
        button.classList.remove("hidden");
        button.onclick = () => {
          showScreen("birthday");
          startBirthday();
        };
      }
    );
  }

  function startBirthday() {
    const date = document.getElementById("birthdayDate");
    const title = document.getElementById("birthdayTitle");
    const name = document.getElementById("birthdayName");
    const sub = document.getElementById("birthdaySub");
    const button = document.getElementById("photoBtn");

    if (date) date.classList.add("hidden");
    if (title) title.classList.add("hidden");
    if (name) name.classList.add("hidden");
    if (sub) sub.classList.add("hidden");
    if (button) button.classList.add("hidden");

    setTimeout(() => { if (date) date.classList.remove("hidden"); }, 300);
    setTimeout(() => { if (title) title.classList.remove("hidden"); }, 1000);
    setTimeout(() => { if (name) name.classList.remove("hidden"); }, 1800);
    setTimeout(() => { if (sub) sub.classList.remove("hidden"); }, 2600);
    setTimeout(() => { if (button) button.classList.remove("hidden"); }, 3400);
  }

  const photoBtn = document.getElementById("photoBtn");
  if (photoBtn) {
    photoBtn.addEventListener("click", () => {
      showScreen("final");
    });
  }

  const endBtn = document.getElementById("endBtn");
  if (endBtn) {
    endBtn.addEventListener("click", () => {
      showScreen("end");
      startEnd();
    });
  }

  function startEnd() {
    const button = document.getElementById("restartBtn");
    if (!button) return;
    button.classList.add("hidden");
    typeText(
      "endText",
      [
        "That's it.",
        "No more hidden files.",
        "No more questions.",
        "Just one simple thing left to say.",
        "Happy Birthday, Naila.",
        "And thank you for being part of so many memories."
      ],
      () => {
        button.classList.remove("hidden");
      }
    );
  }

  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      pauseMusic();
      musicPermissionAsked = false;
      if (musicToggleBtn) musicToggleBtn.style.display = "none";
      showScreen("intro");
      startIntro();
    });
  }

});

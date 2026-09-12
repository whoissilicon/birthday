// EmailJS Credentials
const EMAILJS_PUBLIC_KEY = "DQO2UOW0Y4oKQbk8G";
const EMAILJS_SERVICE_ID = "service_5ivuql1";
const EMAILJS_TEMPLATE_ID = "template_wa6l4ep";

// Initialize EmailJS
(function() {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingValueInput = document.getElementById("ratingValue");

  function updateStars(rating) {
    stars.forEach(star => {
      if (parseInt(star.dataset.value) <= rating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  updateStars(5);

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = star.dataset.value;
      if (ratingValueInput) ratingValueInput.value = val;
      updateStars(val);
    });
  });

  const feedbackForm = document.getElementById("feedbackForm");
  const fbSuccess = document.getElementById("fbSuccess");
  const fbError = document.getElementById("fbError");
  const restartBtn = document.getElementById("restartBtn");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("fbName").value;
      const email = document.getElementById("fbEmail").value;
      const rating = ratingValueInput ? ratingValueInput.value : "5";
      const message = document.getElementById("fbMessage").value;
      const submitBtn = document.getElementById("fbSubmitBtn");

      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
      }

      const templateParams = {
        name: name,
        email: email,
        rating: rating,
        message: message,
        title: "Website Feedback",
        time: new Date().toLocaleString()
      };

      if (typeof emailjs !== "undefined") {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            feedbackForm.style.display = "none";
            if(fbSuccess) fbSuccess.style.display = "block";
            if(restartBtn) restartBtn.style.display = "inline-block";
          })
          .catch((error) => {
            console.error("EmailJS Error:", error);
            feedbackForm.style.display = "none";
            if(fbError) fbError.style.display = "block";
            if(restartBtn) restartBtn.style.display = "inline-block";
          });
      } else {
        feedbackForm.style.display = "none";
        if(fbError) fbError.style.display = "block";
        if(restartBtn) restartBtn.style.display = "inline-block";
      }
    });
  }
});

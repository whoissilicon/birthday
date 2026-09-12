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

  // Star Rating & Feedback Form Handling
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
        visitor_name: name,
        visitor_email: email,
        rating: rating,
        message: message
      };

      if (typeof emailjs !== "undefined") {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(() => {
            feedbackForm.classList.add("hidden");
            document.getElementById("fbSuccess").classList.remove("hidden");
            document.getElementById("restartBtn").classList.remove("hidden");
          })
          .catch((error) => {
            console.error("EmailJS Error:", error);
            feedbackForm.classList.add("hidden");
            document.getElementById("fbError").classList.remove("hidden");
            document.getElementById("restartBtn").classList.remove("hidden");
          });
      } else {
        feedbackForm.classList.add("hidden");
        document.getElementById("fbError").classList.remove("hidden");
        document.getElementById("restartBtn").classList.remove("hidden");
      }
    });
  }

});


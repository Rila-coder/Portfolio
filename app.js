/* --- CONTACT FORM HANDLING --- */
const form = document.querySelector(".contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("form-message");
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // SUCCESS
        status.innerHTML = "✅ Message sent successfully!";
        // Add the 'success' class so your CSS makes it visible
        status.className = "form-message success";
        form.reset();
      } else {
        // ERROR
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML =
              "❌ Oops! There was a problem submitting your form";
          }
          // Add the 'error' class so your CSS makes it visible
          status.className = "form-message error";
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "❌ Oops! There was a problem submitting your form";
      status.className = "form-message error";
    });
}

// Advanced Typewriter with Smooth Transitions
function advancedTypewriter() {
  const nameElement = document.querySelector(".right-header .name");
  if (!nameElement) return;

  const namePart = "Hi, I'm <span>Mohammed Rila.</span>";

  // Positions array
  const positions = [
    "A Full Stack Developer.",
    "A Web Developer.",
    "A Software Engineer.",
    "A Frontend Developer.",
    "A Backend Developer.",
    "A UI/UX Designer.",
    "A Problem Solver.",
    "A Tech Enthusiast.",
  ];

  let posIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  // Speed settings
  const config = {
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseAfterType: 2000, // Pause after typing complete
    pauseAfterDelete: 500, // Pause before typing next
  };

  function type() {
    if (isPaused) {
      setTimeout(() => {
        isPaused = false;
        type();
      }, config.pauseAfterDelete);
      return;
    }

    const currentPos = positions[posIndex];

    if (!isDeleting) {
      // Typing
      if (charIndex <= currentPos.length) {
        const displayText = currentPos.substring(0, charIndex);
        nameElement.innerHTML =
          namePart + "<br>" + displayText + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(type, config.typeSpeed);
      } else {
        // Finished typing, pause then start deleting
        isPaused = true;
        isDeleting = true;
        type();
      }
    } else {
      // Deleting
      if (charIndex >= 0) {
        const displayText = currentPos.substring(0, charIndex);
        nameElement.innerHTML =
          namePart + "<br>" + displayText + '<span class="cursor">|</span>';
        charIndex--;
        setTimeout(type, config.deleteSpeed);
      } else {
        // Finished deleting, move to next position
        isDeleting = false;
        posIndex = (posIndex + 1) % positions.length;
        charIndex = 0;
        isPaused = true;
        type();
      }
    }
  }

  // Add cursor style
  if (!document.querySelector("#typewriter-cursor")) {
    const style = document.createElement("style");
    style.id = "typewriter-cursor";
    style.textContent = `
            .cursor {
                color: var(--color-secondary);
                font-weight: bold;
                animation: blink 0.8s infinite;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  // Start after 1 second
  setTimeout(type, 1000);
}

// Call this function
advancedTypewriter();



form.addEventListener("submit", handleSubmit);

/* --- PORTFOLIO PAGINATION LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {
  const portfolioContainer = document.querySelector(".portfolios");
  const portfolioItems = Array.from(
    document.querySelectorAll(".portfolio-item"),
  );
  const paginationControls = document.getElementById("pagination-controls");

  const itemsPerPage = 3;
  let currentPage = 1;
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  function showPage(page) {
    // Calculate start and end index
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Loop through all items and hide/show based on index
    portfolioItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "flex"; // Show item (flex to maintain card layout)
      } else {
        item.style.display = "none"; // Hide item
      }
    });
  }

  function setupPagination() {
    paginationControls.innerHTML = ""; // Clear existing buttons

    // Create Number Buttons
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.add("page-btn");
      if (i === currentPage) {
        btn.classList.add("active-page");
      }

      btn.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);

        // Update active state
        document.querySelectorAll(".page-btn").forEach((button) => {
          button.classList.remove("active-page");
        });
        btn.classList.add("active-page");

        // Optional: Scroll to top of portfolio section smoothly
        document
          .getElementById("portfolio")
          .scrollIntoView({ behavior: "smooth" });
      });

      paginationControls.appendChild(btn);
    }
  }

  // Initialize
  showPage(currentPage);
  setupPagination();
});

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
})();

const items = document.querySelectorAll(".portfolio-item");

items.forEach((item) => {
  const descripBox = item.querySelector(".descrip");
  const title = item.querySelector(".p-title");

  descripBox.addEventListener("mouseover", () => {
    title.style.color = "white";
  });

  descripBox.addEventListener("mouseout", () => {
    title.style.color = "black";
  });
});

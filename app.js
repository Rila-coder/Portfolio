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

(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

const items = document.querySelectorAll('.portfolio-item');

items.forEach(item => {
  const descripBox = item.querySelector('.descrip');
  const title = item.querySelector('.p-title');

  descripBox.addEventListener('mouseover', () => {
    title.style.color = 'white';
  });

  descripBox.addEventListener('mouseout', () => {
    title.style.color = 'black';
  });
});

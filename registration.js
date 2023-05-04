const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});


// -----------------------------------------------------

const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

signInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;
  const signInData = JSON.parse(localStorage.getItem("signInData"));
  const signUpData = JSON.parse(localStorage.getItem("signUpData"));

  if (!signUpData) {
    alert("Please sign up first.");
    return;
  }

  if (signInData && signInData.name === name && signInData.password === password) {
    window.location.href = "index.html";
  } else {
    alert("Incorrect username or password.");
  }
});

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = signUpForm.querySelector('input[type="text"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;
  localStorage.setItem("signUpData", JSON.stringify({ name, email, password }));
  localStorage.setItem("signInData", JSON.stringify({ name, password }));
});
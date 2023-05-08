// Logo-----
const logo = document.getElementById("logo-img")

logo.addEventListener('mouseenter', function() {
    logo.src = './Images/logo2.png';
  });
  
logo.addEventListener('mouseleave', function() {
    logo.src = './Images/Logo1.png';
  });

logo.addEventListener("click",function(){
    window.location.href = "index.html";    
})

// Registration page
const registration = document.getElementById("Registration-btn")

registration.addEventListener("click",function(){
  window.location.href = "registration.html"
})

// Registration to Name-------

const signInData = JSON.parse(localStorage.getItem("signInData"));
if (signInData) {
  const registrationBtn = document.querySelector("#Registration-btn");
  const userNameSpan = document.querySelector("#user-name");
  registrationBtn.style.display = "none";
  userNameSpan.textContent = signInData.name;

  const adminIcon = document.createElement("i");
  adminIcon.classList.add("fas", "fa-screwdriver-wrench");

  const adminLink = document.createElement("a");
  adminLink.href = "Admin_login.html";
  adminLink.appendChild(adminIcon);

  const space = document.createTextNode(" ");

  userNameSpan.style.display = "inline";
  userNameSpan.appendChild(space);
  userNameSpan.appendChild(adminLink);
} 

// -------------------
const subscribeBtn = document.getElementById("subscribe");

subscribeBtn.addEventListener("click", function (event) {
  event.preventDefault(); // prevent the default behavior of the anchor tag
  const email = document.querySelector('input[type="email"]').value;
  alert(`You have subscribed to daily newsletter with email ${email}`);
});


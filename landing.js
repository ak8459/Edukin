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
  userNameSpan.style.display = "inline";
  
}

// shape-----------

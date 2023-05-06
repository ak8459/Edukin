const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); 
  validateForm();
});

function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "admin") {
      alert("Login successful!");
      window.location.href ="#"
    } else {
      alert("Access denied");
    }
  }
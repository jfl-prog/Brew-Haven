document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUsername = "guest";
  const validPassword = "password";

  if (username === validUsername && password === validPassword) {
    alert("Login successful!");
    window.location.href = "home.html"; 
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
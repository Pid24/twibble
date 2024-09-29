document.addEventListener("DOMContentLoaded", () => {
  const formManager = document.getElementById("formManager");
  const userUsername = document.getElementById("username");
  const userPassword = document.getElementById("password");

  const instantFeedback = document.getElementById("instantFeedback");

  const userManager = new User();

  formManager.addEventListener("submit", (event) => {
    event.preventDefault();

    const userData = {
      username: userUsername.value,
      password: userPassword.value,
      createdAt: `${year}-${month}-${day}`,
    };

    const result = userManager.userSignIn(userData);

    if (result.success) {
      instantFeedback.style.display = "none";
      localStorage.setItem("usernameLoggedIn", userUsername);
      // Arahkan pengguna ke halaman login
      return (window.location.href = "../index.html");
    } else {
      instantFeedback.style.display = "flex";
      instantFeedback.textContent = result.error;
    }
  });
});

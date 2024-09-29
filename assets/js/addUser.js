document.addEventListener("DOMContentLoaded", () => {
  const userName = document.getElementById("name");
  const userAvatar = document.getElementById("avatar");
  const userUsername = document.getElementById("username");
  const userPassword = document.getElementById("password");

  const instantFeedback = document.getElementById("instantFeedback");

  const userManager = new User();

  // Membuat format tanggal yang disimpan seperti yyyy-mm-dd
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  formManager.addEventListener("submit", (event) => {
    event.preventDefault();

    const userData = {
      name: userName.value,
      username: userUsername.value,
      avatar: userAvatar.value,
      password: userPassword.value,
      createdAt: `${year}-${month}-${day}`,
    };

    const result = userManager.saveUser(userData);

    if (result.success) {
      instantFeedback.style.display = "none";
      // Arahkan pengguna ke halaman login
      return (window.location.href = "../login.html");
    } else {
      instantFeedback.style.display = "flex";
      instantFeedback.textContent = result.error;
    }
  });
});

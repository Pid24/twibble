document.addEventListener("DOMContentLoaded", () => {
  const usernameLoggedIn = localStorage.getItem("usernameLoggedIn");

  const instantFeedback = document.getElementById("instantFeedback");
  instantFeedback.style.display = "none";

  const twittForm = document.getElementById("twittForm");
  const ownerPhoto = document.getElementById("ownerPhoto");
  const twittsWrapper = document.getElementById("twittsWrapper");
  const twittContent = document.getElementById("twittContent");

  let selectedFeeling = null;

  const feelingItems = document.querySelectorAll(".item-feeling");

  feelingItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectedFeeling = item.getAttribute("data-feeling");

      feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]"));

      item.classList.add("border-[#1880e8]");
    });
  });

  const twittManager = new Twitt();
  const userManager = new User();

  const twittUsers = userManager.getUsers();

  const ownerLoggedIn = twittUsers.find((user) => user.username.toLowerCase() === usernameLoggedIn.toLowerCase());
  ownerPhoto.src = ownerLoggedIn.avatar;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  twittForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const twittData = {
      twittContent: twittContent.value,
      twittUserOwner: usernameLoggedIn,
      twittFeeling: selectedFeeling,
      twittCreatedAt: `${year}-${month}-${day}`,
    };

    const result = twittManager.saveTwitt(twittData);
  });
});

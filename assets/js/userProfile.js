document.addEventListener("DOMContentLoaded", () => {
  const usernameLoggedIn = localStorage.getItem("usernameLoggedIn");
  const usernameProfileChosen = localStorage.getItem("usernameProfileChosen");

  const ownerPhoto = document.getElementById("ownerPhoto");
  const twittsWrapper = document.getElementById("twittsWrapper");
  const userProfileName = document.getElementById("userProfileName");
  const userProfileUsername = document.getElementById("userProfileUsername");

  const twittManager = new Twitt();
  const userManager = new User();

  const twittUsers = userManager.getUsers();

  const userProfileChosen = twittUsers.find((user) => user.username.toLowerCase() === usernameProfileChosen.toLowerCase());

  //   const ownerLoggedIn = twittUsers.find((user) => user.username.toLowerCase() === usernameLoggedIn.toLowerCase());
  ownerPhoto.src = userProfileChosen.avatar;
  userProfileName.textContent = userProfileChosen.name;
  userProfileUsername.textContent = "@" + userProfileChosen.username;

  const existingTwitts = twittManager.getTwitts();
  const existingLoveTwitts = twittManager.getLoveTwitts();

  const userProfileTwitts = existingTwitts.filter((twitt) => twitt.twittUsernameOwner === usernameProfileChosen);

  function displayAllTwitts(twitts = userProfileTwitts) {
    if (twitts.length === 0) {
      twittsWrapper.innerHTML = "tidak ada tweets terbaru.";
      console.log("tidak ada twitts tersedia");
    } else {
      console.log("tersedia twitts siap digunakan");
      twittsWrapper.innerHTML = "";

      twitts.sort((a, b) => b.id - a.id);

      twitts.forEach((twitt) => {
        const ownerTwitt = twittUsers.find((user) => user.username.toLowerCase() === twitt.twittUsernameOwner.toLowerCase());

        const getAllLoveTwitts = existingLoveTwitts.filter((loveTwitt) => loveTwitt.twittId === twitt.id);
        const countLoveTwitts = getAllLoveTwitts.length;

        const hasLiked = twittManager.userHasLikedTwittValidate(twitt.id, usernameLoggedIn);

        const itemTwitt = document.createElement("div");
        itemTwitt.className = "p-4 border bg-primary-b-2 border-line";
        itemTwitt.id = `twitt-${twitt.id}`;
        itemTwitt.innerHTML = `
                      <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                  <img id="visitProfile-${ownerTwitt.username}" src="${ownerTwitt.avatar}" alt="${ownerTwitt.name}" class="object-cover w-[46px] h-[46px] rounded-full" />
                  <div class="pl-2">
                    <div class="flex gap-1">
                      <p class="inline-block text-base font-bold">${ownerTwitt.name} <img src="assets/verify.png" alt="" class="inline w-5 h-5 rounded-full" /></p>
                    </div>
                    <p class="text-sm text-username">@${twitt.twittUsernameOwner} • ${twitt.twittCreatedAt}</p>
                  </div>
                </div>
                <div class="flex justify-center items-center rounded-full px-3 py-1.5 border-line border-2 gap-1.5">
                  <p class="text-sm font-semibold">${twitt.twittFeeling}</p>
                </div>
              </div>
  
              <p class="pl-[55px] py-2.5 leading-7 text-base">
              ${twitt.twittContent}
              </p>
  
              <div class="flex justify-between items-center pl-[55px] w-[484px]">
                <div class="flex justify-center items-center gap-2.5 pr-[250px]">
                  <a id="loveTwitt-${twitt.id}" href="#" class="cursor flex justify-start items-center w-[93px] gap-1.5">
                    <img class="like-icon" src="assets/${hasLiked ? `heart-fill.svg` : `heart.svg`}" alt="heart" />
                    <p id="totalLikeThatTwitt" class="text-sm font-normal text-like">${countLoveTwitts} Likes</p>
                  </a>
                  ${
                    twitt.twittUsernameOwner === usernameLoggedIn
                      ? `
                    <a id="deleteTwitt-${twitt.id}" href="#" class="cursor flex justify-start items-center w-[93px] gap-1.5">
                      <img src="assets/trash.svg" alt="heart">
                      <p class="text-sm font-normal text-username">Delete</p>
                    </a>
                    `
                      : `
                    <a href="#" class="flex justify-start items-center w-[93px] gap-1.5">
                      <img src="assets/warning-2.svg">
                      <p class="text-sm font-normal text-username">Report</p>
                    </a>
                    `
                  }                
                </div>
              </div>
          `;

        twittsWrapper.appendChild(itemTwitt);

        itemTwitt.querySelector(`#visitProfile-${ownerTwitt.username}`).addEventListener("click", function (event) {
          event.preventDefault();

          localStorage.setItem("usernameProfileChosen", `${ownerTwitt.username}`);
          // arahkan pengguna kepada halaman lain yaitu profile
          return (window.location.href = "../profile.html");
        });

        const totalLikeThatTwitt = itemTwitt.querySelector("#totalLikeThatTwitt");
        const likeIcon = itemTwitt.querySelector(".like-icon");

        // bikin event listener untuk fitur like
        itemTwitt.querySelector(`#loveTwitt-${twitt.id}`).addEventListener("click", function (event) {
          event.preventDefault();

          const loveTwittData = {
            twittId: twitt.id,
            userId: usernameLoggedIn,
          };

          const result = twittManager.loveTwitt(loveTwittData);

          if (result.success) {
            let currentLikes = parseInt(totalLikeThatTwitt.textContent) || 0;
            totalLikeThatTwitt.textContent = currentLikes + 1 + " Likes";
            likeIcon.src = "assets/heart-fill.svg";
          } else {
            instantFeedback.style.display = "flex";
            instantFeedback.textContent = result.error;
          }
        });

        const deleteTwittButton = itemTwitt.querySelector(`#deleteTwitt-${twitt.id}`);

        if (deleteTwittButton) {
          deleteTwittButton.addEventListener("click", function (event) {
            event.preventDefault();
            const result = twittManager.deleteTwitt(twitt.id);
            if (result.success) {
              displayAllTwitts(twittManager.getTwitts().filter((twitt) => twitt.twittUsernameOwner === usernameProfileChosen));
            } else {
              instantFeedback.style.display = "flex";
              instantFeedback.textContent = result.error;
            }
          });
        }
      });
    }
  }

  displayAllTwitts();
});

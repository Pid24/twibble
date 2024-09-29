document.addEventListener("DOMContentLoaded", () => {
  const twittForm = document.getElementById("twittForm");
  const ownerPhoto = document.getElementById("ownerPhoto");
  const twittsWrapper = document.getElementById("twittsWrapper");

  let selectedFeeling = null;

  const feelingItems = document.querySelectorAll(".item-feeling");

  feelingItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectedFeeling = item.getAttribute("data-feeling");

      feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]"));

      item.classList.add("border-[#1880e8]");
    });
  });
});

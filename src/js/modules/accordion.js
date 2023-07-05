const accordionItems = document.querySelectorAll(".accordion");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion__header");
  const body = item.querySelector(".accordion__body");

  header.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("open")) {
        otherItem.classList.remove("open");
      }
    });

    item.classList.toggle("open");
    if (item.classList.contains("open")) {
      header.setAttribute("aria-expanded", "true");
      body.setAttribute("aria-hidden", "false");
    } else {
      header.setAttribute("aria-expanded", "false");
      body.setAttribute("aria-hidden", "true");
    }
  });
});

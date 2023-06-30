export const dropDawn = () => {
  const navLinks = document.querySelectorAll(".drop-down");
  navLinks.forEach((navLink) => {
    const dropDownList = navLink.querySelector(".drop-down .nav__list");
    navLink.addEventListener("mouseover", () => {
      navLink.classList.add("active");
    });

    navLink.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget.closest(".drop-down .nav__list")) {
        navLink.classList.remove("active");
      }
    });

    dropDownList.addEventListener("mouseleave", () => {
      navLink.classList.remove("active");
    });
  });
};

export const burger = function () {
  const burger = document.querySelector("[data-burger]");
  const nav = document.querySelector("[data-nav]");

  burger.addEventListener("click", (e) => {
    burger.classList.toggle("burger--active");
    nav.classList.toggle("nav--active");
    bodyDropDown.classList.remove("open");
    if (nav.classList.contains("nav--active")) {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Закрыть меню");
    } else {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Открыть меню");
    }
  });
};

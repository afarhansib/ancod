import allNav from './allnav';

export default function loadNav() {
  let navHTML = ``;
  let navs = allNav();

  navs.forEach(e => {
    navHTML += `<li><a data-internal="1" class="waves-effect black-text" href="/${e.path}">${e.title}</a></li>`
  })

  document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
    elm.insertAdjacentHTML("afterbegin", navHTML);
  });

  document.querySelectorAll(".sidenav a").forEach(elm => {
    elm.addEventListener("click", () => {
      M.Sidenav.getInstance(document.querySelector(".sidenav")).close();
    });
  });
}
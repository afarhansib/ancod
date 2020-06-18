import loadNav from "./loadnav";
import Router from './Router';
import Db from './Db';

export default function init() {
  const router = new Router();
  window.db = new Db();

  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  if (localStorage) {
    if (!localStorage.firstVisit) localStorage.firstVisit = 'yes'
    if (localStorage.firstVisit == "yes") {
      db.addStar({ iso2: "ID", country: "Indonesia" })
      db.addStar({ iso2: "US", country: "USA" })
      db.addStar({ iso2: "CN", country: "China" })
      localStorage.firstVisit = 'no'
    }
  }
  router.windowListener();
  router.loadPage();
  router.listen();

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    document.querySelector('#installBtn').addEventListener('click', event => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
    document.querySelector('#installBanner').style.display = 'flex';
  });
}
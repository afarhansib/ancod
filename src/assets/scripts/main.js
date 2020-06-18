if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js')
      .then(reg => {
        console.log('Service worker registered! 😎', reg);
      })
      .catch(err => {
        console.log('😥 Service worker registration failed: ', err);
      });
  });
}

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

document.addEventListener("DOMContentLoaded", function() {
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);
  window.addEventListener("hashchange", () => {
    loadPage(location.hash.substr(1))
  })
});

const loadNav = () => {
  fetch("assets/shell/nav.html")
    .then(res => res.text())
    .then(text => {
      document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
        elm.insertAdjacentHTML("afterbegin", text);
      });
    })
    .then(() => {
      document.querySelectorAll(".sidenav a").forEach(elm => {
        elm.addEventListener("click", () => {
          M.Sidenav.getInstance(document.querySelector(".sidenav")).close();
        });
      });
    })
    .catch(err => console.error(err));
}

const loadPage = async page => {
  const cacheNames = await caches.keys();
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    for (const request of await cache.keys()) {
      let realUrl = request.url.split("/");
      let unused = realUrl.splice(0, 3);
      realUrl = realUrl.join("/");
      if (realUrl === `assets/pages/${page}.html`) {
        console.log("dimuat dari cache")
        cache.match(request)
          .then(res => res.text())
          .then(text => {
            document.querySelector("#main").innerHTML = text;
          })
          .catch(err => console.error(err));
        return;
      }
    }
  }

  fetch(`assets/pages/${page}.html`)
    .then(res => res.text())
    .then(text => {
      document.querySelector("#main").innerHTML = text;
    })
    .catch(err => console.error(err));
}
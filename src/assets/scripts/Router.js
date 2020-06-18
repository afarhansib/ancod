import allPages from './pages';
import listener from './listener';

export default class Router {
  windowListener = () => {
    window.addEventListener('popstate', (event) => {
      this.loadPage()
    });
  }

  listen = () => {
    for (let a of document.querySelectorAll('a')) {
      a.removeEventListener('click', listener)
      a.addEventListener('click', listener)
    }
  }

  navigate = (url = '') => {
    history.pushState({}, '', url);
    this.loadPage()
  }

  loadPage = () => {
    let pages = allPages();
    let pageContent = undefined;
    let pageTitle = "Ancod"
    const path = location.pathname.split('/');

    if (path[1] === "") {
      pageContent = pages.home[0];
      pageTitle = `${pages.home[2]} - Ancod`;
      pages.home[1]();
    } else {
      if (pages[path[1]]) {
        pageContent = pages[path[1]][0];
        pageTitle = `${pages[path[1]][2]} - Ancod`;
        if (pages[path[1]][1]) pages[path[1]][1](path);
      }
    }

    document.querySelector('main').innerHTML = pageContent ? pageContent : pages.e404[0];
    document.title = pageTitle;
    this.listen();
  }
}
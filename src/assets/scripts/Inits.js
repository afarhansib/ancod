import Router from './Router';
import Db from './Db';

export default class Inits {
  router = new Router();
  db = new Db();

  initAddButton = () => {
    document.getElementById('add-btn').addEventListener('click', () => {
      this.router.navigate('./countries')
    })
  }

  initRefreshButton = () => {
    document.getElementById('refresh-btn').addEventListener('click', () => {
      this.router.loadPage()
    })
  }

  initStarButton = (el = null) => {
    if (el) {
      el.addEventListener('click', function(e) {
        if (this.innerText === "star") {
          db.removeStar({ iso2: this.dataset.iso2, country: this.dataset.country })
        } else if (this.innerText === 'star_border') {
          db.addStar({ iso2: this.dataset.iso2, country: this.dataset.country })
        }
      })
    }
  }
}
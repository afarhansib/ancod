import './numberformat';
import Api from './Api';
import Db from './Db';
import Router from './Router';
import itemCard from './itemCard';
import Inits from './Inits';

export default class Update {
  api = new Api();
  router = new Router();
  db = new Db();
  init = new Inits();

  updateValue = data => {
    const valEl = document.querySelectorAll('.value');

    for (let el of valEl) {
      if (el.dataset.id === data.id) {
        if (el.dataset.type === "treated") {
          el.innerText = (data.response.cases - (data.response.deaths + data.response.recovered)).format(0, 3, '.')
        } else {
          el.innerText = data.response[el.dataset.type].format(0, 3, '.')
        }
      }
    }

    this.router.listen();
  }

  updateAt = data => {
    const date = new Date(data.updated);
    document.querySelector(".update-at").innerText = date.toLocaleString("id-ID", { dateStyle: 'full', timeStyle: "long" });
    this.router.listen();
  }

  updateAllCountries = async data => {
    // flag alternative 
    // https://www.countryflags.io/it/flat/64.png
    const wrapper = document.getElementById('all-countries-wrapper');
    if (document.querySelector('.loader')) {
      document.querySelector('.loader').remove();
    }
    const starred = await db.getAll();

    data.forEach((el, i) => {
      if (el.countryInfo.iso2) {
        setTimeout(() => {
          wrapper.insertAdjacentHTML('beforeend', `
            <div class="col s12 m6">
              ${itemCard(el, starred)}
            </div>
            `)
          this.init.initStarButton(document.querySelector(`.star-btn[data-iso2='${el.countryInfo.iso2}']`))
          this.router.listen();
          if (i + 1 === data.length) {
            if (document.querySelector('.rotateLoading')) {
              document.querySelector('.rotateLoading').classList.remove('rotateLoading')
            }
          }
        }, 100 * i)
      }
    })
  }

  updateFavCountries = async data => {
    // flag alternative 
    // https://www.countryflags.io/it/flat/64.png
    const wrapper = document.getElementById('fav-countries-wrapper');
    wrapper.innerHTML = '';
    let j = 1;
    const starred = await db.getAll();
    if (document.querySelector('.rotateLoading')) {
      document.querySelector('.rotateLoading').classList.remove('rotateLoading')
    }

    data.forEach((el, i) => {
      if (starred.includes(el.countryInfo.iso2)) {
        setTimeout(() => {
          wrapper.insertAdjacentHTML('beforeend', itemCard(el, starred))
          this.init.initStarButton(document.querySelector(`.star-btn[data-iso2='${el.countryInfo.iso2}']`))
          this.router.listen();
        }, 100 * j++)
      }
    })
  }

  updateWrapper = html => {
    document.querySelector('main').innerHTML = html;
  }

  updateTitle = title => {
    document.title = title;
  }

  updateAllData = () => {
    this.api.getGeneral((status, response) => {
      if (status) {
        this.updateValue({ response, id: 'glo' })
        this.updateAt(response)
      } else {
        M.toast({ html: 'Terjadi kesalahan, coba lagi nanti.' })
        if (document.querySelector('.rotateLoading')) {
          document.querySelector('.rotateLoading').classList.remove('rotateLoading')
        }
      }
    });

    this.api.getIdn((status, response) => {
      if (status) {
        this.updateValue({ response, id: 'idn' })
      } else {
        M.toast({ html: 'Terjadi kesalahan, coba lagi nanti.' })
        if (document.querySelector('.rotateLoading')) {
          document.querySelector('.rotateLoading').classList.remove('rotateLoading')
        }
      }
    })

    this.api.getAll((status, response) => {
      if (status) {
        this.updateFavCountries(response)
      } else {
        M.toast({ html: 'Terjadi kesalahan, coba lagi nanti.' })
        if (document.querySelector('.rotateLoading')) {
          document.querySelector('.rotateLoading').classList.remove('rotateLoading')
        }
      }
    })
  }
}
import './numberformat';
import percentage from './percentage';
import Update from './Update';
import Api from './Api';
import Router from './Router';
import Db from './Db';
import Inits from './Inits';

export default function(args) {
  const router = new Router();
  const update = new Update();
  const api = new Api();
  const db = new Db();
  const init = new Inits();

  let detailHTML = ``
  const notFoundHTML = `<div class="center">
        <h1>404</h1>
        <h5 class="text-center">Negara yang anda cari tidak ditemukan.</h5>
        <a href="/countries" data-internal="1" class="custom-button">Semua Negara</a>
    </div>`
  const errorHTML = code => {
    return `<div class="center">
        <h1>${code}</h1>
        <h5 class="text-center">Ada Masalah ketika menampilkan halaman yang Anda minta.</h5>
        <div class="custom-button round" id="refresh-btn">
            <i class="material-icons">refresh</i>
            <span>Refresh</span>
          </div>
    </div>`
  }

  if (args[2]) {
    api.getByISO2(args[2], async (status, response) => {
      if (status) {
        let starred = await db.getAll();
        starred = starred.includes(response.countryInfo.iso2)
        let fbutton = `<div class="fixed-action-btn">
          <a class="btn-floating red">
            <i data-iso2="${response.countryInfo.iso2}" data - country = "${response.country}" class="star-btn material-icons">star_border</i>
          </a>
        </div>`
        if (starred) {
          fbutton = `<div class="fixed-action-btn">
          <a class="btn-floating red">
            <i data-iso2="${response.countryInfo.iso2}" data-country="${response.country}" class="star-btn material-icons">star</i>
          </a>
        </div>`
        }

        detailHTML = `<div class="row valign-wrapper">
        ${fbutton}
    <div class="col s4 left-align">
      <div class="custom-button round" id="back-btn">
        <i class="material-icons">chevron_left</i>
        <span>Kembali</span>
      </div>
    </div>
    <div class="col s8 right-align">
      <p>Update terakhir: <br> <span class="update-at">…</span></p>
    </div>
  </div>
  <div class="row">
    <div class="col s12 m6 pr">
      <div class="row">
        <div class="col s12">
          <div class="row valign-wrapper">
            <div class="col s8">
              <h5 class="sec-title">Data Covid-19 di ${response.country}</h5>
            </div>
            <div class="col s4">
              <div class="card flag large" style="background-image: url(${response.countryInfo.flag})">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <div class="card">
                <p class="title amber darken-4">Terkonfirmasi</p>
                <h5 class="value" data-type="cases">${response.cases.format(0, 3, '.')}</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title orange">Dirawat</p>
                <h5 class="value" data-type="treated">${response.active.format(0, 3, '.')}</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title green">Sembuh</p>
                <h5 class="value" data-type="recovered">${response.recovered.format(0, 3, '.')}</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title red">Meninggal</p>
                <h5 class="value" data-type="deaths">${response.deaths.format(0, 3, '.')}</h5>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="card">
                <p class="title blue">Populasi</p>
                <h5 class="value" data-type="population">${response.population.format(0, 3, '.')}</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title purple">Persentase Kasus</p>
                <h5 class="value" data-type="percentage">${percentage(response.cases, response.population)}%</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title green accent-4">Persentase Sembuh</p>
                <h5 class="value" data-type="percentage">${percentage(response.recovered, response.cases)}%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12 m6 pl">
      <h5 class="sec-title">Peta Negara ${response.country}</h5>
      <div class="row">
        <div class="col s12">
          <iframe class="card" id="country-map" width="100%" height="400" src="https://maps.google.com/maps?hl=id&q=${response.country}&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
      </div>
    </div>
  </div>`
        update.updateWrapper(detailHTML);
        update.updateTitle(`${response.country} - Ancod`);
        update.updateAt(response);
        initBackButton()
        init.initStarButton(document.querySelector('.star-btn'))
      } else if (response === 404) {
        update.updateWrapper(notFoundHTML);
      } else {
        update.updateWrapper(errorHTML(response));
        init.initRefreshButton()
      }
    })
  } else {
    console.log('halo?')
    setTimeout(() => {
      update.updateWrapper(notFoundHTML);
    }, 1000)
  }

  function initBackButton() {
    document.getElementById('back-btn').addEventListener('click', () => {
      history.back()
    })
  }
}
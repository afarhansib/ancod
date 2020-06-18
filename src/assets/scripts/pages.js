import Home from './Home';
import Countries from './Countries';
import Detail from './Detail';

export default function() {
  const pages = {
    home: [`
    <div class="row valign-wrapper">
        <div class="col s8">
          <p>Update terakhir: <br> <span class="update-at">…</span></p>
        </div>
        <div class="col s4 right-align">
          <div class="custom-button round" id="refresh-btn">
            <i class="material-icons rotateLoading">refresh</i>
            <span>Update</span>
          </div>
        </div>
    </div>
		<div class="row">
    <div class="col s12 m6 pr">
      <div class="row">
        <div class="col s12">
          <h5 class="sec-title">Data Covid-19 di Indonesia</h5>
          <div class="row">
            <div class="col s6">
              <div class="card">
                <p class="title amber darken-4">Terkonfirmasi</p>
                <h5 class="value" data-type="cases" data-id="idn">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title orange">Dirawat</p>
                <h5 class="value" data-type="treated" data-id="idn">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title green">Sembuh</p>
                <h5 class="value" data-type="recovered" data-id="idn">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title red">Meninggal</p>
                <h5 class="value" data-type="deaths" data-id="idn">…</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12">
          <h5 class="sec-title">Data Covid-19 Global</h5>
          <div class="row">
            <div class="col s6">
              <div class="card">
                <p class="title amber darken-4">Terkonfirmasi</p>
                <h5 class="value" data-type="cases" data-id="glo">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title orange">Dirawat</p>
                <h5 class="value" data-type="treated" data-id="glo">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title green">Sembuh</p>
                <h5 class="value" data-type="recovered" data-id="glo">…</h5>
              </div>
            </div>
            <div class="col s6">
              <div class="card">
                <p class="title red">Meninggal</p>
                <h5 class="value" data-type="deaths" data-id="glo">…</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12 m6 pl">
      <h5 class="sec-title">Data Covid-19 Negara Pilihan</h5>
      <div class="row">
        <div class="col s12" id="fav-countries-wrapper">
          
        </div>
        <div class="custom-button round" id="add-btn">
          <i class="material-icons">add</i>
          <span>Tambah</span>
        </div>
      </div>
    </div>
  </div>
		`, Home, "Home"],
    countries: [`
      <div class="row valign-wrapper">
          <div class="col s8">
            <p>Update terakhir: <br> <span class="update-at">…</span></p>
          </div>
          <div class="col s4 right-align">
            <div class="custom-button round" id="refresh-btn">
              <i class="material-icons rotateLoading">refresh</i>
              <span>Update</span>
            </div>
          </div>
      </div>
			<h5 class="m-tb">Data Covid-19 Semua Negara</h5>
      <div class="row" id="all-countries-wrapper">
        <div class="loader center">
          <div class="preloader-wrapper small active center">
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
		`, Countries, "Semua Negara"],
    about: [`
			<h5>Tentang</h5>
      <p>Aplikasi ini hanyalah satu dari sekian banyak aplikasi yang menyajikan data Covid-19. Saya menerapkan service worker dan push notification di aplikasi ini, jadi Anda bisa menginstall-nya secara langsung, juga bisa mendapatkan pemberitahuan melalui notifikasi tentang update datanya setiap hari.</p>
      <p>Aplikasi ini juga merupakan hasil dari percobaan pertama saya menggunakan Parcel sebagai module bundler. Anda bisa mengetahui lebih lanjut tentang saya melalui <a rel="noreferrer" href="https://afarhansib.github.io/" class="green-text text-darken-4">link ini</a>.</p>
		`, false, "Tentang"],
    e404: [`
			<div class="center">
        <h1>404</h1>
        <h5 class="text-center">Halaman yang anda cari tidak ditemukan.</h5>
        <a href="/" data-internal="1" class="back-home"><i class="material-icons">chevron_left</i><span>Kembali ke Home</span></a>
    </div>
		`, false, "404 Error"],
    detail: [`
        <div class="loader center">
          <div class="preloader-wrapper small active center">
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
    `, Detail, "Detail Negara"]
  }

  return pages;
}
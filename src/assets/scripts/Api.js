export default class Api {
  BASE_URL = 'https://corona.lmao.ninja/v2';

  fetchApi = (url, cb) => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(response.status);
        } else {
          return Promise.resolve(response);
        }
      })
      .then(res => res.json())
      .then(data => {
        cb.apply({}, [true, data])
      })
      .catch(err => {
        cb.apply({}, [false, err])
      })
  }

  getGeneral = cb => {
    this.fetchApi(`${this.BASE_URL}/all`, cb)
  }

  getAll = cb => {
    this.fetchApi(`${this.BASE_URL}/countries`, cb)
  }

  getIdn = cb => {
    this.fetchApi(`${this.BASE_URL}/countries/ID`, cb)
  }

  getByISO2 = (iso2, cb) => {
    this.fetchApi(`${this.BASE_URL}/countries/${iso2.toLowerCase()}`, cb)
  }
}
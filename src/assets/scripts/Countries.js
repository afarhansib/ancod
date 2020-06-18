import Update from './Update';
import Api from './Api';
import Inits from './Inits';

export default function() {
  const update = new Update();
  const api = new Api();
  const init = new Inits();

  api.getAll((status, response) => {
    if (status) {
      update.updateAllCountries(response)
    } else {
      console.error(response)
      M.toast({ html: 'Terjadi kesalahan, coba lagi nanti.' })
    }
  })

  api.getGeneral((status, response) => {
    if (status) {
      update.updateAt(response)
    } else {
      M.toast({ html: 'Terjadi kesalahan, coba lagi nanti.' })
    }
  });

  setTimeout(() => {
    init.initRefreshButton()
  }, 1000)
}
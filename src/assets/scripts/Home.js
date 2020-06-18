import Update from './Update';
import Inits from './Inits';

export default function() {
  const update = new Update();
  const init = new Inits();

  update.updateAllData()
  setTimeout(() => {
    init.initAddButton()
    init.initRefreshButton()
  }, 1000)
}
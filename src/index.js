import 'regenerator-runtime/runtime';
import './../node_modules/materialize-css/dist/css/materialize.min.css';
import './../node_modules/materialize-css/dist/js/materialize.min';
import './assets/styles/main.css';
import init from "./assets/scripts/init"
import registerSw from "./assets/scripts/registerSw"
import registerNotification from "./assets/scripts/registerNotification"

registerSw();
registerNotification();
init();
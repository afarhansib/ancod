import Helper from './Helper.js';

export default function() {
  const helper = new Helper();

  navigator.serviceWorker.ready.then(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function(result) {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diizinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup dialog permintaan izin.");
          return;
        }

        if (('PushManager' in window)) {
          navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: helper.urlBase64ToUint8Array("BFmaEKsxdjBgX-0GT3TLHmsSUvoH04TDXrgIWBubNf52Q73IF8If19ylowEYedYXUO7GzXO44UHhkRRiVwEcnts")
            }).then(function(sub) {

              let data = {}
              data['endpoint'] = sub.endpoint
              data['p256dh'] = btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh'))))
              data['auth'] = btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth'))))


              fetch('http://grapit.000webhostapp.com/ancod/add-data.php', {
                  method: 'post',
                  body: JSON.stringify(data)
                })
                .then(response => response.text())
                .then(data => {
                  console.log(data)
                  M.toast({ html: `Anda telah terdaftar!` });
                })
                .catch(err => console.error(err))
              console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(sub.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(sub.getKey('auth')))));
            }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e);
            });
          });
        } else {
          console.error("Browser tidak support PushManager")
        }
      })
    } else {
      console.error("Browser tidak support notifikasi")
    }
  })
}
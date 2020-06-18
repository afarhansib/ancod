export default function() {
  const sw = "sw.js";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(sw)
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil!");
      })
      .catch(function(err) {
        console.error("Pendaftaran ServiceWorker gagal! Error: " + err);
      });
  } else {
    console.log("Browser anda belum mendukung ServiceWorker.");
  }
}
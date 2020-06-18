import { openDB } from 'idb';
import Router from './Router';

export default class Db {
  router = new Router()

  constructor() {
    this.idb = openDB("ancod", 1, {
      upgrade(db) {
        db.createObjectStore("starred", {
          keyPath: "iso2"
        });
      }
    })
  }

  addStar = data => {
    this.idb
      .then(db => {
        let tx = db.transaction('starred', 'readwrite');
        let store = tx.objectStore('starred');
        store.add(data);
        return tx.complete;
      })
      .then(() => {
        M.toast({ html: `${data.country} berhasil ditambahkan!` });
        this.router.loadPage()
      })
      .catch(function(error) {
        M.toast({ html: `${data.country} gagal ditambahkan!` });
        console.error(`${data.country} gagal ditambahkan! Error: ${error}`)
      })
  }

  removeStar = data => {
    this.idb
      .then(db => {
        let tx = db.transaction('starred', 'readwrite');
        let store = tx.objectStore('starred');
        store.delete(data.iso2);
        return tx.complete;
      })
      .then(() => {
        M.toast({ html: `${data.country} berhasil dihapus!` });
        this.router.loadPage()
      })
      .catch(function(error) {
        M.toast({ html: `${data.country} gagal dihapus!` });
        console.error(`${data.country} gagal dihapus! Error: ${error}`)
      })
  }

  getAll = () => {
    return this.idb
      .then(db => {
        let tx = db.transaction('starred', 'readonly');
        let store = tx.objectStore('starred');
        return store.getAll();
      })
      .then((res) => {
        let arr = []
        for (let i of res) arr.push(i.iso2)
        return arr;
      })
      .catch(function(error) {
        console.error(`Gagal mendapatkan data! Error: ${error}`)
      })
  }
}
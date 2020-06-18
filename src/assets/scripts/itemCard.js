import './numberformat';

export default function(data, stars) {
  let isStarred = 'star_border'

  if (stars.includes(data.countryInfo.iso2)) {
    isStarred = "star"
  } else {
    isStarred = "star_border"
  }

  return `
  <a href="detail/${data.countryInfo.iso2.toLowerCase()}" data-internal="1" class="card custom">
  <div class="row">
    <div class="col s3">
      <div class="flag card" style = "background-image: url(${data.countryInfo.flag})">
      </div>
    </div>
    <div class="col s9">
      <h6>${data.country}</h6>
    </div>
  </div>
  <div class="row valign-wrapper">
    <div class="col s10">
      <div class="row">
        <div class="col s4">
          <span>Positif:</span> <span class="badge amber darken-4">${data.cases.format(0, 3, '.')}</span>
        </div>
        <div class="col s4">
          <span>Sembuh:</span> <span class="badge green">${data.recovered.format(0, 3, '.')}</span>
        </div>
        <div class="col s4">
          <span>Meninggal:</span> <span class="badge red">${data.deaths.format(0, 3, '.')}</span>
        </div>
      </div>
    </div>
    <div class="col s2">
      <i data-iso2="${data.countryInfo.iso2}" data-country="${data.country}" class="small star-btn material-icons">${isStarred}</i>
    </div>
  </div>
</a>
  `
}
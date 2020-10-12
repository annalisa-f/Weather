

function changeBackground(imgUrl) {
  document.body.style.backgroundImage = "url('static/maps/" + imgUrl + "')";
}


document.querySelectorAll('.cont').forEach(item => {
  item.addEventListener('click', event => {

    var whichCont = event.target;
    let contNum = whichCont.id

    fetch('/continent', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(contNum)
    })
    .then(response => response.json())
    .then(data => {
      changeBackground(data[0])
    })
  })
})

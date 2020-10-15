

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


window.addEventListener("load", function() {
  var svgObject = document.getElementById('snowdoc').contentDocument;
  var svg = svgObject.getElementById('line1');
  console.log(svg);
});


let snowflake = document.createElement('object');
snowflake.type = "image/svg+xml"
snowflake.data = "{{ url_for('static', filename='maps/snowflake.svg') }}"

console.log(snowflake)

document.getElementById('map').appendChild(snowflake);

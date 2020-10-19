var whatinfo = 'all'

whichElement = ""


var windowWidth  = window.innerWidth;
var whichElement = ''
if (windowWidth > 920) {
  whichElement = document.getElementById('datadisp')
  format = "&nbsp;&nbsp;"
}
else {
  whichElement = document.getElementById('datadispbottom')
  format = "<br>"
}


function changeBackground(x, y, scale) {
    gsap.to('#map', 1, {x:x, y:y, scale:scale});
}

function displaycityinfo(city, savg, wavg, rain, snow) {
  whichElement.innerHTML = '';
  var doessnow = ""
  if (snow == 1) {
    doessnow = "Yes"
  }
  else {
    doessnow = "No"
  }

  let data = document.createElement('p');
  data.innerHTML += "<b>City:</b> " + city + format + "<b>Summer Average:</b> " + savg + "&#176;C" + format + "<b>Winter Average:</b> " + wavg + "&#176;C" + format + "<b>Yearly Rainfall Days:</b> " + rain + format +"<b>Does it Snow:</b> " + doessnow;

  whichElement.appendChild(data);
}

function displayoneinfo(city, datatype, onedata, whatinfo) {
  whichElement.innerHTML = '';
  if (whatinfo == 'snow') {
    var doessnow = ""
    if (onedata == 1) {
      doessnow = "Yes"
    }
    else {
      doessnow = "No"
    }
  }

  let data = document.createElement('p');
  if (whatinfo == "summeravg" || whatinfo == "winteravg") {
    data.innerHTML += "<b>City:</b> " + city + format + "<b>" + datatype + "</b> " + onedata + "&#176;C";
  }
  else if (whatinfo == 'snow'){
    data.innerHTML += "<b>City:</b> " + city + format + "<b>" + datatype + "</b> " + doessnow;
  }
  else {
    data.innerHTML += "<b>City:</b> " + city + format + "<b>" + datatype + "</b> " + onedata;
  }

  whichElement.appendChild(data);
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
      changeBackground(data[0], data[1], data[2])
    })
  })
})

document.querySelectorAll('.condition').forEach(item => {
  item.addEventListener('click', event => {

    var whichCond = event.target;
    whatinfo = whichCond.id

    whichElement.innerHTML = '';
    let emptytemp = document.createElement('p');

    sun = document.getElementById('Sun');
    winter = document.getElementById('Winter');
    raindrop = document.getElementById('Rain');
    snowflake = document.getElementById('Snowflake');

    if (whatinfo == 'all') {
      sun.style.display = 'initial';
      winter.style.display = 'initial';
      raindrop.style.display = 'initial';
      snowflake.style.display = 'initial';
      emptytemp.innerHTML += "<b>City:</b> &nbsp;&nbsp; <b>Summer Average:</b> &nbsp;&nbsp; <b>Winter Average:</b> &nbsp;&nbsp; <b>Yearly Rainfall Days:</b> &nbsp;&nbsp; <b>Does it Snow:</b>";
    }
    else if (whatinfo == 'rainfall') {
      sun.style.display = 'none';
      winter.style.display = 'none';
      raindrop.style.display = 'initial';
      snowflake.style.display = 'none';
      emptytemp.innerHTML += "<b>City:</b> &nbsp;&nbsp;<b>Yearly Rainfall Days:</b> ";
    }
    else if (whatinfo == 'snow') {
      sun.style.display = 'none';
      winter.style.display = 'none';
      raindrop.style.display = 'none';
      snowflake.style.display = 'initial';
      emptytemp.innerHTML += "<b>City:</b> &nbsp;&nbsp;<b>Does it Snow:</b> ";
    }
    else if (whatinfo == 'winteravg') {
      sun.style.display = 'none';
      winter.style.display = 'initial';
      raindrop.style.display = 'none';
      snowflake.style.display = 'none';
      emptytemp.innerHTML += "<b>City:</b> &nbsp;&nbsp;<b>Winter Average:</b> ";
    }
    else if (whatinfo == 'summeravg') {
      sun.style.display = 'initial';
      winter.style.display = 'none';
      raindrop.style.display = 'none';
      snowflake.style.display = 'none';
      emptytemp.innerHTML += "<b>City:</b> &nbsp;&nbsp;<b>Summer Average:</b> ";
    }

    whichElement.appendChild(emptytemp);

  })
})


document.querySelectorAll('.Pindrop').forEach(item => {
  item.addEventListener('click', event => {

    var whichpin = item;
    let pinNum = whichpin.id
    console.log(pinNum)

    fetch('/allinfo', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(pinNum)
    })
    .then(response => response.json())
    .then(data => {
      if (whatinfo == 'all') {
        displaycityinfo(data[0], data[1], data[2], data[3], data[4],)
      }
      else if (whatinfo == 'summeravg') {
        displayoneinfo(data[0], 'Summer Average', data[1], whatinfo)
      }
      else if (whatinfo == 'winteravg') {
        displayoneinfo(data[0], 'Winter Average', data[2], whatinfo)
      }
      else if (whatinfo == 'rainfall') {
        displayoneinfo(data[0], 'Yearly Rainfall Days', data[3], whatinfo)
      }
      else if (whatinfo == 'snow') {
        displayoneinfo(data[0], 'Does it Snow', data[4], whatinfo)
      }
    })

  })
})

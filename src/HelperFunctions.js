/* Helper Functions */
function round(val) {
  return Math.round(val*1000000)/1000000;
}

function clearList(list) {
  while(list.firstChild ) {
    list.removeChild(list.firstChild) ;
  }
}

function updateList(listID, listArray, textFunction, onclickCallback, currentSelection,caller) {
  var list = document.getElementById(listID);
  clearList(list);

  var i = 0;
  for (elem of listArray) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(textFunction(elem));
    node.appendChild(textnode);
    list.appendChild(node);
    node.onclick = function(){ onclickCallback.call(caller,$(this).index()) };
    if(i==currentSelection) {
      node.style.backgroundColor = "dimgrey";
    }
    i++;
  }
}

function invalidate(tab) {
  for (var field in tab) {
    if (tab.hasOwnProperty(field)) {
      if(tab[field].__proto__.hasOwnProperty("invalidate")) {
        tab[field].invalidate();
      }
    }
  }
}


function oldInvalidate(prefix) {
  var out = document.getElementsByClassName("output");
  for (elem of out) {
    if(elem.id.startsWith(prefix)) {
      elem.innerHTML = "-";
    }
  }
}

function removeElement(list,index) {
  list.splice(index,1);
}

function getEllipsePoint(a,b,e,t) {
  var x = a * (e+Math.cos(t));
  var y = b * Math.sin(t);
  var z = 0;

  return [x,y,z];
}

function rotatePoint(pt, roll, pitch, yaw) {
  var x,x1,x2,x3;
  var y,y1,y2,y3;
  var z,z1,z2,z3;

  x = pt[0];
  y = pt[1];
  z = pt[2];

  //Gier = Yaw    Psi
  //Nick = Pitch  Theta
  //Roll          Phi
  x1 = x * Math.cos(pitch)* Math.cos(yaw);
  x2 = y * Math.cos(pitch)* Math.sin(yaw);
  x3 = z * Math.sin(pitch)* (-1);

  y1 = x * (Math.sin(roll)* Math.sin(pitch)* Math.cos(yaw) - Math.cos(roll) * Math.sin(yaw));
  y2 = y * (Math.sin(roll)* Math.sin(pitch)* Math.sin(yaw) + Math.cos(roll) * Math.cos(yaw));
  y3 = z * Math.sin(roll) * Math.cos(pitch);

  z1 = x * (Math.cos(roll)* Math.sin(pitch)* Math.cos(yaw) + Math.sin(roll) * Math.sin(yaw));
  z2 = y * (Math.cos(roll)* Math.sin(pitch)* Math.sin(yaw) - Math.sin(roll) * Math.cos(yaw));
  z3 = z * Math.cos(roll) * Math.cos(pitch);

  return [x1+x2+x3, y1+y2+y3, z1+z2+z3];
}

function rgbFromKelvinTemp(temp) {
  var r,g,b;
  //Temperature must fall between 1000 and 40000 degrees
  if ( temp > 40000 ) {
    temp = 40000;
  }
  //All calculations require temp \ 100, so only do the conversion once
  temp /= 100;

  //Calculate each color in turn

  //First: red
  if ( temp <= 66 ) {
    r = 255;
  } else {
    var tmpCalc = temp - 60;
    tmpCalc = 329.698727446 * Math.pow(tmpCalc, -0.1332047592);
    r = Math.round(tmpCalc);
    if ( r > 255 ) {
      r = 255;
    }
  }

  //Second: green
  if ( temp <= 66 ) {
    //Note: the R-squared value for this approximation is .996
    var tmpCalc = temp;
    tmpCalc = 99.4708025861 * Math.log(tmpCalc) - 161.1195681661;
    g = Math.round(tmpCalc);
    if ( g > 255 ) {
      g = 255;
    }
  } else {
    //Note: the R-squared value for this approximation is .987
    var tmpCalc = temp - 60;
    tmpCalc = 288.1221695283 * Math.pow(tmpCalc, -0.0755148492);
    g = Math.round(tmpCalc);
    if ( g > 255 ){
      g = 255;
    }
  }

  //Third: blue
  if ( temp >= 66 ) {
    b = 255;
  } else {
    if ( temp <= 19 ) {
      b = 0;
    } else {
      //Note: the R-squared value for this approximation is .998
      var tmpCalc = temp - 10;
      tmpCalc = 138.5177312231 * Math.log(tmpCalc) - 305.0447927307;

      b = Math.round(tmpCalc);
      if ( b > 255 ) {
        b = 255;
      }
    }
  }
  return "rgb("+r+","+g+","+b+")";
}

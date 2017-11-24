/* Save, Load and Init */
function init() {
  var typeSelector =document.getElementById("planet-typeselector");
  clearList(typeSelector);
  i = 0;
  for (var type of planetTypes) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(type.name);
      node.appendChild(textnode);
      typeSelector.appendChild(node);
      i++;
  }

  typeSelector =document.getElementById("moon-typeselector");
  clearList(typeSelector);
  i = 0;
  for (var type of moonTypes) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(type.name);
      node.appendChild(textnode);
      typeSelector.appendChild(node);
      i++;
  }

  starEditor.setIndex(0);
  planetEditor.setIndex(0);
  moonEditor.setIndex(0);
  orbitEditor.setIndex(0);

  if(moonActive == false) {
      deactivateTab("moon");
  }

}

function getSavefile() {
  return {
    stars : starEditor.getStarlist(),
    planets : planetEditor.getPlanetlist(),
    orbits: orbitEditor.getOrbitlist(),
    moons: moonEditor.getSystemlist(),
  };
}

function createSavefile() {
  var data = JSON.stringify(getSavefile(),null, '  ');
  document.getElementById("savedata").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function loadFile(evt) {
  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      loadData(contents);
    }
    r.readAsText(f);

  } else {
    alert("Failed to load file");
  }
}

function loadData(json) {
  var obj = JSON.parse(json);

  for (var star of obj.stars) {
    star.__proto__ = Star.prototype;

    var nStar = new Star();
    for (val in nStar) {
      if(star[val] === undefined) {
        star[val] = nStar[val];
      }
    }
  }

  for (var planet of obj.planets) {
    planet.__proto__ = Planet.prototype;

    var nPlanet = new Planet();
    for (val in nPlanet) {
      if(planet[val] === undefined) {
        planet[val] = nPlanet[val];
      }
    }
  }


  for (var orbit of obj.orbits) {
    orbit.__proto__ = Orbit.prototype;

    var nOrbit = new Orbit();
    for (val in nOrbit) {
      if(orbit[val] === undefined) {
        orbit[val] = nOrbit[val];
      }
    }

    if(orbit.objects.length > 0) {
      activateTab("moon");
    }
    for(var object of orbit.objects) {
      object.__proto__ = OrbitObject.prototype;
      var nOrbitObjec = new OrbitObject();
      for (val in nOrbitObjec) {
        if(object[val] === undefined) {
          object[val] = nOrbitObjec[val];
        }
      }
    }
  }

  for (var system of obj.moons) {
    system.__proto__ = MoonSystem.prototype;

    var nSystem = new MoonSystem();
    for (val in nSystem) {
      if(system[val] === undefined) {
        system[val] = nSystem[val];
      }
    }



    for(var moon of system.moons) {
      moon.__proto__ = Moon.prototype;

      var nMoon = new Moon();
      for (val in nMoon) {
        if(moon[val] === undefined) {
          moon[val] = nMoon[val];
        }
      }
    }
  }

  starEditor.stars = obj.stars;
  planetEditor.planets = obj.planets;
  orbitEditor.orbits = obj.orbits;
  moonEditor.systems = obj.moons;

  init();
}

function saveAsCookie() {
  var data = btoa(JSON.stringify(getSavefile()));

  var d = new Date();
  d.setTime(d.getTime() + (356*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "savefile=" + data + ";" + expires + ";path=/";

}

function loadFromCookie() {
  var name = "savefile=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var data = c.substring(name.length, c.length);
      data = atob(data);
      loadData(data);
      return;
    }
  }
}

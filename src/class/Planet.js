/* Planet */
class Planet {
  constructor(name, mass, radius,planetTypeIndex) {
    if( name === undefined) {
      name = "Planet McPlanetface";
    }

    if(mass === undefined) {
      mass = 1;
    }

    if(radius === undefined) {
      radius = 1;
    }

    if(planetTypeIndex == undefined) {
      planetTypeIndex = 0;
    }

    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.planetTypeIndex = 0;
  }

  getRadius() {
    return this.radius;
  }

  getGravity() {
    return round(this.mass / this.radius/this.radius);
  }

  getDensity() {
    return round(this.getGravity()/this.radius);
  }

  getCircumference() {
    return round(this.radius);
  }

  getSurfaceArea() {
    return round(this.radius*this.radius);
  }

  getVolume() {
    return round(this.radius*this.radius*this.radius);
  }

  getEscapeVelocity() {
    return round(Math.sqrt(this.mass/this.radius));
  }

  getMakeup() {
    return interpolator.interpolate(this.mass,this.radius);
  }

  getHillSphereOuter(orbitObject, star) {
    var a = orbitObject.semiMajorAxis;
    var sMass = star.mass;
    var sphPlanetRadii = a * Math.cbrt(this.mass/sMass)*235;
    return  round(this.planetRadiiToLunarDistances(sphPlanetRadii));
  }

  getHillSphereInner() {
    var sphPlanetRadii = 2.44*this.radius*Math.cbrt(this.getDensity() / 2.602292);
    return round(this.planetRadiiToLunarDistances(sphPlanetRadii));
  }

  getRocheLimit(moon) {
    var moonDensity = moon.getDensity()/0.606;
    var sphPlanetRadii = 2.44*this.radius*Math.cbrt(this.getDensity() / moonDensity);
    return round(this.planetRadiiToLunarDistances(sphPlanetRadii));
  }

  planetRadiiToLunarDistances(val) {
    var earthRad = val*this.radius;
    var lunDistInEarthRad = 60.33574;
    return earthRad/lunDistInEarthRad;
  }

  getPlanetRadiusInLunarRadii() {
    return round(this.radius/0.273);
  }

  getPlanetMassInLunarMasses() {
    return this.mass/0.0123;
  }

  getHabitability() {
    var out= ""
    if(this.mass < 0.1) {
      out+= this.name + " is to light to be habitable.\n";
    }

    if(this.mass > 3.5) {
      out+= this.name  + " is to heavy to be habitable.\n";
    }

    if(this.radius < 0.5) {
      out+= this.name  + " is to small to be habitable.\n";
    }

    if(this.radius > 1.5) {
      out+= this.name  + " is to large to be habitable.\n";
    }
    if(out==="") {
      out = this.name+" is in theory habitable."
    }

    return out.trim().replace("\n","</br>");
  }
}

//Classes for interpolation of the planetdata.js data.
class DataRow {
  constructor(xData,yData) {
    this.xData = xData;
    this.yData = yData;
  }

  interpolate(x) {
    if(x<this.xData[0]) {
      //Linear Interpolation
      var x0 = this.xData[0];
      var y0 = this.yData[0];
      var x1 = this.xData[1];
      var y1 = this.yData[1];

      var delta = (y0-y1)/(x0-x1);
      var n = y0 - delta * x0;

      //return delta*x + n;
      return delta*x + n;;
    }

    if(x>this.xData[this.xData.length-1]) {
      return NaN;
    }

    for (var i = 0; i < this.xData.length-1; i++) {
      if(this.xData[i] <=x && x<=this.xData[i+1]) {
        var conFac = (x-this.xData[i])/(this.xData[i+1]-this.xData[i]);
        return this.yData[i]+ (this.yData[i+1]-this.yData[i])*conFac;
      }
    }
  }
}

class Composition {
  constructor(compArray) {
    this.compMap = new Map(compArray);
  }

  getScaledComposition(scaler) {
    var out = new Map();

    for(var [key, value] of this.compMap.entries()) {
      out.set(key,value*scaler);
    }

    return out;
  }

  static getMergedComposition(comA,scaleA,comB,scaleB) {
    var cA = comA.getScaledComposition(scaleA);
    var cB = comB.getScaledComposition(scaleB);

    var out = new Map();

    for(var [key, value] of cA) {
      var val = value;
      if(cB.has(key)) {
        val+=cB.get(key);
      }
      out.set(key,round(val));
    }

    for(var [key, value] of cB) {
      if(!cA.has(key)) {
        out.set(key,round(value));
      }
    }

    for (var key of out.keys()) {
      if(out.get(key)==0) {
        out.delete(key);
      }
    }

    return out;
  }

  static mapMaterialToColor(material) {
    switch (material) {
      case "Iron":
        return "#990000";

      case "Silicate":
        return "#555555";

      case "Water":
        return "#3399FF";

      case "Hydrogen":
        return "#99CCFF";

      case "Helium":
        return "#99FF99";

      case "Heavy Metal":
        return "#333333";

      case "Good Will":
        return "#FFFF66";
    }
    return "#FFFFFF";
  }
}

class DataInterpolator {
  constructor(dataRows,compositions) {
    this.dataRows = dataRows;
    this.compositions = compositions;
  }

  interpolate(x,y) {
    if(y < this.dataRows[0].interpolate(x)) {
      return new Map([["Heavy Metal",1]]);
    }

    if(y > this.dataRows[this.dataRows.length-1].interpolate(x)) {
      return new Map([["Good Will",1]]);
    }

    for (var i = 0; i < this.dataRows.length-1; i++) {
      var min = this.dataRows[i].interpolate(x);
      var max = this.dataRows[i+1].interpolate(x);
      if(min<=y && y<=max) {
        var scaleB = (y-min)/(max-min);
        var scaleA = 1-scaleB;
        return Composition.getMergedComposition(this.compositions[i],scaleA,this.compositions[i+1],scaleB);
      }
    }
  }
}

var planetEditor = {
  index : 0,
  planets : [new Planet("Terra")],

  getCurrent() {
    return this.getPlanet(this.index);
  },

  getPlanet(index) {
    return this.planets[index];
  },

  getPlanetlist() {
    return this.planets;
  },

  getPlanetcount() {
    return this.planets.length;
  },

  deletePlanet() {
    if(this.planets.length <= 1) {
      return;
    }

    removeElement(this.planets,this.index);

    for (orbit of orbitEditor.orbits) {
      for(object of orbit.objects) {
        if(object.planetIndex == this.index) {
          object.planetIndex = 0;
        }

        if(object.planetIndex > this.index) {
          object.planetIndex-=1;
        }
      }
    }

    this.setIndex(0);
  },

  addPlanet() {
    this.planets.push(new Planet());
    this.setIndex(this.planets.length-1);
  },

  setIndex(index) {
    if(index >= 0 && index < this.planets.length) {
      this.index = index;

      document.getElementById("planet-name").value    = this.getCurrent().name;
      document.getElementById("planet-mass").value    = this.getCurrent().mass;
      document.getElementById("planet-radius").value  = this.getCurrent().radius;
      document.getElementById("planet-typeselector").value = this.getCurrent().planetTypeIndex;

      this.updateView();
    }
  },

  invalidateFields() {
    invalidate("planet");
  },

  updateView() {
    this.updateList();
    this.updateSelectors();

    var planet = this.getCurrent();
    document.getElementById("planet-gravity").innerHTML         = planet.getGravity() + " G🜨";
    document.getElementById("planet-density").innerHTML         = planet.getDensity() + " ρ🜨";
    document.getElementById("planet-circumference").innerHTML   = planet.getCircumference() + " C🜨";
    document.getElementById("planet-area").innerHTML            = planet.getSurfaceArea()+" A🜨";
    document.getElementById("planet-volume").innerHTML          = planet.getVolume()+" V🜨";
    document.getElementById("planet-escape-velocity").innerHTML = planet.getEscapeVelocity()+" ve🜨";
    document.getElementById("planet-habitability").innerHTML    = planet.getHabitability();

    var compText = "";
    for(var [key,value] of planet.getMakeup()) {
      compText+= key+ ": "+(round(value*100))+"%<br/>";
      if(key==="Good Will") {
        compText+="(Planet less dense than hydrogen)";
      }

      if(key==="Heavy Metal") {
        compText+="(Planet denser than iron)";
      }
    }

    document.getElementById("planet-composition").innerHTML     = compText;

    this.redraw();
  },

  updateList() {
    updateList("planetlist",this.planets,function(p){return p.name;},this.setIndex,this.index,planetEditor);
  },

  updateSelectors() {
    var planetSelector = document.getElementById("object-planetselector");
    var val = planetSelector.value;
    clearList(planetSelector);
    var i = 0;
    for (planet of this.planets) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(planet.name);
      node.appendChild(textnode);
      planetSelector.appendChild(node);
      i++;
    }
    planetSelector.value = val;


    var planetSelector = document.getElementById("system-planetselector");
    var val = planetSelector.value;
    clearList(planetSelector);
    var i = 0;
    for (planet of this.planets) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(planet.name);
      node.appendChild(textnode);
      planetSelector.appendChild(node);
      i++;
    }
    planetSelector.value = val;
  },

  redraw() {
    var planet = this.getCurrent();
    var earth = new Planet("Earth",1,1);
    var earthComposition = earth.getMakeup();
    var planetComposition = planet.getMakeup();

    var c = document.getElementById("planet-canvas");
    var ctx = c.getContext("2d");
    var canvasSize = c.width

    ;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    var rEarth =  canvasSize/8;
    var xEarth =  rEarth+10;
    var yEarth =  canvasSize*2/3;
    this.drawPlanetComposition(xEarth,yEarth,rEarth,earthComposition,ctx);

    var rPlanet  = rEarth * planet.getRadius();
    var xPlanet  = xEarth+rEarth*2+20+rPlanet*0.5;
    var yPlanet  = yEarth+rEarth-rPlanet;
    this.drawPlanetComposition(xPlanet,yPlanet,rPlanet,planetComposition,ctx);

    //Text
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font="16px open sans";
    var xEarthText = Math.max(0,xEarth-ctx.measureText(earth.name).width/2);
    ctx.fillText(earth.name,xEarthText,canvasSize*8/9);
    ctx.stroke();

    var lModify= ctx.measureText(planet.name).width/2;
    var xText  = Math.min(xPlanet-lModify,canvasSize-ctx.measureText(planet.name).width);
    ctx.fillText(planet.name,xText,canvasSize*8/9);
    ctx.stroke();
  },

  drawPlanetComposition(x, y, r, composition, ctx) {
    var angle = 0;
    for (var [key, value] of composition) {
      ctx.beginPath();
      var newAngle = angle+value;
      ctx.moveTo(x,y);
      ctx.arc(x,y,r,angle*2*Math.PI, newAngle*2*Math.PI);
      ctx.lineTo(x,y);
      angle = newAngle;
      ctx.fillStyle = Composition.mapMaterialToColor(key);
      ctx.fill();
      ctx.stroke();
    }
  },

  updateName(nameText) {
    this.getCurrent().name = nameText;
    this.updateView();
  },

  updateMass(massText) {
    var mass = parseFloat(massText);
    if(isNaN(mass) || mass < 0.1 || mass > 4000) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().mass = mass;
    this.updateView();
  },

  updateRadius(radiusText) {
    var radius = parseFloat(radiusText);
    if(isNaN(radius) || radius <0.5 || radius >20) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().radius = radius;
    this.updateView();
  },

  updatePlanetType(type) {
    if(isNaN(type) || type < 0 || type >= planetTypes.length) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().planetTypeIndex = type;
    this.updateView();
  }
}

var planetTypes = [
    {
      name: "Terrestrial Planet",
      getAnalysis(star, object,name) {
        var out = systemLimitTest(star,object, name);
        out = out.concat(eccentricityTest(0, 0.1, object.eccentricity, name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));


        return out;
      }
    },
    {
      name: "Habitable Planet",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(eccentricityTest(0,0.2,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));
        out = out.concat(habitabilityTest(star,object,name));
        return out;
      }
    },
    {
      name: "Classical Gasgiant",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(axisTest(star,object, false,true,false,false, name));
        out = out.concat(eccentricityTest(0.001,0.099,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));
        return out;
      }
    },
    {
      name: "Super Gasgiant",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(axisTest(star,object, true,false,false,false, name));
        out = out.concat(eccentricityTest(0.001,0.099,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));
        return out;
      }
    },
    {
      name: "Hot Gasgiant",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(axisTest(star,object, true,false,true,false, name));
        out = out.concat(eccentricityTest(0.001,0.099,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 10,true,name));
        return out;
      }
    },
    {
      name: "Eccentric Gasgiant",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(eccentricityTest(0.1,1,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));
        return out;
      }
    },
    {
      name: "Gas Dwarves",
      getAnalysis(star, object,name) {
        var out= systemLimitTest(star,object, name);
        out = out.concat(axisTest(star,object, false,false,false,true, name));
        out = out.concat(eccentricityTest(0.001,0.099,object.eccentricity,name));
        out = out.concat(retrogradeTest(object.inclination,name));
        out = out.concat(inclinationTest(object.inclination, 5,false,name));
        return out;
      }
    }
];

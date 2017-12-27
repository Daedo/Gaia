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
    var earthGravity = this.mass / this.radius/this.radius;
    return round(units.earthGravity.convertToUnitless(earthGravity));
  }

  getDensity() {
    var earthDensity = this.mass / this.radius/this.radius/this.radius;
    return round(units.earthDensity.convertToUnitless(earthDensity));
  }

  getCircumference() {
    var earthRadius = this.radius;
    return round(units.earthCircumference.convertToUnitless(earthRadius));
  }

  getSurfaceArea() {
    var earthArea = this.radius*this.radius
    return round(units.earthSurfaceArea.convertToUnitless(earthArea));
  }

  getVolume() {
    var earthVolume = this.radius*this.radius*this.radius
    return round(units.earthVolume.convertToUnitless(earthVolume));
  }

  getEscapeVelocity() {
    var earthEscapeVelocity = Math.sqrt(this.mass/this.radius)
    return round(units.earthEscapeVelocity.convertToUnitless(earthEscapeVelocity));
  }

  getMakeup() {
    return interpolator.interpolate(this.mass,this.radius);
  }

  //XXX Update Units
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
    return Unit.transform(units.earthRadius,units.lunarDistance,earthRad);
  }

  getPlanetRadiusInLunarRadii() {
    return Unit.transform(units.earthRadius,units.lunarRadius, this.radius);
  }

  getPlanetMassInLunarMasses() {
    return Unit.transform(units.earthMass,units.lunarMass, this.mass);
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

      var currentPlanet = this.getCurrent();
      tabPlanet.name.value = currentPlanet.name;
      var unitlessMass = units.earthMass.convertToUnitless(this.getCurrent().mass);
      tabPlanet.mass.setUnitlessValue(unitlessMass);
      var unitlessRadius = units.earthRadius.convertToUnitless(this.getCurrent().radius);
      tabPlanet.radius.setUnitlessValue(unitlessRadius);
      tabPlanet.typeSelector.value = currentPlanet.planetTypeIndex;

      this.updateView();
    }
  },

  invalidateFields() {
    invalidate(tabPlanet);
  },

  updateView() {
    this.updateList();
    this.updateSelectors();

    var planet = this.getCurrent();
    tabPlanet.gravity.setUnitlessValue(planet.getGravity());
    tabPlanet.density.setUnitlessValue(planet.getDensity());
    tabPlanet.circumference.setUnitlessValue(planet.getCircumference());
    tabPlanet.area.setUnitlessValue(planet.getSurfaceArea());
    tabPlanet.volume.setUnitlessValue(planet.getVolume());
    tabPlanet.escapeVelocity.setUnitlessValue(planet.getEscapeVelocity());
    tabPlanet.habitability.innerHTML   = planet.getHabitability();

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

    tabPlanet.composition.innerHTML     = compText;

    this.redraw();
  },

  updateList() {
    updateList("planetlist",this.planets,function(p){return p.name;},this.setIndex,this.index,planetEditor);
  },

  updateSelectors() {
    var planetSelector = tabOrbit.planetSelector;
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

function inclinationTest(value, maxDiffFromEccliptic,allowRetrograde,name) {
  var out = [];

  var acceptableInclination = ((value <= maxDiffFromEccliptic) || (allowRetrograde && (180-value)<= maxDiffFromEccliptic));
  if(!acceptableInclination) {
    out.push("The inclination of "+name+" is unusually high.");
  }

  if(value>90 && !allowRetrograde ) {
    out.push("The retrograde orbit of "+ name +" might be unstable.");
  }

  if(value==90) {
    out.push(name+ " has a polar orbit.");
  }

  if(value==0 || value == 180) {
    out.push(name+ " has an equatorial orbit.");
  }
  return out;
}

function retrogradeTest(value,name) {
  if(value>90) {
    return [name+ " spins in a retrograde direction."];
  }
  return [];
}

function habitabilityTest(star, object, name) {
  if(star.getHabitableInner() > object.getPeriapsis() || star.getHabitableOuter() < object.getApoapsis()) {
    return [name+ "'s orbit peeks out of the habitable zone."];
  }
  return [];
}

function axisTest(star, object, innerSystem, closeToFrostLine, closeToStar, closeToEdge, name) {
  var out = [];
  var frostlineMin = units.au.convertToUnit(star.getFrostline())+1;
  var frostlineAvg = units.au.convertToUnit(star.getFrostline())+1.2
  var frostlineMax = units.au.convertToUnit(star.getFrostline())+1.2;
  var outer = units.au.convertToUnit(star.getOuterLimit());
  var axis = object.semiMajorAxis;

  if(closeToStar) {
    if(axis < 0.04) {
      out.push(name+ " is too close to the star");
    }
    if(axis > 0.5) {
      out.push("For a hot object "+name+" is not very hot.")
    }
  }

  if(innerSystem) {
    if(axis > frostlineMax) {
      out.push(name+ " is unsually far away from the inner system.");
    }
  } else {
    if(axis < frostlineMin) {
      out.push(name+ " is unsually close to the inner system.");
    }
  }

  if(closeToFrostLine) {
    var relFL = axis/frostlineAvg;
    if(relFL <0.9 || relFL >1.1) {
      out.push(name+ " is unsually far away from the frostline.");
    }
  }

  if(closeToEdge) {
    var relOut = axis / outer;
    if(relOut < 0.9 || relOut > 1.1) {
      out.push(name+ " is unsually far away from the outer limit of the system.");
    }
  }
  return out;
}

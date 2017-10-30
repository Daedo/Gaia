/*
General Overview:
For each tab the relevant classes are grouped together.
Any edits will trigger an update method in the relevant "...Editor" object.
Drawing and updating will also be handled there with the exception of the
analyses that have their own block of methods.
Below the editor code are some helper methods and the code for dealing with
saving, loading, exporting, initialization and some code for the menu.

All Units are usually relative to the solar system equivalent.
i.e. Stars are relative to the sun, Planets are relative to earth, Moons are relative to the moon.
Any differing method is named accordingly.

The editor objects are all very similar:
They have one or two set...Index methods that are triggered when the user changes the selected
object. They have an updateView method to update all non-input fields and an invalidateFields
method to delete output if the input isn't valid.
The updateList(s) methods reload the object selection lists (e.g if the name of a planet has changed).
The same goes for the updateSelector(s) methods.
The redraw methods update the canvas.
Most Functions that start in update... are callbacks for the different input fields/selectors.
*/

/* Class Definitions */
/* Star */
class Star {
  constructor(name,mass) {
    if(name === undefined) {
      name = "Stary McStarface";
    }

    if(mass === undefined) {
      mass = 1;
    }

    this.name = name;
    this.mass = mass;
  }

  setName(name) {
    this.name = name;
  }

  setMass(mass) {
    this.mass = mass;
  }

  getLuminosity() {
    return round(Math.pow(this.mass,3));
  }

  getRadius() {
    return round(Math.pow(this.mass,0.74));
  }

  getTemperature() {
    return round(Math.pow(this.mass,0.505));
  }

  getLifetime() {
    return round(Math.pow(this.mass,-2.5));
  }

  getHabitableInner() {
    return round(Math.pow(this.mass,3/2)*0.95);
  }

  getHabitableOuter() {
    return round(Math.pow(this.mass,3/2)*1.37);
  }

  getClass() {
    if(this.mass >=16) {
      return "O";
    }
    if(this.mass >=2.1) {
      return "B";
    }
    if(this.mass >=1.4) {
      return "A";
    }
    if(this.mass >=1.04) {
      return "F";
    }
    if(this.mass >=0.8) {
      return "G";
    }
    if(this.mass >=0.45) {
      return "K";
    }
    if(this.mass >=0.08) {
      return "M";
    }
    return "Not a star."
  }

  getColor() {
    switch (this.getClass()) {
      case "O": return "#9bb0ff";
      case "B": return "#aabfff";
      case "A": return "#e4e8fc";
      case "F": return "#f9fae7";
      case "G": return "#fdf9b3";
      case "K": return "#ffd870";
      case "M": return "#fbc886";
      default:  return "#ffffff";

    }
  }

  getHabitability() {
    if(this.mass==1) {
      return "It's the sun... You've built the sun...";
    }

    if(this.mass>1.4) {
      return "The lifetime of the star might me to short for evolution.<br/>Star gives of high amounths of UV radiation.";
    }
    if(this.mass<0.6) {
      return "The habitable zone is too close to the star.<br/>Solar activity will be a problem.";
    }
    return "Ideal for conditions for life in the habitable zone.";
  }

  //Orbit Functions
  getFrostline() {
    return round(4.85*Math.sqrt(Math.pow(this.mass,3)));
  }

  getInnerLimit() {
    return round(0.1*this.mass);
  }

  getOuterLimit() {
    return round(40*this.mass);
  }
}

var starEditor =  {
  index : 0,
  stars : [new Star("Sol")],

  getCurrent() {
    return this.getStar(this.index);
  },

  getStar(index) {
    return this.stars[index];
  },

  getStarcount() {
    return this.stars.length;
  },

  getStarlist() {
    return this.stars;
  },

  deleteStar() {
    if(this.stars.length <= 1) {
      return;
    }

    removeElement(this.stars,this.index);

    for (orbit of orbitEditor.orbits) {
      if(orbit.starIndex == this.index) {
        orbit.starIndex = 0;
      }

      if(orbit.starIndex > this.index) {
        orbit.starIndex-=1;
      }
    }

    this.setIndex(0);
  },

  addStar() {
    this.stars.push(new Star());
    this.setIndex(this.stars.length-1);
  },

  setIndex(index) {
    if(index >= 0 && index < this.stars.length) {
      this.index = index;

      document.getElementById("star name").value = this.getCurrent().name;
      document.getElementById("star mass").value = this.getCurrent().mass;

      this.updateView();
    }
  },

  invalidateFields() {
    invalidate("star");
    document.getElementById("star class").innerHTML = "Not a star.";
  },

  updateView() {
    this.updateList();
    this.updateSelector();

    var star = this.getCurrent();
    document.getElementById("star luminosity").innerHTML      = star.getLuminosity()+" L☉";
    document.getElementById("star radius").innerHTML          = star.getRadius()+" R☉";
    document.getElementById("star temperature").innerHTML     = star.getTemperature()+" T☉";
    document.getElementById("star lifetime").innerHTML        = star.getLifetime()+" A☉";
    document.getElementById("star habitable inner").innerHTML = star.getHabitableInner()+" AU";
    document.getElementById("star habitable outer").innerHTML = star.getHabitableOuter()+" AU";
    document.getElementById("star class").innerHTML           = star.getClass();
    document.getElementById("star habitability").innerHTML    = star.getHabitability();

    this.redraw();
  },

  updateList() {
    updateList("starlist",this.stars,function(s){return s.name;},starEditor.setIndex,this.index,starEditor);
  },

  updateSelector() {
    var selector = document.getElementById("orbit starselector");
    var val = selector.value;
    clearList(selector);
    var i = 0;
    for (star of this.stars) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(star.name);
      node.appendChild(textnode);
      selector.appendChild(node);
      i++;
    }
    selector.value = val;
  },

  redraw() {
    var star = this.getCurrent();
    var sun = new Star("Sun",1);

    var c = document.getElementById("star canvas");
    var ctx = c.getContext("2d");

    var canvasSize = c.width;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.beginPath();
    var rSun =  canvasSize/8;
    var xSun =  rSun+10;
    var ySun =  canvasSize*2/3;
    ctx.arc(xSun,ySun,rSun,0,2*Math.PI);
    ctx.fillStyle = sun.getColor();
    ctx.fill();
    ctx.stroke();

    var rStar  = rSun * star.getRadius();
    var xStar  = xSun+rSun+40+rStar*0.5;
    var yStar  = ySun+rSun-rStar;

    ctx.beginPath();
    ctx.arc(xStar,yStar,rStar,0,2*Math.PI);
    ctx.fillStyle = star.getColor();
    ctx.fill();
    ctx.stroke();

    //Text
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font="16px open sans";
    var xSunText = Math.max (xSun - ctx.measureText(sun.name).width/2,0);
    ctx.fillText("Sun",xSunText,canvasSize*8/9);
    ctx.stroke();

    var lModify= ctx.measureText(star.name).width/2;
    var xText  = Math.min(xStar-lModify,canvasSize-ctx.measureText(star.name).width);
    ctx.fillText(star.name,xText,canvasSize*8/9);
    ctx.stroke();
  },

  updateName(nameText) {
    this.getCurrent().name = nameText;
    this.updateView();
  },

  updateMass(massText) {
    var mass = parseFloat(massText);
    if(isNaN(mass) || mass < 0.08) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().mass = mass;
    this.updateView();
  }
}

/* Planet */
class Planet {
  constructor(name, mass, radius) {
    if( name === undefined) {
      name = "Planet McPlanetface";
    }

    if(mass === undefined) {
      mass = 1;
    }

    if(radius === undefined) {
      radius = 1;
    }

    this.name = name;
    this.mass = mass;
    this.radius = radius;
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
}

//Classes for interpolation of the planetdata.js data.
class DataRow {
  constructor(xData,yData) {
    this.xData = xData;
    this.yData = yData;
  }

  interpolate(x) {
    if(x<this.xData[0]) {
      /*var x0 = this.xData[0];
      var y0 = this.yData[0];
      var x1 = this.xData[1];
      var y1 = this.yData[1];
      var x2 = this.xData[2];
      var y2 = this.yData[2];
      var k0 = (y0-y1)/(x0-x1);
      var k1 = (y1-y2)/(x1-x2);

      var t = (x-x0)/(x1-x0);
      var a = k0*(x1-x0)-(y1-y0);
      var b = -k1*(x1-x0)+(y1-y0);
      var q = (1-t)*y0 + t*y1 + t*(1-t)*(a*(1-t) + b*t);
      console.log(q);*/

      //Linear Interpolation
      var x0 = this.xData[0];
      var y0 = this.yData[0];
      var x1 = this.xData[1];
      var y1 = this.yData[1];

      var delta = (y0-y1)/(x0-x1);
      var n = y0 - delta * x0;

      console.log(delta*x + n);

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

      document.getElementById("planet name").value    = this.getCurrent().name;
      document.getElementById("planet mass").value    = this.getCurrent().mass;
      document.getElementById("planet radius").value  = this.getCurrent().radius;

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
    document.getElementById("planet gravity").innerHTML         = planet.getGravity() + " G🜨";
    document.getElementById("planet density").innerHTML         = planet.getDensity() + " ρ🜨";
    document.getElementById("planet circumference").innerHTML   = planet.getCircumference() + " C🜨";
    document.getElementById("planet area").innerHTML            = planet.getSurfaceArea()+" A🜨";
    document.getElementById("planet volume").innerHTML          = planet.getVolume()+" V🜨";
    document.getElementById("planet escape velocity").innerHTML = planet.getEscapeVelocity()+" ve🜨";

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

    document.getElementById("planet composition").innerHTML     = compText;

    this.redraw();
  },

  updateList() {
    updateList("planetlist",this.planets,function(p){return p.name;},this.setIndex,this.index,planetEditor);
  },

  updateSelectors() {
    var planetSelector = document.getElementById("object planetselector");
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


    var planetSelector = document.getElementById("system planetselector");
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

    var c = document.getElementById("planet canvas");
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
    if(isNaN(radius) || radius <0.5 || radius >20 ) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().radius = radius;
    this.updateView();
  }
}

/* Orbit */
class Orbit {
  constructor(starIndex) {
    if(starIndex === undefined) {
      starIndex = 0;
    }

    this.starIndex = starIndex;
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(index) {
    this.objects.splice(index,1);
  }
}

class OrbitObject {
  constructor(planetIndex,objectTypeIndex,semiMajorAxis,eccentricity,inclination,longitudeOfTheAscendingNode,argumentOfPeriapsis) {
    if(planetIndex === undefined) {
      planetIndex = 0;
    }

    if(objectTypeIndex === undefined) {
        objectTypeIndex = 0;
    }

    if(semiMajorAxis === undefined) {
      semiMajorAxis = 1;
    }

    if(eccentricity === undefined) {
      eccentricity = 0;
    }

    if(inclination === undefined) {
      inclination = 0;
    }

    if(longitudeOfTheAscendingNode === undefined) {
      longitudeOfTheAscendingNode = 0;
    }

    if(argumentOfPeriapsis === undefined) {
      argumentOfPeriapsis = 0;
    }

    this.planetIndex=planetIndex;
    this.objectTypeIndex = objectTypeIndex;
    this.semiMajorAxis = semiMajorAxis;
    this.eccentricity = eccentricity;
    this.inclination = inclination;
    this.longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
    this.argumentOfPeriapsis = argumentOfPeriapsis;
  }

  getSemiMinorAxis() {
    return round(this.semiMajorAxis*Math.sqrt(1 - (this.eccentricity*this.eccentricity)));
  }

  getPeriapsis() {
    return round(this.semiMajorAxis*(1 - this.eccentricity));
  }

  getApoapsis() {
    return round(this.semiMajorAxis*(1 + this.eccentricity));
  }

  getOrbitalPeriod(star) {
    return round(Math.sqrt(this.semiMajorAxis*this.semiMajorAxis*this.semiMajorAxis/star.mass));
  }

  getOrbitalVelocity(star) {
    return round(Math.sqrt(star.mass/this.semiMajorAxis));
  }
}

var orbitEditor = {
  index : 0,
  orbits : [new Orbit()],
  objectIndex : 0,

  getOrbitlist() {
    return this.orbits;
  },

  getOrbitcount() {
    return this.orbits.length;
  },

  getCurrent() {
    return this.getOrbit(this.index);
  },

  getOrbit(index) {
    return this.orbits[index];
  },

  getFirstNonemptyOrbit() {
    for (var i = 0; i < this.orbits.length; i++) {
      var len = this.orbits[i].objects.length;
      if(len>0) {
        return i;
      }
    }
    return -1;
  },

  deleteOrbit() {
    if(this.orbits.length <= 1) {
      return;
    }

    removeElement(this.orbits,this.index);

    var nonEmpty = this.getFirstNonemptyOrbit();
    if(nonEmpty == -1) {
      console.log("Empty");
    }

    for (system of moonEditor.systems) {
      if(system.orbitIndex == this.index) {
        system.orbitIndex = nonEmpty;
        system.objectIndex = 0;
      }

      if(system.orbitIndex > this.index) {
        system.orbitIndex-=1;
      }
    }

    this.setIndex(0);
  },

  addOrbit() {
    this.orbits.push(new Orbit());
    this.setIndex(this.orbits.length-1);
  },

  setIndex(index) {
    if(index >= 0 && index < this.orbits.length) {
      this.index = index;
      this.setObjectIndex(0);
      //Viewupdate in setObjectIndex
    }
  },

  invalidateFields() {
    invalidate("orbit");
  },

  updateView() {
    this.updateLists();
    this.updateSelector();

    var centerStar = starEditor.getStar(this.getCurrent().starIndex);
    document.getElementById("orbit starselector").value = this.getCurrent().starIndex;
    document.getElementById("orbit boundaries").innerHTML = centerStar.getInnerLimit()+" AU - "+centerStar.getOuterLimit()+" AU";
    document.getElementById("orbit habitable").innerHTML  = centerStar.getHabitableInner()+" AU - "+centerStar.getHabitableOuter()+" AU";
    document.getElementById("orbit frostline").innerHTML  = centerStar.getFrostline()+" AU";

    updateOrbitAnalysis();

    if(this.objectIndex != -1) {
      var currentOrbitObject = this.getCurrentObject();
      document.getElementById("object planetselector").value        = currentOrbitObject.planetIndex;
      document.getElementById("object semi minor axis").innerHTML   = currentOrbitObject.getSemiMinorAxis()+" AU";
      document.getElementById("object periapsis").innerHTML         = currentOrbitObject.getPeriapsis()+" AU";
      document.getElementById("object apoapsis").innerHTML          = currentOrbitObject.getApoapsis()+" AU";
      document.getElementById("object orbital period").innerHTML    = currentOrbitObject.getOrbitalPeriod(starEditor.getCurrent())+ " P🜨";
      document.getElementById("object orbital velocity").innerHTML  = currentOrbitObject.getOrbitalVelocity(starEditor.getCurrent())+" Vo🜨";
    }

    var trs = document.getElementsByClassName("objectTR");
    for (tr of trs) {
      if(this.objectIndex == -1) {
        //Hide Elements
        tr.style.display = "none";
      } else {
        //Unhide Elements
        tr.style.display = "table-row";
      }
    }

    this.redraw();
  },

  updateLists() {
    var oFunc = function(o){return "Orbit \""+ starEditor.getStar(o.starIndex).name+"\"";}
    updateList("orbitlist",this.orbits,oFunc,this.setIndex,this.index,orbitEditor);

    var oFuncB = function(o){
      return planetEditor.getPlanet(o.planetIndex).name;
    };
    var objects = this.getCurrentObjectlist();
    updateList("orbitobjectlist",objects,oFuncB,this.setObjectIndex,this.objectIndex,orbitEditor);
  },

  updateSelector() {
    var gotElement = false;
    planetSelector = document.getElementById("system planetselector");
    var val = planetSelector.value;
    clearList(planetSelector);
    var i = 0;
    for (orbit of this.orbits) {
      var starName = starEditor.getStar(orbit.starIndex).name;

      var j = 0;
      for(planet of orbit.objects) {
        var planetName = planetEditor.getPlanet(planet.planetIndex).name;
        var node = document.createElement("option");
        node.value = i+","+j;
        var textnode = document.createTextNode(starName+" - "+planetName);
        node.appendChild(textnode);
        planetSelector.appendChild(node);
        j++
        gotElement = true;
      }
      i++;
    }
    planetSelector.value = val;

    if(gotElement) {
      //Activate Tab
      activateTab("moon");
    } else {
      //Deactivate Tab
      deactivateTab("moon");
    }
  },

  redraw() {
    var c = document.getElementById("orbit canvas");
    var ctx = c.getContext("2d");
    var canvasSize = c.width;
    var trueSize   = c.scrollWidth;
    ctx.clearRect(0, 0, trueSize, trueSize);
    ctx.lineWidth = 1;
    var currentOrbit = this.getCurrent();
    var centerStar   = starEditor.getStar(currentOrbit.starIndex);

    var rMax = canvasSize/2;
    var scaleFactor = rMax / centerStar.getOuterLimit();
    var cen = canvasSize/2;
    var cCount = 50;

    var j=0;
    ctx.fillRect(cen-1, cen-1, 2, 2);

    for(obj of this.getCurrentObjectlist()) {
      var a = obj.semiMajorAxis;
      var b = obj.getSemiMinorAxis();
      var e = obj.eccentricity;

      var roll  = obj.argumentOfPeriapsis * Math.PI / 180;
      var pitch = obj.inclination * Math.PI / 180;
      var jaw   = obj.longitudeOfTheAscendingNode * Math.PI / 180;
      var zMin = 0;
      var zMax = 0;

      for(var i=0; i<cCount; i++) {
        var p = getEllipsePoint(a,b,e,2*Math.PI/cCount*i);
        p = rotatePoint(p,roll,pitch,jaw);

        if(i==0) {
          zMin = p[2];
          zMax = p[2];
        }

        if(p[2] > zMax) {
          zMax = p[2];
        }

        if(p[2] < zMin) {
          zMin = p[2];
        }
      }

      if(zMin == 0 && zMax == 0) {
        var zMin = -1;
        var zMax = 0.0;
      }

      if(zMin>=zMax) {
        zMax = Math.abs(zMax);
        zMin = (-1) * zMax;
      }

      for (var i = 0; i < cCount; i++) {
        var col = "white";

        if(j==this.objectIndex) {
          if(i==0) {
            //Periapsis
            col = "blue";
          } else if(i == Math.floor(cCount/2)){
            //Apoapsis
            col = "red"
          } else {
            //Default
            col = "yellow";
          }
        }
        ctx.strokeStyle = col;
        ctx.fillStyle   = col;
        pt = getEllipsePoint(a,b,e,2*Math.PI/50*i);
        pt = rotatePoint(pt,roll,pitch,jaw);

        var cX = cen+ pt[0]*scaleFactor;
        var cY = cen+ pt[1]*scaleFactor;
        var sc = (pt[2]-zMin)/(zMax-zMin);
        var r = (0.01+sc)*2;

        ctx.beginPath();
        ctx.arc(cX,cY,r,0,2*Math.PI);
        ctx.stroke();
        ctx.fill()
      }
      j++;
    }

    ctx.strokeStyle = "green";

    ctx.beginPath();
    ctx.arc(cen,cen,scaleFactor*centerStar.getHabitableInner(),0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cen,cen,scaleFactor*centerStar.getHabitableOuter(),0,2*Math.PI);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font="16px open sans";

    ctx.fillText("Circlesize = Z-Axis",10,20);
    ctx.fillText("Yellow = Selected Planet",10,40);
    ctx.fillText("Blue = Periapsis",10,60);
    ctx.fillText("Red = Apoapsis",10,80);
    ctx.fillText("Green = Habitable Zone",10,100);
  },

  updateCenterStar(starIndex) {
    if(isNaN(starIndex) || starIndex < 0 || starIndex >= starEditor.getStarcount()) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().starIndex = starIndex;
    this.updateView();
  },

  //Objects
  getObject(orbit,object) {
    return this.getOrbit(orbit).objects[object];
  },

  getCurrentObjectlist() {
    return this.getCurrent().objects;
  },

  getObjectcount(orbit) {
    return this.orbits[orbit].objects.length;
  },

  getCurrentObject() {
    return this.getCurrentObjectlist()[this.objectIndex];
  },

  addObject() {
    this.getCurrent().addObject(new OrbitObject());
    this.setObjectIndex(this.getCurrent().objects.length-1);
  },

  deleteObject() {
    if(this.objectIndex<0) {
      return;
    }

    this.getCurrent().removeObject(this.objectIndex);

    var nonEmpty = this.getFirstNonemptyOrbit();
    if(nonEmpty == -1) {
      console.log("Empty");
    }

    for (system of moonEditor.systems) {
      if(system.orbitIndex == this.index) {
        if(system.orbitIndex > this.index) {
          system.orbitIndex-=1;
        }

        if(system.objectIndex == this.index) {
          if(this.getObjectcount(this.index) == 0) {
            system.orbitIndex = nonEmpty;
            system.objectIndex = 0;
          } else {
            system.objectIndex = 0;
          }
        }
      }
    }



    this.setObjectIndex(0);
  },

  invalidateObjectFields() {
    invalidate("object");
  },

  setObjectIndex(index) {
    var len = this.getCurrentObjectlist().length;

    if(index >= 0 && (index < len||len==0)) {
      if(len==0) {
        this.objectIndex = -1;
      } else {
        this.objectIndex = index;

        var currentOrbitObject = this.getCurrentObject();

        document.getElementById("object typeselector").value                    = currentOrbitObject.objectTypeIndex;
        document.getElementById("object semi major axis").value                 = currentOrbitObject.semiMajorAxis;
        document.getElementById("object eccentricity").value                    = currentOrbitObject.eccentricity;
        document.getElementById("object inclination").value                     = currentOrbitObject.inclination;
        document.getElementById("object longitude of the ascending node").value = currentOrbitObject.longitudeOfTheAscendingNode;
        document.getElementById("object argument of periapsis").value           = currentOrbitObject.argumentOfPeriapsis;
      }

      this.updateView();
    }
  },

  updatePlanetIndex(planetIndex) {
    if(isNaN(planetIndex) || planetIndex < 0 || planetIndex >= planetEditor.getPlanetcount()) {
      this.invalidateFields();
      return;
    }
    this.getCurrentObject().planetIndex = planetIndex;
    this.updateView();
  },

  updateObjectType(type) {
    if(isNaN(type) || type < 0 || type >= orbitTypes.length) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().objectTypeIndex = type;
    this.updateView();
  },

  updateSemiMajorAxis(smaText) {
    var semiMajorAxis = parseFloat(smaText);
    if(isNaN(semiMajorAxis) || semiMajorAxis<=0) {
      this.invalidateObjectFields();
      return;
    }
    this.getCurrentObject().semiMajorAxis = semiMajorAxis;
    this.updateView();
  },

  updateEccentricity(eccText) {
    var eccentricity = parseFloat(eccText);
    if(isNaN(eccentricity) || eccentricity<0 || eccentricity>1) {
      this.invalidateObjectFields();
      return;
    }
    this.getCurrentObject().eccentricity = eccentricity;
    this.updateView();
  },

  updateInclination(incText) {
    var inclination = parseFloat(incText);
    if(isNaN(inclination) || inclination<0 || inclination>180) {
      this.invalidateObjectFields();
      return;
    }
    this.getCurrentObject().inclination = inclination;
    this.updateView();
  },

  updateLongitudeOfTheAscendingNode(lotaText) {
    var longitudeOfTheAscendingNode = parseFloat(lotaText);
    if(isNaN(longitudeOfTheAscendingNode) || longitudeOfTheAscendingNode<0 || longitudeOfTheAscendingNode>=360) {
      this.invalidateObjectFields();
      return;
    }
    this.getCurrentObject().longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
    this.updateView();
  },

  updateArgumentOfPeriapsis(aopText) {
    var argumentOfPeriapsis = parseFloat(aopText);
    if(isNaN(argumentOfPeriapsis) || argumentOfPeriapsis<0 || argumentOfPeriapsis>=360) {
      this.invalidateObjectFields();
      return;
    }
    this.getCurrentObject().argumentOfPeriapsis = argumentOfPeriapsis;
    this.updateView();
  }

}

var orbitTypes = [
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

/* Orbit analysis*/
function updateOrbitAnalysis() {
  var list = document.getElementById("orbit analysis");
  clearList(list);

  var data = getOrbitAnalysisData();
  for (var elemText of data) {
    var node = document.createElement("ul");
    var textnode = document.createTextNode(elemText);
    node.appendChild(textnode);
    list.appendChild(node);
  }
}

function getOrbitAnalysisData() {
  var currentOrbit = orbitEditor.getCurrent();
  var currentOrbitObjects = currentOrbit.objects;
  var centerStar   = starEditor.getStar(currentOrbit.starIndex);
  if(currentOrbitObjects.length==0) {
    return ["Your orbit is kinda... empty..."];
  }
  var out = [];
  out = out.concat(orbitInclinationIdicator());
  out = out.concat(orbitEccentricityIndicator());
  out = out.concat(orbitAxisIndicator());

  for (var object of currentOrbitObjects) {
    var type = orbitTypes[object.objectTypeIndex];
    var name = planetEditor.getPlanet(object.planetIndex).name;
    out = out.concat(type.getAnalysis(centerStar, object,name));
  }

  return out;
}

function orbitAxisIndicator() {
  var out = [];
  var currentOrbitObjects = orbitEditor.getCurrentObjectlist();

  var objectsOrdered = currentOrbitObjects.slice(0).sort(function(a, b){return a.semiMajorAxis-b.semiMajorAxis});

  for (var i = 0; i < objectsOrdered.length-1; i++) {
    var current = objectsOrdered[i];
    var next    = objectsOrdered[i+1];
    var relation= next.semiMajorAxis/current.semiMajorAxis;
    var diff = next.semiMajorAxis - current.semiMajorAxis;

    var cName = planetEditor.getPlanet(current.planetIndex).name;
    var nName = planetEditor.getPlanet(next.planetIndex).name;
    if(relation > 2) {
      out.push(cName +" and "+nName+" are very far apart. Their orbit might become unstable.");
    }
    if(relation < 1.4 || diff < 0.15) {
      out.push(cName +" and "+nName+" are very close together. Their orbit might become unstable.");
    }
  }
  if(out.length==0) {
    out = ["The distances between the planets look good."];
  }

  return out;

}

function orbitEccentricityIndicator() {
  var currentOrbitObjects = orbitEditor.getCurrentObjectlist();
  var N = currentOrbitObjects.length;
  if(N<2) {
    return [];
  }
  var expectedValue = round(0.584*Math.pow(N,-1.2));

  var sum = 0;
  for (var object of currentOrbitObjects) {
    sum+=object.eccentricity;
  }
  var avg = round(sum/N);
  return ["The average eccentricity of the system is "+avg+". We would expect around "+expectedValue+"."];
}

function orbitInclinationIdicator() {
  var currentOrbitObjects = orbitEditor.getCurrentObjectlist();
  var N = currentOrbitObjects.length;
  if(N<1) {
    return [];
  }
  var expectedValue = 2;

  var sum = 0;
  for (var object of currentOrbitObjects) {
    sum+=object.inclination;
  }
  var avg = round(sum/N);
  return ["The average inclination of the system is "+avg+"°. We would expect around "+expectedValue+"°."];
}

function systemLimitTest(star, object, name) {
  out = [];
  if(star.getOuterLimit() < object.getApoapsis()) {
    out.push("The orbit of "+name+" leaves the star system.");
  }

  if(star.getInnerLimit() > object.getPeriapsis()) {
    out.push("The orbit of "+name+" gets dangerously close to the star.");
  }
  return out;
}

function eccentricityTest(min, max, value, name) {
  var out = []
  if(value < min) {
    out.push(name+ " has an orbit that is not very eccentric for its type.");
  }
  if(value > max) {
    out.push(name+ " has a highly eccentric orbit for its type.");
  }

  if(value > 0.2) {
    out.push(name+" is so eccentric, that it threatens the stability of the system.");
  }
  return out;
}

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
    return [name+ " orbit peeks out of the habitable zone."];
  }
  return [];
}

function axisTest(star, object, innerSystem, closeToFrostLine, closeToStar, closeToEdge, name) {
  var out = [];
  var frostlineMin = star.getFrostline()+1;
  var frostlineAvg = star.getFrostline()+1.2
  var frostlineMax = star.getFrostline()+1.2;
  var outer = star.getOuterLimit();
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

/* Moon */
class MoonSystem {
  constructor(orbitIndex, objectIndex) {
    if(orbitIndex === undefined) {
      //Find nonempty orbit
      orbitIndex = orbitEditor.getFirstNonemptyOrbit();
    }

    if(objectIndex === undefined) {
      objectIndex = 0;
    }

    this.orbitIndex = orbitIndex;
    this.objectIndex = objectIndex;
    this.moons = [];
  }

  addMoon(moon) {
    this.moons.push(moon);
  }

  removeMoon(index) {
    this.moons.splice(index,1);
  }

  getCenterStar() {
    return starEditor.getStar(orbitEditor.getOrbit(this.orbitIndex).starIndex);
  }

  getCenterObject() {
    return orbitEditor.getObject(this.orbitIndex,this.objectIndex);
  }
};

class Moon {
  constructor(name, typeIndex, mass, radius, semiMajorAxis, eccentricity, inclination, longitudeOfTheAscendingNode, argumentOfPeriapsis) {
    if( name === undefined) {
      name = "Moony McMoonface";
    }
    this.name = name;

    if(typeIndex === undefined) {
      typeIndex = 0;
    }
    this.typeIndex = typeIndex;

    if(mass === undefined) {
      mass = 1;
    }
    this.mass = mass;

    if(radius === undefined) {
      radius = 1;
    }
    this.radius = radius;
    this.radius2 = radius;
    this.radius3 = radius;

    if(semiMajorAxis === undefined) {
      semiMajorAxis = 1;
    }
    this.semiMajorAxis = semiMajorAxis;

    if(eccentricity === undefined) {
      eccentricity = 0;
    }
    this.eccentricity = eccentricity;

    if(inclination === undefined) {
      inclination = 0;
    }
    this.inclination = inclination;

    if(longitudeOfTheAscendingNode === undefined) {
      longitudeOfTheAscendingNode = 0;
    }
    this.longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;

    if(argumentOfPeriapsis === undefined) {
      argumentOfPeriapsis = 0;
    }
    this.argumentOfPeriapsis = argumentOfPeriapsis;
  }

  getForm() {
    if(moonTypes[this.typeIndex].name === "Minor Moon") {
      var r = [this.radius,this.radius2,this.radius3];
      r.sort();

      if(r[0] == r[1] && r[1] == r[2]) {
          return "Sphere";
      }

      if(r[0] < r[1] && r[1] < r[2]) {
        return "Triaxial Spheroid";
      }

      if(this.radius == r[0]) {
        return "Prolate Shereoid";
      }
      return "Oblate Spheroid";

    } else {
      return "Sphere";
    }
  }

  getMakeup() {
    var trueDensity = this.getDensity()*3.344;
    var density = new Map([["Iron",7.87],["Silicate",3.25],["Water",0.93],["Helium",0.000179],["Hydrogen",0.0000899]])

    var varPoints = [
      new Map([["Iron",1]]),
      new Map([["Silicate",1]]),
      new Map([["Water",0.25],["Silicate",0.525],["Iron",0.225]]),
      new Map([["Water",0.45],["Silicate",0.485],["Iron",0.065]]),
      new Map([["Water",0.75],["Silicate",0.22],["Iron",0.03]]),
      new Map([["Water",1]]),
      new Map([["Hydrogen",0.75],["Helium",0.25]]),
      new Map([["Hydrogen",1]])
    ];

    var getDens = function(map) {
      var out = 0;
      for (var [name,val] of map.entries()) {
        out+= val * density.get(name);
      }
      return out;
    }

    var linInt = function(val1,val2,valx) {
      // val1 * x + val2* y  = valx
      // x + y = 1
      //--> x = (valx - val2)/(val1-val2)
      return (valx-val2)/(val1-val2)
    }

    if(trueDensity > getDens(varPoints[0])) {
      return new Map([["Heavy Metal",1]]);
    }

    for (var i = 0; i < varPoints.length-1; i++) {
      if(trueDensity >= getDens(varPoints[i+1])) {
        var d1 = getDens(varPoints[i])
        var d2 = getDens(varPoints[i+1])
        var p1 = linInt(d1,d2,trueDensity);
        var p2 = 1-p1;

        var c1 = new Composition();
        c1.compMap = varPoints[i]
        var c2 = new Composition();
        c2.compMap = varPoints[i+1]
        return Composition.getMergedComposition(c1,p1,c2,p2);
      }
    }

    return new Map([["Good Will",1]]);
  }

  getComposition() {
    var inter = this.getMakeup();
    var compText = "";
    for(var [key,value] of inter) {
      compText+= key+ ": "+(round(value*100))+"%<br/>";
      if(key==="Good Will") {
        compText+="(Moon less dense than hydrogen)";
      }

      if(key==="Heavy Metal") {
        compText+="(Moon denser than iron)";
      }
    }
    return compText;
  }

  getGravity() {
    return round(this.mass / this.radius/this.radius);
  }

  getDensity() {
    return round(this.getGravity()/this.radius);
  }

  getSemiMinorAxis() {
    return round(this.semiMajorAxis*Math.sqrt(1 - (this.eccentricity*this.eccentricity)));
  }

  getPeriapsis() {
    return round(this.semiMajorAxis*(1 - this.eccentricity));
  }

  getApoapsis() {
    return round(this.semiMajorAxis*(1 + this.eccentricity));
  }

  getOrbitalPeriod(planet) {
    var mP = planet.getPlanetMassInLunarMasses()
    return round(Math.sqrt(this.semiMajorAxis*this.semiMajorAxis*this.semiMajorAxis/mP)/0.11090536506409417);
  }

  getOrbitalVelocity(planet) {
    var mP = planet.getPlanetMassInLunarMasses()
    return round(Math.sqrt(mP/this.semiMajorAxis)/9.016696);
  }
};

var moonEditor = {
  index: 0,
  systems: [new MoonSystem()],
  moonIndex: 0,

  getCurrent() {
    return this.systems[this.index];
  },

  getSystemlist() {
    return this.systems;
  },

  setIndex(index) {
    var len = this.systems.length;
    if(index >= 0 && (index < len)) {
      this.index = index;
      this.setMoonIndex(0);
    }
  },

  addMoonSystem() {
    this.systems.push(new MoonSystem());
    this.setIndex(this.systems.length-1);
  },

  deleteMoonSystem() {
    if(this.systems.length<=1) {
      return;
    }
    removeElement(this.systems,this.index);
    this.setIndex(0);
  },

  invalidateFields() {
    invalidate("system");
  },

  updateView() {
    for (system of this.systems) {
      if(system.orbitIndex === -1) {
        var nonEmpty = orbitEditor.getFirstNonemptyOrbit();
        if(nonEmpty == -1) {
          console.log("Add an element to an orbit to start moonbuilding");
          return;
        }
        system.orbitIndex = nonEmpty;
        this.updateCenterPlanet(system.orbitIndex+",0");
        return;
      }
    }

    this.updateLists();
    var currentSystem = this.getCurrent();


    //TODO Update Selector
    orbitEditor.updateSelector();
    var value = this.getCurrent().orbitIndex+","+this.getCurrent().objectIndex;
    document.getElementById("system planetselector").value = value;


    var centerObject = currentSystem.getCenterObject();
    var centerStar   = currentSystem.getCenterStar()
    var centerPlanet = planetEditor.getPlanet(centerObject.planetIndex);
    document.getElementById("system hillsphere").innerHTML = centerPlanet.getHillSphereInner()+" Lunar Distances - "+centerPlanet.getHillSphereOuter(centerObject,centerStar)+" Lunar Distances";

    var trs = document.querySelectorAll(".moonTR, .minorMoonTR");
    for (tr of trs) {
      if(this.moonIndex == -1) {
        //Hide Elements
        tr.style.display = "none";
      } else {
        //Unhide Elements
        tr.style.display = "table-row";
      }
    }

    updateMoonAnalysis();

    if(this.moonIndex > -1) {
      var currentMoon = this.getCurrentMoon();

      var inp = document.getElementsByClassName("radInp");
      for (rad of inp) {
        if(rad.childNodes.length>=2) {
          rad.removeChild(rad.childNodes[1]);
        }
        var maxRad = centerPlanet.getPlanetRadiusInLunarRadii();
        var textnode = document.createTextNode(" less than "+maxRad+" R☾︎");
        rad.appendChild(textnode);
      }

      document.getElementById("moon form").innerHTML            = currentMoon.getForm();
      document.getElementById("moon density").innerHTML         = currentMoon.getDensity() + " ρ☾︎";
      document.getElementById("moon composition").innerHTML     = currentMoon.getComposition();
      document.getElementById("moon gravity").innerHTML         = currentMoon.getGravity() + " G☾︎";
      document.getElementById("moon semi minor axis").innerHTML = currentMoon.getSemiMinorAxis()+ " Lunar Distances";
      document.getElementById("moon periapsis").innerHTML       = currentMoon.getPeriapsis()+ " Lunar Distances";
      document.getElementById("moon apoapsis").innerHTML        = currentMoon.getApoapsis()+ " Lunar Distances";
      document.getElementById("moon orbital period").innerHTML  = currentMoon.getOrbitalPeriod(centerPlanet) + " P☾︎";
      document.getElementById("moon orbital velocity").innerHTML= currentMoon.getOrbitalVelocity(centerPlanet) + " V☾︎";

      var trs = document.querySelectorAll(".minorMoonTR");
      for (tr of trs) {
        if(moonTypes[currentMoon.typeIndex].name === "Minor Moon") {
          //Unhide Elements
          tr.style.display = "table-row";
        } else {
          //Hide Elements
          tr.style.display = "none";
        }
      }
    }

    this.redraw();
  },

  updateLists() {
    var sysFunc = function(s){
      var starName   = starEditor.getStar(orbitEditor.getOrbit(s.orbitIndex).starIndex).name;
      var planetName = planetEditor.getPlanet(orbitEditor.getObject(s.orbitIndex,s.objectIndex).planetIndex).name;
      return starName+" - "+planetName;
    }
    updateList("systemlist",this.systems,sysFunc,this.setIndex,this.index,moonEditor);

    var moonFunc = function(m){return m.name;};
    var moons = this.getCurrentMoonlist();
    updateList("moonlist",moons,moonFunc,this.setMoonIndex,this.moonIndex,moonEditor);
  },

  redraw() {
    var c = document.getElementById("moon canvas");
    var ctx = c.getContext("2d");
    var canvasSize = c.width;
    var trueSize   = c.scrollWidth;
    ctx.clearRect(0, 0, trueSize, trueSize);
    ctx.lineWidth = 1;
    var currentSystem = this.getCurrent();
    var centerStar    = currentSystem.getCenterStar()
    var centerObject  = currentSystem.getCenterObject();
    var centerPlanet  = planetEditor.getPlanet(centerObject.planetIndex);

    var rMax = canvasSize/2;
    var scaleFactor = rMax / centerPlanet.getHillSphereOuter(centerObject,centerStar);
    var cen = canvasSize/2;
    var cCount = 50;

    ctx.fillRect(cen-1, cen-1, 2, 2);

    var j=0;

    for(obj of this.getCurrentMoonlist()) {
      var a = obj.semiMajorAxis;
      var b = obj.getSemiMinorAxis();
      var e = obj.eccentricity;

      var roll  = obj.argumentOfPeriapsis * Math.PI / 180;
      var pitch = obj.inclination * Math.PI / 180;
      var jaw   = obj.longitudeOfTheAscendingNode * Math.PI / 180;
      var zMin = 0;
      var zMax = 0;

      for(var i=0; i<cCount; i++) {
        var p = getEllipsePoint(a,b,e,2*Math.PI/cCount*i);
        p = rotatePoint(p,roll,pitch,jaw);

        if(i==0) {
          zMin = p[2];
          zMax = p[2];
        }

        if(p[2] > zMax) {
          zMax = p[2];
        }

        if(p[2] < zMin) {
          zMin = p[2];
        }
      }

      if(zMin == 0 && zMax == 0) {
        var zMin = -1;
        var zMax = 0.0;
      }

      if(zMin>=zMax) {
        zMax = Math.abs(zMax);
        zMin = (-1) * zMax;
      }

      for (var i = 0; i < cCount; i++) {
        var col = "white";

        if(j==this.moonIndex) {
          if(i==0) {
            //Periapsis
            col = "blue";
          } else if(i == Math.floor(cCount/2)){
            //Apoapsis
            col = "red"
          } else {
            //Default
            col = "yellow";
          }
        }
        ctx.strokeStyle = col;
        ctx.fillStyle   = col;
        pt = getEllipsePoint(a,b,e,2*Math.PI/50*i);
        pt = rotatePoint(pt,roll,pitch,jaw);

        var cX = cen+ pt[0]*scaleFactor;
        var cY = cen+ pt[1]*scaleFactor;
        var sc = (pt[2]-zMin)/(zMax-zMin);
        var r = (0.01+sc)*2;

        ctx.beginPath();
        ctx.arc(cX,cY,r,0,2*Math.PI);
        ctx.stroke();
        ctx.fill()
      }
      j++;
    }

    ctx.strokeStyle = "green";

    ctx.fillStyle = "white";
    ctx.font="16px open sans";

    ctx.fillText("Circlesize = Z-Axis",10,20);
    ctx.fillText("Yellow = Selected Moon",10,40);
    ctx.fillText("Blue = Periapsis",10,60);
    ctx.fillText("Red = Apoapsis",10,80);
  },

  updateCenterPlanet(indexString) {
    var split = indexString.split(",");
    var orbit  = parseInt(split[0]);
    var object = parseInt(split[1]);

    if(isNaN(orbit) || isNaN(object) || orbit < 0 || object < 0 || orbit >= orbitEditor.getOrbitcount() || object >= orbitEditor.getObjectcount(orbit)) {
      this.invalidateFields();
      return;
    }
    this.getCurrent().orbitIndex = orbit;
    this.getCurrent().objectIndex = object;
    this.updateView();
  },

  //Moons
  getCurrentMoonlist() {
    return this.getCurrent().moons;
  },

  getCurrentMoon() {
    return this.getCurrentMoonlist()[this.moonIndex];
  },

  addMoon() {
    this.getCurrent().addMoon(new Moon());
    this.setMoonIndex(this.getCurrentMoonlist().length-1);
  },

  deleteMoon() {
    if(this.moonIndex<0) {
      return;
    }

    this.getCurrent().removeMoon(this.moonIndex);
    this.setMoonIndex(0);
  },

  setMoonIndex(index) {
    var len = this.getCurrentMoonlist().length;

    if(index >= 0 && (index < len||len==0)) {
      if(len==0) {
        this.moonIndex = -1;
      } else {
        this.moonIndex = index;

        var currentMoon = this.getCurrentMoon();
        document.getElementById("moon name").value                             = currentMoon.name;
        document.getElementById("moon typeselector").value                     = currentMoon.typeIndex;
        document.getElementById("moon mass").value                             = currentMoon.mass;
        document.getElementById("moon radius").value                           = currentMoon.radius;

        document.getElementById("moon radius 2").value                         = currentMoon.radius2;
        document.getElementById("moon radius 3").value                         = currentMoon.radius3;


        document.getElementById("moon semi major axis").value                  = currentMoon.semiMajorAxis;
        document.getElementById("moon eccentricity").value                     = currentMoon.eccentricity;
        document.getElementById("moon inclination").value                      = currentMoon.inclination;
        document.getElementById("moon longitude of the ascending node").value  = currentMoon.longitudeOfTheAscendingNode;
        document.getElementById("moon argument of periapsis").value            = currentMoon.argumentOfPeriapsis;
      }
      this.updateView();
    }
  },

  invalidateMoonFields() {
    invalidate("moon");
  },

  updateName(name) {
    this.getCurrentMoon().name = name;
    this.updateView();
  },

  updateMoonType(type) {
    if(isNaN(type) || type < 0 || type >= moonTypes.length) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().typeIndex = type;
    this.updateView();
  },

  updateMass(massText) {
    var mass = parseFloat(massText);
    if(isNaN(mass) || mass < 0) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().mass = mass;
    this.updateView();
  },

  updateRadius(radiusText) {
    var radius = parseFloat(radiusText);

    var cPlanet = planetEditor.getPlanet(this.getCurrent().getCenterObject().planetIndex);
    var rMax = cPlanet.getPlanetRadiusInLunarRadii();
    if(isNaN(radius) || radius <=0 || radius > rMax ) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().radius = radius;
    this.updateView();
  },

  updateRadiusB(radius2Text) {
    var radius = parseFloat(radius2Text);

    var cPlanet = planetEditor.getPlanet(this.getCurrent().getCenterObject().planetIndex);
    var rMax = cPlanet.getPlanetRadiusInLunarRadii();
    if(isNaN(radius) || radius <=0 || radius > rMax ) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().radius2 = radius;
    this.updateView();
  },

  updateRadiusC(radius3Text) {
    var radius = parseFloat(radius3Text);

    var cPlanet = planetEditor.getPlanet(this.getCurrent().getCenterObject().planetIndex);
    var rMax = cPlanet.getPlanetRadiusInLunarRadii();
    if(isNaN(radius) || radius <=0 || radius > rMax) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().radius3 = radius;
    this.updateView();
  },

  updateSemiMajorAxis(smaText) {
    var semiMajorAxis = parseFloat(smaText);
    if(isNaN(semiMajorAxis) || semiMajorAxis<=0) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().semiMajorAxis = semiMajorAxis;
    this.updateView();
  },

  updateEccentricity(eccText) {
    var eccentricity = parseFloat(eccText);
    if(isNaN(eccentricity) || eccentricity<0 || eccentricity>1) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().eccentricity = eccentricity;
    this.updateView();
  },

  updateInclination(incText) {
    var inclination = parseFloat(incText);
    if(isNaN(inclination) || inclination<0 || inclination>180) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().inclination = inclination;
    this.updateView();
  },

  updateLongitudeOfTheAscendingNode(lotaText) {
    var longitudeOfTheAscendingNode = parseFloat(lotaText);
    if(isNaN(longitudeOfTheAscendingNode) || longitudeOfTheAscendingNode<0 || longitudeOfTheAscendingNode>=360) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
    this.updateView();
  },

  updateArgumentOfPeriapsis(aopText) {
    var argumentOfPeriapsis = parseFloat(aopText);
    if(isNaN(argumentOfPeriapsis) || argumentOfPeriapsis<0 || argumentOfPeriapsis>=360) {
      this.invalidateMoonFields();
      return;
    }
    this.getCurrentMoon().argumentOfPeriapsis = argumentOfPeriapsis;
    this.updateView();
  }
}

var moonTypes = [
  {
    name: "Major Moon"
  },
  {
    name: "Minor Moon"
  }
]

/* Moon Analysis */
function updateMoonAnalysis() {
  var list = document.getElementById("moon analysis");
  clearList(list);

  var data = getMoonAnalysisData();
  for (var elemText of data) {
    var node = document.createElement("ul");
    var textnode = document.createTextNode(elemText);
    node.appendChild(textnode);
    list.appendChild(node);
  }
}

function getMoonAnalysisData() {
  var out = [];

  var mSys = moonEditor.getSystemlist();
  for (system of mSys) {
    var centerStar   = system.getCenterStar();
    var centerObject = system.getCenterObject();
    var centerPlanet = planetEditor.getPlanet(centerObject.planetIndex);


    var beyondFrostline = (centerObject.semiMajorAxis >= centerStar.getFrostline());

    //Habitability Criterion
    if(orbitTypes[centerObject.objectTypeIndex].name === "Habitable Planet") {
      out = out.concat(habitabilityMoonTest(system.moons,centerPlanet.name));
    }

    //Number of Moons
    out = out.concat(moonNumberTest(system.moons,centerObject,centerPlanet.name));

    for (moon of system.moons) {
      //Regularity
      out = out.concat(regularityMoonTest(moon,centerPlanet.getHillSphereOuter(centerObject,centerStar)));
      //Orbit Type Test
      out = out.concat(inclinationTest(moon.inclination, 360,true,moon.name));

      //True Roche Limit
      out = out.concat(rocheMoonTest(centerPlanet,moon));

      //Frostline Criterion
      if(!beyondFrostline) {
          out = out.concat(frostlineMoonTest(moon));
      }
    }
  }

  if(out.length == 0) {
    out = ["No Moons? Werewolfs gonna hate your wold..."];
  }
  return out;
}

function habitabilityMoonTest(moons, pName) {
  var majorMoonCount = 0;
  for (moon of moons) {
    if(moonTypes[moon.typeIndex].name == "Major Moon") {
      majorMoonCount+=1;
    }
  }

  if(majorMoonCount < 1 || majorMoonCount > 1) {
    return ["For a stable orbit "+pName+" should have exactly one major moon."];
  }

  return [];
}

function moonNumberTest(moons,object,name) {
  var typeName = orbitTypes[object.objectTypeIndex].name
  if(typeName === "Terrestrial Planet" || typeName === "Habitable Planet") {
    var majorMoonCount = 0;
    var minorMoonCount = 0;
    for (moon of moons) {
      if(moonTypes[moon.typeIndex].name == "Major Moon") {
        majorMoonCount+=1;
      } else {
        minorMoonCount+=1;
      }
    }

    if((majorMoonCount + minorMoonCount/2)>=4 || majorMoonCount>=2) {
      return [name+" has unusually many moons."];
    }

  }
  return [];
}

function regularityMoonTest(moon,hillOuter) {
  //Close (first Half of Hill Sphere), Prograde, Uninclined, Low Eccentricity
  var firstHalf = hillOuter/2;
  if(moon.eccentricity<0.1 && moon.inclination < 5 && moon.semiMajorAxis<=firstHalf) {
    return [moon.name + " is a regular satelite."];
  }
  return [moon.name + " is an irregular satelite."];
}

function rocheMoonTest(planet, moon) {
  var rocheLimit = planet.getRocheLimit(moon);
  if(rocheLimit > moon.getSemiMinorAxis()) {
    return [moon.name + "gets dangerously close to "+planet.name];
  }
  return [];
}

function frostlineMoonTest(moon) {
  var makeup = moon.getMakeup();
  var count = 0;
  for ([name, val] of makeup) {
    if(name === "Iron" || name === "Heavy Metal" || name === "Silicate") {
      count+=val;
    }
  }

  if(count <= 0.5) {
    return [moon.name+" consists of predominantly liquid/gassy material and should be beyond the frostline."];
  }
  return [];
}

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

function invalidate(prefix) {
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

/* Save, Load and Init */
function init() {
  var typeSelector =document.getElementById("object typeselector");
  clearList(typeSelector);
  i = 0;
  for (var type of orbitTypes) {
      var node = document.createElement("option");
      node.value = i;
      var textnode = document.createTextNode(type.name);
      node.appendChild(textnode);
      typeSelector.appendChild(node);
      i++;
  }

  typeSelector =document.getElementById("moon typeselector");
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
  }
  for (var planet of obj.planets) {
    planet.__proto__ = Planet.prototype;
  }
  for (var orbit of obj.orbits) {
    orbit.__proto__ = Orbit.prototype;

    if(orbit.objects.length > 0) {
      activateTab("moon");
    }
    for(var object of orbit.objects) {
      object.__proto__ = OrbitObject.prototype;
    }
  }
  for (var system of obj.moons) {
    system.__proto__ = MoonSystem.prototype;

    for(var moon of system.moons) {
      moon.__proto__ = Moon.prototype;
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

/* Export */
function exportUpdate() {
    updateExportStarsData();
    updateExportPlanetsData();
    updateExportOrbitsData();
    updateExportMoonsData();
}

function updateExportStarsData() {
  var data = "Name,Mass [M☉],Luminosity [L☉],Radius [R☉],Surface Temperature [T☉],Lifetime [A☉],Habitable zone (inner) [AU],Habitable zone (outer) [AU],Star Class\n";
  for (star of starEditor.getStarlist()) {
    data+= star.name+",";
    data+= star.mass+",";
    data+= star.getLuminosity()+",";
    data+= star.getRadius()+",";
    data+= star.getTemperature()+",";
    data+= star.getLifetime()+",";
    data+= star.getHabitableInner()+",";
    data+= star.getHabitableOuter()+",";
    data+= star.getClass()+"\n";
  }

  document.getElementById("exportStars").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function updateExportPlanetsData() {
  var data = "Name,Mass [M🜨],Radius [R🜨],Gravity [G🜨],Density [ρ🜨],Circumference [C🜨],Surface Area [A🜨],Volume [V🜨],Relative Escape Velocity [ve🜨],Crust Composition\n";
  for (planet of planetEditor.getPlanetlist()) {
    data+= planet.name+",";
    data+= planet.mass+",";
    data+= planet.radius+",";
    data+= planet.getGravity()+",";
    data+= planet.getDensity()+",";
    data+= planet.getCircumference()+",";
    data+= planet.getSurfaceArea()+",";
    data+= planet.getVolume()+",";
    data+= planet.getEscapeVelocity()+",";

    var comp = planet.getMakeup();
    var compText = "";
    for(var [key,value] of comp) {
      compText+= key+ ": "+(round(value*100))+"%  ";
      if(key==="Good Will") {
        compText+="(Planet less dense than hydrogen)";
      }

      if(key==="Heavy Metal") {
        compText+="(Planet denser than iron)";
      }
    }
    data += compText.trim()+"\n";

  }


  document.getElementById("exportPlanets").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function updateExportOrbitsData() {
  var data = "Star Name,Planet Name,Type,Semi Major Axis [AU],Semi Minor Axis[AU],Eccentricity,Periapsis[AU],Apoapsis[AU],Orbital Period[P🜨],Orbital Velocity[Vo🜨],Inclination[°],Longitude of the ascending node[°],Argument of Periapsis[°]\n";
  for (orbit of orbitEditor.getOrbitlist()) {
    var star = starEditor.getStar(orbit.starIndex)
    var sName = star.name;
    for (object of orbit.objects) {
      data+= sName+",";
      data+= planetEditor.getPlanet(object.planetIndex).name+",";
      data+= orbitTypes[object.objectTypeIndex].name+",";
      data+= object.semiMajorAxis+",";
      data+= object.getSemiMinorAxis()+",";
      data+= object.eccentricity+",";
      data+= object.getPeriapsis()+",";
      data+= object.getApoapsis()+",";
      data+= object.getOrbitalPeriod(star)+",";
      data+= object.getOrbitalVelocity(star)+",";
      data+= object.inclination+",";
      data+= object.longitudeOfTheAscendingNode+",";
      data+= object.argumentOfPeriapsis+"\n";
    }
  }

  document.getElementById("exportOrbits").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function updateExportMoonsData() {
  var data = "Planet Name,Moon Name,Type,Mass [M☾︎],Radius A [R☾︎],Radius B [R☾︎], Radius C [R☾︎],Density [ρ☾︎],Composition,Gravity [G☾︎],Semi Major Axis [LD],Semi Minor Axis [LD],Eccentricity,Periapsis [LD],Apoapsis [LD],Orbital Period [P☾︎],Orbital Velocity [V☾︎],Inclination [°],Longitude Of The Ascending Node [°],Argument Of Periapsis [°]\n";
  var sysList = moonEditor.getSystemlist();
  for (system of sysList) {
    var cPlanet = planetEditor.getPlanet(system.getCenterObject().planetIndex);
    var pName = cPlanet.name;
    for(moon of system.moons) {
      data+= pName + ",";
      data+= moon.name + ",";
      data+= moonTypes[moon.typeIndex].name + ",";
      data+= moon.mass + ",";
      data+= moon.radius + ",";
      data+= moon.radius2 + ",";
      data+= moon.radius3 + ",";
      data+= moon.getDensity() + ",";

      var comp = moon.getMakeup();
      var compText = "";
      for(var [key,value] of comp) {
        compText+= key+ ": "+(round(value*100))+"%  ";
        if(key==="Good Will") {
          compText+="(Planet less dense than hydrogen)";
        }

        if(key==="Heavy Metal") {
          compText+="(Planet denser than iron)";
        }
      }
      data += compText.trim()+",";

      data+= moon.getGravity() + ",";
      data+= moon.semiMajorAxis + ",";
      data+= moon.getSemiMinorAxis() + ",";
      data+= moon.eccentricity + ",";
      data+= moon.getPeriapsis() + ",";
      data+= moon.getApoapsis() + ",";
      data+= moon.getOrbitalPeriod(cPlanet) + ",";
      data+= moon.getOrbitalVelocity(cPlanet) + ",";
      data+= moon.inclination + ",";
      data+= moon.longitudeOfTheAscendingNode + ",";
      data+= moon.argumentOfPeriapsis + "\n";
    }
  }



  document.getElementById("exportMoons").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

/* Tabbed Menu */
var moonActive = false;
function openTab(evt, tabName) {
  if(tabName==="moon" && !moonActive) {
    return;
  }

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "inline-block";
  evt.currentTarget.className += " active";

  switch (tabName) {
    case "star":
      starEditor.updateView();
      break;

    case "planet":
      planetEditor.updateView();
      break;

    case "orbit":
      orbitEditor.updateView();
      break;

    case "moon":
      moonEditor.updateView();
      break;

    case "export":
      exportUpdate();
      break;
  }
}

function activateTab(tabName) {
  if(tabName!== "moon") {
    return;
  }

  moonActive = true;
  for (button of document.getElementsByClassName("tablinks")) {
    if(button.innerHTML.toUpperCase() === tabName.toUpperCase()) {
      button.style.display = "initial";
    }
  }
}

function deactivateTab(tabName) {
  if(tabName!== "moon") {
    return;
  }
  moonActive = false;
  for (button of document.getElementsByClassName("tablinks")) {
    if(button.innerHTML.toUpperCase() === tabName.toUpperCase()) {
      button.style.display = "none";
    }
  }
}

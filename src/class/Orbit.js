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
  constructor(planetIndex,semiMajorAxis,eccentricity,inclination,longitudeOfTheAscendingNode,argumentOfPeriapsis) {
    if(planetIndex === undefined) {
      planetIndex = 0;
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
    this.semiMajorAxis = semiMajorAxis;
    this.eccentricity = eccentricity;
    this.inclination = inclination;
    this.longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
    this.argumentOfPeriapsis = argumentOfPeriapsis;
  }

  getSemiMinorAxis() {
    var smaAU = this.semiMajorAxis*Math.sqrt(1 - (this.eccentricity*this.eccentricity));
    return round(units.au.convertToUnitless(smaAU));
  }

  getPeriapsis() {
    var periapsisAU = this.semiMajorAxis*(1 - this.eccentricity);
    return round(units.au.convertToUnitless(periapsisAU));
  }

  getApoapsis() {
    var apoapsisAU = this.semiMajorAxis*(1 + this.eccentricity);
    return round(units.au.convertToUnitless(apoapsisAU));
  }

  getOrbitalPeriod(star) {
    var orbitalPeriodEarth = Math.sqrt(this.semiMajorAxis*this.semiMajorAxis*this.semiMajorAxis/star.mass);
    return round(units.earthYear.convertToUnitless(orbitalPeriodEarth));
  }

  getOrbitalVelocity(star) {
    var orbitalVelocityEarth = Math.sqrt(star.mass/this.semiMajorAxis)
    return round(units.earthVelocity.convertToUnitless(orbitalVelocityEarth));
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
    invalidate(tabOrbit);
  },

  updateView() {
    this.updateLists();
    this.updateSelector();

    var centerStar = starEditor.getStar(this.getCurrent().starIndex);
    tabOrbit.starSelector.value = this.getCurrent().starIndex;

    var bLow  = centerStar.getInnerLimit();
    var bHigh = centerStar.getOuterLimit();
    tabOrbit.boundaries.setUnitlessValues(bLow,bHigh);

    var hLow  = centerStar.getHabitableInner();
    var hHigh =centerStar.getHabitableOuter();
    tabOrbit.habitableZone.setUnitlessValues(hLow,hHigh);
    tabOrbit.frostline      .setUnitlessValue(centerStar.getFrostline());

    updateOrbitAnalysis();

    if(this.objectIndex != -1) {
      var currentOrbitObject = this.getCurrentObject();
      tabOrbit.planetSelector.value = currentOrbitObject.planetIndex;
      tabOrbit.semiMinorAxis  .setUnitlessValue(currentOrbitObject.getSemiMinorAxis());
      tabOrbit.periapsis      .setUnitlessValue(currentOrbitObject.getPeriapsis());
      tabOrbit.apoapsis       .setUnitlessValue(currentOrbitObject.getApoapsis());
      tabOrbit.orbitalPeriod  .setUnitlessValue(currentOrbitObject.getOrbitalPeriod(starEditor.getCurrent()));
      tabOrbit.orbitalVelocity.setUnitlessValue(currentOrbitObject.getOrbitalVelocity(starEditor.getCurrent()));
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
    planetSelector = document.getElementById("system-planetselector");
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
    var c = document.getElementById("orbit-canvas");
    var ctx = c.getContext("2d");
    var canvasSize = c.width;
    var trueSize   = c.scrollWidth;
    ctx.clearRect(0, 0, trueSize, trueSize);
    ctx.lineWidth = 1;
    var currentOrbit = this.getCurrent();
    var centerStar   = starEditor.getStar(currentOrbit.starIndex);

    var rMax = canvasSize/2;
    var scaleFactor = rMax / units.au.convertToUnit(centerStar.getOuterLimit());
    var cen = canvasSize/2;
    var cCount = 50;

    var j=0;
    ctx.fillRect(cen-1, cen-1, 2, 2);

    for(obj of this.getCurrentObjectlist()) {
      var a = obj.semiMajorAxis;
      var b = units.au.convertToUnit(obj.getSemiMinorAxis());
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
    ctx.arc(cen,cen,scaleFactor*units.au.convertToUnit(centerStar.getHabitableInner()),0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cen,cen,scaleFactor*units.au.convertToUnit(centerStar.getHabitableOuter()),0,2*Math.PI);
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
    invalidate(tabOrbit);
  },

  setObjectIndex(index) {
    var len = this.getCurrentObjectlist().length;

    if(index >= 0 && (index < len||len==0)) {
      if(len==0) {
        this.objectIndex = -1;
      } else {
        this.objectIndex = index;
        var currentOrbitObject = this.getCurrentObject();

        var smaUnitless = units.au.convertToUnitless(currentOrbitObject.semiMajorAxis);
        tabOrbit.semiMajorAxis.setUnitlessValue(smaUnitless);
        tabOrbit.eccentricity.setUnitlessValue(currentOrbitObject.eccentricity);
        tabOrbit.inclination.setUnitlessValue(currentOrbitObject.inclination);
        tabOrbit.longitudeOfTheAscendingNode.setUnitlessValue(currentOrbitObject.longitudeOfTheAscendingNode);
        tabOrbit.argumentOfPeriapsis.setUnitlessValue(currentOrbitObject.argumentOfPeriapsis);
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
    if(isNaN(eccentricity) || eccentricity<0 || eccentricity>=1) {
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

/* Orbit analysis*/
function updateOrbitAnalysis() {
  var list = tabOrbit.orbitalAnalysis;
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
    var planet = planetEditor.getPlanet(object.planetIndex);
    var type = planetTypes[planet.planetTypeIndex];
    var name = planet.name;
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

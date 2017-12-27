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
    var trueDensity = this.getDensity()/1000;//*3.344;
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
    var avgRad;
    if(moonTypes[this.typeIndex].name === "Major Moon") {
      avgRad = this.radius;
    } else {
      avgRad = (this.radius + this.radius2 + this.radius3)/3;
    }

    var lunarGravity = this.mass/avgRad/avgRad;
    return round(units.lunarGravity.convertToUnitless(lunarGravity));
  }

  getDensity() {
    var volume = 1;
    if(moonTypes[this.typeIndex].name === "Major Moon") {
      volume = (this.radius*this.radius*this.radius);
    } else {
      volume = (this.radius*this.radius2*this.radius3);
    }

    var lunarDensity = this.mass/volume;
    return round(units.lunarDensity.convertToUnitless(lunarDensity));
  }

  getSemiMinorAxis() {
    var smaLunar = this.semiMajorAxis*Math.sqrt(1 - (this.eccentricity*this.eccentricity));
    return round(units.lunarDistance.convertToUnitless(smaLunar));
  }

  getPeriapsis() {
    var periapsisLunar = this.semiMajorAxis*(1 - this.eccentricity);
    return round(units.lunarDistance.convertToUnitless(periapsisLunar));
  }

  getApoapsis() {
    var apoapsisLunar = this.semiMajorAxis*(1 + this.eccentricity);
    return round(units.lunarDistance.convertToUnitless(apoapsisLunar));
  }

  getOrbitalPeriod(planet) {
    var mP = planet.getPlanetMassInLunarMasses()
    var lunarPeriod = Math.sqrt(this.semiMajorAxis*this.semiMajorAxis*this.semiMajorAxis/mP)/0.11090536506409417;
    return round(units.earthMonth.convertToUnitless(lunarPeriod));
  }

  getOrbitalVelocity(planet) {
    var mP = planet.getPlanetMassInLunarMasses();
    var lunarVelocity = Math.sqrt(mP/this.semiMajorAxis)/9.016696;
    return round(units.lunarVelocity.convertToUnitless(lunarVelocity));
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
    invalidate(tabMoonSystem);
  },

  updateView() {
    for (system of this.systems) {
      if(system.orbitIndex === -1) {
        var nonEmpty = orbitEditor.getFirstNonemptyOrbit();
        if(nonEmpty == -1) {
          //console.log("Add an element to an orbit to start moonbuilding");
          return;
        }
        system.orbitIndex = nonEmpty;
        this.updateCenterPlanet(system.orbitIndex+",0");
        return;
      }
    }

    this.updateLists();
    var currentSystem = this.getCurrent();

    orbitEditor.updateSelector();
    var value = this.getCurrent().orbitIndex+","+this.getCurrent().objectIndex;
    tabMoon.planetSelector.value = value;

    var centerObject = currentSystem.getCenterObject();
    var centerStar   = currentSystem.getCenterStar()
    var centerPlanet = planetEditor.getPlanet(centerObject.planetIndex);
    var hillLower = units.lunarDistance.convertToUnitless(centerPlanet.getHillSphereInner());
    var hillUpper = units.lunarDistance.convertToUnitless(centerPlanet.getHillSphereOuter(centerObject,centerStar));
    tabMoon.hillsphere.setUnitlessValues(hillLower,hillUpper);

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

      var maxRadUnitless = units.lunarRadius.convertToUnitless(centerPlanet.getPlanetRadiusInLunarRadii());
      tabMoon.allowedMaxRad = maxRadUnitless;
      tabMoon.radius.updateDescription();
      tabMoon.radiusB.updateDescription();
      tabMoon.radiusC.updateDescription();

      tabMoon.form.innerHTML = currentMoon.getForm();


      tabMoon.density.setUnitlessValue(currentMoon.getDensity());
      tabMoon.composition.innerHTML  = currentMoon.getComposition();
      tabMoon.surfaceGravity.setUnitlessValue(currentMoon.getGravity());
      tabMoon.semiMinorAxis.setUnitlessValue(currentMoon.getSemiMinorAxis());
      tabMoon.periapsis.setUnitlessValue(currentMoon.getPeriapsis());
      tabMoon.apoapsis.setUnitlessValue(currentMoon.getApoapsis());
      tabMoon.orbitalPeriod.setUnitlessValue(currentMoon.getOrbitalPeriod(centerPlanet));
      tabMoon.orbitalVelocity.setUnitlessValue(currentMoon.getOrbitalVelocity(centerPlanet));

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
    var c = document.getElementById("moon-canvas");
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
      var b = units.lunarDistance.convertToUnit(obj.getSemiMinorAxis());
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
        tabMoon.name.value = currentMoon.name;
        tabMoon.typeSelector.value = currentMoon.typeIndex;

        tabMoon.mass.setUnitValue(currentMoon.mass,units.lunarMass);
        tabMoon.radius.setUnitValue(currentMoon.radius,units.lunarRadius);
        tabMoon.radiusB.setUnitValue(currentMoon.radius2,units.lunarRadius);
        tabMoon.radiusC.setUnitValue(currentMoon.radius3,units.lunarRadius);
        tabMoon.semiMajorAxis.setUnitValue(currentMoon.semiMajorAxis,units.lunarDistance);
        tabMoon.eccentricity.setUnitlessValue(currentMoon.eccentricity);
        tabMoon.inclination.setUnitValue(currentMoon.inclination,units.degrees);
        tabMoon.longitudeOfTheAscendingNode.setUnitValue(currentMoon.longitudeOfTheAscendingNode,units.degrees);
        tabMoon.argumentOfPeriapsis.setUnitValue(currentMoon.argumentOfPeriapsis,units.degrees);
      }
      this.updateView();
    }
  },

  invalidateMoonFields() {
    invalidate(tabMoonMoon);
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
    if(isNaN(eccentricity) || eccentricity<0 || eccentricity>=1) {
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
  var list = document.getElementById("moon-analysis");
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
    if(planetTypes[centerPlanet.planetTypeIndex].name === "Habitable Planet") {
      out = out.concat(habitabilityMoonTest(system.moons,centerPlanet.name));
    }

    //Number of Moons
    out = out.concat(moonNumberTest(system.moons,centerPlanet));

    for (moon of system.moons) {
      out = out.concat(liveableMoonTest(centerStar,system,moon));
      //Regularity
      out = out.concat(regularityMoonTest(moon,centerPlanet.getHillSphereOuter(centerObject,centerStar)));
      //Orbit Type Test
      out = out.concat(inclinationTest(moon.inclination, 360,true,moon.name));
      out = out.concat(retrogradeTest(moon.inclination,moon.name));

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

function liveableMoonTest(star, system, moon) {
  if(system.getCenterObject().semiMajorAxis < (star.getHabitableInner()/1.1) || system.getCenterObject().semiMajorAxis > (star.getHabitableOuter()*1.1)) {
    return [];
  }
  var out = [];
  var scaledAp =moon.getApoapsis()*0.002547;

  var maxDist = system.getCenterObject().getApoapsis() + scaledAp;
  var minDist = system.getCenterObject().getPeriapsis() - scaledAp;

  if(minDist < star.getHabitableInner() || maxDist > star.getHabitableOuter()) {
    out.push(moon.name + "'s orbit peeks out of the habitable zone.");
  }
  var scaledMass = moon.mass*0.0123;
  var scaledRad  = moon.radius*0.273;


  if(scaledMass < 0.1) {
    out.push(moon.name + " is to light to be habitable.");
  }

  if(scaledMass > 3.5) {
    out.push(moon.name  + " is to heavy to be habitable.");
  }

  if(scaledRad < 0.5) {
    out.push(moon.name  + " is to small to be habitable.");
  }

  if(scaledRad > 1.5) {
    out.push(moon.name  + " is to large to be habitable.");
  }
  if(out.length==0) {
    out= [moon.name+" is in theory habitable."];
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

function moonNumberTest(moons,planet) {
  var typeName = planetTypes[planet.planetTypeIndex].name;
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
      return [planet.name+" has unusually many moons."];
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

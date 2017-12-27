class Unit {
  constructor(conversionFactor, name , symbol) {
    this.conversionFactor = conversionFactor;
    this.name   = name;
    this.symbol = symbol;
  }

  convertToUnitless(unitValue) {
    return unitValue*this.conversionFactor;
  }

  convertToUnit(unitlessValue) {
    return unitlessValue / this.conversionFactor;
  }

  static transform(from, to, value) {
    return to.convertToUnit(from.convertToUnitless(value));
  }
}

class TemperatureUnit {
  constructor(conversionFactorA, conversionFactorB, name , symbol) {
    this.conversionFactor = conversionFactorA;
    this.conversionFactorB = conversionFactorB;
    this.name   = name;
    this.symbol = symbol;
  }

  convertToUnitless(unitValue) {
    return (unitValue+ this.conversionFactorB)*this.conversionFactor;
  }

  convertToUnit(unitlessValue) {
    return (unitlessValue/ this.conversionFactor)-this.conversionFactorB;
  }
}

var units = {
  defaultUnit : new Unit(1,"base",""),

  kg         : new Unit(1         ,"Kilogram","kg"),
  metricTon  : new Unit(1000      ,"Metric Ton","t"),
  shortTon   : new Unit(907.18474 ,"Short Ton","ton"),
  solarMass  : new Unit(1.98855e30,"Solar Mass","M☉"),
  lunarMass  : new Unit(7.342e22  ,"Lunar Mass","M☽"),
  earthMass  : new Unit(5.9722e24 ,"Earth Mass","M🜨"),
  jupiterMass: new Unit(1.89813e27,"Jupiter Mass","M♃"),

  getMassUnits() {
    return [this.kg,this.metricTon,this.shortTon,this.solarMass,this.lunarMass,
      this.earthMass,this.jupiterMass];
  },

  m                   : new Unit(1           ,"Meter","m"),
  km                  : new Unit(1000        ,"Kilometer","km"),
  au                  : new Unit(149597870700,"Astronomical Unit","AU"),
  mile                : new Unit(1609.344    ,"Mile","mi"),
  solarRadius         : new Unit(6.95700e8   ,"Solar Radius","R☉"),
  solarCircumference  : new Unit(4.379121e9  ,"Solar Circumference","C☉"),
  lunarRadius         : new Unit(1738100     ,"Lunar Radius","R☽"),
  lunarCircumference  : new Unit(10921000    ,"Lunar Circumference","C☽"),
  lunarDistance       : new Unit(406200000   ,"Lunar Distance","D🜨☽"),
  earthRadius         : new Unit(6378100     ,"Earth Radius","R🜨"),
  earthCircumference  : new Unit(40075017    ,"Earth Circumference","C🜨"),
  jupiterRadius       : new Unit(71492000    ,"Jupiter Radius","R♃"),
  jupiterCircumference: new Unit(449197483   ,"Jupiter Circumference","C♃"),

  getLengthUnits() {
    return [this.m,this.km,this.au,this.mile,this.solarRadius,this.lunarRadius,
      this.earthRadius,this.jupiterRadius,this.solarCircumference,
      this.lunarCircumference, this.lunarDistance,this.earthCircumference,
      this.jupiterCircumference];
  },

  s           : new Unit(1           ,"Second","s"),
  min         : new Unit(60          ,"Minute","min"),
  h           : new Unit(3600        ,"Hour","h"),
  lifetimeSun : new Unit(3.2e17      ,"Solar Life", "L☉"),
  earthDay    : new Unit(86164.1     ,"Earth Day","d🜨"),
  earthMonth  : new Unit(2.628e6     ,"Earth Month","m🜨"),
  earthYear   : new Unit(3.154e7     ,"Earth Year","y🜨"),
  jupiterYear : new Unit(3.7435566e8 ,"Jupiter Year","y♃"),

  getTimeUnits() {
    return [this.s,this.min,this.h,this.lifetimeSun,this.earthDay,this.earthMonth,
      this.earthYear,this.jupiterYear];
  },

  squareMeter       : new Unit(1           ,"Square Meter","m²"),
  squareKilometer   : new Unit(1000000     ,"Square Kilometer","km²"),
  squareMiles       : new Unit(2.58999e6   ,"Square Miles","mi²"),
  solarSurfaceArea  : new Unit(6.09e18     ,"Solar Surface","S☉"),
  lunarSurfaceArea  : new Unit(3.793e13    ,"Lunar Surface","S☽"),
  earthSurfaceArea  : new Unit(5.10072e14  ,"Earth Surface","S🜨"),
  jupiterSurfaceArea: new Unit(6.1419e16   ,"Jupiter Surface","S♃"),

  getAreaUnits() {
    return [this.squareMeter,this.squareKilometer,this.squareMiles,
      this.solarSurfaceArea,this.lunarSurfaceArea,this.earthSurfaceArea,
    this.jupiterSurfaceArea];
  },

  cubicMeter      : new Unit(1           ,"Cubic Meter","m²"),
  cubicKilometer  : new Unit(1e9         ,"Cubic Kilometer","km²"),
  cubicMiles      : new Unit(4.168e9     ,"Cubic Miles","mi²"),
  solarVolume     : new Unit(1.412e27    ,"Solar Volume","V☉"),
  lunarVolume     : new Unit(2.197e19    ,"Lunar Volume","V☽"),
  earthVolume     : new Unit(1.083e21    ,"Earth Volume","V🜨"),
  jupiterVolume   : new Unit(1.43e24     ,"Jupiter Volume","V♃"),

  getVolumeUnits() {
    return [this.cubicMeter,this.cubicKilometer,this.cubicMiles,this.solarVolume,
    this.lunarVolume,this.earthVolume,this.jupiterVolume];
  },

  metersPerSquareSecond : new Unit(1           ,"Meter Per Square Second","m/s²"),
  feetPerSquareSecond   : new Unit(0.3048      ,"Feet Per Square Second","ft/s²"),
  solarGravity          : new Unit(273.95      ,"Solar Gravity","G☉"),
  lunarGravity          : new Unit(1.624       ,"Lunar Gravity","G☽"),
  earthGravity          : new Unit(9.8         ,"Earth Gravity","G🜨"),
  jupiterGravity        : new Unit(24.79       ,"Jupiter Gravity","G♃"),

  getGravityUnits() {
    return [this.metersPerSquareSecond, this.feetPerSquareSecond,
      this.solarGravity, this.lunarGravity, this.earthGravity, this.jupiterGravity];
  },

  kilogramPerCubicMeter : new Unit(1           ,"Kilogram Per Cubic Meter","kg/m³"),
  poundPerCubicFeet     : new Unit(16.02       ,"Pound Per Cubic Feet","lb/ft³"),
  solarDensity          : new Unit(1408        ,"Solar Density","ρ☉"),
  lunarDensity          : new Unit(3344        ,"Lunar Density","ρ☽"),
  earthDensity          : new Unit(5515        ,"Earth Density","ρ🜨"),
  jupiterDensity        : new Unit(1326.2      ,"Jupiter Density","ρ♃"),

  getDensityUnits() {
    return [this.kilogramPerCubicMeter,this.poundPerCubicFeet, this.solarDensity,
      this.lunarDensity,this.earthDensity, this.jupiterDensity];
  },

  metersPerSecond       : new Unit(1           ,"Meters Per Second","m/s"),
  kilometersPerHour     : new Unit(0.2778      ,"Kilometers Per Hour","km/h"),
  milesPerHour          : new Unit(0.447       ,"Miles Per Hour","mi/h"),
  lunarVelocity         : new Unit(1020        ,"Lunar Velocity","v☽"),
  earthVelocity         : new Unit(29800       ,"Earth Velocity","v🜨"),
  jupiterVelocity       : new Unit(13000       ,"Jupiter Velocity","v☉"),
  solarEscapeVelocity   : new Unit(617540      ,"Solar Escape Velocity","ve♃"),
  lunarEscapeVelocity   : new Unit(2375.6      ,"Lunar Escape Velocity","ve☽"),
  earthEscapeVelocity   : new Unit(11180       ,"Earth Escape Velocity","ve🜨"),
  jupiterEscapeVelocity : new Unit(60200       ,"Jupiter Escape Velocity","ve♃"),

  getVelocityUnits() {
    return [this.metersPerSecond, this.kilometersPerHour, this.milesPerHour,
    this.lunarVelocity,this.earthVelocity,this.jupiterVelocity,
    this.solarEscapeVelocity, this.lunarEscapeVelocity, this.earthEscapeVelocity,
    this.jupiterEscapeVelocity];
  },

  watt              : new Unit(1           ,"Watt","W"),
  solarLuminosity   : new Unit(3.828e26    ,"Solar Luminosity","L☉"),

  getLuminosityUnits() {
    return [this.watt,this.solarLuminosity];
  },

  kelvin            : new Unit(1            ,"Kelvin", "K"),
  celsius           : new TemperatureUnit(1, 273.15,"Celsius", "°C"),
  fahrenheit        : new TemperatureUnit((5.0/9.0), 459.67,"Fahrenheit", "°F"),
  solarTemperature  : new Unit(5572         ,"Solar Temperauture", "T☉"),

  getTemperatureUnits() {
    return [this.kelvin, this.celsius, this.fahrenheit, this.solarTemperature];
  },

  degrees            : new Unit(1, "Degrees","°"),
  radiants          : new Unit(180/Math.PI,"Radiants","rad"),
  getAngleUnits() {
    return [this.degrees,this.radiants];
  }
}




/*
* Units:
*           SI,   Metric,   Customary,  Solar,  Lunar,  Terra,   Jupiter
*
* Base:
* Mass(M)     kg ->    t      ton         Msol    Mlun    Mter    Mjun
* Length(L)    m  ->   AU,km   mile        Rsol    Rlun    Rter    Rjun
* Time(T)      s  -> Min,Hours, Days(Earth, Jupiter),Month(Earth), Years(Earth,Jupiter)
* Derived:
* Area        L^2
* Volume      L^3
* Gravity     L/T^2
* Density     L^3/M       g/m^3           Rsol    Rlun    Rter  Rjun
* Velocity    L/T         km/h  mph         Vsol  Vlun  Vter    Vjun
* Luminosity  M*L^2/T^3   Watt              Lsol
*/
/* Abstraction for any Input/Output filed in a Tab */
class Field {
  constructor(baseID,unitList,defaultUn,updateCallback,textGenerator) {
    this.unitlessValue = 0;
    this.isValid = true;

    if(unitList === undefined || unitList.length == 0) {
      unitList = [units.defaultUnit];
    }
    this.unit  = units.defaultUnit;
    this.unitList = unitList;
    this.valueField = document.getElementById(baseID+"-value");

    var fieldThis = this;
    if(this.valueField.tagName === "INPUT") {
      $("#"+baseID+"-value").on("input", function (evt) {
        fieldThis.setUnitTextValue(evt.target.value);
      });
    }

    this.descriptionField  = document.getElementById(baseID+"-description");

    this.unitField  = document.getElementById(baseID+"-unit");
    if(this.unitField !== null) {
      this.unitField.addEventListener("change",function (evt) {
        fieldThis.updateUnit(evt.target.value);
      });
    }

    this.textGenerator  = textGenerator;
    this.updateUnit(defaultUn);
    this.updateCallback = updateCallback;
  }

  getUnitlessValue() {
    return this.unitlessValue;
  }

  setUnitValue(newValue, unit) {
    this.setUnitlessValue(unit.convertToUnitless(newValue));
  }

  setUnitlessValue(newValue, viewUpdate) {
    this.isValid = true;

    if(viewUpdate === undefined) {
      viewUpdate = true;
    }

    this.unitlessValue = newValue;
    if(this.updateCallback !== undefined) {
      this.updateCallback(newValue);
    }

    if(viewUpdate) {
      this.updateView();
    }
  }

  setUnitTextValue(newValue) {
    var val = parseFloat(newValue);
    if(!isNaN(val)) {
      var viewUpdate = (this.valueField.tagName !== "INPUT")
      this.setUnitlessValue(this.unit.convertToUnitless(val), viewUpdate);
    }
  }

  updateUnit(newUnit) {
    if(newUnit>this.unitList.length) {
      newUnit = 0;
    }

    this.unit = this.unitList[newUnit];
    this.updateDescription();
    this.updateView();
  }

  updateView() {
    if(this.valueField.tagName === "INPUT") {
      this.valueField.value = highRound(this.unit.convertToUnit(this.unitlessValue))
    } else {
      if(this.isValid) {
        this.valueField.innerHTML = roundExp(this.unit.convertToUnit(this.unitlessValue));
      } else {
        this.valueField.innerHTML = "-";
      }
    }

  }

  updateDescription() {
    if(this.textGenerator !== undefined) {
      this.descriptionField.innerHTML = this.textGenerator(this.unit);
    } else {
      this.descriptionField.innerHTML = "";
    }
  }

  invalidate() {
    if(this.valueField.tagName === "INPUT") {
      return;
    }
    this.isValid = false;
    this.updateView();
  }
}

function highRound(val) {
  return Math.round(val*1000000000)/1000000000;
}

function roundExp(x) {
  var val = (x+"").split(/[eE]/)
  var f = val[0];
  f = roundUp(parseFloat(f));
  if(val.length > 1) {
    var e = val[1];
    f = f+"e"+e;
  }
  return parseFloat(f);
}

function roundUp(x) {
  return Math.ceil(x*100)/100
}

function generateField(baseID, name, updateCallback, textGenerator, unitList, defaultUnit) {
  // Generates a table row with Name, Input/Output Field, Description Text and Unitpicker
  // Returns a Field object

  var parentTR = document.getElementById(baseID);

  //Text Field
  var th = document.createElement("th");
  th.setAttribute("id",baseID+"-name");
  var textnode = document.createTextNode(name+": ");
  th.appendChild(textnode);
  parentTR.appendChild(th);


  //Input/Output
  th = document.createElement("th");

  var node;
  if(updateCallback === undefined) {
    //Output Field
    node = th;
    node.setAttribute("class","output");
    textnode = document.createTextNode("");
    th.appendChild(textnode);
  } else {
    //Input Field
    node = document.createElement("input");
    node.setAttribute("type","text");
    node.setAttribute("style","text-align: right;");
    th.appendChild(node);
  }
  node.setAttribute("id",baseID+"-value");
  parentTR.appendChild(th);



  //Unitpicker
  th = document.createElement("th");
  if(unitList.length > 0) {
    var unitPicker = document.createElement("select");
    unitPicker.setAttribute("class","unitPicker");
    unitPicker.setAttribute("id",baseID+"-unit");

    unitPicker.addEventListener("change",function(e){
      unitPicker.options[0].value = e.target.selectedIndex-1;
      unitPicker.options[0].innerHTML = unitList[e.target.selectedIndex-1].symbol;
      unitPicker.options[0].selected = true;
    });
    th.appendChild(unitPicker);

    node = document.createElement("option");
    node.setAttribute("disabled","disabled");
    node.setAttribute("selected","selected");
    node.setAttribute("hidden","hidden");
    textnode = document.createTextNode(unitList[defaultUnit].symbol);
    node.appendChild(textnode);
    unitPicker.appendChild(node);

    var i=0;
    for (unit of unitList) {
      node = document.createElement("option");
      //node.setAttribute("title",unit.name);
      node.value = i;
      textnode = document.createTextNode(unit.name);
      node.appendChild(textnode);
      unitPicker.appendChild(node);
      i++;
    }
  }
  parentTR.appendChild(th);

  //Description
  th = document.createElement("th");
  th.setAttribute("class","descriptionField");
  th.setAttribute("id",baseID+"-description");
  textnode = document.createTextNode("Default Description");
  th.appendChild(textnode);
  parentTR.appendChild(th);

  return new Field(baseID, unitList, defaultUnit, updateCallback, textGenerator);
}

function generateRangeField(baseID, name, textGenerator, unitList, defaultUnit) {
  var field = generateField(baseID, name, undefined, textGenerator, unitList, defaultUnit);

  field.lowerUnitless = 0;
  field.upperUnitless = 0;
  field.setUnitlessValues = function(x,y) {
    this.isValid = true;
    this.lowerUnitless = x;
    this.upperUnitless = y;
    this.updateView();
  };

  field.updateView = function() {
    if(this.isValid) {
      var low = roundExp(this.unit.convertToUnit(this.lowerUnitless));
      var up = roundExp(this.unit.convertToUnit(this.upperUnitless));

      this.valueField.innerHTML = low+" - "+up;
    } else {
      this.valueField.innerHTML = "-";
    }
  }
  return field;
}
/* Star */
class Star {
  constructor(name,solarMass) {
    if(name === undefined) {
      name = "Stary McStarface";
    }

    if(solarMass === undefined) {
      solarMass = 1;
    }

    this.name = name;
    this.mass = solarMass;
  }

  setName(name) {
    this.name = name;
  }

  setMass(solarMass) {
    this.mass = solarMass;
  }

  getLuminosity() {
    var solarLuminosity = Math.pow(this.mass,3);
    return round(units.solarLuminosity.convertToUnitless(solarLuminosity));
  }

  getRadius() {
    var solarRadius = Math.pow(this.mass,0.74);
    return round(units.solarRadius.convertToUnitless(solarRadius));
  }

  getTemperature() {
    var solarTemperature = Math.pow(this.mass,0.505)
    return round(units.solarTemperature.convertToUnitless(solarTemperature));
  }

  getLifetime() {
    var solarLifetime = Math.pow(this.mass,-2.5)
    return round(units.lifetimeSun.convertToUnitless(solarLifetime));
  }

  getHabitableInner() {
    var innerAU = Math.pow(this.mass,3/2)*0.95;
    return round(units.au.convertToUnitless(innerAU));
  }

  getHabitableOuter() {
    var outerAU = Math.pow(this.mass,3/2)*1.37;
    return round(units.au.convertToUnitless(outerAU));
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
    var kelvinTemp = this.getTemperature();

    return rgbFromKelvinTemp(kelvinTemp)
  }

  getHabitability() {
    if(this.mass==1) {
      return "It's the sun... You've built the sun...";
    }

    if(this.mass>1.4) {
      return "The lifetime of the star might be too short for evolution.<br/>Star gives off high amounts of UV radiation.";
    }
    if(this.mass<0.6) {
      return "The habitable zone is too close to the star.<br/>Solar activity will be a problem.";
    }
    return "Ideal for conditions for life in the habitable zone.";
  }

  //Orbit Functions
  getFrostline() {
    var frostlineAU = 4.85*Math.sqrt(Math.pow(this.mass,3));
    return round(units.au.convertToUnitless(frostlineAU));
  }

  getInnerLimit() {
    var innerLimitAU = 0.1*this.mass;
    return round(units.au.convertToUnitless(innerLimitAU));
  }

  getOuterLimit() {
    var outerLimitAU = 40*this.mass;
    return round(units.au.convertToUnitless(outerLimitAU));
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

      var currentStar = this.getCurrent();
      tabStar.name.value = currentStar.name;
      var unitlessMass = units.solarMass.convertToUnitless(currentStar.mass)
      tabStar.mass.setUnitlessValue(unitlessMass);

      this.updateView();
    }
  },

  invalidateFields() {
    //invalidate("star");
    invalidate(tabStar);
    tabStar.starClass.innerHTML = "Not a star.";
  },

  updateView() {
    this.updateList();
    this.updateSelector();

    var star = this.getCurrent();

    tabStar.luminosity.setUnitlessValue(star.getLuminosity());
    tabStar.radius.setUnitlessValue(star.getRadius());
    tabStar.surfaceTemperature.setUnitlessValue(star.getTemperature());
    tabStar.lifetime.setUnitlessValue(star.getLifetime());
    tabStar.habitableZoneInner.setUnitlessValue(star.getHabitableInner());
    tabStar.habitableZoneOuter.setUnitlessValue(star.getHabitableOuter());
    tabStar.starClass.innerHTML     = star.getClass();
    tabStar.habitability.innerHTML  = star.getHabitability();

    this.redraw();
  },

  updateList() {
    updateList("starlist",this.stars,function(s){return s.name;},starEditor.setIndex,this.index,starEditor);
  },

  updateSelector() {
    var selector = document.getElementById("orbit-starselector");
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

    var c = document.getElementById("star-canvas");
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

    var rStar  = rSun * units.solarRadius.convertToUnit(star.getRadius());
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
$(function () {
  loadFromCookie();
  init();
});
$(".tablinks").click(function (evt) {
  var tabName = evt.target.textContent.toLowerCase();
  if (tabName === "save") createSavefile();
  openTab(evt, tabName);
});

// Star handlers
$("#addStar").click(function (evt) {
  starEditor.addStar();
});
$("#deleteStar").click(function (evt) {
  starEditor.deleteStar();
});
$("#star-name").on("input", function (evt) {
  starEditor.updateName(evt.target.value);
});

// Planet handlers
$("#addPlanet").click(function (evt) {
  planetEditor.addPlanet();
});
$("#deletePlanet").click(function (evt) {
  planetEditor.deletePlanet();
});
$("#planet-name").on("input", function (evt) {
  planetEditor.updateName(evt.target.value);
});
$("#planet-typeselector").change(function (evt) {
  planetEditor.updatePlanetType(evt.target.value);
});

// Orbit handlers
$("#addOrbit").click(function (evt) {
  orbitEditor.addOrbit();
});
$("#deleteOrbit").click(function (evt) {
  orbitEditor.deleteOrbit();
});
$("#orbit-starselector").change(function (evt) {
  orbitEditor.updateCenterStar(evt.target.value);
});
$("#object-planetselector").change(function (evt) {
  orbitEditor.updatePlanetIndex(evt.target.value);
});

$("#addObject").click(function (evt) {
  orbitEditor.addObject();
});
$("#deleteObject").click(function (evt) {
  orbitEditor.deleteObject();
});
// Moon handlers
$("#addMoonSystem").click(function (evt) {
  moonEditor.addMoonSystem();
});
$("#deleteMoonSystem").click(function (evt) {
  moonEditor.deleteMoonSystem();
});
$("#system-planetselector").change(function (evt) {
  moonEditor.updateCenterPlanet(evt.target.value);
});
$("#moon-name").on("input", function (evt) {
  moonEditor.updateName(evt.target.value);
});
$("#moon-typeselector").change(function (evt) {
  moonEditor.updateMoonType(evt.target.value);
});
$("#addMoon").click(function (evt) {
  moonEditor.addMoon();
});
$("#deleteMoon").click(function (evt) {
  moonEditor.deleteMoon();
});
// File I/O
$("#saveAsCookie").click(function (evt) {
  saveAsCookie();
  alert("Done");
});
$("#loadFile").change(function (evt) {
  loadFile(evt);
  alert("Done");
});
$("#loadFromCookie").change(function (evt) {
  loadFromCookie();
  alert("Done");
});
/* Export */
function exportUpdate() {
    updateExportStarsData();
    updateExportPlanetsData();
    updateExportOrbitsData();
    updateExportMoonsData();
}

function updateExportStarsData() {
  var uMass=tabStar.mass.unit;
  var uLum =tabStar.luminosity.unit;
  var uRad =tabStar.radius.unit;
  var uTem =tabStar.surfaceTemperature.unit;
  var uLif =tabStar.lifetime.unit;
  var uHabI=tabStar.habitableZoneInner.unit;
  var uHabO=tabStar.habitableZoneOuter.unit;


  var data = "Name,Mass ["+uMass.symbol+"],Luminosity ["+uLum.symbol+"],Radius ["+
  uRad.symbol+"],Surface Temperature ["+uTem.symbol+"],Lifetime ["+uLif.symbol+
  "],Habitable zone (inner) ["+uHabI.symbol+"],Habitable zone (outer) ["+uHabO.symbol+"],Star Class\n";
  for (star of starEditor.getStarlist()) {
    data+= star.name+",";
    data+= Unit.transform(units.solarMass,uMass,star.mass)+",";
    data+= uLum.convertToUnit(star.getLuminosity())+",";
    data+= uRad.convertToUnit(star.getRadius())+",";
    data+= uTem.convertToUnit(star.getTemperature())+",";
    data+= uLif.convertToUnit(star.getLifetime())+",";
    data+= uHabI.convertToUnit(star.getHabitableInner())+",";
    data+= uHabO.convertToUnit(star.getHabitableOuter())+",";
    data+= star.getClass()+"\n";
  }

  document.getElementById("exportStars").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function updateExportPlanetsData() {
  var uMass=tabPlanet.mass.unit;
  var uRad =tabPlanet.radius.unit;
  var uGrav=tabPlanet.gravity.unit;
  var uDens=tabPlanet.density.unit;
  var uCirc=tabPlanet.circumference.unit;
  var uSurf=tabPlanet.area.unit;
  var uVol =tabPlanet.volume.unit;
  var uEcV =tabPlanet.escapeVelocity.unit;

  var data = "Name,Mass ["+uMass.symbol+"],Radius ["+uRad.symbol+"],Planet Type,"+
  "Gravity ["+uGrav.symbol+"],Density ["+uDens.symbol+"],Circumference ["+uCirc.symbol+
  "],Surface Area ["+uSurf.symbol+"],Volume ["+uVol.symbol+"],Relative Escape Velocity ["+
  uEcV.symbol+"],Crust Composition\n";
  for (planet of planetEditor.getPlanetlist()) {
    data+= planet.name+",";
    data+= Unit.transform(units.earthMass,uMass,planet.mass)+",";
    data+= Unit.transform(units.earthRadius,uRad,planet.radius)+",";
    data+= planetTypes[planet.planetTypeIndex].name+",";
    data+= uGrav.convertToUnit(planet.getGravity())+",";
    data+= uDens.convertToUnit(planet.getDensity())+",";
    data+= uCirc.convertToUnit(planet.getCircumference())+",";
    data+= uSurf.convertToUnit(planet.getSurfaceArea())+",";
    data+= uVol.convertToUnit(planet.getVolume())+",";
    data+= uEcV.convertToUnit(planet.getEscapeVelocity())+",";

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
  var uSMaA= tabOrbit.semiMajorAxis.unit;
  var uSMiA= tabOrbit.semiMinorAxis.unit;
  var uPeri= tabOrbit.periapsis.unit;
  var uApo = tabOrbit.apoapsis.unit;
  var uOPer= tabOrbit.orbitalPeriod.unit;
  var uOVel= tabOrbit.orbitalVelocity.unit;
  var uInc = tabOrbit.inclination.unit;
  var uLotA= tabOrbit.longitudeOfTheAscendingNode.unit;
  var uAoP = tabOrbit.argumentOfPeriapsis.unit;

  var data = "Star Name,Planet Name,Semi Major Axis ["+uSMaA.symbol+"],Semi Minor Axis["+
  uSMiA.symbol+"],Eccentricity,Periapsis["+uPeri.symbol+"],Apoapsis["+uApo.symbol+"],Orbital Period["+uOPer.symbol+
  "],Orbital Velocity["+uOVel.symbol+"],Inclination["+uInc.symbol+"],Longitude of the ascending node["+uLotA.symbol+
  "],Argument of Periapsis["+uAoP.symbol+"]\n";
  for (orbit of orbitEditor.getOrbitlist()) {
    var star = starEditor.getStar(orbit.starIndex)
    var sName = star.name;
    for (object of orbit.objects) {
      data+= sName+",";
      data+= planetEditor.getPlanet(object.planetIndex).name+",";
      data+= Unit.transform(units.au,uSMaA,object.semiMajorAxis)+",";
      data+= uSMiA.convertToUnit(object.getSemiMinorAxis())+",";
      data+= object.eccentricity+",";
      data+= uPeri.convertToUnit(object.getPeriapsis())+",";
      data+= uApo.convertToUnit(object.getApoapsis())+",";
      data+= uOPer.convertToUnit(object.getOrbitalPeriod(star))+",";
      data+= uOVel.convertToUnit(object.getOrbitalVelocity(star))+",";
      data+= Unit.transform(units.degrees,uInc,object.inclination)+",";
      data+= Unit.transform(units.degrees,uLotA,object.longitudeOfTheAscendingNode)+",";
      data+= Unit.transform(units.degrees,uAoP,object.argumentOfPeriapsis)+"\n";
    }
  }

  document.getElementById("exportOrbits").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
}

function updateExportMoonsData() {
  //We don't have any moons
  if(!moonActive) {
    document.getElementById("exportMoons").style.display = "none";
    return;
  }
  document.getElementById("exportMoons").style.display = "initial";

  var uMass = tabMoon.mass.unit;
  var uRad1 = tabMoon.radius.unit;
  var uRad2 = tabMoon.radiusB.unit;
  var uRad3 = tabMoon.radiusC.unit;
  var uDens = tabMoon.density.unit;
  var uGrav = tabMoon.surfaceGravity.unit;
  var uSMaA = tabMoon.semiMajorAxis.unit;
  var uSMiA = tabMoon.semiMinorAxis.unit;
  var uPeri = tabMoon.periapsis.unit;
  var uApo  = tabMoon.apoapsis.unit;
  var uOPer = tabMoon.orbitalPeriod.unit;
  var uOVel = tabMoon.orbitalVelocity.unit;
  var uInc  = tabMoon.inclination.unit;
  var uLotA = tabMoon.longitudeOfTheAscendingNode.unit;
  var uAoP  = tabMoon.argumentOfPeriapsis.unit;

  var data = "Planet Name,Moon Name,Type,Mass ["+uMass.symbol+"],Radius A ["+uRad1.symbol+
  "],Radius B ["+uRad2.symbol+"], Radius C ["+uRad3.symbol+"],Density ["+uDens.symbol+
  "],Composition,Gravity ["+uGrav.symbol+"],Semi Major Axis ["+uSMaA.symbol+"],Semi Minor Axis ["+
  uSMiA.symbol+"],Eccentricity,Periapsis ["+uPeri.symbol+"],Apoapsis ["+uApo.symbol+"],Orbital Period ["+
  uOPer.symbol+"],Orbital Velocity ["+uOVel.symbol+"],Inclination ["+uInc.symbol+
  "],Longitude Of The Ascending Node ["+uLotA.symbol+"],Argument Of Periapsis ["+uAoP.symbol+"]\n";
  var sysList = moonEditor.getSystemlist();
  for (system of sysList) {
    var cPlanet = planetEditor.getPlanet(system.getCenterObject().planetIndex);
    var pName = cPlanet.name;
    for(moon of system.moons) {
      data+= pName + ",";
      data+= moon.name + ",";
      data+= moonTypes[moon.typeIndex].name + ",";
      data+= Unit.transform(units.lunarMass,uMass,moon.mass) + ",";
      data+= Unit.transform(units.lunarRadius,uRad1,moon.radius) + ",";
      data+= Unit.transform(units.lunarRadius,uRad2,moon.radius2) + ",";
      data+= Unit.transform(units.lunarRadius,uRad3,moon.radius3) + ",";
      data+= uDens.convertToUnit(moon.getDensity()) + ",";

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

      data+= uGrav.convertToUnit(moon.getGravity()) + ",";
      data+= Unit.transform(units.lunarDistance,uSMaA,moon.semiMajorAxis) + ",";
      data+= uSMiA.convertToUnit(moon.getSemiMinorAxis()) + ",";
      data+= moon.eccentricity + ",";
      data+= uPeri.convertToUnit(moon.getPeriapsis()) + ",";
      data+= uApo.convertToUnit(moon.getApoapsis()) + ",";
      data+= uOPer.convertToUnit(moon.getOrbitalPeriod(cPlanet)) + ",";
      data+= uOVel.convertToUnit(moon.getOrbitalVelocity(cPlanet)) + ",";
      data+= Unit.transform(units.degrees,uInc,moon.inclination) + ",";
      data+= Unit.transform(units.degrees,uLotA,moon.longitudeOfTheAscendingNode) + ",";
      data+= Unit.transform(units.degrees,uAoP,moon.argumentOfPeriapsis) + "\n";
    }
  }
  document.getElementById("exportMoons").href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(data);
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
/* Data extracted from the planetmaker diagram */

var dataplots =[];
var compositions = [];
dataplots.push(new DataRow([0.23039808044796178, 0.2601628557211933, 0.2937728967420536, 0.3317249675053706, 0.37260544714727767, 0.4207417744046811, 0.4725923350435089, 0.5308327547410544, 0.5962504945833161, 0.6697300592618343, 0.7482994668880446, 0.8405169485934917, 0.939122226701462, 1.049295386798035, 1.1723935154030185, 1.3030277254320854, 1.4558924730896214, 1.6181671386468441, 1.7984717744836087, 1.9988668947504395, 2.2215910861745227, 2.45611658624142, 2.7154865705733577, 3.0180602698738417, 3.336666199844066, 3.6695773642501415, 4.056961645606285, 4.485240713076979, 4.932749279712077, 5.424734659339138, 5.965789959215807, 6.561018238873337, 7.177369557993352, 7.8932301636066144, 8.635006281511997, 9.446190966335164, 10.333908506399817, 11.304690465493847, 12.301871072243165, 13.45752621401632, 14.644607293007315, 15.9358927517386, 17.34158919710134, 18.870680521537256, 20.42700347051452, 22.11168115045914, 23.9345372962525, 25.908492057703555, 28.045244927679786, 30.357255793286882, 32.68768885532491, 35.383542894955774, 38.098615485720735, 41.02332889691884, 43.939712302401574, 47.31282873239857, 50.943266895819534, 54.564867145993475, 58.44393004376083, 62.93049061355833, 67.40427281162019, 72.19380135309977, 76.91850329786367, 82.38670523623222, 88.24364630961742, 94.01872560337738, 100.17175325085998, 107.29304854147381, 114.31481032160455, 121.79223136642429, 129.07885579027106, 137.52638327254576, 146.52675668862494, 155.29320617440658, 165.45632405252252, 175.35529772592366, 186.83137324296317, 198.009180169886, 209.8557364911254, 222.41105235852265, 236.96667779893556, 251.14399570103262, 266.16951869577844, 282.0939934677126, 298.97120279018645, 316.85814716945157, 335.81523735620925, 354.030372874957, 375.21141482510393, 397.6596829017854, 421.4509931134654, 446.66569741291926, 473.38895507515457, 499.0663008610631, 528.9245985223669, 560.5692679296556, 594.1071847009233, 626.3324731279343, 663.8048918933937, 703.5192224682812, 741.6791882821935, 786.0526070738763, 828.7156961454402, 873.6665114528192, 925.9365098691887, 976.1607318008854, 1029.1091928588698, 1084.9296599677807, 1143.7779151577613, 1205.8181903161233, 1271.2236255206053, 1340.1767522333457, 1412.8700027040252, 1481.701639600653, 1562.0714178637165, 1646.8005766426813, 1726.9737631668406, 2539.5267779491687, 2663.246429958567, 2792.904480737352, 2928.874831400461, 3055.2738719210993, 3204.017469348846, 3342.3970325126597, 3505.1189944345724, 3656.3865300278735, 3834.394822855884, 4000.0],[0.5000000166258108, 0.5187304709965307, 0.5381625851857865, 0.5583226440071338, 0.5781795520272717, 0.5987360404334827, 0.620023390410486, 0.642074703510296, 0.6636806628535988, 0.6860136676272734, 0.709106042673136, 0.731620257670793, 0.7562394452132257, 0.7802588005070193, 0.8035522900737627, 0.8290743758028155, 0.8538251832403837, 0.8793246362385514, 0.9055856293224053, 0.9309061963243652, 0.958707670519339, 0.98551355283534, 1.0112178922516644, 1.0395035048057846, 1.0666041975610454, 1.0944235575669108, 1.1229685070584592, 1.1522579709894505, 1.1801380060233633, 1.2086792294910627, 1.2379244333528654, 1.2655466024027824, 1.296167769277194, 1.3250895388742747, 1.3546566483543965, 1.3823377610289704, 1.4131822667923866, 1.4420592944911101, 1.4715263966256005, 1.4988353505470462, 1.5294626170721308, 1.5578467658240507, 1.5867576746885599, 1.6162051194112221, 1.6431729623424256, 1.6705907881029292, 1.698484930750974, 1.7268256866880636, 1.755639333748615, 1.7816526412391933, 1.8080513878991908, 1.8348616220424099, 1.8620487661552827, 1.8861651488828401, 1.9106150525927463, 1.935360443095326, 1.960426324295545, 1.9858388577037573, 2.0078608016251582, 2.0301494595107026, 2.052662785491796, 2.0754487767035297, 2.0984644490955757, 2.1178585869739233, 2.1413445626133196, 2.1611350011457766, 2.18108416913648, 2.201241883563687, 2.217477529475813, 2.2379715935841307, 2.2545031344094264, 2.2753141720077523, 2.292121556530753, 2.3048085206061897, 2.321808040429623, 2.338958867776538, 2.3519050778258515, 2.3692519665742577, 2.3823658498672025, 2.3955523189118724, 2.4087850766551706, 2.4221177769414632, 2.4355242741383414, 2.4490049767140007, 2.4625330008415265, 2.4716114365902397, 2.485291882731989, 2.494454221943879, 2.50823330251755, 2.517480218141385, 2.5267612236756234, 2.5360764447969815, 2.5501137067633146, 2.5594866505489122, 2.5689225180474433, 2.578393172051084, 2.587898740804636, 2.597439353025688, 2.602222840790481, 2.611787311715695, 2.62141599213972, 2.6310801698978086, 2.635925611153727, 2.645643280436157, 2.6505155413600674, 2.655396775121202, 2.6651566868599055, 2.670064883999523, 2.674982120157102, 2.6799084119790484, 2.684843776142425, 2.689788229355008, 2.689788229355008, 2.694741788355343, 2.6997044699128003, 2.6997044699128003, 2.704676290827634, 2.704676290827634, 2.6997044699128003, 2.6997044699128003, 2.694741788355343, 2.694741788355343, 2.689788229355008, 2.684843776142425, 2.6799084119790484, 2.6799084119790484, 2.670064883999523, 2.6651566868599055]));
compositions.push(new Composition([["Iron",1]]));

dataplots.push(new DataRow([0.16257948306584155, 0.1894919288606639, 0.2507213700025281, 0.32997631252628495, 0.4297178432610279, 0.5596259406653193, 0.7249416709995805, 0.9341717378370232, 1.197443383193676, 1.5268200615276568, 1.9365349153991862, 2.45611658624142, 3.082545453177321, 3.8686208904241597, 4.8041002970488655, 5.965789959215811, 7.369572308714649, 9.055394748132745, 11.068554867195417, 13.457526214016335, 16.362639960076606, 19.685693720483712, 23.558773573569113, 28.193866072049254, 33.56303234460062, 39.53456458873703, 46.56855141017863, 54.85402464911093, 64.27304429202361, 74.91480900586292, 86.85548697655959, 100.70259691580331, 116.13813777751635, 133.94387948804518, 153.66518874021477, 175.35529772592386, 200.11337475772254, 228.3669970411424, 259.23591595457526, 295.82751692915133, 335.81523735621, 335.81523735621, 381.20819459677205, 432.7370275744368, 491.231137441935, 554.6748752079665, 629.6516186426952, 710.9953472574794, 802.8477476346251, 911.3706180260087, 1023.6843467049983, 1155.9325601933956, 1298.3851402622697, 1450.7052428622906, 1820.6474790501898, 2034.2368079848818, 2260.9020999127406, 2512.9036308653494, 2792.904480737349, 3104.1044880167674, 3431.7938012492923, 3794.076114305548, 4000.0],[0.5000000166258108, 0.5244829283514122, 0.5718318192674093, 0.6223091841483236, 0.6759974141412317, 0.7316202576707931, 0.7918198949241064, 0.8506984408354084, 0.9156281138208829, 0.9819045622869076, 1.0510310704993087, 1.1229685070584594, 1.195422600251989, 1.2702121981584498, 1.3471998552722086, 1.4288537400890697, 1.5071147460477428, 1.5867576746885605, 1.667519855641035, 1.7459753061482508, 1.824761510352382, 1.9035972035333415, 1.9821884263380136, 2.056443003616315, 2.129557396219183, 2.1971954915897474, 2.2669567525473506, 2.334659320116367, 2.3955523189118724, 2.4580062953283477, 2.517480218141384, 2.5736534887318854, 2.6262436356842076, 2.670064883999523, 2.7146173294428664, 2.754870348078673, 2.7905501373981787, 2.8215271938129387, 2.8475723598714553, 2.873889799268495, 2.8950866779576545, 2.8950866779576545, 2.9164722235770144, 2.9380157408263505, 2.954245004632207, 2.965136198151786, 2.976067543417781, 2.987039188454627, 2.998051281832466, 3.0090706203256583, 3.0146121751184425, 3.0201639353312375, 3.0201639353312375, 3.0257259197585147, 3.0257259197585147, 3.0201639353312375, 3.0201639353312375, 3.0146121751184425, 3.0090706203256583, 2.998051281832466, 2.987039188454627, 2.976067543417781, 2.965136198151786]));
compositions.push(new Composition([["Silicate",0.30],["Iron",0.70]]));

dataplots.push(new DataRow([0.11967459165056152, 0.14246510854985844, 0.19049611004676759, 0.25472038952085047, 0.33702672938225897, 0.44356345605175407, 0.5837772567926572, 0.7562514602600472, 0.9848426512132259, 1.2690844074549175, 1.6267423481893861, 2.0741387921563477, 2.6307240071078315, 3.33666619984407, 4.187544599475017, 5.200309195448284, 6.492029051690601, 8.019382943367585, 9.906386727733342, 12.044522584404453, 14.80023191293909, 17.899769465970344, 21.64911674263652, 25.908492057703615, 31.005882072874943, 36.91056133363892, 43.70808850490758, 51.48462839429615, 60.32700759812409, 70.31318353700846, 81.52040802107811, 94.51696231435515, 109.58202921822809, 125.7164065033495, 144.22633872421895, 165.4563240525227, 187.82145525391005, 213.2097352924279, 242.02981050281699, 274.74556493251265, 310.22964614269216, 350.3077391657672, 393.47828646301497, 444.31114387526696, 501.7110203114195, 566.526298905053, 639.7149641078997, 718.5509189758818, 811.3794120957351, 916.2002761211666, 1034.5627870891276, 1162.0582339164362, 1305.2657179101216, 1466.1215287029581, 2309.209513717355, 2566.513700965757, 2852.488064905481, 3170.428129363809, 3505.1189944345515, 3875.141988350711, 4000.0],[0.5000000166258108, 0.5283572004677647, 0.5792443371625837, 0.6361949505349711, 0.6949062972716612, 0.7576321484265723, 0.8229950420988149, 0.8907132367170908, 0.9640034623292157, 1.0395035048057848, 1.1167870559836641, 1.1998296751075297, 1.2819373687338511, 1.36967910227964, 1.45805099935247, 1.543580895970625, 1.6371374504727974, 1.7300058377605347, 1.8214071764261668, 1.9106150525927463, 2.004169888830363, 2.0946069858300342, 2.1851008902294655, 2.271131618026498, 2.356210269480184, 2.444503138839705, 2.5221164518257475, 2.5974393530256874, 2.670064883999523, 2.7346697766389765, 2.800837849326213, 2.858070291350982, 2.9164722235770153, 2.965136198151786, 3.0090706203256583, 3.0536898653450972, 3.087553734363019, 3.1160890964259083, 3.1390723585462443, 3.162260187649006, 3.179763396099526, 3.1914506175297306, 3.2032162991943154, 3.215025356515185, 3.2209462009955288, 3.2268779494021165, 3.2328206218158027, 3.2328206218158027, 3.2387742383544174, 3.2447388191728486, 3.250714384463097, 3.250714384463097, 3.256664857792379, 3.262662386274859, 3.262662386274859, 3.256664857792379, 3.250714384463097, 3.2387742383544174, 3.2268779494021165, 3.215025356515184, 3.2091153959171446]));
compositions.push(new Composition([["Silicate",0.675],["Iron",0.325]]));

dataplots.push(new DataRow([0.1, 0.10322202417420118, 0.11967459165056152, 0.13802252549056349, 0.15834435668859007, 0.1826151388009116, 0.20950259077098907, 0.2403411807792567, 0.27572796194683047, 0.3163249375444294, 0.3609747533321528, 0.4119400840945022, 0.470101111829392, 0.5364737831449599, 0.6089708513926286, 0.6912869131521853, 0.7847298359234104, 0.8861078820036843, 1.0005828026471133, 1.1298465630271746, 1.2758097107077067, 1.4330354790837003, 1.6096371324635095, 1.8080024786699767, 2.0201083588993765, 2.257097448614742, 2.5218889224926673, 2.817744418299054, 3.131712221184568, 3.4807747808911396, 3.868620890424169, 4.299682839575926, 4.753585123554292, 5.255404263516649, 5.810383668452896, 6.423765286656504, 7.064462476799384, 7.769309257446553, 8.544209084645553, 9.396396315691623, 10.333908506399837, 11.304690465493861, 12.367062806576644, 13.52884215193974, 14.800231912939072, 16.105239542891333, 17.618749451818594, 19.172279328924038, 20.863455676683376, 22.703086907153466, 24.575480174895002, 26.743269934973785, 28.947947798581886, 31.33537391357067, 33.74089409223114, 36.522446328900855, 39.32616208670666, 42.345110471039675, 45.594362507053916, 49.09450133885446, 52.58467127033073, 56.32296035605813, 60.00899981293051, 64.27304429202361, 68.84226977501929, 73.34763172842511, 78.14784576032184, 83.26220837764714, 88.71127894151923, 94.51696231435483, 100.17175325085987, 106.72746397012129, 113.11278869021919, 119.88013665217457, 127.05236366422218, 134.6536929591743, 142.70979700513377, 150.45059612064324, 159.45180232218434, 168.10071358324882, 177.21875510758008, 186.83137324296337, 196.96539458626677, 207.64910085027657, 218.91230779142512, 229.57719023161005, 242.02981050281699, 253.8128408326998, 266.16951869577906, 279.1277716695224, 294.2680917694508, 308.604127217987, 323.62827562095504, 355.9064983748031, 373.23352538953435, 710.9953472574778, 749.5608295907189, 976.1607318008854, 1029.1091928588698, 1205.8181903161203, 1271.2236255206026, 1412.8700027040202, 1489.553672765606, 1745.3258862485663, 1839.9950495440805, 2358.5490846545686, 2486.4804183928027, 2734.478429889071, 2867.6043543727337, 2991.4544399858423, 3137.091038732035, 3289.817840361097, 3431.793801249288, 3598.867974310931, 3754.30089030892, 3916.3221638960604, 4000.0],[0.5046154544960664, 0.5092791416527679, 0.5342223345811744, 0.559350860328452, 0.5856678625459742, 0.612095812386879, 0.6397163093649226, 0.668583166533439, 0.6987448803881698, 0.7302753703320978, 0.7618256659222293, 0.7932781236888616, 0.8275503452430226, 0.8617162882504812, 0.8956433621738096, 0.9326205687485379, 0.9693392514632263, 1.005651579494342, 1.0433357644245258, 1.0824200689826968, 1.1229685070584594, 1.162894320786992, 1.2042529971954539, 1.2447763835774537, 1.2866633910986067, 1.3275298459363347, 1.372201526227601, 1.413182266792387, 1.45805099935247, 1.5015956308024567, 1.5464235803710304, 1.5896798741669513, 1.634128012986943, 1.679837560052275, 1.726825686688064, 1.771845421744724, 1.814716995365084, 1.8620487661552827, 1.9071028999884247, 1.9532471636894577, 2.000485760787403, 2.0451231832161363, 2.0907566134746354, 2.137408275776196, 2.181084169136481, 2.225652537594967, 2.2711316180264984, 2.3175400199590093, 2.3605495057292263, 2.4043571722645174, 2.4490049767140007, 2.489868837839387, 2.5360764447969815, 2.578393172051084, 2.616597222921237, 2.6602575121224423, 2.6997044699128003, 2.7397059902476073, 2.7751893779132364, 2.811163488190335, 2.8475723598714553, 2.884452782190829, 2.9164722235770153, 2.948814418668414, 2.9815483191920276, 3.0090706203256583, 3.0424734067915313, 3.0705580998195723, 3.0989363871796676, 3.121827738234579, 3.1506449412112847, 3.1739182551447422, 3.1973280463763794, 3.2209462009955288, 3.2387742383544174, 3.262662386274859, 3.280721324016189, 3.2988802185393533, 3.3171396231082486, 3.3293317709069576, 3.3477597257649196, 3.360101660497206, 3.3724890953147493, 3.3849221979592983, 3.3973634806346356, 3.403620122054671, 3.4098882858102133, 3.4224592652457946, 3.4287621234825942, 3.435076589168563, 3.435076589168563, 3.441402683680172, 3.447740428433263, 3.447740428433263, 3.4540898448831157, 3.4540898448831157, 3.460412599535803, 3.460412599535803, 3.466785353267948, 3.466785353267948, 3.4731698431699756, 3.4731698431699756, 3.479566090855412, 3.479566090855412, 3.4859741179775874, 3.4859741179775874, 3.479566090855412, 3.479566090855412, 3.4731698431699756, 3.466785353267948, 3.466785353267948, 3.460412599535803, 3.4540898448831157, 3.447740428433263, 3.441402683680172, 3.435076589168563, 3.4287621234825942]));
compositions.push(new Composition([["Silicate",1]]));


dataplots.push(new DataRow([0.1, 0.12750665985188442, 0.16693319839338785, 0.21739188923313335, 0.28161928504117667, 0.3648107427628214, 0.4676230208492161, 0.5962504945833164, 0.7602590899935276, 0.9642709770586868, 1.2101683178860705, 1.5268200615276568, 1.9060713168396752, 2.3669824567436026, 2.9393474950461314, 3.611851303739357, 4.4146834659860925, 5.424734659339144, 6.59578727160616, 8.019382943367589, 9.648022375092731, 11.668930325110694, 13.964744716564773, 16.712251214592257, 19.790014803647356, 23.434585855591852, 27.75034883358908, 32.51537897373379, 38.098615485720735, 44.40664875826929, 51.484628394296095, 59.692668373961695, 68.47937463716168, 78.14784576032184, 89.65399176356428, 102.30880882589263, 116.1381377775162, 131.83681054661758, 148.86860625876096, 168.10071358324882, 188.81678404098056, 212.085821503205, 236.96667779893585, 264.76643270665835, 295.82751692915133, 328.79016425803496, 365.43731707300304, 406.1562519730844, 453.80448827351177, 504.36975501577683, 560.5692679296556, 623.0308241566952, 692.4742208982933, 773.7118607204739, 859.9228780857422, 1067.862649523635, 1186.84948441082, 1319.136453887908, 1466.1215287029563, 1629.4844483988054, 1801.503348497119, 2213.6757320889733, 2434.4645931613086, 2677.274620417554, 2959.9992598910617, 3238.065770607149, 3542.3670271342694, 3875.141988350711, 4000.0],[0.5511839676423876, 0.596536832826233, 0.6480016151174459, 0.7065014368066437, 0.7632286568130846, 0.8290743758028155, 0.8939969624122597, 0.9622420661947004, 1.035685321397489, 1.110639631096736, 1.1866569537474772, 1.2678772541969492, 1.3496808810628274, 1.4314851410399456, 1.518247563382922, 1.6073086162504673, 1.6891355131718333, 1.7849337625483592, 1.8758034247419397, 1.971277344948448, 2.06023018345377, 2.157162334902901, 2.254503134409426, 2.351905077825851, 2.440009576385197, 2.5360764447969806, 2.6310801698978072, 2.714617329442866, 2.811163488190335, 2.8950866779576545, 2.9760675434177806, 3.0536898653450963, 3.1218277382345767, 3.1914506175297293, 3.2626623862748576, 3.3232116886674845, 3.384922197959297, 3.435076589168561, 3.4859741179775874, 3.5246708665024733, 3.5703207512693247, 3.6032779373821815, 3.629894779391029, 3.6567082357856773, 3.6836789292671472, 3.7040682066629738, 3.7177237171521957, 3.724570339343071, 3.738301433507388, 3.7451859519649435, 3.7520415616816543, 3.758951384189114, 3.7520415616816543, 3.758951384189114, 3.772809228373229, 3.772809228373229, 3.779757296963088, 3.786718161232295, 3.786718161232295, 3.79369184474559, 3.786718161232295, 3.786718161232295, 3.772809228373229, 3.765873931941299, 3.758951384189114, 3.738301433507388, 3.7177237171521957, 3.7040682066629738, 3.690462854007122]));
compositions.push(new Composition([["Water",0.25],["Silicate",0.525],["Iron",0.225]]));


dataplots.push(new DataRow([0.1, 0.12287935706229486, 0.16257948306584155, 0.16257948306584155, 0.21284416851373927, 0.2786580548079082, 0.36097475333215284, 0.470101111829392, 0.602586701130005, 0.7723852639205271, 0.984842651213226, 1.2491204617396026, 1.575964394424234, 1.977848784857331, 2.4561165862414214, 3.050132449962582, 3.787691434219866, 4.654290881872987, 5.688833585375433, 6.9535529285519075, 8.454366621416801, 10.225247331819746, 12.367062806576651, 14.80023191293909, 17.712117105145946, 21.085166460399464, 25.10057053166096, 29.566462192971116, 34.826924969921954, 40.807078522779946, 47.31282873239863, 55.1447144946674, 63.59923737391225, 72.960987025765, 83.26220837764733, 95.52137069779444, 108.42977283814214, 123.08648728860862, 138.98784213580913, 156.943468670719, 176.28456416971764, 198.00918016988624, 221.2386347469239, 245.890199173343, 273.29727117363694, 303.74948082322265, 335.8152373562096, 373.2335253895339, 412.6476045805298, 456.20935022216355, 504.36975501577683, 560.5692679296556, 619.7663121800582, 688.8239123207736, 765.5762710236639, 850.8807784848768, 945.6903597951919, 1168.216369635839, 1305.26571791012, 1450.705242862282, 1612.3503994556231, 1981.2458044424122, 2190.3989046389056, 2408.866168131442, 2663.2464299585486, 2913.4355607432985, 3204.017469348827, 3505.1189944345515, 3834.3948228558615, 4000.0],[0.604269595851068, 0.6456214509294931, 0.7039063978755762, 0.7039063978755762, 0.7674531511566516, 0.8321308621317537, 0.9022593374833838, 0.9782979446171057, 1.052966666901317, 1.1333470512688795, 1.2176075510498803, 1.3009462537924943, 1.3899736371343268, 1.4796549405800319, 1.5722270552639617, 1.6675198556410344, 1.7621117176248537, 1.8620487661552827, 1.960426324295545, 2.06402433782497, 2.169102295490865, 2.271131618026498, 2.3779865101290887, 2.485291882731989, 2.592664658418358, 2.6947417883553437, 2.800837849326213, 2.905759776910568, 3.003539252192961, 3.1046434402720435, 3.1973280463763794, 3.2867631552893033, 3.372489095314748, 3.4540898448831157, 3.5246708665024746, 3.603277937382183, 3.670189147821794, 3.7314295703879106, 3.786718161232297, 3.8428259631109247, 3.885484016466088, 3.9285720599829017, 3.964880165287791, 4.001479480202594, 4.023627793527986, 4.045898698456207, 4.060814409785635, 4.075739934512521, 4.0832458853584965, 4.09076565928912, 4.09829928176121, 4.105846778278473, 4.1134081743915845, 4.1134081743915845, 4.120983495698271, 4.120983495698271, 4.128572767843404, 4.128572767843404, 4.136176016519077, 4.136176016519077, 4.128572767843404, 4.128572767843404, 4.120983495698271, 4.105846778278473, 4.090765659289119, 4.075739934512518, 4.0533496931826525, 4.031037773783348, 4.001479480202593, 3.9867817110374966]));
compositions.push(new Composition([["Water",0.45],["Silicate",0.485],["Iron",0.065]]));


dataplots.push(new DataRow([0.1, 0.11291884689983529, 0.1494056668484811, 0.19559740461671452, 0.2560702381630157, 0.333482889192762, 0.43199506201187554, 0.5596259406653193, 0.7135603446070374, 0.9098369614360293, 1.1539506125030985, 1.4558924730896214, 1.8368402167586895, 2.2931712880229655, 2.86277874311366, 3.5550333309267756, 4.3915517259678, 5.396138713295022, 6.665666837423443, 8.104602942625919, 9.854166201173431, 11.981031088583935, 14.414233219145686, 17.34158919710139, 20.644076184575063, 24.705713873921013, 29.255570480694317, 34.46071942708194, 40.591968090853655, 47.31282873239857, 55.1447144946674, 63.936271030202604, 73.73632539084034, 84.59293848663435, 97.04494176727904, 110.74653034189964, 125.71640650334967, 142.70979700513442, 160.2967908182384, 181.00528780939578, 202.23993010105374, 227.1631832630062, 253.8128408327004, 282.093993467714, 313.5263798690764, 346.63528548447897, 385.2591998038093, 425.9296485878582, 470.89353255823966, 520.6206704497456, 575.5807501161787, 636.3427706743003, 1180.6307160833185, 1312.1827580430327, 1450.705242862289, 1612.3503994556306, 1773.2203866717487, 1960.4129805298348, 2167.3668333147284, 2383.5369108544683, 2621.350944644994, 2867.6043543727305, 3137.0910387320314, 3431.7938012492846, 3734.5104687612275, 4000.0],[0.6588141076443966, 0.6834938819877939, 0.7465702177305527, 0.810978769904226, 0.880944015198768, 0.9551862569752196, 1.0318811624965396, 1.112685003621125, 1.1954226002519888, 1.2819373687338507, 1.36967910227964, 1.4607361704644426, 1.55498308296533, 1.6522679757737901, 1.7524120623786403, 1.8552093051323013, 1.960426324295545, 2.0716336215699283, 2.185100890229465, 2.300571749186889, 2.4176653639623464, 2.5314145494150377, 2.650515541360066, 2.765026522003051, 2.8844527821908272, 2.9980512818324643, 3.110361003568867, 3.2268779494021165, 3.3354631239922625, 3.4414026836801708, 3.544140746301414, 3.6365796543408444, 3.731429570387909, 3.8146900470487926, 3.8998083390169276, 3.97949719166657, 4.0533496931826525, 4.120983495698271, 4.182044106939138, 4.236207981752533, 4.283232850389279, 4.322770839284196, 4.362722154022793, 4.394948889878338, 4.419226086203716, 4.4436866399807, 4.460068846284006, 4.476511447638787, 4.49301466669895, 4.501289077672265, 4.509528743615264, 4.517833567188889, 4.517833567188889, 4.509528743615264, 4.509528743615264, 4.49301466669895, 4.4847554660077975, 4.468282583683296, 4.451870207634805, 4.435518115617711, 4.411102525999017, 4.386869956778498, 4.354702461121081, 4.3307317263769525, 4.29112092366026, 4.267500177504949]));
compositions.push(new Composition([["Water",0.75],["Silicate",0.22],["Iron",0.03]]));


dataplots.push(new DataRow([0.1, 0.10376903224620981, 0.118419982215696, 0.13442281740039178, 0.15340171630558463, 0.1741373970439244, 0.19663394076338725, 0.22321342576646847, 0.252050026501116, 0.28460292180113805, 0.3213703375410851, 0.3609747533321528, 0.40545986148006014, 0.4554271393051086, 0.5115521878257117, 0.5715831509720222, 0.6386384502824525, 0.7135603446070374, 0.7972717038420137, 0.886107882003684, 0.9900616622157896, 1.100379504667489, 1.2229895374217208, 1.3665081101040846, 1.5187715823226209, 1.6791029173951555, 1.8661973360264417, 2.0851303481818424, 2.317466464224528, 2.5757726938213117, 2.86277874311366, 3.1986257413195593, 3.5550333309267756, 3.951153716028853, 4.4146834659860925, 4.906746785376437, 5.424734659339144, 6.029186933707501, 6.665666837423443, 7.369572308714658, 8.147551947603377, 9.007660140656592, 9.958566908363247, 10.952168877128946, 12.044522584404431, 13.24624783893446, 14.490619067861253, 15.935892751738606, 17.43348808542642, 19.07121457651462, 20.863455676683376, 22.70308690715344, 24.705713873920956, 26.884135489105088, 29.255570480694246, 31.836188465041815, 34.46071942708189, 37.30280074054713, 40.377991592048694, 43.70808850490752, 47.31282873239857, 50.943266895819534, 55.1447144946674, 59.3780044445264, 63.936271030202604, 68.84226977501929, 73.73632539084034, 79.39683606855475, 85.04122479527169, 91.08397781921825, 97.55921541109689, 104.49478316065154, 111.33341329181879, 118.61959554622463, 126.38261984000343, 134.65369295917478, 143.46606400862547, 152.04939739754477, 161.14625719129322, 170.78736681123962, 181.00528780939555, 191.83452984068128, 203.311667214647, 215.47546242028818, 227.16318326300595, 240.75397457040063, 253.8128408326998, 267.58004010740683, 282.093993467714, 298.9712027901879, 315.1878611464308, 330.53253344024347, 348.46112696497, 367.37389178999257, 387.30081731513286, 406.1562519730859, 428.1867924265821, 449.0327285182394, 473.38895507515673, 496.4355227847042, 523.3629498872808, 548.8599371988132, 575.5807501161787, 606.8011362067231, 636.3427706743003, 737.7929911646652, 773.7118607204757, 850.8807784848798, 892.3052377247261, 1029.109192858871, 1079.2105618060493, 1131.7510763636253, 1186.8494844108227, 1244.6699439050208, 1298.3851402622668, 1361.5959962134239, 1427.8842228045985, 1497.3996393969355, 1562.071417863709, 1638.1196321555472, 1708.8146128841963, 1792.0069038252623, 1869.4025906185293, 1950.0788596306786, 2045.0169100342844, 2133.2720216920316, 2225.4067410858443, 2321.4467882144268, 2421.6315566122335, 2526.1399166038154, 2635.2423611111963, 2748.969346782525, 2867.6043543727305, 2991.4544399858387, 3120.55417716874, 3255.2253654551287, 3377.808310014947, 3523.6937937435864, 3675.762946662883, 3814.182194155694, 3978.9144001763216, 4000.0],[0.6987448803881698, 0.7065014368066438, 0.7356697985424302, 0.7660423946675976, 0.7976689427657974, 0.8290743758028157, 0.8617162882504813, 0.8956433621738098, 0.9291949753134336, 0.964003462329216, 0.9982885272249916, 1.0337814921076134, 1.0705363672714852, 1.1086103060688712, 1.1459152942104986, 1.184475603660821, 1.222096413499877, 1.260898143770965, 1.3009462537924945, 1.34225147740597, 1.3823377610289707, 1.423605440667214, 1.4661213569634068, 1.5098902737764117, 1.5549830829653306, 1.5984788016922122, 1.6461990571583252, 1.6922462533902427, 1.7427657994973698, 1.7915141439984636, 1.8449971883355276, 1.8966051316211199, 1.9532471636894577, 2.0078608016251582, 2.0678254795743327, 2.1256427769215738, 2.181084169136481, 2.242093079509643, 2.3048085206061897, 2.364896733188336, 2.426578389558806, 2.485291882731989, 2.5501137067633146, 2.611787311715695, 2.6749821201571025, 2.7346697766389765, 2.800837849326213, 2.8633337614118592, 2.9218432476132796, 2.9870391884546272, 3.0480764767146633, 3.110361003568868, 3.168083858911664, 3.2328206218158027, 3.292816113299964, 3.3477597257649196, 3.4098882858102133, 3.466785353267948, 3.5246708665024746, 3.5834831850444773, 3.6365796543408457, 3.69725927213639, 3.7520415616816574, 3.8006783711111045, 3.8569930214153914, 3.9069469869466125, 3.9575917980264523, 4.008848671753622, 4.060814409785635, 4.105846778278475, 4.151378532856821, 4.19746173533647, 4.236207981752535, 4.2832328503892825, 4.322770839284198, 4.354702461121083, 4.394948889878342, 4.427364606892792, 4.460068846284008, 4.493014666698953, 4.526153685064539, 4.551206086425502, 4.576397153606853, 4.6016766494428305, 4.62714707275957, 4.652758475661218, 4.678511638474165, 4.695707509572533, 4.713018822316704, 4.73039395537939, 4.747833144042179, 4.765336624454044, 4.7829046336345575, 4.791659800374207, 4.809324853233405, 4.818181786337758, 4.82705503051828, 4.835944615813727, 4.8448505723181645, 4.85377293018109, 4.862711719607514, 4.862711719607514, 4.871666970858084, 4.871666970858084, 4.880638714249166, 4.880638714249166, 4.889572784445495, 4.889572784445495, 4.880638714249166, 4.880638714249166, 4.871666970858084, 4.871666970858084, 4.862711719607514, 4.862711719607514, 4.85377293018109, 4.85377293018109, 4.8448505723181645, 4.835944615813727, 4.82705503051828, 4.818181786337758, 4.809324853233405, 4.8004842012216935, 4.791659800374203, 4.782904633634554, 4.7741125481004, 4.756576832986194, 4.747833144042177, 4.730393955379388, 4.721698396623423, 4.704355203076103, 4.695707509572531, 4.678511638474163, 4.66132707350545, 4.64420562888269, 4.627147072759565, 4.610151174141356, 4.593268613808772, 4.576397153606849, 4.5595876636908566, 4.534489125408449, 4.517833567188887, 4.517833567188887]));
compositions.push(new Composition([["Water",1]]));

dataplots.push(new DataRow([0.1, 0.13585129543667737, 0.19150561272524613, 0.26853681563372794, 0.37458000818591797, 0.5197280206785981, 0.7173417398227193, 0.9848426512132259, 1.3450115937420508, 1.8175836892493682, 2.4432472036989807, 3.249747464659503, 4.2996828395759215, 5.658845468264241, 7.369572308714658, 9.496249495507218, 12.172516747167144, 15.438953340438227, 19.478698409777504, 24.317068699699533, 30.039005285726418, 36.91056133363883, 45.11637368261689, 54.564867145993475, 65.64633000272175, 78.56197736433728, 93.03011755151961, 110.16274108673684, 129.762887871678, 151.24788421080538, 176.28456416971764, 205.47221002094489, 236.96667779893585, 274.7455649325116, 316.85814716945197, 363.51095081589216, 417.0194307562709, 475.8976016716298, 543.0886682332459, 616.499276069351, 699.8106912699724, 790.2181630638188, 892.305237724724, 1002.2694239585561, 1119.8506999267893, 1251.2658667397968, 1390.688446181221, 1545.6462177627043, 1717.8701937477942, 1909.2842648291908, 2110.907849242088, 2333.7489121269373, 2580.1145165143816, 2867.6043543727205, 3170.428129363809, 3505.1189944345515, 3875.141988350711, 4000.0],[1.392533435837181, 1.5351011722080028, 1.7141634335725318, 1.9106150525927463, 2.121758870777105, 2.3519050778258515, 2.602222840790481, 2.8686069247672528, 3.1506449412112847, 3.447740428433263, 3.765873931941299, 4.09829928176121, 4.443686639980702, 4.8004842012216935, 5.166939073321437, 5.540879249451671, 5.920122699695235, 6.3020898867576935, 6.671773180916875, 7.0501585656211025, 7.422721621633046, 7.7719546258727465, 8.122569901954186, 8.457915373005584, 8.774853817233405, 9.070129637604557, 9.358107508936536, 9.619870878894494, 9.87077805871045, 10.109611414623375, 10.31619165250454, 10.507642110429776, 10.663333840482291, 10.841381365566463, 11.001896165760733, 11.1445110910967, 11.268222951405969, 11.372238513828089, 11.477214230950077, 11.561994590166233, 11.604618042345892, 11.668849963987627, 11.69020993975972, 11.711738825948949, 11.69020993975972, 11.668849963987627, 11.64739991745165, 11.604618042345892, 11.540740968534866, 11.456116455238066, 11.37223851382808, 11.288974699298064, 11.206196306458942, 11.103576368755817, 10.981793854787814, 10.88122886641639, 10.761885029583581, 10.722355724803007]));
compositions.push(new Composition([["Hydrogen",0.75],["Helium",0.25]]));

dataplots.push(new DataRow([0.1, 0.12954452258297697, 0.18261513880091157, 0.25742724010515905, 0.36097475333215284, 0.5008667398426986, 0.6949502739958944, 0.9591879190727242, 1.309932905693418, 1.7795608217358176, 2.392135793930849, 3.2155763302450753, 4.254471621827975, 5.629015430512269, 7.3695723087146625, 9.546573301588417, 12.301871072243186, 12.301871072243202, 15.68570490350249, 19.790014803647345, 24.836637724929428, 31.00588207287491, 38.098615485720735, 46.815333758489544, 56.9214905264798, 68.47937463716184, 82.38670523623242, 98.07621436316778, 116.13813777751648, 136.80142670182508, 160.2967908182384, 187.82145525391024, 217.76526686999773, 252.47489183472217, 291.1831301312132, 335.8152373562108, 387.30081731513286, 444.31114387526753, 507.04257924566423, 578.6309452554937, 660.3057108155283, 745.6095946666552, 846.3954455866808, 955.7399773692023, 1073.5216112981159, 1199.4618403608422, 1340.1767522333457, 1497.3996393969428, 1664.300719098924, 1839.9950495440848, 2045.0169100342941, 2260.9020999127406, 2499.657110776372, 2763.5370558971767, 3055.2738719210993, 3377.8083100149547, 3734.5104687612447, 4000.0],[1.4688213905809642, 1.5955404277488592, 1.7849337625483597, 1.9894960117649723, 2.213425825823883, 2.4580062953283477, 2.719616614129287, 3.0035392521929603, 3.3110419528578285, 3.6298947793910314, 3.972181954928204, 4.330731726376954, 4.704355203076107, 5.091441910649682, 5.49019989808703, 5.898442970576042, 6.313695920920075, 6.313695920920075, 6.733434120190605, 7.154700064361765, 7.574397837012059, 7.989261848369031, 8.395989280260318, 8.774853817233398, 9.15395633518907, 9.51436144474713, 9.852633284430281, 10.184176628225101, 10.488326632645096, 10.781584794702114, 11.042456031322219, 11.288974699298064, 11.477214230950073, 11.668849963987627, 11.885403392260162, 12.061509410819381, 12.217859846975687, 12.353349704748316, 12.49048051834195, 12.60577858811219, 12.67541147106167, 12.769042723045393, 12.816117395301204, 12.863365614221099, 12.887055003525996, 12.887055003525996, 12.863365614221099, 12.839719771495728, 12.769042723045382, 12.722281971387106, 12.628993600840662, 12.559476507906341, 12.444464003968465, 12.330641389287933, 12.217859846975687, 12.105975673070983, 11.995249023540033, 11.885403392260162]));
compositions.push(new Composition([["Hydrogen",1]]));

var interpolator = new DataInterpolator(dataplots,compositions);
/* Save, Load and Init */
function init() {
  var typeSelector = tabPlanet.typeSelector;
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

  typeSelector = tabMoon.typeSelector;
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
/*Collection of fields*/
//Default & Test Callbackfunctions
var updatePrinter = function(x) {console.log(x);};
var updateIgnorer  = function(x) {return;};
var unitText = function(x) {return x.symbol;};
var defaultDescription = function(x) {return "";};

// TODO: Replace hard coded Functions
/*  var callback = function(x) {
    var conv = unit.convertToUnit(x);
    callfunc(conv);
  };
  return callback;
}*/

//Star
var starMassText = function(x) {
  var limit = roundExp(Unit.transform(units.solarMass,x,0.08));
  return "At least "+limit+x.symbol;
}

var starMassCallback = function(x) {
  var solarMass = units.solarMass.convertToUnit(x);
  starEditor.updateMass(solarMass);
}

var tabStar = {
  name              : document.getElementById("star-name"),
  mass              : generateField("star-mass"           , "Mass"                  , starMassCallback  , starMassText      , units.getMassUnits()       ,3),
  luminosity        : generateField("star-luminosity"     , "Luminosity"            , undefined         , defaultDescription, units.getLuminosityUnits() ,1),
  radius            : generateField("star-radius"         , "Radius"                , undefined         , defaultDescription, units.getLengthUnits()     ,4),
  surfaceTemperature: generateField("star-temperature"    , "Temperauture"          , undefined         , defaultDescription, units.getTemperatureUnits(),3),
  lifetime          : generateField("star-lifetime"       , "Lifetime"              , undefined         , defaultDescription, units.getTimeUnits()       ,3),
  habitableZoneInner: generateField("star-habitable-inner", "Habitable zone (inner)", undefined         , defaultDescription, units.getLengthUnits()     ,2),
  habitableZoneOuter: generateField("star-habitable-outer", "Habitable zone (outer)", undefined         , defaultDescription, units.getLengthUnits()     ,2),
  starClass         : document.getElementById("star-class"),
  habitability      : document.getElementById("star-habitability")
};

//Planet
var planetMassText = function(x) {
  var lowerMass = roundExp(Unit.transform(units.earthMass, x, 0.1));
  var upperMass = roundExp(Unit.transform(units.earthMass, x, 4000));
  var sym = " "+x.symbol;
  return "Between "+lowerMass+sym+" and "+upperMass+sym;
}

var planetMassCallback = function(x) {
  var earthMass = units.earthMass.convertToUnit(x);
  planetEditor.updateMass(earthMass);
}

var planetRadiusText = function(x) {
  var lowerRad = roundExp(Unit.transform(units.earthRadius, x, 0.5));
  var upperRad = roundExp(Unit.transform(units.earthRadius, x, 20));
  var sym = " "+x.symbol;
  return "Between "+lowerRad+sym+" and "+upperRad+sym;
}

var planetRadiusCallback = function(x) {
  var earthRadius = units.earthRadius.convertToUnit(x);
  planetEditor.updateRadius(earthRadius);
}


var tabPlanet = {
  name          : document.getElementById("planet-name"),
  mass          : generateField("planet-mass"           , "Mass"                    , planetMassCallback  , planetMassText    , units.getMassUnits()    ,5),
  radius        : generateField("planet-radius"         , "Radius"                  , planetRadiusCallback, planetRadiusText  , units.getLengthUnits()  ,6),
  typeSelector  : document.getElementById("planet-typeselector"),
  gravity       : generateField("planet-gravity"        , "Gravity"                 , undefined           , defaultDescription, units.getGravityUnits() ,4),
  density       : generateField("planet-density"        , "Density"                 , undefined           , defaultDescription, units.getDensityUnits() ,4),
  circumference : generateField("planet-circumference"  , "Circumference"           , undefined           , defaultDescription, units.getLengthUnits()  ,11),
  area          : generateField("planet-area"           , "Surface Area"            , undefined           , defaultDescription, units.getAreaUnits()    ,5),
  volume        : generateField("planet-volume"         , "Volume"                  , undefined           , defaultDescription, units.getVolumeUnits()  ,5),
  escapeVelocity: generateField("planet-escape-velocity", "Relative Escape Velocity", undefined           , defaultDescription, units.getVelocityUnits(),8),
  habitability  : document.getElementById("planet-habitability"),
  composition   : document.getElementById("planet-composition")
};


var orbitSemiMajorAxisCallback = function(x) {
  var auAxis = units.au.convertToUnit(x);
  orbitEditor.updateSemiMajorAxis(auAxis);
};

var orbitEccentricityText = function(x) {
  return "Less than 1";
};

var orbitEccentricityCallback = function(x) {
  orbitEditor.updateEccentricity(x);
};

var orbitInclinationCallback = function(x) {
  var inclinationDegree = units.degrees.convertToUnit(x);
  orbitEditor.updateInclination(x);
};

var orbitInclinationText = function(x) {
  var lower = Unit.transform(units.degrees,x,0);
  var upper = round(Unit.transform(units.degrees,x,180));
  return "Between "+lower+" and "+upper;
};

var orbitLotanCallback = function(x) {
  var LotanDegree = units.degrees.convertToUnit(x);
  orbitEditor.updateLongitudeOfTheAscendingNode(x);
};

var orbitAopCallback = function(x) {
  var AopDegree = units.degrees.convertToUnit(x);
  orbitEditor.updateArgumentOfPeriapsis(x);
};

var orbitAngleText = function(x) {
  var lower = round(Unit.transform(units.degrees,x,0));
  var upper = round(Unit.transform(units.degrees,x,360));
  return "Between "+lower+" and "+upper;
};

//Orbit
var tabOrbit = {
  starSelector                : document.getElementById("orbit-starselector"),
  boundaries                  : generateRangeField("orbit-boundaries", "System Boundaries", defaultDescription, units.getLengthUnits()   ,2),
  habitableZone               : generateRangeField("orbit-habitable", "Habitable Zone", defaultDescription, units.getLengthUnits()   ,2),
  planetSelector              : document.getElementById("object-planetselector"),
  frostline                   : generateField("orbit-frostline"                       , "Frost line"                      , undefined                     , defaultDescription      , units.getLengthUnits()   ,2),
  semiMajorAxis               : generateField("object-semi-major-axis"                , "Semi Major Axis"                 , orbitSemiMajorAxisCallback    , defaultDescription      , units.getLengthUnits()   ,2),
  semiMinorAxis               : generateField("object-semi-minor-axis"                , "Semi Minor Axis"                 , undefined                     , defaultDescription      , units.getLengthUnits()   ,2),
  eccentricity                : generateField("object-eccentricity"                   , "Eccentricity"                    , orbitEccentricityCallback     , orbitEccentricityText   , []                       ,0),
  periapsis                   : generateField("object-periapsis"                      , "Periapsis"                       , undefined                     , defaultDescription      , units.getLengthUnits()   ,2),
  apoapsis                    : generateField("object-apoapsis"                       , "Apoapsis"                        , undefined                     , defaultDescription      , units.getLengthUnits()   ,2),
  orbitalPeriod               : generateField("object-orbital-period"                 , "Orbital Period"                  , undefined                     , defaultDescription      , units.getTimeUnits()     ,6),
  orbitalVelocity             : generateField("object-orbital-velocity"               , "Orbital Velocity"                , undefined                     , defaultDescription      , units.getVelocityUnits() ,4),
  inclination                 : generateField("object-inclination"                    , "Inclination"                     , orbitInclinationCallback      , orbitInclinationText    , units.getAngleUnits()    ,0),
  longitudeOfTheAscendingNode : generateField("object-longitude-of-the-ascending-node", "Longitude of the ascending node" , orbitLotanCallback            , orbitAngleText          , units.getAngleUnits()    ,0),
  argumentOfPeriapsis         : generateField("object-argument-of-periapsis"          , "Argument of Periapsis"           , orbitAopCallback              , orbitAngleText          , units.getAngleUnits()    ,0),
  orbitalAnalysis             : document.getElementById("orbit-analysis")
};

var moonMassCallback = function(x) {
  var lunarMass = units.lunarMass.convertToUnit(x);
  moonEditor.updateMass(lunarMass);
}


var tabMoon = {};

var moonRadiusText = function(x) {
  var maxRad = round(x.convertToUnit(tabMoon.allowedMaxRad));
  return "less than "+maxRad;
}

var moonRadiusCallback = function(x) {
  var lunarRadius = units.lunarRadius.convertToUnit(x);
  moonEditor.updateRadius(lunarRadius);
}

var moonRadius2Callback = function(x) {
  var lunarRadius = units.lunarRadius.convertToUnit(x);
  moonEditor.updateRadiusB(lunarRadius);
}

var moonRadius3Callback = function(x) {
  var lunarRadius = units.lunarRadius.convertToUnit(x);
  moonEditor.updateRadiusC(lunarRadius);
}

var moonSmaCallback = function(x) {
  var lunarDistance = units.lunarDistance.convertToUnit(x);
  moonEditor.updateSemiMajorAxis(lunarDistance);
}

var moonEccCallback = function(x) {
  moonEditor.updateEccentricity(x);
}

var moonIncCallback = function(x) {
  var degrees = units.degrees.convertToUnit(x);
  moonEditor.updateInclination(degrees);
}

var moonLotanCallback = function(x) {
  var degrees = units.degrees.convertToUnit(x);
  moonEditor.updateLongitudeOfTheAscendingNode(degrees);
}

var moonAopCallback = function(x) {
  var degrees = units.degrees.convertToUnit(x);
  moonEditor.updateArgumentOfPeriapsis(degrees);
}

//Moon
tabMoon = {
  planetSelector              : document.getElementById("system-planetselector"),
  hillsphere                  : generateRangeField("system-hillsphere"              ,"Hill sphere"                    ,defaultDescription ,units.getLengthUnits(),10),
  name                        : document.getElementById("moon-name"),
  typeSelector                : document.getElementById("moon-typeselector"),
  mass                        : generateField("moon-mass"                           ,"Mass"                           ,moonMassCallback   ,defaultDescription,units.getMassUnits(),4),
  allowedMaxRad               : 0,
  radius                      : generateField("moon-radius"                         ,"Radius"                         ,moonRadiusCallback ,moonRadiusText,units.getLengthUnits(),5),
  radiusB                     : generateField("moon-radius-2"                       ,"Radius Axis B"                  ,moonRadius2Callback,moonRadiusText,units.getLengthUnits(),5),
  radiusC                     : generateField("moon-radius-3"                       ,"Radius Axis C"                  ,moonRadius3Callback,moonRadiusText,units.getLengthUnits(),5),
  form                        : document.getElementById("moon-form"),
  density                     : generateField("moon-density"                        ,"Density"                        ,undefined          ,defaultDescription,units.getDensityUnits(),3),
  composition                 : document.getElementById("moon-composition"),
  surfaceGravity              : generateField("moon-gravity"                        ,"Surface Gravity"                ,undefined          ,defaultDescription,units.getGravityUnits(),3),
  semiMajorAxis               : generateField("moon-semi-major-axis"                ,"Semi Major Axis"                ,moonSmaCallback    ,defaultDescription,units.getLengthUnits(),10),
  semiMinorAxis               : generateField("moon-semi-minor-axis"                ,"Semi Minor Axis"                ,undefined          ,defaultDescription,units.getLengthUnits(),10),
  eccentricity                : generateField("moon-eccentricity"                   ,"Eccentricity"                   ,moonEccCallback    ,orbitEccentricityText,[],0),
  periapsis                   : generateField("moon-periapsis"                      ,"Periapsis"                      ,undefined          ,defaultDescription,units.getLengthUnits(),10),
  apoapsis                    : generateField("moon-apoapsis"                       ,"Apoapsis"                       ,undefined          ,defaultDescription,units.getLengthUnits(),10),
  orbitalPeriod               : generateField("moon-orbital-period"                 ,"Orbital Period"                 ,undefined          ,defaultDescription,units.getTimeUnits(),4),
  orbitalVelocity             : generateField("moon-orbital-velocity"               ,"Orbital Velocity"               ,undefined          ,defaultDescription,units.getVelocityUnits(),3),
  inclination                 : generateField("moon-inclination"                    ,"Inclination"                    ,moonIncCallback    ,orbitInclinationText,units.getAngleUnits(),0),
  longitudeOfTheAscendingNode : generateField("moon-longitude-of-the-ascending-node","Longitude of the ascending node",moonLotanCallback  ,orbitAngleText,units.getAngleUnits(),0),
  argumentOfPeriapsis         : generateField("moon-argument-of-periapsis"          ,"Argument of periapsis"          ,moonAopCallback    ,orbitAngleText,units.getAngleUnits(),0)
};

//Helper Vars for Invalidation
tabMoonSystem = {
  hillsphere:tabMoon.hillsphere
};

tabMoonMoon = {
  mass: tabMoon.mass,
  radius:tabMoon.radius,
  radiusB:tabMoon.radiusB,
  radiusC:tabMoon.radiusC,
  density:tabMoon.density,
  surfaceGravity:tabMoon.surfaceGravity,
  semiMajorAxis:tabMoon.semiMajorAxis,
  semiMinorAxis:tabMoon.semiMinorAxis,
  eccentricity:tabMoon.eccentricity,
  periapsis:tabMoon.periapsis,
  apoapsis:tabMoon.apoapsis,
  orbitalPeriod:tabMoon.orbitalPeriod,
  orbitalVelocity:tabMoon.orbitalVelocity,
  inclination:tabMoon.inclination,
  longitudeOfTheAscendingNode:tabMoon.longitudeOfTheAscendingNode,
  argumentOfPeriapsis:tabMoon.argumentOfPeriapsis
};

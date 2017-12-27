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

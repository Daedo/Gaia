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
    var kelvinTemp = this.getTemperature()*5772;

    return rgbFromKelvinTemp(kelvinTemp)



    /*switch (this.getClass()) {
      case "O": return "#9bb0ff";
      case "B": return "#aabfff";
      case "A": return "#e4e8fc";
      case "F": return "#f9fae7";
      case "G": return "#fdf9b3";
      case "K": return "#ffd870";
      case "M": return "#fbc886";
      default:  return "#ffffff";

    }*/
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

      document.getElementById("star-name").value = this.getCurrent().name;
      document.getElementById("star-mass").value = this.getCurrent().mass;

      this.updateView();
    }
  },

  invalidateFields() {
    invalidate("star");
    document.getElementById("star-class").innerHTML = "Not a star.";
  },

  updateView() {
    this.updateList();
    this.updateSelector();

    var star = this.getCurrent();
    document.getElementById("star-luminosity").innerHTML      = star.getLuminosity()+" L☉";
    document.getElementById("star-radius").innerHTML          = star.getRadius()+" R☉";
    document.getElementById("star-temperature").innerHTML     = star.getTemperature()+" T☉";
    document.getElementById("star-lifetime").innerHTML        = star.getLifetime()+" A☉";
    document.getElementById("star-habitable-inner").innerHTML = star.getHabitableInner()+" AU";
    document.getElementById("star-habitable-outer").innerHTML = star.getHabitableOuter()+" AU";
    document.getElementById("star-class").innerHTML           = star.getClass();
    document.getElementById("star-habitability").innerHTML    = star.getHabitability();

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

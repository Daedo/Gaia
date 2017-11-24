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
    data+= planetTypes[planet.planetTypeIndex].name+",";
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
  //We don't have any moons
  if(!moonActive) {
    document.getElementById("exportMoons").style.display = "none";
    return;
  }
  document.getElementById("exportMoons").style.display = "initial";


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

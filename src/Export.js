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

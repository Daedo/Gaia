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

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

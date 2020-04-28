import { Dimension } from './dimension';
import { ScaleUnit, LinearUnit, AbstractUnit } from './unit';

class Mass extends Dimension {
	constructor() {
		super('Mass');
	}

	public get units(): AbstractUnit[] {
		return [this.kg, this.metricTon, this.shortTon, this.solarMass, this.lunarMass, this.earthMass, this.jupiterMass];
	}

	public readonly kg = ScaleUnit.create(this, 1, 'Kilogram', 'kg');
	public readonly metricTon = ScaleUnit.create(this, 1000, 'Metric Ton', 't');
	public readonly shortTon = ScaleUnit.create(this, 907.18474, 'Short Ton', 'ton');
	public readonly solarMass = ScaleUnit.create(this, 1.98855e30, 'Solar Mass', 'M☉');
	public readonly lunarMass = ScaleUnit.create(this, 7.342e22, 'Lunar Mass', 'M☽');
	public readonly earthMass = ScaleUnit.create(this, 5.9722e24, 'Earth Mass', 'M🜨');
	public readonly jupiterMass = ScaleUnit.create(this, 1.89813e27, 'Jupiter Mass', 'M♃');
}

class Length extends Dimension {
	constructor() {
		super('Length');
	}

	public get units(): AbstractUnit[] {
		return [this.m, this.km, this.au, this.mile, this.solarRadius, this.solarCircumference,
		this.lunarRadius, this.lunarCircumference, this.lunarDistance, this.earthRadius,
		this.earthCircumference, this.jupiterRadius, this.jupiterCircumference];
	}

	public readonly m = ScaleUnit.create(this, 1, 'Meter', 'm');
	public readonly km = ScaleUnit.create(this, 1000, 'Kilometer', 'km');
	public readonly au = ScaleUnit.create(this, 149597870700, 'Astronomical Unit', 'AU');
	public readonly mile = ScaleUnit.create(this, 1609.344, 'Mile', 'mi');
	public readonly solarRadius = ScaleUnit.create(this, 6.95700e8, 'Solar Radius', 'R☉');
	public readonly solarCircumference = ScaleUnit.create(this, 4.379121e9, 'Solar Circumference', 'C☉');
	public readonly lunarRadius = ScaleUnit.create(this, 1738100, 'Lunar Radius', 'R☽');
	public readonly lunarCircumference = ScaleUnit.create(this, 10921000, 'Lunar Circumference', 'C☽');
	public readonly lunarDistance = ScaleUnit.create(this, 406200000, 'Lunar Distance', 'D🜨☽');
	public readonly earthRadius = ScaleUnit.create(this, 6378100, 'Earth Radius', 'R🜨');
	public readonly earthCircumference = ScaleUnit.create(this, 40075017, 'Earth Circumference', 'C🜨');
	public readonly jupiterRadius = ScaleUnit.create(this, 71492000, 'Jupiter Radius', 'R♃');
	public readonly jupiterCircumference = ScaleUnit.create(this, 449197483, 'Jupiter Circumference', 'C♃');
}

class Time extends Dimension {
	constructor() {
		super('Time');
	}

	public get units(): AbstractUnit[] {
		return [this.s, this.min, this.h, this.lifetimeSun, this.earthDay, this.earthMonth,
		this.earthYear, this.jupiterYear];
	}

	public readonly s = ScaleUnit.create(this, 1, 'Second', 's');
	public readonly min = ScaleUnit.create(this, 60, 'Minute', 'min');
	public readonly h = ScaleUnit.create(this, 3600, 'Hour', 'h');
	public readonly lifetimeSun = ScaleUnit.create(this, 3.2e17, 'Solar Life', 'L☉');
	public readonly earthDay = ScaleUnit.create(this, 86164.1, 'Earth Day', 'd🜨');
	public readonly earthMonth = ScaleUnit.create(this, 2.628e6, 'Earth Month', 'm🜨');
	public readonly earthYear = ScaleUnit.create(this, 3.154e7, 'Earth Year', 'y🜨');
	public readonly jupiterYear = ScaleUnit.create(this, 3.7435566e8, 'Jupiter Year', 'y♃');
}

class Area extends Dimension {
	constructor() {
		super('Area');
	}

	public get units(): AbstractUnit[] {
		return [this.squareMeter, this.squareKilometer, this.squareMiles, this.solarSurfaceArea, this.lunarSurfaceArea,
		this.earthSurfaceArea, this.jupiterSurfaceArea];
	}

	public readonly squareMeter = ScaleUnit.create(this, 1, 'Square Meter', 'm²');
	public readonly squareKilometer = ScaleUnit.create(this, 1000000, 'Square Kilometer', 'km²');
	public readonly squareMiles = ScaleUnit.create(this, 2.58999e6, 'Square Miles', 'mi²');
	public readonly solarSurfaceArea = ScaleUnit.create(this, 6.09e18, 'Solar Surface', 'S☉');
	public readonly lunarSurfaceArea = ScaleUnit.create(this, 3.793e13, 'Lunar Surface', 'S☽');
	public readonly earthSurfaceArea = ScaleUnit.create(this, 5.10072e14, 'Earth Surface', 'S🜨');
	public readonly jupiterSurfaceArea = ScaleUnit.create(this, 6.1419e16, 'Jupiter Surface', 'S♃');
}

class Volume extends Dimension {
	constructor() {
		super('Volume');
	}

	public get units(): AbstractUnit[] {
		return [this.cubicMeter, this.cubicKilometer, this.cubicMiles, this.solarVolume, this.lunarVolume,
		this.earthVolume, this.jupiterVolume];
	}

	public readonly cubicMeter = ScaleUnit.create(this, 1, 'Cubic Meter', 'm²');
	public readonly cubicKilometer = ScaleUnit.create(this, 1e9, 'Cubic Kilometer', 'km²');
	public readonly cubicMiles = ScaleUnit.create(this, 4.168e9, 'Cubic Miles', 'mi²');
	public readonly solarVolume = ScaleUnit.create(this, 1.412e27, 'Solar Volume', 'V☉');
	public readonly lunarVolume = ScaleUnit.create(this, 2.197e19, 'Lunar Volume', 'V☽');
	public readonly earthVolume = ScaleUnit.create(this, 1.083e21, 'Earth Volume', 'V🜨');
	public readonly jupiterVolume = ScaleUnit.create(this, 1.43e24, 'Jupiter Volume', 'V♃');
}

class Gravity extends Dimension {
	constructor() {
		super('Gravity');
	}

	public get units(): AbstractUnit[] {
		return [this.metersPerSquareSecond, this.feetPerSquareSecond, this.solarGravity, this.lunarGravity,
		this.earthGravity, this.jupiterGravity];
	}

	public readonly metersPerSquareSecond = ScaleUnit.create(this, 1, 'Meter Per Square Second', 'm/s²');
	public readonly feetPerSquareSecond = ScaleUnit.create(this, 0.3048, 'Feet Per Square Second', 'ft/s²');
	public readonly solarGravity = ScaleUnit.create(this, 273.95, 'Solar Gravity', 'G☉');
	public readonly lunarGravity = ScaleUnit.create(this, 1.624, 'Lunar Gravity', 'G☽');
	public readonly earthGravity = ScaleUnit.create(this, 9.8, 'Earth Gravity', 'G🜨');
	public readonly jupiterGravity = ScaleUnit.create(this, 24.79, 'Jupiter Gravity', 'G♃');
}

class Density extends Dimension {
	constructor() {
		super('Density');
	}

	public get units(): AbstractUnit[] {
		return [this.kilogramPerCubicMeter, this.poundPerCubicFeet, this.solarDensity, this.lunarDensity,
		this.earthDensity, this.jupiterDensity];
	}

	public readonly kilogramPerCubicMeter = ScaleUnit.create(this, 1, 'Kilogram Per Cubic Meter', 'kg/m³');
	public readonly poundPerCubicFeet = ScaleUnit.create(this, 16.02, 'Pound Per Cubic Feet', 'lb/ft³');
	public readonly solarDensity = ScaleUnit.create(this, 1408, 'Solar Density', 'ρ☉');
	public readonly lunarDensity = ScaleUnit.create(this, 3344, 'Lunar Density', 'ρ☽');
	public readonly earthDensity = ScaleUnit.create(this, 5515, 'Earth Density', 'ρ🜨');
	public readonly jupiterDensity = ScaleUnit.create(this, 1326.2, 'Jupiter Density', 'ρ♃');
}

class Velocity extends Dimension {
	constructor() {
		super('Velocity');
	}

	public get units(): AbstractUnit[] {
		return [this.metersPerSecond, this.kilometersPerHour, this.milesPerHour, this.lunarVelocity,
		this.earthVelocity, this.jupiterVelocity, this.solarEscapeVelocity, this.lunarEscapeVelocity,
		this.earthEscapeVelocity, this.jupiterEscapeVelocity];
	}

	public readonly metersPerSecond = ScaleUnit.create(this, 1, 'Meters Per Second', 'm/s');
	public readonly kilometersPerHour = ScaleUnit.create(this, 0.2778, 'Kilometers Per Hour', 'km/h');
	public readonly milesPerHour = ScaleUnit.create(this, 0.447, 'Miles Per Hour', 'mi/h');
	public readonly lunarVelocity = ScaleUnit.create(this, 1020, 'Lunar Velocity', 'v☽');
	public readonly earthVelocity = ScaleUnit.create(this, 29800, 'Earth Velocity', 'v🜨');
	public readonly jupiterVelocity = ScaleUnit.create(this, 13000, 'Jupiter Velocity', 'v☉');
	public readonly solarEscapeVelocity = ScaleUnit.create(this, 617540, 'Solar Escape Velocity', 've♃');
	public readonly lunarEscapeVelocity = ScaleUnit.create(this, 2375.6, 'Lunar Escape Velocity', 've☽');
	public readonly earthEscapeVelocity = ScaleUnit.create(this, 11180, 'Earth Escape Velocity', 've🜨');
	public readonly jupiterEscapeVelocity = ScaleUnit.create(this, 60200, 'Jupiter Escape Velocity', 've♃');
}

class Luminosity extends Dimension {
	constructor() {
		super('Luminosity');
	}

	public get units(): AbstractUnit[] {
		return [this.watt, this.solarLuminosity];
	}

	public readonly watt = ScaleUnit.create(this, 1, 'Watt', 'W');
	public readonly solarLuminosity = ScaleUnit.create(this, 3.828e26, 'Solar Luminosity', 'L☉');
}

class Temperature extends Dimension {
	constructor() {
		super('Temperature');
	}

	public get units(): AbstractUnit[] {
		return [this.kelvin, this.celsius, this.fahrenheit, this.solarTemperature];
	}

	public readonly kelvin = ScaleUnit.create(this, 1, 'Kelvin', 'K');
	public readonly celsius = LinearUnit.create(this, 1, 273.15, 'Celsius', '°C');
	public readonly fahrenheit = LinearUnit.create(this, (5.0 / 9.0), 459.67, 'Fahrenheit', '°F');
	public readonly solarTemperature = ScaleUnit.create(this, 5572, 'Solar Temperauture', 'T☉');
}

class Angle extends Dimension {
	constructor() {
		super('Angle');
	}

	public get units(): AbstractUnit[] {
		return [this.degrees, this.radiants];
	}

	public readonly degrees = ScaleUnit.create(this, 1, 'Degrees', '°');
	public readonly radiants = ScaleUnit.create(this, 180 / Math.PI, 'Radiants', 'rad');
}

export namespace Dimensions {
	export const MASS = new Mass();
	export const LENGTH = new Length();
	export const TIME = new Time();
	export const AREA = new Area();
	export const VOLUME = new Volume();
	export const GRAVITY = new Gravity();
	export const DENSITY = new Density();
	export const VELOCITY = new Velocity();
	export const LUMINOSITY = new Luminosity();
	export const TEMPERATURE = new Temperature();
	export const ANGLE = new Angle();
}

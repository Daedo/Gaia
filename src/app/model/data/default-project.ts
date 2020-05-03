import { Planet } from '../objects/planet';
import { Star } from '../objects/star-system/star';
import { SolarSystem } from '../objects/solar-system';
import { Project } from '../project';
import { Moon } from '../objects/moon';
import { serialize, deserialize } from '../io/serialize';

export function createStandardProject(): Project {
	let earth = Planet.createPlanet('Terra');
	let sun = Star.createStar('Sol');
	let moon = Moon.createMoon('Luna');
	let system = SolarSystem.createSolarSystem('Solar System');
	system = system.withAddedObject(earth).withAddedObject(sun).withAddedObject(moon);
	let project = Project.getEmptyProject('Demo Project');
	console.log(serialize(project.withAddedSystem(system)));
	return project.withAddedSystem(system);
}

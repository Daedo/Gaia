import { AbstractSystemObject } from '../objects/abstract-system-object';
import { Map } from 'immutable';

type Deserializable = {
	deserialize: (data: any) => AbstractSystemObject;
};

export function deserializeIDMap(map: any, type: Deserializable): Map<string, AbstractSystemObject> {
	let data: {
		[uuid: string]: AbstractSystemObject;
	} = {};
	for (const uuid in map) {
		const mapElement = map[uuid];
		data[uuid] = type.deserialize(mapElement);
	}
	return Map(data);
}

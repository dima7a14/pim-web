import { FaSolidLightbulb } from 'solid-icons/fa';
import { IoFastFood } from 'solid-icons/io';
import { CgGym } from 'solid-icons/cg';

import { RequestFeature } from '../features/RequestFeature';
import { Exercise } from '../features/Exercise';
import { FoodStock } from '../features/FoodStock';

export const features = {
	requestFeature: {
		path: '/',
		component: RequestFeature,
		Icon: FaSolidLightbulb,
		label: 'Request a new feature',
	},
	exercise: {
		path: '/exercise',
		component: Exercise,
		Icon: CgGym,
		label: 'Exercises',
	},
	foodStock: {
		path: '/food-stock',
		component: FoodStock,
		Icon: IoFastFood,
		label: 'Food Stock',
	},
};

type ValuesType<
	T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>,
> = T extends ReadonlyArray<any>
	? T[number]
	: T extends ArrayLike<any>
	? T[number]
	: T extends object
	? T[keyof T]
	: never;

export type Feature = ValuesType<typeof features>;

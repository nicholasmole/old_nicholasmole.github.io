// DynamicSagas must be plural
export const dynamicSagas = [
	/*
	== Posts ==
	Example Posts */
	'posts',
	/*
	== Slider ==
	Example Sliders */
	'sliders'
];

export function dynTypes(duck, type) {
	return `${duck.toUpperCase()}_${type.toUpperCase()}`;
}
export function dynOn(duck, type) {
	return `on${duck + type.toUpperCase()}`;
}

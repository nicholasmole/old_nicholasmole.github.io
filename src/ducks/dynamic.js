import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

const initialState = fromJS([]);
/*
	DynamicReduer:
	return a reducer function that can be branded
	with whatever you want it to be renamed
*/
const dynamicReducer = renamed => (state = initialState, action) => {
	console.log('dynamicReducer: Action');
	console.log(action);

	switch (action.type) {
		case `${renamed.toUpperCase()}_SET`:

			return state.update(s => {
				let newDynamic = fromJS(action.payload);
				newDynamic = newDynamic.filter(n => !s.find(c => c.get('id') === n.get('id')));

				return s.concat(newDynamic);
			});

		case `${renamed.toUpperCase()}_UPDATE`:
			return state.update(s => {
				const node = s.find(l => l.get('_id') === action.payload.get('_id'));
				if (!node) {
					return s;
				}
				return s.set(s.indexOf(node), fromJS(action.payload));
			});

		case `${renamed.toUpperCase()}_RESET`:
			return initialState;

		default:
			return state;
	}
};

export default dynamicReducer;

const getDynamic = (state, fetch) => {
	console.log(state);
	return state.get('app').get(fetch);
};

export const selectors = {
	getDynamic: createSelector([getDynamic], dynamicReturn => dynamicReturn)
};

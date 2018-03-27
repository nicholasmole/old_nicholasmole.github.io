import {fromJS} from 'immutable';
import {createSelector} from 'reselect';
/* eslint-disable */
import * as utils from '../utils/duckHelpers';

export const types = {
		...utils.requestTypes('POSTS'),
		POSTS_SET: 'POSTS_SET',
		POSTS_GET: 'POSTS_GET',
		POSTS_UPDATE: 'POSTS_UPDATE',
		POSTS_RESET: 'POSTS_RESET',
		POSTS_SUCCESS: 'POSTS_SUCCESS'
		//RAils resourceful routing
		//put index get post update delete create
};

export const actions = {};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	console.log('defauex');
	console.log(action);
	//console.log(state);
		switch (action.type) {
				case types.POSTS_SET:
						return state.update(s => {
							console.log(action.payload);
								let newPosts = fromJS(action.payload);
								
								newPosts = newPosts.filter(n => !s.find(c => c.get('id') === n.get('id')));

								console.log(s.concat(newPosts));
								return s.concat(newPosts);
						});

				case types.POSTS_UPDATE:
						return state.update(s => {
								const node = s.find(l => l.get('_id') === action.payload.get('_id'));

								if (!node) {
										return s;
								}

								return s.set(s.indexOf(node), fromJS(action.payload));
						});

				case types.POSTS_RESET:
						return initialState;

				default:
				console.log('posts state end');
				console.log(state);
						return state;
		}
};

//const getPosts = state => state.getIn(['app', 'posts']);
//const getPosts = state => state.getIn(['app']);
const getPosts = state => state.get('app').get('posts');

export const selectors = {
	getPosts: createSelector([getPosts], posts => posts)
};
import {all, put, takeLatest} from 'redux-saga/effects';
import {types as postTypes} from '../ducks/posts';

export function * watchPosts() {
	console.log('watchget');
	console.log(onPostsGet);
	yield takeLatest(postTypes.POSTS_GET, onPostsGet);
	yield takeLatest(postTypes.POSTS_SUCCESS, onPostsResponse);
}

export function * onPostsGet({payload}) {
	console.log('get posts');
	console.log(payload);
	//console.log(value);
	payload.method = 'get';

	if (!payload.route) {
		payload.route = 'http://localhost:3000/api/v1/posts';
	}

	return yield payload;
}

export function * onPostsResponse({response, payload}) {
	console.log('post response');
	console.log(response);//post //get //route
	console.log(payload);// {posts: [3]}
	if (payload.action === 'get' && response && response.posts && Array.isArray(response.posts)) {
	//if (payload.action === 'get' && response && response.posts ) {
		console.log(response);
		return yield all([
			put({
				type: postTypes.POSTS_SET,
				payload: response
			})
		]);
	}
}

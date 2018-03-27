import {all, put, takeLatest} from 'redux-saga/effects';
import * as dynHelp from '../utils/dynamicHelpers';

/*
	WatchDynamic:
	watch when actions are called, and respond accordingly
	Get and Response don't need unique names
*/
export function * watchDynamic(watch) {
	console.log('watchDynamic: Name');
	console.log(watch);

	yield takeLatest(dynHelp.dynTypes(watch, 'get'), onDynamicGet);
	yield takeLatest(dynHelp.dynTypes(watch, 'success'), onDynamicResponse);
}

export function * onDynamicGet({payload}) {
	payload.method = 'get';
	return yield payload;
}

export function * onDynamicResponse({response, payload}) {
	if (payload.action === 'get' && response) {
		return yield all([
			put({
				type: dynHelp.dynTypes(payload.dataset, 'set'),
				payload: response
			})
		]);
	}
}

import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchData} from './data';
import {watchDynamic} from './dynamic';
import {dynamicSagas as extraForks} from '../utils/dynamicHelpers';

const Forks = [
	fork(watchApp),
	fork(watchLocation),
	fork(watchData)
];

const ForkDrawer = () => {
	for (var i = 0; i < extraForks.length; i++) {
		Forks.push(fork(watchDynamic, extraForks[i]));
	}
	return Forks;
};

export default function * Sagas() {
	yield all(ForkDrawer());
}

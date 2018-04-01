import React from 'react';
import responseGenerator from './responseGenerator';
/* Esslint-disable no-else-return */

export default data => {
	const valueToMap = responseGenerator(data);
	const dataLoaded = valueToMap === null;
	return dataLoaded;
};

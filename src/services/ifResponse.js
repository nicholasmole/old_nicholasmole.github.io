import React from 'react';
/* eslint-disable no-else-return */
/*
	Return valueToMap or null
*/
const ifResponse = value => {
	if (typeof value === 'undefined') {
		return null;
	} else {
		const responsetoJS = value.toJS();
		let {valueToMap = []} = responsetoJS;
		valueToMap = responsetoJS.length ? responsetoJS : [];
		const response = valueToMap.length ? valueToMap : null;
		return response;
	}
};

export default ifResponse;

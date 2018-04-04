(function () {
   'use strict';
}());

// async function
export async function getRequestData(fetchUrl, method, body) {
	if (method == 'GET') { 
		return await (
			await (fetch(fetchUrl, {
				credentials: 'include'
			})
		)).json();
	} else {
		return await (
			await (fetch(fetchUrl, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(body)
			})
		)).json();
	}
}
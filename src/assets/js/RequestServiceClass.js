(function () {
   'use strict';
}());

// async function
export async function getRequestMax(url) {
	console.log('we get here');
	let data = await (await (fetch(url, {credentials:'include'})
		.then(response => {
  		return response.json();
		})
		.catch(error => {
  			console.log('Error: ', error);
		})
	));
  	
  	return data;
}
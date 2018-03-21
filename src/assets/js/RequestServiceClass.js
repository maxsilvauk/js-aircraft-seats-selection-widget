/*jshint esversion: 6 */

(function () {
   'use strict';
}());

{
  /**
   * Request Service Class
   *
   * Handles network requests.
   **/
}  
export default class RequestServiceClass {

	// async function
	async function getRequest(url) {
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
}
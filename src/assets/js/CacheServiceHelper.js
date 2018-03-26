(function () {
   'use strict';
}());

/**
 * putData
 *
 * @param { string } fetchUrl
 * @return
 *
 * Check if the fetchUrl already exists in
 * local storage. If not set data. 
 **/
export function putData(fetchUrl) {
	if (localStorage.getItem(fetchUrl) === null) {
  		fetch(fetchUrl, {credentials:'include'})
      .then(response => response.json())
      .then(response => {
         localStorage.setItem(fetchUrl, JSON.stringify(response));
      })
      .catch((err) => console.log('error: ', err));
  }

  console.log(`${fetchUrl}:`, localStorage.getItem(fetchUrl));
}

/**
 * getData
 *
 * @param { string } key
 * @return
 *
 * If the key exists return the local
 * storage item. Else throw error.
 **/
export function getData(key) {
	if (localStorage.getItem(key) !== null) {
		return localStorage.getItem(key);
	} else {
		console.err('Error - data with key of "' + key + '" not found');
		return false;
	}
}
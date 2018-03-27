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
export function putData(fetchUrl, log) {
	if (localStorage.getItem(fetchUrl) === null) {
  		fetch(fetchUrl, {credentials:'include'})
      .then(response => response.json())
      .then(response => {
         localStorage.setItem(fetchUrl, JSON.stringify(response));
      })
      .catch((err) => console.log(`error: `, err)); // eslint-disable-line
  }

  if (log) {
    console.log(`${fetchUrl}:`, localStorage.getItem(fetchUrl)); // eslint-disable-line
  }
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
	   return JSON.parse(localStorage.getItem(key));
	} else {
	   console.error(`Error: data with key of '${key}' not found`); // eslint-disable-line
	   return false;
	}
}
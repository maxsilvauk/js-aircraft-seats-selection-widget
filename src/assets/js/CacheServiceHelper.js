(function () {
   'use strict';
}());


import { getRequestData } from './RequestServiceHelper.js';

/**
 * putData
 *
 * @param { string } fetchUrl
 * @param { method } string
 * @param { body } object
 * @param { log } boolean
 * @return
 *
 * Check if the fetchUrl already exists in
 * local storage. If not set data. 
 **/
export async function putData(fetchUrl, method='GET', body={}, log=false) {
	if (localStorage.getItem(fetchUrl) === null) {
    	let response = await getRequestData(fetchUrl, method, body);
    	if (!response.errors) localStorage.setItem(fetchUrl, JSON.stringify(response));
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
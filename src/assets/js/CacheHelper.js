(function () {
   'use strict';
}());

/**
 * putData
 *
 * @param { string } rqUrl
 * @return
 *
 * Check if the url already exists in
 * local storage. If not set data. 
 **/
export function putData(rqUrl) {
	if (localStorage.getItem(rqUrl) === null) {
  		fetch(rqUrl)
        .then(response => response.json())
        .then(response => {
           localStorage.setItem('airports', response);
        })
        .catch((err) => console.log('error: ', err));
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
		return localStorage.getItem(key);
	} else {
		console.err('Error - data with key of "' + key + '" not found');
		return false;
	}
}
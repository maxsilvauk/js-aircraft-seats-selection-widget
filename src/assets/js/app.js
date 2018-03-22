(function () {
   'use strict';
}());

{ /* Import Classes */ }
import aHelper from './aHelper.js';
import RetrieveAvailabilityClass from './RetrieveAvailabilityClass.js';

{/* On window load get the seats data  */}
window.addEventListener('load', () => new RetrieveAvailabilityClass({
	surname: 	'Smith',
	ref: 		'1111',
	siteUrl: 	'merch.fabrix.xmltravel.com'
}));
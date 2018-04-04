(function () {
   'use strict';
}());

import RetrieveAvailabilityClass from './RetrieveAvailabilityClass.js';

module.exports = {
	run: function (config) {
		new RetrieveAvailabilityClass(config);
	}
};
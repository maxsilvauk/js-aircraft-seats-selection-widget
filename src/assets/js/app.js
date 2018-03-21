/*jshint esversion: 6 */

(function () {
   'use strict';
}());

{ /* Import Classes */ }
import RetrieveAvailabilityClass from './RetrieveAvailabilityClass.js';

{/* On window load get the seats data  */}
window.addEventListener('load', () => new RetrieveAvailabilityClass());
'use strict'

{ /* Import Classes */ }
import RetrieveAvailabilityClass from './RetrieveAvailabilityClass.js';


//document.getElementById('retrievalForm').addEventListener('submit', new RetrieveSeatsClass());

{/* On window load get the seats data  */}
window.addEventListener('load', () => new RetrieveAvailabilityClass());
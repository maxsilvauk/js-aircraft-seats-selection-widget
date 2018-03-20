'use strict'

{ /* Import Classes */ }
import RetrieveSeatsClass from './RetrieveSeatsClass.js';


//document.getElementById('retrievalForm').addEventListener('submit', new RetrieveSeatsClass());

{/* On window load get the seats data  */}
window.addEventListener('load', () => new RetrieveSeatsClass());
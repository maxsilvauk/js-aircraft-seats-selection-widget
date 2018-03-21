/*jshint esversion: 6 */

(function () {
   'use strict';
}());

//import RequestServiceClass from './RequestServiceClass.js';

{
  /**
   * Retrieve Availability Class
   *
   * Fetches historic basket and search data.
   **/
}  
export default class RetrieveAvailabilityClass {

    constructor(config) {
        this.ref = config.ref;
        this.surname = config.surname;
        this.siteUrl = 'https://'+config.siteUrl;
        this.loader = document.getElementById('loader');
        this.seatResults = document.getElementById('seat-results');

        this.iFrame = document.createElement('iframe');
        this.iFrame.addEventListener('load', () => this.setHistoricBasketUrl());

        this.iFrame.style.display = 'none';
        this.iFrame.src = `${this.siteUrl}/jam/session/create?session=null`

        document.body.appendChild(this.iFrame);
    }

    setHistoricBasketUrl() {
        const fetchUrl = `${this.siteUrl}/jam/historicbasket?ref=${this.ref}&system=ATCORE&surname=${this.surname}`;
        this.getHistoricBasket(fetchUrl);
    }

    setSearchUrl() {
        const fetchUrl = `${this.siteUrl}/jam/search`;
        this.getSearch(fetchUrl);
    }

    getHistoricBasket(fetchUrl) {
        fetch(fetchUrl, {credentials:'include'})
        .then(response => response.json())
        .then(response => {
           console.log('getHistoricBasket: ', response);
           this.setSearchUrl();
        })
        .catch((err) => console.log('error: ', err));

        //console.log(RequestService.getRequest(fetchUrl));
    }

    getSearch(fetchUrl) {
        fetch(fetchUrl, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({'journey':'seats'})
        })
        .then(response => response.json())
        .then(response => {
           console.log('getSearch: ', response);
        })
        .catch((err) => console.log('error: ', err));
    }
}
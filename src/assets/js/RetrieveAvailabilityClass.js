/*jshint esversion: 6 */
(function () {
   'use strict';
}());

{
  /**
   * Retrieve Availability Class
   *
   * Fetches historic basket and search data.
   **/
}  
export default class RetrieveAvailabilityClass {

    constructor() {
        this.ref = '1111';
        this.surname = 'SMITH';
        this.siteUrl = 'https://merch.fabrix.xmltravel.com';
        this.loader = document.getElementById('loader');
        this.seatResults = document.getElementById('seat-results');

        this.iFrame = document.createElement('iframe');
        this.iFrame.addEventListener('load', () => this.setHistoricBasketUrl());

        this.iFrame.style.display = 'none';
        this.iFrame.src = 'http://merch.fabrix.xmltravel.com/jam/session/create?session=null'; 

        document.body.appendChild(this.iFrame);
    }

    setHistoricBasketUrl() {
        let fetchUrl = `${this.siteUrl}/jam/historicbasket?ref=${this.ref}&system=ATCORE&surname=${this.surname}`;
        this.getHistoricBasket(fetchUrl);
    }

    setSearchUrl() {
        let fetchUrl = `${this.siteUrl}/jam/search`;
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
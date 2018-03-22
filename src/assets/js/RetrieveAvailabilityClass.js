(function () {
   'use strict';
}());

const RequestServiceClass = require('./RequestServiceClass.js');

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
        this.iFrame.src = `${this.siteUrl}/jam/session/create?session=null`;

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
        // fetch(fetchUrl, {credentials:'include'})
        // .then(response => response.json())
        // .then(response => {
        //    console.log('getHistoricBasket: ', response);
        //    this.setSearchUrl();
        // })
        // .catch((err) => console.log('error: ', err));
        console.log('getHistoricBasket', RequestServiceClass.getRequestMax(fetchUrl));
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
            // var seats = new Seats(
            //     RESULTS.results[0], //response
            //     null, //a (shared) jam client instance
            //     {
            //         selectionRequired: selectionRequired, //called when the current plane has missing selections
            //         allPaxSelected: allPaxSelected, //called when the current plane has completed it's selections
            //         allSelected: allSelected, //called when the all plane have completed selections 
            //         afterBasket: afterBasket //called when the add to basket has completed (navigate to next page here)
            //     });
        })
        .catch((err) => console.log('error: ', err));
    }
}
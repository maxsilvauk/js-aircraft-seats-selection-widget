(function () {
   'use strict';
}());

import * as SeatsCallBacks from './SeatsCallBacks.js';
import * as SeatsBuilder from './Seats.js';
//import * as RequestServiceHelper from './RequestServiceHelper.js';

/**
 * Retrieve Availability Class
 *
 * Fetches historic basket and search data.
 **/
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

    /**
     * setHistoricBasketUrl
     *
     * @return getHistoricBasket()
     *
     * Create historic basket url
     **/
    setHistoricBasketUrl() {
        const fetchUrl = `${this.siteUrl}/jam/historicbasket?ref=${this.ref}&system=ATCORE&surname=${this.surname}`;
        this.getHistoricBasket(fetchUrl);
    }

    /**
     * setSearchUrl
     *
     * @return getHistoricBasket()
     *
     * Create search url
     **/
    setSearchUrl() {
        const fetchUrl = `${this.siteUrl}/jam/search`;
        this.getSearch(fetchUrl);
    }

    /**
     * getHistoricBasket
     *
     * @param { string } fetchUrl
     * @return setSerachUrl()
     *
     * Get the historic basked data.
     **/
    getHistoricBasket(fetchUrl) {
        fetch(fetchUrl, {credentials:'include'})
        .then(response => response.json())
        .then(response => {
           console.log('getHistoricBasket: ', response);
           this.setSearchUrl();

        })
        .catch((err) => console.log('error: ', err));
    }

    /**
     * getSearch
     *
     * @param { string } fetchUrl
     * @return SeatsBuilder.Seats()
     *
     * Get the search data.
     **/
    getSearch(fetchUrl) {
        fetch(fetchUrl, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({'journey':'seats'})
        })
        .then(response => response.json())
        .then(response => {
            console.log('getSearch: ', response);
            SeatsBuilder.Seats(response.results, null, {
                selectionRequired: SeatsCallBacks.selectionRequired,
                allPaxSelected: SeatsCallBacks.allPaxSelected,
                allSelected: SeatsCallBacks.allSelected, 
                afterBasket: SeatsCallBacks.afterBasket
            });
        })
        .catch((err) => console.log('error: ', err));
    }
}
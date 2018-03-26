(function () {
   'use strict';
}());

import * as CacheServiceHelper from './CacheServiceHelper.js';
import * as SeatsCallBacksHelper from './SeatsCallBacksHelper.js';
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
     * Create historic basket jam url.
     **/
    setHistoricBasketUrl() {
        const fetchUrl = `${this.siteUrl}/jam/historicbasket?ref=${this.ref}&system=ATCORE&surname=${this.surname}`;
        this.getHistoricBasket(fetchUrl);
    }

    /**
     * setAirportsUrl
     *
     * @return getAirports()
     *
     * Create airports jam url.
     **/
    setAirportsUrl() {
        const fetchUrl = `${this.siteUrl}/jam/airports`;
        this.getAirports(fetchUrl);
    }

    /**
     * setSeatLanguagesUrl
     *
     * @return getSeatLanguages()
     *
     * Create seat languages jam url.
     **/
    setSeatLanguagesUrl() {
        const fetchUrl = `${this.siteUrl}/jam/languages/seat-selection/results`;
        this.getSeatLanguages(fetchUrl);
    }

    /**
     * setSplashesUrl
     *
     * @return getSplashes()
     *
     * Create splashes jam url.
     **/
    setSplashesUrl() {
        const fetchUrl = `${this.siteUrl}/jam/splashes`;
        this.getSplashes(fetchUrl);
    }

    /**
     * setSearchUrl
     *
     * @return getHistoricBasket()
     *
     * Create search jam url.
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
           this.setAirportsUrl();
        })
        .catch((err) => console.log('error: ', err));
    }

    /**
     * getAirports
     *
     * @param { string } fetchUrl
     * @return setSerachUrl()
     *
     * Get airports data.
     **/
    getAirports(fetchUrl) {
        CacheServiceHelper.putData(fetchUrl);
        this.setSeatLanguagesUrl();
    }

    /**
     * getSeatLanguages
     *
     * @param { string } fetchUrl
     * @return setSplashesUrl()
     *
     * Get airports data.
     **/
    getSeatLanguages(fetchUrl) {
        CacheServiceHelper.putData(fetchUrl);
        this.setSplashesUrl();
    }

    /**
     * getSplashes
     *
     * @param { string } fetchUrl
     * @return setSerachUrl()
     *
     * Get airports data.
     **/
    getSplashes(fetchUrl) {
        CacheServiceHelper.putData(fetchUrl);
        this.setSearchUrl();
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
                selectionRequired: SeatsCallBacksHelper.selectionRequired,
                allPaxSelected: SeatsCallBacksHelper.allPaxSelected,
                allSelected: SeatsCallBacksHelper.allSelected, 
                afterBasket: SeatsCallBacksHelper.afterBasket
            });
        })
        .catch((err) => console.log('error: ', err));
    }
}
(function () {
   'use strict';
}());

import { putData } from './CacheServiceHelper.js';
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
        this.config = config;
        this.config.siteUrl = 'https://'+this.config.siteUrl;
        this.loader = document.getElementById('loader');
        this.seatResults = document.getElementById('seat-results');

        this.iFrame = document.createElement('iframe');
        this.iFrame.addEventListener('load', () => this.setHistoricBasketUrl());
        this.iFrame.style.display = 'none';
        this.iFrame.src = `${this.config.siteUrl}/jam/session/create?session=null`;
        document.body.appendChild(this.iFrame);
    }

    /**
     * setHistoricBasketUrl()
     *
     * @return getHistoricBasket()
     *
     * Create historic basket jam url.
     **/
    setHistoricBasketUrl() {
        const fetchUrl = `${this.config.siteUrl}/jam/historicbasket?ref=${this.config.ref}&system=ATCORE&surname=${this.config.surname}`;
        this.getHistoricBasket(fetchUrl);
    }

    /**
     * setAirportsUrl()
     *
     * @return getAirports()
     *
     * Create airports jam url.
     **/
    setAirportsUrl() {
        this.config.airportsJam = `/jam/airports`;
        const fetchUrl = `${this.config.siteUrl}${this.config.airportsJam}`;
        this.getAirports(fetchUrl);
    }

    /**
     * setSeatLanguagesUrl()
     *
     * @return getSeatLanguages()
     *
     * Create seat languages jam url.
     **/
    setSeatLanguagesUrl() {
        this.config.seatLangJam = `/jam/languages/seat-selection/results`;
        const fetchUrl = `${this.config.siteUrl}${this.config.seatLangJam}`;
        this.getSeatLanguages(fetchUrl);
    }

    /**
     * setSplashesUrl()
     *
     * @return getSplashes()
     *
     * Create splashes jam url.
     **/
    setSplashesUrl() {
        this.config.splashesJam = `/jam/splashes`;
        const fetchUrl = `${this.config.siteUrl}${this.config.splashesJam}`;
        this.getSplashes(fetchUrl);
    }

    /**
     * setSearchUrl()
     *
     * @return getHistoricBasket()
     *
     * Create search jam url.
     **/
    setSearchUrl() {
        const fetchUrl = `${this.config.siteUrl}/jam/search`;
        this.getSearch(fetchUrl);
    }

    /**
     * getHistoricBasket()
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
           console.log('getHistoricBasket: ', response); // eslint-disable-line
           this.setAirportsUrl();
        })
        .catch((err) => console.log('error: ', err));  // eslint-disable-line
    }

    /**
     * getAirports()
     *
     * @param { string } fetchUrl
     * @return setSerachUrl()
     *
     * Get airports data.
     **/
    getAirports(fetchUrl) {
        putData(fetchUrl);
        this.setSeatLanguagesUrl();
    }

    /**
     * getSeatLanguages()
     *
     * @param { string } fetchUrl
     * @return setSplashesUrl()
     *
     * Get airports data.
     **/
    getSeatLanguages(fetchUrl) {
        putData(fetchUrl);
        this.setSplashesUrl();
    }

    /**
     * getSplashes()
     *
     * @param { string } fetchUrl
     * @return setSerachUrl()
     *
     * Get airports data.
     **/
    getSplashes(fetchUrl) {
        putData(fetchUrl);
        this.setSearchUrl();
    }

    /**
     * selectionRequired()
     *
     * @return
     *
     * Something about selection required goes here.
     **/
    selectionRequired() {
        document.querySelector('#continueButton').style.display = 'none';
        const SEAT_LANGUAGES = SeatsBuilder.getAirportsData(this.config.siteUrl, this.config.airportsJam);

        // if (seats.isFirstLeg()) {
        //     if (FLOW.active && FLOW.stepsVisited !== 1) {
        //      document.querySelector('.button__back').onclick = function(){
        //          window.history.back();
        //      };

              document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.back'];
        //     } else {
        //         document.querySelector('.button__back').style.display = 'none';
        //     }

        //     if (!FLOW.active) {
        //         document.querySelector('.button__home__cta').style.display = 'block';
        //     }
        // }
        
        // if (!seats.isFirstLeg()) {
        //     document.querySelector('.button__back').style.display = 'block';
        //     document.querySelector('.button__back').onclick = function() {
        //      seats.prevPlane();
        //     };

        //     document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.previous'];
        // }
    }

    /**
     * allPaxSelected()
     *
     * @return
     *
     * Something about allPaxSelected goes here.
     **/
    allPaxSelected() {
        let skipButton = document.querySelector('.button__skip__cta');

        if (skipButton) {
            skipButton.style.display = 'none';
        }

        document.querySelector('#continueButton').style.display = 'block';
        document.querySelector('#continueButton').onclick = function(){
            // seats.validate(function(){
            //     seats.nextIncompletePlane();
            // });
        };

        const SEAT_LANGUAGES = SeatsBuilder.getAirportsData(this.config.siteUrl, this.config.airportsJam);
        document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
    }

    /**
     * allSelected()
     *
     * @return
     *
     * Something about allSelected goes here.
     **/
    allSelected() {
        document.querySelector('#continueButton').style.display = 'block';
        const SEAT_LANGUAGES = SeatsBuilder.getAirportsData(this.config.siteUrl, this.config.airportsJam); // eslint-disable-line

        // if (seats.isLastLeg()){
        //     document.querySelector('#continueButton').onclick = function(){
        //         // seats.validate(function(){
        //         //     seats.addToBasket();
        //         // });
        //     };
        //     document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.basketBtn'];
        // } else {
        //     document.querySelector('#continueButton').onclick = function(){
        //         // seats.validate(function(){
        //         //     seats.nextPlane();
        //         // });    
        //     };

        //     let skipButton = document.querySelector('.button__skip__cta');

        //     if (skipButton) {
        //         skipButton.style.display = 'none';
        //     }
        //     document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
        // }
    }

    /**
     * afterBasket()
     *
     * @return
     *
     * Something about afterBasket goes here.
     **/
    afterBasket() {
         // var $http = angular.injector(['ng']).get('$http');

         //    $http.get('/jam/upsellFlow/next')
         //    .success(
         //        function(o){
         //            console.log(o);
         //            if (o.nextPage && o.active) {
         //             window.location = "/" + o.nextPage;
         //         } else {
         //             window.location = "/index";
         //         }
         //        }
         //     );

        fetch(`${this.config.siteUrl}/jam/upsellFlow/next`, {
            credentials:'include'
        })
        .then(response => response.json())
        .then(response => {
            if (response.nextPage && response.active) {
                window.location = `/${response.nextPage}`;
            } else {
                window.location = `/index`;
            }
            console.log(`afterBasket: `, response); // eslint-disable-line
        })
        .catch((err) => console.log('error: ', err));  // eslint-disable-line
    }

    /**
     * getSearch()
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
            SeatsBuilder.Seats(response.results, null, {
                selectionRequired: SeatsCallBacksHelper.selectionRequired,
                allPaxSelected: SeatsCallBacksHelper.allPaxSelected,
                allSelected: SeatsCallBacksHelper.allSelected, 
                afterBasket: SeatsCallBacksHelper.afterBasket
            }, this.config);
        })
        .catch((err) => console.log(`error: `, err)); // eslint-disable-line
    }
}
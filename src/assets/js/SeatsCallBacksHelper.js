(function () {
   'use strict';
}());

/**
 * selectionRequired()
 *
 * Does something.
 **/
export function selectionRequired() {
	document.querySelector('#continueButton').style.display = 'none';

	/* 'seats' is not defined 
	if(seats.isFirstLeg()){
	    if(FLOW.active && FLOW.stepsVisited !== 1) {
		    document.querySelector('.button__back').onclick = function(){
			    window.history.back();
		    };
		    document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.back'];
	    } else {
	        document.querySelector('.button__back').style.display = 'none';
	    }

        if(!FLOW.active)
            document.querySelector('.button__home__cta').style.display = 'block';
	}
	*/

	/* 'seats' is not defined 
	if (!seats.isFirstLeg()) {
	    document.querySelector('.button__back').style.display = 'block';
	    document.querySelector('.button__back').onclick = function() {
		    seats.prevPlane();
	    };
	    document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.previous'];
	}
	*/
}

/**
 * allPaxSelected()
 *
 * Does something.
 **/
export function allPaxSelected() {
    var skipButton = document.querySelector('.button__skip__cta');

	if (skipButton)
        skipButton.style.display = 'none';

	document.querySelector('#continueButton').style.display = 'block';
	document.querySelector('#continueButton').onclick = function(){
        /*	'seats' is not defined 
        seats.validate(function(){
            seats.nextIncompletePlane();
		});
		*/
	};

	//  'SEAT_LANGUAGES' is not defined 
	//document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
}

/**
 * allSelected()
 *
 * Does something.
 **/
export function allSelected() {
	document.querySelector('#continueButton').style.display = 'block';

	/*  'seats' is not defined 
	if (seats.isLastLeg()){
		document.querySelector('#continueButton').onclick = function(){
		    seats.validate(function(){
			    seats.addToBasket();
		    });
		};

		//  'SEAT_LANGUAGES' is not defined 
		//document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.basketBtn'];
	} else {
		document.querySelector('#continueButton').onclick = function(){

			/* 'seats' is not defined 
			seats.validate(function(){
				seats.nextPlane();
			});
			*/
		//};

		//var skipButton = document.querySelector('.button__skip__cta');

	    //if (skipButton) {
		    //skipButton.style.display = 'none';

		// 'SEAT_LANGUAGES' is not defined 
		//document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
	//}
}

/**
 * afterBaskset()
 *
 * Does something.
 **/
export function afterBasket(){
    console.log('After Basket'); // eslint-disable-line

    /* We need to place a fetch here
    var $http = angular.injector(['ng']).get('$http');

    $http.get('/jam/upsellFlow/next')
    .success(
        function(o){
            console.log(o);
            if (o.nextPage && o.active) {
    	        window.location = "/" + o.nextPage;
    	    } else {
    		    window.location = "/index";
    	    }
        }
	);
	*/
}
<link type="text/css" rel="stylesheet" href="/assets/less/layout/components/seats.less">
<cms:jam var="RESULTS" url="/jam/results/Seats"/>
<cms:jam var="AIRPORTS" url="/jam/airports"/>
<cms:jam var="SEAT_LANGUAGES" url="/jam/languages/seat-selection/results" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
<script type="text/javascript" src="/seat-selection/seats.js"></script>


<!-- Restricted Seat Warning -->
<div class="restricted-seat-warning pop-up">
    <div class="pop-up-message">
        <h3>
            <wicket:message key="seatSelection.restrictedWarning.header"></wicket:message>
        </h3>
        <p>
            <wicket:message key="seatSelection.restrictedWarning.list.header"></wicket:message>
        </p>
        <ul>
            <li><wicket:message key="seatSelection.restrictedWarning.list.infant"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.infantOnLap"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.pregnant"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.16years"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.disabled"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.mobility"></wicket:message></li>
            <li><wicket:message key="seatSelection.restrictedWarning.list.belt"></wicket:message></li>
        </ul>
        <p>
            <wicket:message key="seatSelection.restrictedWarning.warning"></wicket:message>
        </p>
        <div class="buttons">
            <a href="#" id="cancel-seat-selection" class="button__close">
                <wicket:message key="seatSelection.restrictedWarning.buttons.close"></wicket:message>
            </a>
            <a href="#" id="accept-seat-restrictions" class="button__accept__cta">
                <wicket:message key="seatSelection.restrictedWarning.buttons.accept"></wicket:message>
            </a>
        </div>
    </div>
</div>
<!-- Restricted Seat Warning -->
<div class="validation-warning pop-up">
    <div class="pop-up-message" style="background-color:#ffeded; padding: 15px; display: flex;">
        <span class="info-icon">!</span>
        
        <span class="error-message"></span>
        
        <a href="#" id="accept-validation" class="icon-close"></a>
    </div>
</div>
<!-- THE actual plane elements -->
<div class="plane-container">
    <div class="flip-container">
        <div id="planes" class="flipper-card">
            <!-- Contents of this template get repeated for each leg -->
            <template id="plane">
            <div class="flipper result" data-count="">
                <div class="plane">
                    <!-- Actual object holding the seat elements-->
                    
                	<div class="seats"></div>
                	<!-- Pretty background of a plane -->
                	<canvas></canvas>
                </div>
            </div>	
            </template>
        </div>
    </div>
</div>

<div class="wrapper seats-container">
    <!--- THIS IS ALL THE TEMPLATES FOR THE UI -->
    <!-- top buttons for selecting flight legs -->
    <div id="flights" class="flip-navigation">
        <div class="flights-wrapper">
            <template id="flight">
        	<div class="flight flip-trigger" data-count="">
        		<span class="carrier">PaxAir</span>
        		<span class="name">
        		    <span class="route">
        		        <span class="departure"></span>
        		        <span class="departure-code"></span>
        		        <i class="icon-arrow-right"></i>
        		        <span class="arrival"></span>
        		        <span class="arrival-code"></span>
        		    </span>
        		</span>
        	</div>	
        	</template>
        </div>
    </div>
    <!-- info box-->
    <a href="javascript:void(0);" class="open-info">
        <wicket:message key="seatSelection.bandInfo.openBands"></wicket:message>
    </a>
    <div id="info" class="wow content-container" ng-controller="AirportsCtrl">
        <div class="flightinfo"></div>
        <div class="flightBands">
            <div></div>
        </div>
    </div>
    <template id="flightinfo">
    	<div>
    	    <div class="flight-number">
    	        <i class="icon-outbound-plane"></i> <wicket:message key="seatSelection.flightInfo.flightNumber.label"></wicket:message> <span class="number"></span>
    	    </div>
    	    <div class="flight-departure">
    	        <i class="icon-date-time"></i> <wicket:message key="seatSelection.flightInfo.departure.label"></wicket:message> <span class="departure"></span>
    	    </div>
    	    <div class="flight-departure-point flight-point">
    	        <i class="icon-circle-empty"></i> <span class="points"></span>
    	    </div>
    	    <div class="flight-arrival-point flight-point">
    	        <i class="icon-circle-empty"></i> <span class="points"></span>
    	    </div>
    	</div>	
    </template>
    <template id="static-bands">
        
        <div>
            <a href="javascript:void(0);" class="close-info">
                <i class="icon-close"></i>
            </a>
        	<div class="band">
        		<div class="seat selected"></div>
        		<div class="details">
        		    <span class="name">
        		        <wicket:message key="seatSelection.seat.selected"></wicket:message>
        		    </span>
        		    <span class="price"></span>
        		</div>
        		
        	</div>	
        	<div class="band">
        		<div class="seat unavailable"></div>
        		<div class="details">
        		    <span class="name">
        		        <wicket:message key="seatSelection.seat.unavailable"></wicket:message>
        		    </span>
        		    <span class="price"></span>
        		</div>
        		
        	</div>	
        </div>
    </template>
    <template id="infant-band">
        <div class="band">
            <div class="seat infant" style="background-color: transparent;"></div>
            <div class="details">
                <span class="name">
                    <wicket:message key="seatSelection.seat.infant"></wicket:message>
                </span>
                <span class="price"></span>
            </div>
        </div>
    </template>
    <template id="band">
    	<div class="band">
    		<div class="seat"></div>
    		<div class="details">
    		    <span class="name"></span>
    		    <span class="price"></span>
    		</div>
    		
    	</div>	
    </template>
    
    
    <div class="passenger-dropdown sub-header">
        <a href="javascript:void(0);" class="passenger sub-header-content">
        </a>
    </div>
    <div class="selection-wrapper">
        <div id="paxes" class="passenger-selection-container">
            <template id="pax">
            	<div class="passenger">
            	    <span class="pax-number">
            	        <span class="number"></span> 
            	        <span class="icon-guest-outlines"></span>
            	    </span>
        	        
            		<span>
            		    <span class="pax-info">
            		        <span class="name"></span> 
            		        <span class="type"></span> 
            		    </span>
            		    <span class="choice">
            		        <span class="selected-seat"></span>
            		        <!--<span class="price"></span>-->
            		    </span>
            		</span>
            		<div class="clear-fix"></div>
            	</div>	
        	</template>
        </div>
        
        <div class="price-line total content-container" id="totals" style="display:none;">
            <span class="total-desc">
                <i class="icon-wallet"></i>
                <wicket:message key="seatSelection.totals.desc"></wicket:message>
            </span>
            <span class="total-cost">
                
            </span>
        </div>
        <cms:page href="/assets/templates/page_components/booking-fee"></cms:page>
    </div>
    
    
    
    
    
    <div class="button-container__fixed">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <a href="#" onclick="window.history.back();" id="backButton" class="button__back">
            	<wicket:message key="backButton.text"></wicket:message>
            </a>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 powered-by-wrapper">
            <cms:page href="/assets/templates/page_components/powered-by"></cms:page>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <div class="skip">
            <a href="javascript:void(0);" class="button__skip__cta skip-button" onclick="$('.skip .pop-up').addClass('active');">
                <wicket:message key="skipButton.text"></wicket:message>
            </a>
            <div class="pop-up">
                <div class="pop-up-message">
                    <wicket:message key="skip.selectionMessage"></wicket:message>
                    <div class="buttons">
                        <a href="#" onclick="$('.pop-up').removeClass('active');" class="button__close"><wicket:message key="popup.goBack"></wicket:message></a>
                        <a href="/index" class="button__home__cta" style="display:none;">Yes, skip</a>
                        <brix:tile id="merch_skip_step" />
                    </div>
                </div>
            </div>
        </div>
            <a href="#" id="continueButton" class="button__select__cta">
            	<wicket:message key="seatSelection.nav.next"></wicket:message>
            </a>
        </div>
    </div>
</div>








<script>
	function selectionRequired(){
		document.querySelector('#continueButton').style.display="none";
		if(seats.isFirstLeg()){
		    if(FLOW.active && FLOW.stepsVisited !== 1) {
    		    document.querySelector('.button__back').onclick = function(){
    			    window.history.back();
    		    };
    		    document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.back'];
		    } else {
		        document.querySelector('.button__back').style.display="none";
		    }
            if(!FLOW.active) {
                document.querySelector('.button__home__cta').style.display="block";
            }
		}
		if (!seats.isFirstLeg()) {
		    document.querySelector('.button__back').style.display="block";
		    document.querySelector('.button__back').onclick = function(){
			    seats.prevPlane();
		    };
		    document.querySelector('.button__back').innerHTML = SEAT_LANGUAGES['seatSelection.nav.previous'];
		}
	}
	function allPaxSelected(){
	    var skipButton = document.querySelector('.button__skip__cta');
		if(skipButton) {
	        skipButton.style.display="none";
	    }
		document.querySelector('#continueButton').style.display="block";
		document.querySelector('#continueButton').onclick = function(){
	        seats.validate(function(){
	            seats.nextIncompletePlane();
			});
		};
		document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
	}
    
	function allSelected(){
		document.querySelector('#continueButton').style.display="block";
		if(seats.isLastLeg()){
			document.querySelector('#continueButton').onclick = function(){
			    seats.validate(function(){
    			    seats.addToBasket();
			    });
			};
			document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.basketBtn'];
		}else{
			document.querySelector('#continueButton').onclick = function(){
			   seats.validate(function(){
				    seats.nextPlane();
			   });
			};
			var skipButton = document.querySelector('.button__skip__cta');
		    if(skipButton) {
			    skipButton.style.display="none";
			}
			document.querySelector('#continueButton').innerHTML = SEAT_LANGUAGES['seatSelection.nav.next'];
		}
	}

	function afterBasket(){
	    console.log('After Basket');
	    var $http = angular.injector(["ng"]).get("$http");
	    $http.get('/jam/upsellFlow/next')
            .success(
                function(o){
                    console.log(o);
                    if(o.nextPage && o.active) {
            	        window.location = "/" + o.nextPage;
            	    } else {
            		    window.location = "/index";
            	    }
                });
	    
	}

	var seats = new Seats(
		RESULTS.results[0], //the seats optiosn data, loaded at top
		null, //a (shared) jam client instance
		{
			selectionRequired: selectionRequired, //called when the current plane has missing selections
			allPaxSelected: allPaxSelected, //called when the current plane has completed it's selections
			allSelected: allSelected, //called when the all plane have completed selections 
			afterBasket: afterBasket //called when the add to basket has completed (navigate to next page here)
	});

                
	$(document).ready(function() {
	    $(document).on('click', '.open-info', function() {
    	    $('#info').addClass('active'); 
    	});
    	$(document).on('click', '.close-info', function() {
    	    $('#info').removeClass('active');
    	});
	});
	
</script>
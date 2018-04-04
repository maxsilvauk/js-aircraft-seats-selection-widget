(function () {
   'use strict';
}());

/**
 * buildSeatsWrapper()
 *
 * @param { string } target
 * @return
 *
 * The HTML that wraps around the seat map.
 **/
export function buildSeatsWrapper(target) {

  console.log('target', target);

  // Create Elements
  let ele = {
    restricted: document.createElement('div'),
    validation: document.createElement('div'),
    plane: document.createElement('div'),
    info: document.createElement('div')
  };
  
  // Restricted Popup
  ele.restricted.className = 'restricted-seat-warning';
  ele.restricted.className += 'pop-up';
  ele.restricted.innerHTML = `<div class="pop-up-message">
                                <h3>
                                  Information about your seat
                                </h3>
                                <p>
                                  Information about your seat
                                </p>
                                <ul>
                                  <li>an infant</li>
                                  <li>sat with an infant on their lap</li>
                                  <li>pregnant</li>
                                  <li>under 16 years of age</li>
                                  <li>disabled</li>
                                  <li>mobility impaired</li>
                                  <li>requiring a seat belt extension</li>
                                </ul>
                                <p>
                                    If you choose this seat for a passenger in one of the above categories, they will be allocated another seat upon boarding.
                                </p>
                                <div class="buttons">
                                    <a href="#" id="cancel-seat-selection" class="button__close">
                                        I'll choose another seat
                                    </a>
                                    <a href="#" id="accept-seat-restrictions" class="button__accept__cta">
                                        I want this seat
                                    </a>
                                </div>
                              </div>`;

  // Validation Popup
  ele.validation.className = 'validation-warning';
  ele.validation.className += 'pop-up';
  ele.validation.innerHTML = `<div class="validation-warning pop-up">
                                <div class="pop-up-message" style="background-color:#ffeded; padding: 15px; display: flex;">
                                    <span class="info-icon">!</span>
                                    <span class="error-message"></span>
                                    <a href="#" id="accept-validation" class="icon-close"></a>
                                </div>
                              </div>`;

  // Plane Wrapper
  ele.plane.className = 'plane-container';
  ele.plane.innerHTML = `<div class="plane-container">
                          <div class="flip-container">
                            <div id="planes" class="flipper-card"></div>
                          </div>
                        </div>`;

  // Seats Wrapper
  ele.info.className = 'wrapper';
  ele.info.className += 'seats-container';
  ele.info.innerHTML =  `<!--- THIS IS ALL THE TEMPLATES FOR THE UI -->
                        <!-- top buttons for selecting flight legs -->
                        <div id="flights" class="flip-navigation">
                            <div class="flights-wrapper"></div>
                        </div>
                        <!-- info box-->
                        <a href="javascript:void(0);" class="open-info">
                            <i class="icon-info"></i> Show seat info
                        </a>
                        <div id="info" class="wow content-container" ng-controller="AirportsCtrl">
                            <div class="flightinfo"></div>
                            <div class="flightBands">
                                <div></div>
                            </div>
                        </div>
                        <div class="passenger-dropdown sub-header">
                            <a href="javascript:void(0);" class="passenger sub-header-content"></a>
                        </div>
                        <div class="selection-wrapper">
                            <div id="paxes" class="passenger-selection-container"></div>
                            <div class="price-line total content-container" id="totals" style="display:none;">
                                <span class="total-desc">
                                    <i class="icon-wallet"></i>
                                    Total Cost
                                </span>
                                <span class="total-cost">
                                    
                                </span>
                            </div>
                            <cms:page href="/assets/templates/page_components/booking-fee"></cms:page>
                        </div>
                        <div class="button-container__fixed">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <a href="#" onclick="window.history.back();" id="backButton" class="button__back">
                                    &lt; Back
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 powered-by-wrapper">
                                <cms:page href="/assets/templates/page_components/powered-by"></cms:page>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <div class="skip">
                                <a href="javascript:void(0);" class="button__skip__cta skip-button" onclick="$('.skip .pop-up').addClass('active');">
                                    Skip &gt;
                                </a>
                                <div class="pop-up">
                                    <div class="pop-up-message">
                                        You have not made a selection, are you sure you want to continue?
                                        <div class="buttons">
                                            <a href="#" onclick="$('.pop-up').removeClass('active');" class="button__close">No, go back</a>
                                            <a href="/index" class="button__home__cta" style="display:none;">Yes, skip</a>
                                            <brix:tile id="merch_skip_step" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <a href="#" id="continueButton" class="button__select__cta">
                                    Continue &gt;
                                </a>
                            </div>
                        </div>`;

  // ADD WRAPPERS TO THE DOM
  document.querySelector(target).appendChild(ele.restricted);
  document.querySelector(target).appendChild(ele.validation);
  document.querySelector(target).appendChild(ele.plane);
  document.querySelector(target).appendChild(ele.info);
}
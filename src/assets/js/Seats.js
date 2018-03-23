/*
NOTES
- This still relies on some wrapper HTML to be on the page, so I think we need a class before this is called to handle building the wrapper?
- Some of the templates I've swapped in use <wicket:messages> - we need to think about how we want do this - whether these string become configs (with defaults).
-- which reminds me, we need some sort of extend function at the top of the app
- Once the above is done, most of the templating stuff should be done
-- then it's just a case of swapping $http for fetch and change relative links etc
--- relative links will need to have access to siteUrl config param.

Think that's it for the time being
*/

export function Seats(data,jam, callbacks) {
           
    console.log('Seats.js Called and Loaded');
    var _this = this;
    var planeBodyColor = 'white';
    //var $http = angular.injector(["ng"]).get("$http");
    var carriers = {
        'FPO':  '/sharedimages/Suppliers/Suppliers - Flight/fpo',
        'ENT':  '/sharedimages/Suppliers/Suppliers - Flight/ent',
        'S5':   '/sharedimages/carriers/s5',
        'EZY':  '/assets/img/carrier-logos/easyJet.svg',
        'MN':   '/sharedimages/Suppliers/Suppliers - Flight/ent',
        'ZB':   '/assets/img/seats/monarch-web.png',
    };
    //LOGIC 
    var RESULT_ITEM = data;
    var jamResponse = {
        "id":RESULT_ITEM.id,
        "legs":[]
    };
    var pricing = {
        "legs":[]
    };  
    var PAX_INDEX =0; //current pax we are selecting for
    //var MAX_PAX = RESULT_ITEM.passengers.length-1; //max pax index

    var CURRENT_LEG = 0;
    
    var BAND_CLASS = {};
    //compute band class number (for colouring)
    var bc = 1;
    
    var imagesToLoad = {
        wing: '/assets/img/seats/wing.png'
    };
    
    var PARTY_HAS_INFANT = false;
    
    // Get info we need from each leg before we can proceed
    var legs = RESULT_ITEM.legs;
    for(var leg in legs){
        pricing.legs[leg] = {
            'selections':[]
       };
        var bands = legs[leg].bands;//.slice();
        bands.sort(function(a,b){
           return b.price.value - a.price.value;
        });
        for(var band in bands){
            if(!BAND_CLASS[bands[band].id]){
                BAND_CLASS[bands[band].id] = bc++;
            }
        }
        var legCarrier = legs[leg].info.carrier;
        imagesToLoad['leg' + leg + 'Carrier'] = carriers[legCarrier];
    }
    this.nextPlane = function(){
        if(_this.isLastLeg()){
            return;
        }
        CURRENT_LEG++;
        flights[CURRENT_LEG].select();
    };
    this.prevPlane = function(){
        if(_this.isFirstLeg()){
            return;
        }
        CURRENT_LEG--;
        flights[CURRENT_LEG].select();
    };

    this.isLastLeg = function(){
        return CURRENT_LEG==flights.length-1;
    };
    this.isFirstLeg = function(){
        return CURRENT_LEG==0;
    };

    // select the next incomplete plane!
    this.nextIncompletePlane = function (){
        for(var i = 0; i< jamResponse.legs.length; i++){
            var leg = jamResponse.legs[i];
            if(leg.selections.length!=paxes.length){
                CURRENT_LEG=i;
                flights[CURRENT_LEG].select();
                return;
            }
            var selections = leg.selections;
            for(var selection in selections){
                if(selections[selection]==null){
                    CURRENT_LEG=i;
                    flights[CURRENT_LEG].select();
                    return;
                }
            }
        }               
    };
    
    var validationWarning = document.querySelector('.validation-warning');
    var confirmValidation = document.querySelector('#accept-validation');
    
    confirmValidation.onclick = function() {
        validationWarning.style.display = "none";
    };
    
    this.validate = function(callback){
        //showSplash(document.body, "Default Splash");
        console.log(jamResponse);
        $http.post('/jam/seatvalidation',jamResponse)
            .success(
                function(){
                    hideAllSplashes();
                    //validation pass, call next step
                    callback();
                })
            .error(
                function() {
                    hideAllSplashes();
                    //validation failure show to the user
                    if(o && o.errors){
                        validationWarning.querySelector('.error-message').innerHTML = o.errors[0];
                        validationWarning.style.display = "block";
                    }
                    //nb probably in a nicer way....
                });
    }

    this.addToBasket = function(){
        //showSplash(document.body, "Default Splash");
        //TODO check if valid?
        $http.post('/jam/basket/swap',jamResponse)
            .success(
                function(){
                    callbacks.afterBasket();
                })
            .error(
                function() {
                    //hideAllSplashes();
                });
        
    };

    

    /**
     *  Called after selecting/reselecting a seat for a pax
     */
    function selectNextPax(){
        //select first unallocated pax pax
        for(var pax in paxes){
            if(!paxes[pax].isAllocated()){
                paxes[pax].active();
                return;
            }
        }
        //if we get here then the pax are all allocated for this flight
        if(checkFullyAllocated())
            callbacks.allSelected();
        else
            callbacks.allPaxSelected();
    }

    function checkFullyAllocated(){
        //check to see if we are fully allocated
        var legs = jamResponse.legs;
        for(var leg in legs){
            if(legs[leg].selections.length!=paxes.length)
                return false;
            var selections = leg.selections;
            for(var selection in selections){
                if(selections[selection]==null)
                    return false;
            }
            
        }
        return true;
    }

    function month(date) {
        var month = new Array();
        month[0] = SEAT_LANGUAGES['seatSelection.month.jan'];
        month[1] = SEAT_LANGUAGES['seatSelection.month.feb'];
        month[2] = SEAT_LANGUAGES['seatSelection.month.mar'];
        month[3] = SEAT_LANGUAGES['seatSelection.month.apr'];
        month[4] = SEAT_LANGUAGES['seatSelection.month.may'];
        month[5] = SEAT_LANGUAGES['seatSelection.month.jun'];
        month[6] = SEAT_LANGUAGES['seatSelection.month.july'];
        month[7] = SEAT_LANGUAGES['seatSelection.month.aug'];
        month[8] = SEAT_LANGUAGES['seatSelection.month.sep'];
        month[9] = SEAT_LANGUAGES['seatSelection.month.oct'];
        month[10] = SEAT_LANGUAGES['seatSelection.month.nov'];
        month[11] = SEAT_LANGUAGES['seatSelection.month.dec'];  
        return month[date.getMonth()];
    }
    function time(time) {
        return (time<10?'0':'') + time;
    }
    //BUILD bands box info
    function buildBands(){
        var flightInfoWrapper = document.querySelector('#info .flightinfo');
        var bandsWrapper = document.querySelector('#info .flightBands div');
        flightInfoWrapper.innerHTML = "";
        bandsWrapper.innerHTML= "";
        //flight info
        //var infoTemplate = document.querySelector('#flightinfo');   
        var infoTemplate = document.createElement('template');
        infoTemplate.innerHTML =    `<div>
                                        <div class="flight-number">
                                            <i class="icon-outbound-plane"></i>
                                            <wicket:message key="seatSelection.flightInfo.flightNumber.label"></wicket:message>
                                            <span class="number"></span>
                                        </div>
                                        <div class="flight-departure">
                                            <i class="icon-date-time"></i>
                                            <wicket:message key="seatSelection.flightInfo.departure.label"></wicket:message>
                                            <span class="departure"></span>
                                        </div>
                                        <div class="flight-departure-point flight-point">
                                            <i class="icon-circle-empty"></i> <span class="points"></span>
                                        </div>
                                        <div class="flight-arrival-point flight-point">
                                            <i class="icon-circle-empty"></i> <span class="points"></span>
                                        </div>
                                    </div>`; 
        var info = RESULT_ITEM.legs[CURRENT_LEG].info;
        
        if(!info.start){
            //missing departure info, just show the designation (the only bit we a sure to have)
            var infoEle;
            if('content' in document.createElement('template')) {
                infoEle = infoTemplate.content.cloneNode(true).querySelector('*');
            } else {
                infoEle = infoTemplate.cloneNode(true).querySelector('*');   
            }
            infoEle.querySelector('.flight-departure-point .points').style.display = 'none';
            infoEle.querySelector('.flight-arrival-point .points').style.display = 'none';
            infoEle.querySelector('.departure').style.display = 'none';
            infoEle.querySelector('.number').innerHTML = info.designation;
            flightInfoWrapper.appendChild(infoEle);
        }else{
        
            var start = new Date(info.start.replace(/-/g, '\/').replace(/T.+/, ''));
            var startDate = start.getDate() + ' ' + month(start) + ' ' + start.getFullYear();
            var startTime = time(start.getHours()) + ':' + time(start.getMinutes());
            
            var end = new Date(info.end.replace(/-/g, '\/').replace(/T.+/, ''));
            var endTime = time(end.getHours()) + ':' + time(end.getMinutes());
            
            var infoEle;
            if('content' in document.createElement('template')) {
                infoEle = infoTemplate.content.cloneNode(true).querySelector('*');
            } else {
                infoEle = infoTemplate.cloneNode(true).querySelector('*');   
            }
            infoEle.querySelector('.number').innerHTML = info.designation;
            infoEle.querySelector('.departure').innerHTML = startDate;
            infoEle.querySelector('.flight-departure-point .points').innerHTML = startTime + ' ' + AIRPORTS[info.origin].name + ' (' + info.origin + ')';
            infoEle.querySelector('.flight-arrival-point .points').innerHTML = endTime + ' ' + AIRPORTS[info.destination].name + ' (' + info.destination + ')';
            flightInfoWrapper.appendChild(infoEle);
        }
        
        //BANDS
        //Static
        // var staticBandsTemplate = document.createElement('#static-bands');
        // var staticBandEle;
        // if('content' in document.createElement('template')) {
        //     staticBandEle = staticBandsTemplate.content.cloneNode(true);
        // } else {
        //     staticBandEle = staticBandsTemplate.cloneNode(true).querySelector('*'); 
        // }
        var staticBandEle = document.createElement('div');
        staticBandEle.innerHTML =   `<div>
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
                                    </div>`;
        bandsWrapper.appendChild(staticBandEle);
        
        //infant band
        if(PARTY_HAS_INFANT){
            //var infantBandsTemplate = document.querySelector('#infant-band');
            var infantBandsTemplate = document.createElement('template');
            infantBandsTemplate.innerHTML = `<div class="band">
                                                <div class="seat infant" style="background-color: transparent;"></div>
                                                <div class="details">
                                                    <span class="name">
                                                        <wicket:message key="seatSelection.seat.infant"></wicket:message>
                                                    </span>
                                                    <span class="price"></span>
                                                </div>
                                            </div>`;
            var infantBandEle;
            if('content' in document.createElement('template')) {
                infantBandEle = infantBandsTemplate.content.cloneNode(true);
            } else {
                infantBandEle = infantBandsTemplate.cloneNode(true).querySelector('*'); 
            }
            bandsWrapper.appendChild(infantBandEle);
        }
        
        // Dynamic
        //var bandTemplate = document.querySelector('#band'); 
        var bandTemplate = document.createElement('template');
        bandTemplate.innerHTML =    `<div class="band">
                                        <div class="seat"></div>
                                        <div class="details">
                                            <span class="name"></span>
                                            <span class="price"></span>
                                        </div>
                                    </div>`;
        var bands = RESULT_ITEM.legs[CURRENT_LEG].bands;
        for(var band in bands){
            var bandEle;
            if('content' in document.createElement('template')) {
                bandEle = bandTemplate.content.cloneNode(true).querySelector('*');
            } else {
                bandEle = bandTemplate.cloneNode(true).querySelector('*');
            }
            bandEle.querySelector('.seat').setAttribute('data-band',BAND_CLASS[bands[band].id]);
            bandEle.querySelector('.name').innerHTML = bands[band].name;
            bandEle.querySelector('.price').innerHTML = SEAT_LANGUAGES['seatSelection.currency.symbol'] + parseFloat(bands[band].prices[PAX_INDEX].value).toFixed(2);
            
            bandsWrapper.appendChild(bandEle);
        }
    }   


    //BUILD pax
    var paxWrapper = document.querySelector('#paxes');
    //var paxTemplate = document.querySelector('#pax');   
    var paxTemplate = document.createElement('template');
    paxTemplate.innerHTML = `<div class="passenger">
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
                                    </span>
                                </span>
                                <div class="clear-fix"></div>
                            </div>`;

    var paxes = [];
    for(var i = 0; i< RESULT_ITEM.passengers.length; i++){
        var pax = RESULT_ITEM.passengers[i];
        paxes.push(new Pax(i,pax));
    }
    function updatePrice(seat, leg, pax) {
        var band = BAND_CLASS[seat.band]-1; 
        var bandPrice = RESULT_ITEM.legs[leg].bands[band].prices[pax].value;
        pricing.legs[leg].selections[pax] = bandPrice;
    }

    function totals() {
        var _this = this;
        var templateWrapper = document.getElementById('totals');
        var selection = false;
        var cost = 0;
        for(var leg = 0;leg < pricing.legs.length;leg++) {
            if(pricing.legs[leg].selections.length > 0) {
                selection = true;
                for(var i = 0;i < pricing.legs[leg].selections.length;i++) {
                    cost += pricing.legs[leg].selections[i];
                }
            }
        }
        if(selection === true) {
            document.querySelector('#info').classList.add('has-selections');
            templateWrapper.querySelector('.total-cost').innerHTML = '£' + parseFloat(cost).toFixed(2);
            templateWrapper.style.display = 'block';
        } else {
            templateWrapper.style.display = 'none';
            document.querySelector('#info').classList.remove('no-selections');
        }
    }
    function Pax(index,pax){
        var _this = this;

        var paxWrapper = document.getElementById('paxes');
        //var paxTemplate = document.getElementById('pax');   
        var paxTemplate = document.createElement('template');
        paxTemplate.innerHTML = `<div class="passenger">
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
                                        </span>
                                    </span>
                                    <div class="clear-fix"></div>
                                </div>`;
        var paxType = SEAT_LANGUAGES['seatSelection.pax.type.' + pax.type.toLowerCase()];
        var paxEle;
        if('content' in document.createElement('template')) {
            paxEle = paxTemplate.content.cloneNode(true).querySelector('*');
        } else {
            paxEle = paxTemplate.cloneNode(true).querySelector('*');
        }
        this.ele = paxEle;
        paxEle.setAttribute('data-count', index+1);
        paxEle.querySelector('.number').innerHTML = (index+1);
        paxEle.querySelector('.name').innerHTML = pax.firstName + " " + pax.surname;
        if(pax.infant) {
           PARTY_HAS_INFANT = true;
           paxEle.querySelector('.type').innerHTML = paxType + ' ' + SEAT_LANGUAGES['seatSelection.pax.plusInfant']; 
        } else {
           paxEle.querySelector('.type').innerHTML = paxType; 
        }
        
        paxWrapper.appendChild(paxEle);

        this.isAllocated = function(){
            return jamResponse.legs[CURRENT_LEG].selections[index]!=null;
        }

        this.active = function(){
            PAX_INDEX = index;
            for(var pax in paxes){
                paxes[pax].ele.classList.remove('selected');
            }
            _this.ele.classList.add('selected');
            PassengerDropdown.changeDropdown(_this.ele);

            //update band info (prices can change per pax)
            buildBands();

            //inform flight so it can highlight the seats
            flights[CURRENT_LEG].highlightAvailble();
        }

        this.ele.onclick = this.active;

        this.update= function(){
            seat = jamResponse.legs[CURRENT_LEG].selections[index];
            price = pricing.legs[CURRENT_LEG].selections[index];
            if(seat==null){
                paxEle.querySelector('.choice .selected-seat').innerHTML = "";
                //paxEle.querySelector('.choice .price').innerHTML = "";
                //paxEle.classList.remove('selected');
            }else{
                paxEle.querySelector('.choice .selected-seat').innerHTML = seat;
                //paxEle.querySelector('.choice .price').innerHTML = ' £' + parseFloat(price).toFixed(2);
                //paxEle.classList.add('selected');
            }
            totals();
        }
        this.unallocateSeat = function() {
            paxEle.querySelector('.choice .selected-seat').innerHTML = "";
            paxEle.querySelector('.choice .price').innerHTML = "";
            totals();
            
        }
        return this;
    }

    //BUILD flights picker
    var flightWrapper = document.querySelector('#flights .flights-wrapper');
    //var flightTemplate = document.querySelector('#flight'); 
    var flightTemplate = document.createElement('template');
    flightTemplate.innerHTML =   `<div class="flight flip-trigger" data-count="">
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
                                </div>`;

    var flights = [];

    function buildFlights(){
    
        for(var i = 0; i< RESULT_ITEM.legs.length; i++){
            flights.push(new Flight(i,RESULT_ITEM.legs[i].info));
        }
        flights[CURRENT_LEG].select();
    }

    function Flight(index, flight){
        var flightEle;
        if('content' in document.createElement('template')) {
            flightEle = flightTemplate.content.cloneNode(true).querySelector('*');  
        } else {
            flightEle = flightTemplate.cloneNode(true).querySelector('*');  
        }
        this.ele = flightEle;
        
        var carrier;
        for(var key in carriers) {
            if(flight.designation.substring(0, key.length) === key) {
                carrier = carriers[key];
            }
        }
        console.log(flight.designation);
        //imagesToLoad['carrierLogo'] = carrier;
        flightEle.querySelector('.carrier').innerHTML = '<img src="' + carrier + '" />';
        flightEle.querySelector('.name .route .departure').innerHTML = AIRPORTS[flight.origin].name;
        flightEle.querySelector('.name .route .departure-code').innerHTML = flight.origin;
        flightEle.querySelector('.name .route .arrival').innerHTML = AIRPORTS[flight.destination].name;
        flightEle.querySelector('.name .route .arrival-code').innerHTML = flight.destination;
        flightEle.setAttribute('data-count', index + 1);
        var plane = new Plane(index, RESULT_ITEM.legs[index]);
            
        this.select = function(){
            //highlight
            for(var flight in flights)
                flights[flight].ele.classList.remove("active");
            CURRENT_LEG=index;
            flightEle.classList.add("active");
            //show the plane
            plane.show();

            callbacks.selectionRequired();
            //select a pax
            selectNextPax();
            //update pax info
            for(var pax in paxes){
                paxes[pax].update();
            }
            //update band info
            buildBands();
            Flipper.resetFlip(CURRENT_LEG + 1);
        }

        this.highlightAvailble = plane.highlightAvailble;

        flightEle.onclick=this.select;

        flightWrapper.appendChild(flightEle);
    }
            
    //preload images

    var images = [];
    let promises = [];
    console.log(imagesToLoad);
    for(let id in imagesToLoad){
        let img = new Image();
        var url = imagesToLoad[id];
        images[id] = img;
        promises.push(new Promise(function(resolve, reject){
            img.onload = function(){
                resolve(id)
            }
            img.onerror = function(){
                reject(id)
            }
            img.src = url
        }));                
    }

    //when all the images have loaded, build planes!
    Promise.all(promises).then(function(){
        setTimeout(function() {
            buildFlights(); 
            new PassengerSelection();
            new Flipper.init();
        },200);
    });

    function Plane(legNumber, flight){
        var _this = this;
        //var template = document.querySelector('#plane');
        var planeTemplate = document.createElement('template');
        planeTemplate.innerHTML =   `<div class="flipper result" data-count="">
                                    <div class="plane">
                                    <div class="seats"></div>
                                    <canvas></canvas>
                                    </div>
                                    </div>`;
        //clone the plane template
        var planeEle;
        if('content' in document.createElement('template')) {
            planeEle = planeTemplate.content.cloneNode(true).querySelector('*');
        } else {
            planeEle = planeTemplate.cloneNode(true).querySelector('*');
        }
        this.ele = planeEle;
        planeEle.setAttribute('data-count', legNumber + 1);
        document.querySelector('#planes').appendChild(planeEle);

        var seatsWrapper = planeEle.querySelector('.seats');
        var restrictedWarning = document.querySelector('.restricted-seat-warning');
        var confirmRestriction = document.querySelector('#accept-seat-restrictions');
        var rejectRestriction = document.querySelector('#cancel-seat-selection');
        
        var planeWrapper = planeEle.querySelector('.plane');
        
        //push the selctions object across onto our basket request object
        jamResponse.legs.push({"selections":flight.selections});
        var seats = flight.options;
        //check for row numbers that contain no seats at all...
        var validRows = [];
        for(var s in seats){
            var seat = seats[s];
            for(var selection=0;selection<flight.selections.length;selection++) {
                if(seat.seat == flight.selections[selection]) {
                    updatePrice(seat, legNumber, selection);
                }   
            }
            validRows[seat.row] = true;
        }
        var letters = [];
        //build blocks and add row elements
        var blockrows = [];
        for(var b =0; b<flight.layout.blocks; b++){
            //create element
            var div = document.createElement('div');
            div.classList.add('block');
            //add the rows to the block
            blockrows.push([]);
            letters.push([]);
            for(var r =0; r<flight.layout.rows; r++){
                var div2 = document.createElement('div');
                div2.classList.add('plane-row');
                
                // Add aisle number
                if(b<flight.layout.blocks-1){
                    var div3 = document.createElement('div');
                    div3.classList.add('aisle');
                    div3.innerHTML = ""+(r+1);
                    div2.appendChild(div3);
                }

                blockrows[b].push(div2);
                
                //don't display rows with no seats at all
                if(!validRows[r+1])
                    continue;
                div.appendChild(div2);
            }
            //add it to the dom
            seatsWrapper.appendChild(div);
        }

        //add the seats to the rows
        for(var s in seats){
            //make the seat element
            var seat = seats[s];
            var seatDiv = document.createElement('span');
            var rowEle = blockrows[seat.block-1][seat.row-1];
            seatDiv.classList.add('seat');
            //set data attributes
            seatDiv.setAttribute("data-id", seat.seat);
            
            seatDiv.setAttribute("data-band", BAND_CLASS[seat.band]);
            // add window class
            if(seat.type=="WINDOW"){
                seatDiv.classList.add('window');
                rowEle.classList.add('window');
            }
            // add restricted class
            if(seat.access=="RESTRICTED"){
                seatDiv.classList.add('restricted');
                rowEle.classList.add('exit');
                rowEle.setAttribute('data-exit-text',SEAT_LANGUAGES['seatSelection.exit.text']);
            }
            // mark seats with no avaibility at all
            if(seat.available==null || seat.available.length==0){
                seatDiv.classList.add('unavailable');
            }else if(PARTY_HAS_INFANT){
                //check if any pax has an infant, and they can sit here
                //todo will be able to check seat.infant in the future (4.7?)
                var infant= false;
                for(var idx = 0; idx<seat.available.length; idx++){
                  //  console.log(RESULT_ITEM.passengers, seat.available, idx, seat.available[idx]-1, RESULT_ITEM.passengers[seat.available[idx]-1]);
                    var pax = RESULT_ITEM.passengers[seat.available[idx]-1];
                    if(pax.infant)
                        seatDiv.classList.add('infant');
                }
            }
        
            // wire the onclick event
            // wrapper function to define fixed seat scope variable (as it is a loop var)
            seatDiv.onclick = function(_seat){
                return function(){
                    if($(this).attr('data-pax')){
                        _this.unselectSeat(_seat, this);
                    } else {
                        
                        if(_seat.access=="RESTRICTED") {
                            restrictedWarning.style.display = "block";
                            confirmRestriction.onclick = function() {
                                restrictedWarning.style.display = "none";
                                 _this.selectSeat(_seat);
                            }
                            rejectRestriction.onclick = function() {
                                restrictedWarning.style.display = "none";
                            }
                            //_this.selectSeat(_seat);
                        } else {
                            _this.selectSeat(_seat);
                        }
                    }
                }
            }(seat);
            // highlight already selectd seats
            for(var idx = 0; idx<flight.selections.length; idx++){
                if(flight.selections[idx]==seat.seat){
                    seatDiv.classList.add('selected');
                    seatDiv.setAttribute("data-pax", (idx+1));
                }
            }
            // actually add the seat to the dom
            rowEle.appendChild(seatDiv);
            
            // Get the letter!
            var letter = seat.seat.replace(/[0-9]/g, '');
            if(letters[seat.block-1].indexOf(letter)<0) {
                letters[seat.block-1].push(letter);   
            }
        }

        //push out the letters
        
        for(var i = 0; i< letters.length; i++){
            var firstrow = blockrows[i][0];
            var div = document.createElement('div');
            div.classList.add('letter-row');
            for(var letter in letters[i]){
                var l = letters[i][letter];
                div.innerHTML+="<span class='row-letter'>"+l+"<span>";
            }
            firstrow.parentNode.insertBefore(div, firstrow);
        }
        

        //DRAW THE PLANE BACKGROUND
        var planeBody = {
            width: seatsWrapper.offsetWidth,
            height: seatsWrapper.offsetHeight - 300,
            color: planeBodyColor
        };

        //we can hide this now
        //planeEle.classList.add("inactive");

        var planeNose = {
            height:440
        }

        var planeWalls = {
            width: 16,
            height: 20
        }

        var planeWing = {
            width: 115,
            height: 431
        }
        var carrierLogo = {
            width: 866,
            height: 75
        }
        var planeTail = {
            height: 700,
            width: 1023
        }
        var plane = planeEle.querySelector('canvas');
        var ctx = plane.getContext("2d");
        console.log(legNumber);
        plane.width = planeBody.width+ planeWalls.width*2 + planeWing.width*2; // 2* wall + TWO WINGS
        plane.mask = planeBody.width+ planeWalls.width*2 + planeWing.width*2;
        plane.height = planeBody.height+ planeNose.height+planeTail.height +planeWalls.height*2; // tail + nose
            
        
        //draw fuselage
        ctx.fillStyle = planeBody.color;
        
        ctx.beginPath();
        //left side
        ctx.moveTo(plane.width/2-planeBody.width/2-planeWalls.width, planeNose.height);
        ctx.lineTo(plane.width/2-planeBody.width/2-planeWalls.width, planeNose.height+planeBody.height+planeWalls.height*2);
        //tail
        var tailheight = planeTail.height;
        var h = planeNose.height+planeBody.height+planeWalls.height*2;
        var x1 = planeBody.width/2+planeWalls.width;
        ctx.bezierCurveTo(plane.width/2 - x1*0.95, h+tailheight*0.1,
            plane.width/2 - x1*0.7, h+tailheight*0.55,
            plane.width/2,      h+tailheight*0.6);
        ctx.bezierCurveTo(plane.width/2 + x1*0.7, h+tailheight*0.55,
            plane.width/2 + x1*0.95, h+tailheight*0.2,
            plane.width/2 + x1,         h+tailheight*0.0);
        //right side
        ctx.lineTo(plane.width/2+planeBody.width/2+planeWalls.width, planeNose.height+planeBody.height+planeWalls.height*2);
        ctx.lineTo(plane.width/2+planeBody.width/2+planeWalls.width, planeNose.height);
        //nose
        var x = planeBody.width/2+planeWalls.width;
            ctx.bezierCurveTo(plane.width/2 + x, planeNose.height*0.75,
            plane.width/2 + x*0.5, planeNose.height*0.0,
            plane.width/2, 0);

            ctx.bezierCurveTo(plane.width/2-x*0.5, 0,
            plane.width/2-x, planeNose.height*0.75,
            plane.width/2-x, planeNose.height);
        ctx.fill();
        
        // We must take stock and save before doing some rotations
        ctx.save(); 
        ctx.globalCompositeOperation = 'source-atop';
        ctx.translate(planeWing.height+(carrierLogo.height*2)+(planeWalls.width*0.4), planeNose.height-100);
        ctx.rotate(90 * Math.PI/180);
        ctx.drawImage(images['leg'+legNumber+'Carrier'], 0, planeNose.height, carrierLogo.width, carrierLogo.height);
        ctx.restore();
        // We must take stock and save before doing some MORE rotations
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.translate(-(planeWing.width-(planeWalls.width*1.5)), (planeNose.height+carrierLogo.width)-200); 
        ctx.rotate(270 * Math.PI/180);
        console.log(images['leg'+legNumber+'Carrier']);
        ctx.drawImage(images['leg'+legNumber+'Carrier'], -(planeNose.height/4), planeNose.height, carrierLogo.width, carrierLogo.height);
        // Restore the plan to correct rotation
        ctx.restore();
        
        // And some more carrier logos
        
        ctx.globalCompositeOperation = 'source-over';
        //draw some wings :)
        ctx.drawImage(images['wing'], 0, (planeBody.height+ planeNose.height)/2 - planeWing.height/4);
        
        ctx.scale(-1,1);
        ctx.drawImage(images['wing'], -plane.width, (planeBody.height+ planeNose.height)/2 - planeWing.height/4);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        //draw the (bottom) tail fins
        //ctx.drawImage(images['tailBottom'], plane.width/2-planeTail.width/2, planeBody.height+ planeNose.height+planeWalls.height*2 -100);
        ctx.restore();
        //position the seats DOM element correctly
        seatsWrapper.style.top = (planeNose.height+planeWalls.height) + "px"
        seatsWrapper.style.left = (planeWalls.width + planeWing.width) + "px"

        //force the width of the parent elements to be correct
        planeWrapper.style.width=plane.width+ "px";
        planeEle.style.width="100%";
        planeEle.style.height=plane.height+ "px";
        
        this.selectSeat = function(seat){
            //grab the seat for this
            var ele = planeEle.querySelector('.seat.selectable[data-id="'+seat.seat+'"]');
            if(ele==null)
                return;
                
            //cannot select already slected seats
            if(ele.dataset.pax!=null && ele.dataset.pax!='')
                return;
            
            //remove selection from this pax's previous seat (if there was one)
            var oldSeat = planeEle.querySelector('.seat[data-pax="'+(PAX_INDEX+1)+'"]');
            if(oldSeat!=null){
                oldSeat.classList.remove('selected');
                oldSeat.removeAttribute("data-pax");
            }
            updatePrice(seat, legNumber, PAX_INDEX);
            jamResponse.legs[CURRENT_LEG].selections[PAX_INDEX] = seat.seat;
            //mark seat as selected
            ele.setAttribute("data-pax", (PAX_INDEX+1));
            paxes[PAX_INDEX].update(seat);

            //selectNext pax
            selectNextPax();
        }
        this.unselectSeat = function(seat, seatDiv) {
            var currentPax = seatDiv.getAttribute('data-pax');
            seatDiv.classList.remove('selected');
            seatDiv.removeAttribute("data-pax");
            jamResponse.legs[legNumber].selections[currentPax-1] = null;
            pricing.legs[legNumber].selections[currentPax-1] = null;
            paxes[currentPax-1].unallocateSeat();
            paxes[currentPax-1].active();
            selectionRequired();
        }
        this.highlightAvailble = function(){
            //update seat class list based on if they can be selected
            for(var s in seats){
                var seat = seats[s];

                var ele = planeEle.querySelector('.seat[data-id="'+seat.seat+'"]');
                if(seat.available.indexOf((PAX_INDEX+1)+"")>=0){
                    ele.classList.add("selectable");
                }else{
                    ele.classList.remove("selectable");
                }
            }
        }
        this.show = function(){
            //mark all other planes as hidden
            var planes = document.querySelectorAll('#planes .plane');
            for(var i = 0; i< planes.length; i++){
                var p = planes[i];
                //p.classList.remove('active');
                //p.classList.add('inactive');
            }
        }
        return this;
    }
}
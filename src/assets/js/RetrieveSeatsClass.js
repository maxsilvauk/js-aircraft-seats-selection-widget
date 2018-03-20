'use strict'

{
  /**
   * @Class: RetrieveSeatsClass
   * @Desc: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   **/
}  
class RetrieveSeatsClass {

    constructor() {
        this.siteUrl = 'https://merch.fabrix.xmltravel.com';
        this.loader = document.getElementById('loader');
        this.seatResults = document.getElementById('seat-results');
        this.surname = 'SMITH';
        this.ref = '1111';

        this.iFrame = document.createElement('iframe');
        this.iFrame.addEventListener('load', this.iFrameLoad);

        this.iFrame.style.display = 'none';
        this.iFrame.src = 'http://merch.fabrix.xmltravel.com/jam/session/create?session=null'; 

        document.body.appendChild(this.iFrame);
    }

    iFrameLoad() {
        console.log('iFrame','*** Loaded ***');

        // fetch.(this.siteUrl+'/'+j) {
        //     // need to research httpRequest.withCredentials = true; how this is done with fetch.
        // }
    }
}

export default RetrieveSeatsClass;
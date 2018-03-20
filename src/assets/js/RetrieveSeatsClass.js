'use strict'

{
  /**
   * @Class: RetrieveSeatsClass
   * @Desc: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   **/
}  
class RetrieveSeatsClass {

    constructor(jhgkjg) {
        this.ref = '1111';
        this.surname = 'SMITH';
        this.siteUrl = 'https://merch.fabrix.xmltravel.com';
        this.loader = document.getElementById('loader');
        this.seatResults = document.getElementById('seat-results');

        this.iFrame = document.createElement('iframe');
        this.iFrame.addEventListener('load', () => this.iFrameLoad());

        this.iFrame.style.display = 'none';
        this.iFrame.src = 'http://merch.fabrix.xmltravel.com/jam/session/create?session=null'; 

        document.body.appendChild(this.iFrame);
    }

    iFrameLoad() {
        const fetchUrl = `${this.siteUrl}/jam/historicbasket?ref=${this.ref}&system=ATCORE&surname=${this.surname}`

        fetch(fetchUrl,{credentials:'include'})
         .then(response => response.json())
         .then(data => {
           // Here’s a list of repos!
           console.log('response: ', data)
         })
         .catch((err) => console.log('error: ', err));

            // need to research httpRequest.withCredentials = true; how this is done with fetch.
    }
}

export default RetrieveSeatsClass;
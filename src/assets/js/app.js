import { person, sayHello } from './lib';

alert(sayHello('Max!! =)'));


const fetchData = async(method, url, data, callback) => {
 	const httpRequest = new XMLHttpRequest();

 	httpRequest.onreadystatechange = function() {   	
	   	if (httpRequest.readyState === 4) {
	    	if (httpRequest.status === 200) {
	            let data = JSON.parse(httpRequest.responseText);
	            if (callback) callback(data);
	        }
	    }
	};

  	httpRequest.open(method, url, true);
  	httpRequest.withCredentials = true;
  
  	if (data != null) {
    	let sendData = JSON.stringify(data);
    	httpRequest.send(sendData);
	} else {
    	httpRequest.send();
	}
}


const retrieveSeats = () => {
    event.preventDefault();

    const loader = document.getElementById('loader');
    const seatResults = document.getElementById('seat-results');
    const surname = document.getElementById('surname').value;
   	const ref = document.getElementById('ref').value;
    const iframe = document.createElement('iframe');

    seatResults.style.display = "none";
    loader.style.display = "block";

    iframe.onload = function() {
        const url = "https://merch.fabrix.xmltravel.com";
        
        fetchData("GET", url + '/jam/historicbasket?ref='+ref+'&system=ATCORE&surname='+surname+'', '', function(basket) {
            console.log(basket);
            fetchData("POST", url + '/jam/search', {"journey":"Seats"}, 
                function(search) {
                    fetchData("GET", url + '/jam/results/Seats','', function(seats) {
                        seatResults.innerHTML = JSON.stringify(seats);
                        seatResults.style.display = "block";
                        loader.style.display = "none";
                    });
                }
            );
        });
    };

    iframe.style.display = 'none';
    iframe.src = 'http://merch.fabrix.xmltravel.com/jam/session/create?session=null'; 

    document.body.appendChild(iframe);
}
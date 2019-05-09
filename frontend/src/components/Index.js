import React, { Component } from 'react';

class Index extends Component {
    render(){
        return (
           <React.Fragment>
               <h1>Postcard Exchange</h1>
                
                <p>
                    The earliest known picture postcard was a hand-painted in London by the writer Theodore Hook in 1840. It was addressed to himself as a prank: the picture he so meticulously painted stroke by stroke was a caraciture of his mailman.
                </p>
                <p>
                    This project is not about pranks, but it is about capturing that excitment and thrill of receiving a surprise in the mail. On the 15th of each month, the application will randomly pair up participants, allowing each person to view the name and address of their partner and to indicate when a postcard is sent and received. The app also includes a gallery where particpants can upload pictures of their postcards, marking the card's journey on Google Maps.  
                </p>
          
                <p>
                    The element of surprise of receiving postcards from different places around the planet transforms an ordinary stroll to the mailbox into an exciting adventure. Who knows? You might just make a friend. 
                </p>

           </React.Fragment>
        );
    }
};

export default Index;
import React, { Component } from 'react';

class Index extends Component {
    render(){
        return (
           <React.Fragment>
               <h1>Postcard Exchange</h1>
                
                <p>
                    The first known postcard ever mailed was a practical joke. It was painted by the distnguished gentleman, Theodor Hook of London, England and addressed to him as well.  Why would he send a card to himself? The image he so meticulously painted by hand was a caraciture of his mailman. 
                </p>
                <p>
                    This project is not about pranks, but it is about capturing the excitment and thrill of receiving a surprise in the mail. On the 15th of each month, the application will randomly pair up participants, allowing each person to view the name and address of their partner and to indicate when a postcard is sent and received. The app also includes a gallery where particpants can upload pictures of their postcards, marking the card's journey on Google Maps.  
                </p>
          
                <p>
                    In a world of meaningless electronic communication, it's refreshing to connect with someone who values analog.  
                </p>

           </React.Fragment>
        );
    }
};

export default Index;
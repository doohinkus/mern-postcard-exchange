import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import step1 from "../images/step-1.png";
import step2 from "../images/step-2.png";
import step3 from "../images/step-3.png";
import postcard from "../images/post-card.png";


class Index extends Component {
    render(){
        return (
           <React.Fragment>
               <Fade>
<div className="w-70">

                <div className="card text-left mt-3 p-3">
                    <div className="row">
                        <div className="col-md-4 text-center">
                        <p><img src={postcard} /></p>
                        </div>
                        <div className="col-md-8">
                            <p>
                                The world's first postcard was a practical joke, painted by the distnguished gentleman, Theodore Hook of London, England. He mailed the card to himself in order to tease his mail courier: The picture Theodore so meticulously painted on the card was a caricature of his mailman. 
                            </p>
                            <p>
                                This project is not about pranks, but it is about capturing the excitment and thrill of receiving a surprise in the mail. On the 15th of each month, the application will randomly pair up participants, allowing each person to view the name and address of their partner and to indicate when a postcard is sent and received. The app also includes a gallery where particpants can upload pictures of their postcards, marking the card's journey on Google Maps.  
                            </p>
                        </div>

                    </div>
                
                      
                </div>   
                <div className="card text-left mt-3 p-3">
                    <div className="row">
                        <div className="col-xl-12 text-center">
                            <img src={step1} className="img-thumbnail border-0" />
                        </div>
                        <div className="col-xl-12 align-middle">
                            Take a photo with your camera. Film is preferred, but digital is OK too. You will be sharing your work with photographers of all levels.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 text-center">
                            <img src={step2} className="img-thumbnail border-0" />
                        </div>
                        <div className="col-xl-12">
                        Develop or print photo--it's perfectly fine to simply write on the back of a print and stick postage on it. Darkroom prints are preferred, digital prints are OK too. Most people in this exchange strongly prefer darkroom prints. There's something magical about the chemistry of light.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 text-center">
                            <img src={step3} className="img-thumbnail border-0" />
                        </div>
                        <div className="col-xl-12">
                            Mail the photo postcard to your partner. Make sure you apply proper postage and double check the address. On your profile page there is spot to indicate the whether or not you have sent or received your postcard. You are paired randomly. Sometimes the person you send the card to will be the person who sends a card to you, but not always. Most of the time you will be sending a card to someone who will NOT be sending you a card. Your card will come from someone else.
                        </div>
                    </div>
                </div>
</div>
               </Fade>

           </React.Fragment>
        );
    }
};

export default Index;
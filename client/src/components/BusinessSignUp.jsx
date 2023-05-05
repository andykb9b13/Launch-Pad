import React, {useState} from "react";
import {Route, Link, Routes, useNavigate} from "react-router-dom"

export default function BusinessSignUp(){
    const [businessName, setBusinessName] = useState("");
    const [location, setLocation] = useState("");
    const [websiteURL, setWebsiteURL] = useState("");
    const [twitterURL, setTwitterURL] = useState("");
    const [facebookURL, setFacebookURL] = useState("");
    const [instagramURL, setInstagramURL] = useState("");
    const [description, setDescription] = useState("");

    //Handle & store Changes for input values
    function handleNameChange(e){
        setBusinessName(e.target.value);
    }
    function handleLocationChange(e){
        setLocation(e.target.value);
    }
    function handleWebsiteChange(e){
        setWebsiteURL(e.target.value);
    }
    function handleTwitterChange(e){
        setTwitterURL(e.target.value);
    }
    function handleFacebookChange(e){
        setFacebookURL(e.target.value);
    }
    function handleInstagramChange(e){
        setInstagramURL(e.target.value);
    }
    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }
    //set cancel button to previous page.
    const prevPage = () => {
    }
    //Move to next steps
    const onSubmit = (e) => {
        e.preventDefault();
        const userInfo = {
            businessName: businessName,
            location: location,
            websiteURL: websiteURL,
            twitterURL: twitterURL,
            facebookURL: facebookURL,
            instagramURL, instagramURL,
            description, description
        }
        console.log(userInfo);
    }

    return(
        <div>
            <form>
                <div>
                    <label>Business Name</label>
                    <input type="text" placeholder="Your Business Name" onChange={handleNameChange}/>
                </div>

                <div>
                    <label>Location</label>
                    <input type="text" placeholder="Business Location" onChange={handleLocationChange}/>
                </div>

                <div>
                    <label>Website URL</label>
                    <input type="text" placeholder="www.examplebusiness.com" onChange={handleWebsiteChange}/>
                </div>

                <div>
                    <label>Twitter</label>
                    <input type="text" placeholder="www.twitter.com/yourbusiness" onChange={handleTwitterChange}/>
                </div>

                <div>
                    <label>Facebook</label>
                    <input type="text" placeholder="www.facebook.com/yourbusiness" onChange={handleFacebookChange}/>
                </div>

                <div>
                    <label>Instagram</label>
                    <input type="text" placeholder="www.instagram.com/yourbusiness" onChange={handleInstagramChange}/>
                </div>

                <div>
                    <label>Description</label>
                    <textarea placeholder="Enter Description Here" onChange={handleDescriptionChange}/>
                </div>

                <div>
                    <button type="submit" onClick={prevPage}>Next</button>
                    <button>Cancel</button>
                </div>
            </form>
        </div>
    )
}
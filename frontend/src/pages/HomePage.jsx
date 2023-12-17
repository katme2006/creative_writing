import React from "react";
import PromptComponent from "../components/PromptGenerator";
import ViewAllResponses from "../components/View_All_Responses";
import RecentCollectionsList from "../components/Display_Collections";
import handwrittenVideo from '../assets/handwritten.mp4';
import mobileImage from '../assets/HandWriting.svg'; // Ensure this path is correct
import "../styles/Home.css";

const HomePage = ({ userToken }) => {
  return (
    <div>
      <div className="hero">
        <div className="left-hero">
          {/* Video will only display for desktop sizes */}
          <video autoPlay muted className="background-video desktop-only">
            <source src={handwrittenVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Image will only display for mobile sizes */}
          <img src={mobileImage} alt="Handwritten Background" className="mobile-only" />
        </div>
        <div className="right-hero">
          <h1>Write Now.</h1>
         
          <PromptComponent userToken={userToken} />
        </div>
      </div>
      <RecentCollectionsList userToken={userToken} />
      <ViewAllResponses userToken={userToken} />
    </div>
  );
};

export default HomePage;

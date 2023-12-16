import React from 'react';
import PromptComponent from '../components/PromptGenerator';
import ViewAllResponses from '../components/View_All_Responses';
import RecentCollectionsList from '../components/Display_Collections';
import '../styles/Home.css';

const HomePage = ({ userToken }) => {
  if (!userToken) {
    // User is not logged in
    return (
      <div>
        <div className='hero'>
          <div className='left-hero'>
            <h1>Write Now.</h1>
            <p>Welcome to Write Now! Generate a writing prompt to get started.</p>
          </div>
          <PromptComponent userToken={userToken} />
        </div>
      </div>
    );
  }

  // User is logged in
  return (
    <div>
      <div className='hero'>
        <div className='left-hero'>
          <h1>Write Now.</h1>
          <p>This page will include a basic generator with no additional features, and a product introduction/explanation</p>
        </div>
        <PromptComponent userToken={userToken} />
      </div>
      <RecentCollectionsList userToken={userToken} />
      <ViewAllResponses userToken={userToken} />
    </div>
  );
};

export default HomePage;

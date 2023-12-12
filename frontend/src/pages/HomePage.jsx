// HomePage.jsx

import React from 'react';
import PromptComponent from '../components/PromptGenerator';
import ViewAllResponses from '../components/View_All_Responses';
import RecentCollectionsList from '../components/Display_Collections';

const HomePage = ({ userToken }) => {
  return (
    <div>
      <h1>Home Page Content Goes Here</h1>
      <p>This page will include a basic generator with no additional features, and a product introduction/explanation</p>
      <PromptComponent userToken={userToken} />
      <ViewAllResponses userToken={userToken} />
      <RecentCollectionsList userToken={userToken}/>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup_Page';
import Login from './pages/Login_Page';
import MyProfile from './pages/My_Profile_Page';
import EditProfilePage from './pages/EditProfilePage';
import PromptComponent from './components/PromptGenerator';
import DisplayPrompt from './components/DisplayPrompt';
import DisplayPromptWithResponse from './components/MemberPromptGenerator';
import DisplaySubmittedPrompt from './pages/A_Response_Page';
import EditResponse from './components/EditResponsePage';
import RecentCollectionsList from './components/Display_Collections';
import WritingCollectionsList from './pages/View_All_Collections'
import CollectionCreateForm from './pages/Create_Collection';
import CollectionDetail from './pages/Collection_Detail';

const AppRouter = ({ isLoggedIn, userToken, onLoginSuccess, onSignupSuccess, onLogout }) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage userToken={userToken} />} />
            <Route path="/generate-prompt" element={<PromptComponent userToken={userToken} />} />
            <Route path="/display-prompt" element={isLoggedIn ? <DisplayPromptWithResponse userToken={userToken} /> : <DisplayPrompt />} />
            <Route path="/a-response-page/:promptId" element={<DisplaySubmittedPrompt userToken={userToken} />} />
            <Route path="/edit-response/:responseId" element={<EditResponse userToken={userToken} />} /> {/* Add this line for editing responses */}
            <Route path="/recent-collections" element={<RecentCollectionsList userToken={userToken} />} />
            <Route path="/all-collections" element={<WritingCollectionsList userToken={userToken} />} />
            <Route path="/create-collection" element={<CollectionCreateForm userToken={userToken} />} />
            <Route path="/collection/:collectionId" element={<CollectionDetail userToken={userToken} />} />
            {!isLoggedIn && (
                <>
                    <Route path="/signup" element={<Signup onSignupSuccess={onSignupSuccess} />} />
                    <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
                </>
            )}

            {isLoggedIn && (
                <>
                    <Route path="/my-profile" element={<MyProfile userToken={userToken} />} />
                    <Route path="/edit-profile" element={<EditProfilePage userToken={userToken} />} />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;

import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

import CharacterDetails from '../../CharacterDetails';
import AddCharacter from './AddCharacter'
import EditInfo from './EditInfo'


function Profile() {
    const [allChars, setAllChars] = useState('');

    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    const [currentTab, setCurrentTab] = useState('AllCharacters');

    const handleTabSelect = () => {

        if (document.getElementById('allCharTab').checked) {
            setCurrentTab('AllCharacters');
        };
        if (document.getElementById('newCharTab').checked) {
            setCurrentTab('AddCharacter')
        };
        if (document.getElementById('editInfoTab').checked) {
            setCurrentTab('EditInfo')
        };

    };

    const getAllChars = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${tokenData.id}`)
            setAllChars(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllChars();
    }, []);

    const renderTab = () => {

        // My Characters
        if (currentTab === 'MyCharacters') {

            return (

                allChars.map( char => {

                    <div className="characterPreview">
                        <CharacterDetails currentTab={currentTab} setCurrentTab={setCurrentTab} char={char} />
                    </div>

                })

            );

        };

        // Add Character
        if (currentTab === 'AddCharacter') {
            return <AddCharacter currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };

        // Edit Info
        if (currentTab === 'EditInfo') {
            return <EditInfo currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };

    };


    return (
        <div className="page">

            <div className="tabHeader">

                <h3 className="welcomeMessage">Welcome, {tokenData.user_name}!</h3>

                <div className="tabs" onClick={handleTabSelect}>

                    <input type="radio" id="allCharTab" name="profileTabs" value="allCharTab" defaultChecked className="tab"></input>
                    <label htmlFor="allCharTab" className={currentTab === 'MyCharacters' ? "tabLabel activeTab" : "tabLabel"}>My Characters</label>

                    <input type="radio" id="newCharTab" name="profileTabs" value="newCharTab" className="tab"></input>
                    <label htmlFor="newCharTab" className={currentTab === 'AddCharacter' ? "tabLabel activeTab" : "tabLabel"}>Add Character</label>

                    <div className="tabDivider"></div>

                    <input type="radio" id="editInfoTab" name="profileTabs" value="editInfoTab" className="tab"></input>
                    <label htmlFor="editInfoTab" className={currentTab === 'EditInfo' ? "tabLabel activeTab" : "tabLabel"}>Edit Profile</label>

                </div>

            </div>

            {renderTab()}

        </div>
    );

};

export default Profile;
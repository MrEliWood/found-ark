// import components
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Group from './Group';
import CreateGroup from './CreateGroup';
import MyGroups from './MyGroups';
import AllGroups from './AllGroups';
import './style.css';

function Groups({ user }) {

    const [currentTab, setCurrentTab] = useState('AllGroups');

    const handleTabSelect = () => {

        if (document.getElementById('allGroupsTab').checked) {
            setCurrentTab('AllGroups');
        };
        if (document.getElementById('myGroupsTab').checked) {
            setCurrentTab('MyGroups')
        };
        if (document.getElementById('createGroupsTab').checked) {
            setCurrentTab('CreateGroup')
        };

    };

    let navigate = useNavigate();

    const renderTab = () => {

        if (currentTab === 'AllGroups') {
            return <AllGroups currentTab={currentTab} setCurrentTab={setCurrentTab} user={user} />;
        };
        if (currentTab === 'MyGroups') {
            return user ? <MyGroups currentTab={currentTab} setcurrentTab={setCurrentTab} user={user} /> : navigate(`/login`);
        };
        if (currentTab === 'Group') {
            return user ? <Group currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        if (currentTab === 'CreateGroup') {
            return user ? <CreateGroup currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        return <AllGroups />;

    };

    return (

        <div className="page">

            <div className="tabHeader">

                {user?.logged_in ? (
                    <div className="tabs" onClick={handleTabSelect}>

                        <input type="radio" id="allGroupsTab" name="groupTabs" value="allGroupsTab" defaultChecked className="tab"></input>
                        <label htmlFor="allGroupsTab" className={currentTab === 'AllGroups' ? "tabLabel activeTab" : "tabLabel"}>All Groups</label>

                        <input type="radio" id="myGroupsTab" name="groupTabs" value="myGroupsTab" className="tab"></input>
                        <label htmlFor="myGroupsTab" className={currentTab === 'MyGroups' ? "tabLabel activeTab" : "tabLabel"}>My Groups</label>

                        <div className="tabDivider"></div>

                        <input type="radio" id="createGroupsTab" name="groupTabs" value="createGroupsTab" className="tab"></input>
                        <label htmlFor="createGroupsTab" className={currentTab === 'CreateGroup' ? "tabLabel activeTab" : "tabLabel"}>Create New Group</label>

                    </div>
                ) : (<></>)}

            </div>

            {renderTab()}

        </div>

    );

};

export default Groups;
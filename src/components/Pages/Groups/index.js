// import components
import React, { useState } from 'react';
import Group from './Group';
import CreateGroup from './CreateGroup';
import MyGroups from './MyGroups';
import AllGroups from './AllGroups';
import './style.css';

function Groups({ currentPage, setCurrentPage }) {

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

    const renderTab = () => {

        if (currentTab === 'AllGroups') {
            return <AllGroups currentTab={currentTab} setCurrentTab={setCurrentTab} />;
        };
        if (currentTab === 'MyGroups') {
            return <MyGroups currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };
        if (currentTab === 'Group') {
            return <Group currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };
        if (currentTab === 'CreateGroup') {
            return <CreateGroup currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };
        return <AllGroups />;

    };

    return (

        <div className="page">

            <div className="groupsHeader">

                <input type="search" id="groupFilter" placeholder="Search tags..." className="filterSearch"></input>

                <div className="groupTabs" onClick={handleTabSelect}>

                    <input type="radio" id="allGroupsTab" name="groupTabs" value="allGroupsTab" checked="checked" className="groupTab"></input>
                    <label htmlFor="allGroupsTab" className={ currentTab === 'AllGroups' ? "groupTabLabel activeTab" : "groupTabLabel"}>All Groups</label>

                    <input type="radio" id="myGroupsTab" name="groupTabs" value="myGroupsTab" className="groupTab"></input>
                    <label htmlFor="myGroupsTab" className={ currentTab === 'MyGroups' ? "groupTabLabel activeTab" : "groupTabLabel"}>My Groups</label>

                    <div className="tabDivider"></div>

                    <input type="radio" id="createGroupsTab" name="groupTabs" value="createGroupsTab" className="groupTab"></input>
                    <label htmlFor="createGroupsTab" className={ currentTab === 'CreateGroup' ? "groupTabLabel activeTab" : "groupTabLabel"}>Create New Group</label>

                </div>

            </div>

            {renderTab()}

        </div>

    );

};

export default Groups;
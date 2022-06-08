import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header({ user, logout , test}) {

    return (

        <header>

            <div className="siteTitle">

                <img src="/assets/icons/lost-ark-icon.png" alt="lost ark logo" className="lostArkIcon"></img>
                <a href="/"><h1>Found Ark</h1></a>

            </div>

            <Navigation user={user} logout={logout} test={test}/>

        </header>

    )

};

export default Header;
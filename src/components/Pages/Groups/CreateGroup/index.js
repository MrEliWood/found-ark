import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// import TimezoneSelect from 'react-timezone-select'
import './style.css';


function CreateGroup() {

    // form data
    // const [selectedTimezone, setSelectedTimezone] = useState({});
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [discord, setDiscord] = useState("");
    const [allChars, setAllChars] = useState([]);
    const [charId, setCharId] = useState(null);
    const [day, setDay] = useState("2022-06-06");
    const [timeZone, setTimeZone] = useState("(GMT+00:00) Greenwich Mean Time");
    const [time, setTime] = useState("");
    const [newTag, setTag] = useState("");
    const [tags, addNewTag] = useState([]);

    // define token
    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    // time zone array
    const timeZones = [
        '(GMT+00:00) Greenwich Mean Time',
        '(GMT+01:00) European Central Time',
        '(GMT+02:00) Eastern European Time',
        '(GMT+03:00) Eastern African Time',
        '(GMT+03:30) Middle East Time',
        '(GMT+04:00) Near East Time',
        '(GMT+05:00) Pakistan Lahore Time',
        '(GMT+05:30) India Standard Time',
        '(GMT+06:00) Bangladesh Standard Time',
        '(GMT+07:00) Vietnam Standard Time',
        '(GMT+08:00) China Taiwan Time',
        '(GMT+09:00) Japan Standard Time',
        '(GMT+09:30) Australia Central Time',
        '(GMT+10:00) Australia Eastern Time',
        '(GMT+11:00) Solomon Standard Time',
        '(GMT+12:00) New Zealand Standard Time',
        '(GMT-11:00) Midway Islands Time',
        '(GMT-10:00) Hawaii Standard Time',
        '(GMT-09:00) Alaska Standard Time',
        '(GMT-08:00) Pacific Standard Time',
        '(GMT-07:00) Phoenix Standard Time',
        '(GMT-07:00) Mountain Standard Time',
        '(GMT-06:00) Central Standard Time',
        '(GMT-05:00) Eastern Standard Time',
        '(GMT-05:00) Indiana Eastern Standard Time',
        '(GMT-04:00) Puerto Rico and US Virgin Islands Time',
        '(GMT-03:30) Canada Newfoundland Time',
        '(GMT-03:00) Argentina Standard Time',
        '(GMT-03:00) Brazil Eastern Time',
        '(GMT-01:00) Central African Time'
    ]

    // validate tag input
    const tagReg = /^[+-_a-zA-Z0-9]{2,}$/;

    // add tag to tags array
    const addTag = () => {
        if (newTag === '') {
            return;
        } else if (tags.includes(newTag)) {
            return;
        } else if (!tagReg.test(newTag)) {
            return;
        } else {
            addNewTag([...tags, newTag]);
            setTag('');
        };
    };

    // remove tag from tags array
    const removeTag = (e) => {
        const newTags = tags.filter(tag => tag !== e.target.innerText);
        addNewTag(newTags);
    };

    // listen for enter key press when adding tags
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            addTag();
        };
    };

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'groupName') {
            setGroupName(value);
        };
        if (name === 'description') {
            setDescription(value);
        };
        if (name === 'discord') {
            setDiscord(value);
        };
        if (name === 'characters') {
            setCharId(value);
        };
        if (name === 'dayofweek') {
            setDay(value);
        };
        if (name === 'timezone') {
            setTimeZone(value);
        };
        if (name === 'time') {
            setTime(value);
        };
        if (name === 'tags') {
            setTag(value);
        };
    };

    // fetch character names
    const getAllChars = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${tokenData.id}`);
            console.log(res.data)
            setAllChars(res.data);
            setCharId(res?.data[0]?.id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllChars();
    }, []);

    // handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let timeInfo;
            if (time) {
                timeInfo = new Date(`${day}T${time}:00.000${timeZone.substring(4,10)}`);
            }
            const res = await axios.post('https://found-ark-backend.herokuapp.com/api/groups', {
                group_name: groupName,
                description: description,
                discord: discord,
                creator_char_id: charId,
                tags: tags,
                time: timeInfo
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            const groupData = res.data[0];
            console.log(groupData);
            console.log(res);

            setGroupName('');
            setDescription('');
            setDiscord('');
            setCharId('');
            setDay('2022-06-06');
            setTime('');
            setTimeZone('(GMT+00:00) Greenwich Mean Time');
            setTag('');

            window.location.reload(true);
        } catch (err) {
            if (err?.response?.data?.msg === 'an error occured') {
                alert("An error occured")
            }
            console.log(err);
        };
    };

    return (

        <div className="darkContainer">

            <h1>Create New Group</h1>

            <form method="post" className="createGroup">


                <label htmlFor="groupName">Group Name</label>
                <input type="text" placeholder="Enter Group Name" name="groupName" onChange={handleInputChange} required />

                <label htmlFor="description">Description</label>
                <input type="text" placeholder="Description" name="description" onChange={handleInputChange} required />

                <label htmlFor="discord">Discord</label>
                <input type="url" placeholder="https://discord.gg/aaaa" name="discord" pattern="https://.*" onChange={handleInputChange} required />

                <label htmlFor="characters">Group Leader</label>
                <select name="characters" required onChange={handleInputChange}>

                    {allChars.map((char) => {
                        return (
                            <option key={char.id} value={char.id}>{char.char_name}</option>
                        )
                    })}

                </select>

                <label htmlFor="dayofweek">Day</label>
                <select name="dayofweek" required onChange={handleInputChange}>
                    <option value="2022-06-06">Monday</option>
                    <option value="2022-06-07">Tuesday</option>
                    <option value="2022-06-08">Wednesday</option>
                    <option value="2022-06-09">Thursday</option>
                    <option value="2022-06-10">Friday</option>
                    <option value="2022-06-11">Saturday</option>
                    <option value="2022-06-12">Sunday</option>
                </select>

                <label htmlFor="timezone">Time Zone</label>
                <select name="timezone" required onChange={handleInputChange}>

                    {timeZones.map((zone, index) => {
                        return (
                            <option key={index} value={zone}>{zone}</option>
                        )
                    })}

                </select>

                <label htmlFor="time">Time</label>
                <input type="time" placeholder="Time" name="time" onChange={handleInputChange} required />

                <div className="addTags">

                    <label htmlFor="tags">Group Tags</label>

                    <div className="tagInput">

                        <input type="search" id="tags" name="tags" pattern='[+-_a-zA-Z0-9]{2,}' value={newTag} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                        <button onClick={addTag} id="tagBtn" type="button">Add Tag</button>
                        <span className="validity"></span>

                    </div>

                    <p className={newTag === "" || newTag === [] || tagReg.test(newTag) ? 'hidden' : 'visible'}>Tags can only include letters, numbers, and these special characters: + - _</p>

                    <div className="chosenTags">
                        {tags.map((tag, index) =>
                            <p key={index} onClick={removeTag}>{tag}</p>)}
                    </div>

                </div>

                <button type="submit" id="createGroupBtn" onClick={handleFormSubmit}>Create Group</button>

            </form>

        </div>

    );

};

export default CreateGroup;
import firebase from './firebase'
import { useState, useEffect } from 'react';
import "../stylesheets/WeeklyEvents.css";

function WeeklyEvents() {
    const [newEvents, setNewEvents] = useState([]);
    let [userDaySelect, setUserDaySelect] = useState('');
    let [userInputEventName, setUserInputEventName] = useState('');
    let [userInputEventType, setUserInputEventType] = useState('');
    let [userInputPartySize, setUserInputPartySize] = useState('');

    // useEffect for set weekly events
    useEffect(() => {
        // variable that refers to database
        // const dbRef = firebase.database().ref();
        const dbRef = firebase.database().ref('New User Events');
        // event listener to get our data from the database ('response')
        dbRef.on('value', (response) => {
            // variable to store the new state
            const newState = [];
            // store the response from Firebase inside of a variable
            const data = response.val();
            for (let key in data) {
                // push each item to an array 
                newState.push({ key: key, name: data[key] });
            }
            setNewEvents(newState)
        })
    }, [])


    // event handler for when there is a change in the add event input
    const handleNameChange = (event) => {
        setUserInputEventName(event.target.value);
    }

    const handleTypeChange = (event) => {
        setUserInputEventType(event.target.value);
    }

    const handleSizeChange = (event) => {
        setUserInputPartySize(event.target.value);
    }

    const handleUserDaySelect = (event) => {
        setUserDaySelect(event.target.value)
    }

    // event handler for user creating a new event
    const handleClick = (event) => {
        event.preventDefault();

        // required tag does not work on form as form is not being "submitted". 
        // Checking state in order to make sure that there is information in the required fields
        if (userDaySelect && userInputEventName && userInputEventType && userInputPartySize !== "") {
            // depending on the day the user selects, push the data to the corresponding day's node in Firebase and render to the page
            const pushNewEvent = () => {
                const dbRef = firebase.database().ref('New User Events');
                dbRef.push({ userDaySelect, userInputEventName, userInputEventType, userInputPartySize });
                dbRef.on('value', (response) => {
                    const newState = [];
                    const data = response.val();
                    for (let key in data) {
                        newState.push({ key: key, name: data[key] });
                    }
                    setNewEvents(newState)
                });
            }

            // call the function
            pushNewEvent();

            // reset user input to empty string
            setUserInputEventName('');
            setUserInputEventType('');
            setUserInputPartySize('');
        } else {
            alert("Please fill out all fields before submitting new event!")
        }
    }
    // 

    const removeUserEvent = (eventID) => {
        const dbRef = firebase.database().ref('New User Events');
        dbRef.child(eventID).remove();
    }

    return (
        <section className="allNewEvents weekCalendar" id='EventPlanner'>
            <h2>This is what your schedule looks like this week...</h2>
            <ul className="newEvents">
                {/* Slicing so that only 7 events show up in the calendar (first is just placeholder)*/}
                {newEvents.slice(1).slice(-7).map((newEvent) => {
                // {newEvents.slice(Math.max(newEvents.length - 7, 1)).map((newEvent) => {
                    return (
                        <li key={newEvent.key}>
                            <h3>{newEvent.name.userDaySelect}</h3>
                            <h4>{newEvent.name.userInputEventName}</h4>
                            <p>{newEvent.name.userInputEventType}</p>
                            <p>{newEvent.name.userInputPartySize}</p>
                            <button onClick={() => removeUserEvent(newEvent.key)}> Remove </button>
                        </li>
                    )
                })}
            </ul>

            <h4> Add new events to your schedule:</h4>
            <form className="newEventForm" action="submit">
                <label htmlFor="newEventDay">Which day of the week?</label>
                <select name="newEventDay" id="newEventDay" value={userDaySelect} onChange={handleUserDaySelect} required>
                    <option value="" hidden disabled>Choose a day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>

                <label htmlFor="newEventName">What's the name of your event?</label>
                <input 
                    type="text" 
                    id="newEventName" 
                    placeholder="Piñata party, ballroom dancing, etc." 
                    onChange={handleNameChange} 
                    value={userInputEventName} 
                    required />
                <label htmlFor="newEventName">What kind of event?</label>
                <input 
                    type="text" 
                    id="userInputEventType" 
                    placeholder="Social, relaxing, learning, etc." 
                    onChange={handleTypeChange} 
                    value={userInputEventType} 
                    required />
                <label htmlFor="newEventName">How many people?</label>
                <input type="text" id="userInputPartySize" 
                    placeholder="By yourself, with a buddy, group of 4, etc." 
                    onChange={handleSizeChange} 
                    value={userInputPartySize} 
                    required />
                <button onClick={handleClick}>Add event</button>
            </form>
        </section>
    )
}

export default WeeklyEvents;
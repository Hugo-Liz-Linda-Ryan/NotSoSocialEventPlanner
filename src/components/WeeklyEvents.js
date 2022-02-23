import firebase from './firebase'
import { useState, useEffect } from 'react';
import "../stylesheets/WeeklyEvents.css";

function WeeklyEvents() {
    const [newEvents, setNewEvents] = useState([]);
    let [userDaySelect, setUserDaySelect] = useState('');
    let [userInputEventName, setUserInputEventName] = useState('');
    let [userInputEventType, setUserInputEventType] = useState('');
    let [userInputTime, setUserInputTime] = useState('');

    // useEffect for weekly events
        // 🚨 To change: make useEffect run on event submission
    useEffect(() => {
        // variable that refers to database
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
            // Only displays the last 10 events submitted to the calendar
            sortByDay(newState.slice(-10))
        })
    }, [])

    // Sorting function for the user event arrays
    const sortByDay = (eventArr) => {
         // Sorting the saved user events by day (starting with Monday)
         const days = {
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6,
            "Sunday": 7
            };

        eventArr.sort((a, b) => {
            return days[a.name.userDaySelect] - days[b.name.userDaySelect];
        });
        setNewEvents(eventArr)
    }


    // event handler for when there is a change in the add event input
    const handleNameChange = (event) => {
        setUserInputEventName(event.target.value);
    }

    const handleTypeChange = (event) => {
        setUserInputEventType(event.target.value);
    }

    const handleTimeChange = (event) => {
        setUserInputTime(event.target.value);
    }

    const handleUserDaySelect = (event) => {
        setUserDaySelect(event.target.value)
    }

    // event handler for user creating a new event
    const handleEventSubmit = (event) => {
        event.preventDefault();

        // Checking state in order to make sure that there is information in the required fields
            // 🚨: required tag does not work on form as form is not being "submitted". 
        if (userDaySelect && userInputEventName && userInputEventType && userInputTime !== "") {
            // depending on the day the user selects, push the data to the corresponding day's node in Firebase and render to the page
            const pushNewEvent = () => {
                const dbRef = firebase.database().ref('New User Events');
                dbRef.push({ userDaySelect, userInputEventName, userInputEventType, userInputTime });
                dbRef.on('value', (response) => {
                    const newState = [];
                    const data = response.val();
                    for (let key in data) {
                        newState.push({ key: key, name: data[key] });
                    }
                    // Only displays the last 10 events submitted to the user calendar
                    sortByDay(newState.slice(-10))
                });
            }

            // call the function
            pushNewEvent();

            // reset user input to empty string
            setUserDaySelect('');
            setUserInputEventName('');
            setUserInputEventType('');
            setUserInputTime('');
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
                {newEvents.map((newEvent) => {
                // {newEvents.slice(Math.max(newEvents.length - 7, 1)).map((newEvent) => {
                    return (
                        <li key={newEvent.key}>
                            <h3>{newEvent.name.userDaySelect}</h3>
                            <h4>{newEvent.name.userInputEventName}</h4>
                            <p>{newEvent.name.userInputEventType}</p>
                            <p>{newEvent.name.userInputTime}</p>
                            <button onClick={() => removeUserEvent(newEvent.key)}> Remove </button>
                        </li>
                    )
                })}
            </ul>

            <h4 className='formHeader'> Add new events to your schedule:</h4>
            <form className="newEventForm" action="submit">
                <label htmlFor="newEventDay">Which day of the week?</label>
                <select 
                    name="newEventDay" 
                    id="newEventDay" 
                    value={userDaySelect} 
                    onChange={handleUserDaySelect} 
                    required>
                        <option value="" hidden disabled>Choose a day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
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
                <label htmlFor="newEventName">What Time?</label>
                <input type="text" id="userInputTime" 
                    placeholder="AM, PM" 
                    onChange={handleTimeChange} 
                    value={userInputTime} 
                    required />
                <button onClick={handleEventSubmit}>Add event</button>
            </form>
        </section>
    )
}

export default WeeklyEvents;
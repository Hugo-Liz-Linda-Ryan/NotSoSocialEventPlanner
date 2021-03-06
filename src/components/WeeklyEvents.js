import firebase from './firebase'
import {useState, useEffect} from 'react';
import "../stylesheets/WeeklyEvents.css";

function WeeklyEvents() {
    const [socialEvents, setSocialEvents] = useState([]);
    const [newEvents, setNewEvents] = useState([]);
    let [userDaySelect, setUserDaySelect] = useState('');
    let [userInputEventName, setUserInputEventName] = useState('');
    let [userInputEventType, setUserInputEventType] = useState('');  
    let [userInputPartySize, setUserInputPartySize] = useState('');  
    
    // useEffect for set weekly events
    useEffect(() => {
        // variable that refers to database
        const dbRef = firebase.database().ref();
        // event listener to get our data from the database ('response')
        dbRef.on('value', (response) => {
            // variable to store the new state
            const newState = [];
            // store the response from Firebase inside of a variable
            const data = response.val();
            for (let key in data) {
                newState.push(data[key])
            }
            setSocialEvents(newState)
        })
    }, [])

    // event handler for when there is a change in the add event input
    const handleChange = (event) => {
        setUserInputEventName(event.target.value);
    }

    const handleChange2 = (event) => {
        setUserInputEventType(event.target.value);
    }

    const handleChange3 = (event) => {
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
                dbRef.push({userDaySelect, userInputEventName, userInputEventType, userInputPartySize});
                dbRef.on('value', (response) => {
                    const newState = [];
                const data = response.val();
                for (let key in data) {
                    newState.push({key: key, name: data[key]});}
                // only render the most recently created 7 events to the page
                const slicedArray = newState.slice(newState.length - 7, newState.length)
                setNewEvents(slicedArray);
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
        <>
        <section className="weekCalendar" id="EventPlanner">
            {/* destructuring, to access each key-value pair within each weekday object */}
            <h2>This is what your schedule looks like this week...</h2>
            <ul className="EventsWeek">
            {socialEvents.slice(0, 7).map(({ day, eventName, eventType, partySize }) => {
                return (
                <li key={Math.random()}>
                    <h3>{day}</h3>
                    <h4>{eventName}</h4>
                    <p>{eventType}</p>
                    <p>{partySize}</p>
                </li>
                )
            })}
            </ul>
        </section>

        <section className="allNewEvents">
            <h4> Add new events to your schedule:</h4>
            <ul className="newEvents">
            {newEvents.map((newEvent) => {
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
            
        </section>
        
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
            <input type="text" id="newEventName" placeholder="Pinata party, ballroom dancing, etc." onChange={handleChange} value={userInputEventName} required />
            <label htmlFor="newEventName">What kind of event?</label>
            <input type="text" id="userInputEventType" placeholder="Social, relaxing, learning, etc." onChange={handleChange2} value={userInputEventType} required />
            <label htmlFor="newEventName">How many people?</label>
            <input type="text" id="userInputPartySize" placeholder="By yourself, with a buddy, group of 4, etc." onChange={handleChange3} value={userInputPartySize} required />
            <button onClick={handleClick}>Add event</button>
        </form>
        
        </>
    )
}

export default WeeklyEvents;
import firebase from './firebase'
import {useState, useEffect} from 'react';
import "./WeeklyEvents.css";

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
                console.log(slicedArray)
                setNewEvents(slicedArray);
            });
        }

        // call the function
        pushNewEvent();

        // reset user input to empty string
        setUserInputEventName('');
        setUserInputEventType('');
        setUserInputPartySize(''); 
    }
    // 
    

    // 🚨 needs to be updated; needs to be delete the entire day object in Firebase
    const removeUserEvent = (eventID) => {
        const dbRef = firebase.database().ref('New User Events');
        dbRef.child(eventID).remove();
    }

    return (
        <>
        <section className="weekCalendar" id="EventPlanner">
            {/* destructuring, to access each key-value pair within each weekday object */}
            <h2>This is what your schedule looks like this week...</h2>
            <div className="EventsWeek">
            {socialEvents.map(({ day, eventName, eventType, partySize }) => {
                return (
                <li key={Math.random()}>
                    <h3>{day}</h3>
                    <h4>{eventName}</h4>
                    <p>{eventType}</p>
                    <p>{partySize}</p>
                </li>
                )
            })}
            </div>
        </section>

        <section className="newEvents">
            <h2>Dont like the way your week is shaping up?</h2>
            <h2> Add new events to your schedule:</h2>
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
        </section>

        <form action="submit">
            <legend>Add a new event to your schedule
                <label htmlFor="newEventDay">Which day of the week?</label>
                <select name="newEventDay" id="newEventDay" value={userDaySelect} onChange={handleUserDaySelect}>
                    <option value="" hidden disabled >Choose a day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>

                <label htmlFor="newEventName">New event name</label>
                <input type="text" id="newEventName" onChange={handleChange} value={userInputEventName}/>
                <label htmlFor="newEventName">New event type</label>
                <input type="text" id="userInputEventType" onChange={handleChange2} value={userInputEventType}/>
                <label htmlFor="newEventName">New event party size</label>
                <input type="text" id="userInputPartySize" onChange={handleChange3} value={userInputPartySize}/>
                <button onClick={handleClick}>Add event</button>
            </legend>
        </form>
        
        </>
    )
}

export default WeeklyEvents;
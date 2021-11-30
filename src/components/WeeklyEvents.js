import firebase from '../firebase'
import {useState, useEffect} from 'react';

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
    
    // event handler to identify which day of the week the user selected
    // 🚨 this works, but not a great solution
    const handleUserDaySelect = (event) => {
        setUserDaySelect(event.target.value)
        let userDaySelect = event.target.value;
        console.log(userDaySelect)
    }



    // event handler for user creating a new event
    const handleClick = (event) => {
        event.preventDefault();

        // depending on the day the user selects, push the data to the corresponding day's node in Firebase and render to the page
        const pushNewEvent = () => {
            const dbRef = firebase.database().ref(`User's New ${userDaySelect} Event`);
            dbRef.update({userDaySelect, userInputEventName, userInputEventType, userInputPartySize});
            dbRef.on('value', (response) => {
                const newState = [];
                const data = response.val();
                newState.push(data);
                setNewEvents(newState);
            });
        }

        // call the function
        pushNewEvent();

        // reset user input to empty string
        setUserInputEventName('');
        setUserInputEventType('');
        setUserInputPartySize('');
    }

    

    // 🚨 needs to be updated; needs to be delete the entire day object in Firebase
    // const removeSocialEvent = () => {
    // const dbRef = firebase.database().ref(`User's New ${userDaySelect} Event`);
    // dbRef.child().remove();
    // }

    return (
        <>
        <section className="weekCalendar">
            {/* destructuring, to access each key-value pair within each weekday object */}
            <p>This is what your schedule looks like this week...</p>
            {socialEvents.map(({ day, eventName, eventType, partySize}) => {
                return (
                <li key={day}>
                    <h2>{day}</h2>
                    <h3>{eventName}</h3>
                    <p>{eventType}</p>
                    <p>{partySize}</p>
                </li>
                )
            })}
        </section>

        <section className="newEvents">
            <p>Don't like the way your week is shaping up? Add new events to your schedule:</p>
            {console.log(newEvents)}
            {newEvents.map(( {userDaySelect, userInputEventName, userInputEventType, userInputPartySize}) => {
                return (
                    <li>
                        <h2>{userDaySelect}</h2>
                        <h3>{userInputEventName}</h3>
                        <p>{userInputEventType}</p>
                        <p>{userInputPartySize}</p>
                        {/* <button onClick={() => removeSocialEvent()}> Remove </button> */}
                    </li>
                )
            })}
        </section>

                {/* <select name="newEventDay" id="newEventDay" value='{userDaySelect}' onChange={handleUserDaySelect}> */}
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
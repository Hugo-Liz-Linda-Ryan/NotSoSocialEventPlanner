import firebase from '../firebase'
import {useState, useEffect, useCallback} from 'react';

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
                // console.log('data weekly events', data)
            }
            console.log(newState)
            setSocialEvents(newState)
        })
    }, [])

    // useEffect for user generated events
    useEffect(() => {

        const dbRefUserEvents = firebase.database().ref('userEvents');

        dbRefUserEvents.on('value', (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push(data[key]);
            }
            setNewEvents(newState);
            });
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
    
    const handleUserDaySelect = useCallback((event) => {
        setUserDaySelect(event.target.value)
        console.log(event.target.value)
    })

    const handleClick = (event) => {
        event.preventDefault();
        const dbRef = firebase.database().ref('userEvents');

        // push user input to Firebase database
        dbRef.push({userInputEventName, userInputEventType, userInputPartySize})
        // reset user input to empty string
        setUserInputEventName('');
        setUserInputEventType('');
        setUserInputPartySize('')
    }

    // 🚨 needs to be updated; needs to be delete the entire day object in Firebase
    // const removeSocialEvent = (key) => {
    // const dbRef = firebase.database().ref();
    // dbRef.child(key).remove();
    // }

    return (
        <>
        <section className="weekCalendar">
            {/* destructuring, to access each key-value pair within each weekday object */}
                {socialEvents.map(({ day, eventName, eventType, partySize}) => {
                    return (
                    <li key={day}>
                        <h2>{day}</h2>
                        <p>{eventName}</p>
                        <p>{eventType}</p>
                        <p>{partySize}</p>
                        {/* 🚨 needs to be updated; needs to be delete the entire day object in Firebase */}
                        {/* <button onClick={() => removeSocialEvent(day)}> Remove </button> */}
                    </li>
                    )
                })}
        </section>

        <section className="newEvents">
            {newEvents.map(( {userInputEventName, userInputEventType, userInputPartySize}) => {
          return (
            <li>
                <p>{userInputEventName}</p>
                <p>{userInputEventType}</p>
                <p>{userInputPartySize}</p>
            </li>
          )
        })}
        </section>

        <form action="submit">

            <legend>Add a new event to your schedule
                <label htmlFor="newEventDay">Which day of the week?</label>
                <select name="newEventDay" id="newEventDay" value='{userDaySelect}' onChange={handleUserDaySelect}>
                    {/* <option value="" selected="selected" disabled="disabled">Choose a day</option> */}
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
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
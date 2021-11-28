import firebase from '../firebase'
import {useState, useEffect} from 'react';

function WeeklyEvents() {
    const [socialEvents, setSocialEvents] = useState([]);
    const [newEvents, setNewEvents] = useState([]);
    let [userInputEventName, setUserInputEventName] = useState('');
    let [userInputEventType, setUserInputEventType] = useState('');  
    let [userInputPartySize, setUserInputPartySize] = useState('');  
    
    useEffect(() => {
        // variable that refers to database
        const dbRef = firebase.database().ref();
        const dbRefUserEvents = firebase.database().ref('userEvents');
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
        dbRefUserEvents.on('value', (response2) => {
            // variable to store the new state
            const newState2 = [];
            // store the response from Firebase inside of a variable
            const data2 = response2.val();
            for (let key2 in data2) {
                newState2.push(data2[key2])
            }
            setSocialEvents(newState2)
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

    // 🚨 needs to be updated; currently pushes individual properties to the main Firebase object -- need to set up so that it replaces the day objects
    const handleClick = (event) => {
        event.preventDefault();
        const dbRef = firebase.database().ref('userEvents');

        let newEvent = {
            eventName: userInputEventName,
            eventType: userInputEventType,
            partySize: userInputPartySize
        }

        dbRef.push({
            newEvent: newEvent
        }).then((data) => {
            console.log('data', data)
        })
        // push user input to Firebase database
        // dbRef.push(userInput);
        // reset user input to empty string
        setUserInputEventName('');
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
            {newEvents.map((newEvent) => {
          return (
            <li>
              <p>{newEvent}</p>
            </li>
          )
        })}

        </section>

        <form action="submit">

            {/* <label htmlFor="newEvent">Add a new event to your schedule</label>
            <input type="text" id="newEvent" onChange={handleChange} value={userInput}/>
            <button onClick={handleClick}>Add event</button> */}

            <legend>Add a new event to your schedule
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
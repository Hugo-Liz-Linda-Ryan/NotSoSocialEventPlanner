import firebase from '../firebase'
import {useState, useEffect} from 'react';

function WeeklyEvents() {
    const [socialEvents, setSocialEvents] = useState([]);
    const [userInput, setUserInput] = useState('')
    
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
        setUserInput(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        const dbRef = firebase.database().ref();
        // push user input to Firebase database
        dbRef.push(userInput);
        // reset user input to empty string
        setUserInput('');
    }

    return (
        <section className="weekCalendar">
            {/* destructuring, to access each key-value pair within each weekday object */}
                {socialEvents.map(({ day, eventName, eventType, partySize}) => {
                    return (
                    <ul key={day}>
                        <li><h2>{day}</h2></li>
                        <li><p>{eventName}</p></li>
                        <li><p>{eventType}</p></li>
                        <li><p>{partySize}</p></li>
                    </ul>
                    )
                })}
                <form action="submit">
                    <label htmlFor="newEvent">Add a new event to your schedule</label>
                    <input type="text" id="newEvent" onChange={handleChange} value={userInput}/>
                    <button onClick={handleClick}>Add event</button>
                </form>
        </section>
    )
}

export default WeeklyEvents;
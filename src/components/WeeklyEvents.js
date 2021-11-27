import firebase from '../firebase'
import {useState, useEffect, useLayoutEffect} from 'react';

function WeeklyEvents() {
    const [socialEvents, setSocialEvents] = useState([]);
    

    useEffect(() => {
        // variable that refers to database
        const dbRef = firebase.database().ref();
        // event listener to get our data from the database ('response')
        dbRef.on('value', (response) => {
            // console.log(response.val());
            // variable to store the new state
            const newState = [];
            const day = [];
            // store the response from Firebase inside of a variable
            const data = response.val();
            for (let key in data) {
                newState.push(data[key])
                day.push(key)
                console.log(key)
            }
            
            setSocialEvents(newState)
        })
    }, [])

    return (
        <section className="weekCalendar">
                {socialEvents.map(({ eventName, eventType, partySize}) => {
                    console.log(socialEvents)
                    return (
                    <ul>
                        {/* <li><h2>{day}</h2></li> */}
                        <li><p>{eventName}</p></li>
                        <li><p>{eventType}</p></li>
                        <li><p>{partySize}</p></li>
                    </ul>
                    )
                })}
            
        </section>
    )
}

export default WeeklyEvents;
import firebase from './firebase'
import { useState, useEffect } from 'react';

function WeeklyEvents2() {
    const [socialEvents, setSocialEvents] = useState([]);
    const [socialEventsMon, setSocialEventsMon] = useState([]);

    let [userInputEventName, setUserInputEventName] = useState('');
    let [userInputEventType, setUserInputEventType] = useState('');  
    let [userInputPartySize, setUserInputPartySize] = useState('');  

    let [userInputEventNameMon, setUserInputEventNameMon] = useState('');
    let [userInputEventTypeMon, setUserInputEventTypeMon] = useState('');  
    let [userInputPartySizeMon, setUserInputPartySizeMon] = useState('');  

    useEffect(() => {
        // variable that refers to database
        const dbRef = firebase.database().ref('sundayEvents');

        // event listener to get our data from the database ('response') whenever there is a change in the database
        dbRef.on('value', (response) => {
            // below responds with an object with all of the firebase data
            // console.log(response.val())

            const newState = [];
            // storing firebase data object in var called data
            const data = response.val();

            // as data is an object, we iterate through to see each event
            for (let key in data) {
                // push each event into the empty array that we created
                newState.push(data[key]);
                // modified so we can get the key as well
                // key is determined by Firebase
                // data[key] is the event name that is stored in Firebase
                // newState.push({ key: key, name: data[key] });
            }
            // updating the socialEvents state with the local array that we created
            setSocialEvents(newState)
        });
    }, [])

    useEffect(() => {
        // variable that refers to database
        const dbRef = firebase.database().ref('mondayEvents');

        // event listener to get our data from the database ('response') whenever there is a change in the database
        dbRef.on('value', (response) => {
            // below responds with an object with all of the firebase data
            // console.log(response.val())

            const newState = [];
            // storing firebase data object in var called data
            const data = response.val();

            // as data is an object, we iterate through to see each event
            for (let key in data) {
                // push each event into the empty array that we created
                newState.push(data[key]);
                // modified so we can get the key as well
                // key is determined by Firebase
                // data[key] is the event name that is stored in Firebase
                // newState.push({ key: key, name: data[key] });
            }
            // updating the socialEvents state with the local array that we created
            setSocialEventsMon(newState)
        });
    }, [])



    // Event will fire any time there is a change in the input it's attached to
    const handleChange = (event) => {
        setUserInputEventName(event.target.value);
    }

    const handleChange2 = (event) => {
        setUserInputEventType(event.target.value);
    }

    const handleChange3 = (event) => {
        setUserInputPartySize(event.target.value);
    }

    const handleChangeMon = (event) => {
        setUserInputEventNameMon(event.target.value);
    }

    const handleChangeMon2 = (event) => {
        setUserInputEventTypeMon(event.target.value);
    }

    const handleChangeMon3 = (event) => {
        setUserInputPartySizeMon(event.target.value);
    }

    // This will be added to the form submit button
    const handleClick = (event) => {
        event.preventDefault();
        // creates a reference to our database
        // const dbRef = firebase.database().ref();
        // "sundayEvents" in the ref, places all of these in a "sundayEvents object in firebase"
        const dbRef = firebase.database().ref('sundayEvents');
        // const dbRef = firebase.database();

            let newEvent = {
                eventName: userInputEventName,
                eventType: userInputEventType,
                partySize: userInputPartySize
            }


        // push user input to Firebase database
        // dbRef.push(userInputEventName)
        // dbRef.push({newEvent})
        dbRef.push({userInputEventName, userInputEventType, userInputPartySize})

        // reset user input to empty string
        setUserInputEventName('');
        setUserInputEventType('');
        setUserInputPartySize('')
    }

    const handleClickMon = (event) => {
        event.preventDefault();
        // creates a reference to our database
        // const dbRef = firebase.database().ref();
        // "sundayEvents" in the ref, places all of these in a "sundayEvents object in firebase"
        const dbRef = firebase.database().ref('mondayEvents');
        // const dbRef = firebase.database();

        // push user input to Firebase database
        // dbRef.push(userInputEventName)
        // dbRef.push({newEvent})
        dbRef.push({userInputEventNameMon, userInputEventTypeMon, userInputPartySizeMon})

        // reset user input to empty string
        setUserInputEventNameMon('');
        setUserInputEventTypeMon('');
        setUserInputPartySizeMon('')
    }

    // // 🚨 needs to be updated; needs to be delete the entire day object in Firebase
    // const removeSocialEvent = (key) => {
    //     // Reference to database
        // const dbRef = firebase.database().ref();
        // const dbRef = firebase.database().ref('sundayEvents');
    //     // Remove child using key

        // dbRef.child(key).remove();
    //     // would need to change two methods in order to remove the node
    //     // dbRef.child(whatToRemove).remove
    // }

    return (
        <>
        <div className="calendar">
            
        <div className="events sundayEvents">
            <h2>Sunday's events</h2>
            <ul>
                {/* Component will map through the socialEvents array and will display them as a list on the page */}
                {socialEvents.map((event) => {
                    console.log(event)
                    return (
                        <li>
                            {/* <p>{event.name} || {event.key}</p> */}
                            <p>Name :{event.userInputEventName}</p>
                            <p>Type :{event.userInputEventType}</p>
                            <p>Party Size :{event.userInputPartySize}</p>
                            {/* We are passing a reference to a function, not calling a function, */}
                            {/* <button onClick={() => removeSocialEvent(event)}>Clear your Sunday</button> */}
                        </li>
                    )
                })}

                <form action="submit">
                    <fieldset>
                    <legend>Add a new event to your schedule</legend>
                        <label htmlFor = "newEventName">Event name</label>
                        <input 
                            type="text" 
                            id="newEventName" 
                            onChange={handleChange} 
                            value={userInputEventName} 
                        />
                        <label htmlFor="newEventType">Event type</label>
                        <input 
                            type="text" 
                            id="newEventType" 
                            onChange={handleChange2} 
                            value={userInputEventType} 
                        />
                        <label htmlFor="newPartySize">Event party size</label>
                        <input 
                            type="text" 
                            id="newPartySize" 
                            onChange={handleChange3} 
                            value={userInputPartySize} 
                        />
                        <button onClick={handleClick}>Add event</button>
                    </fieldset>
                </form>

            </ul>
        </div>
        
        <div className=" events mondayEvents">
            <h2>Monday's events</h2>
            <ul>
                {/* Component will map through the socialEvents array and will display them as a list on the page */}
                {socialEventsMon.map((event) => {
                    console.log(event)
                    return (
                        <li className="individualEvent">
                            {/* <p>{event.name} || {event.key}</p> */}
                            <p>Name :{event.userInputEventNameMon}</p>
                            <p>Type :{event.userInputEventTypeMon}</p>
                            <p>Party Size :{event.userInputPartySizeMon}</p>
                            {/* We are passing a reference to a function, not calling a function, */}
                            {/* <button onClick={() => removeSocialEvent(event.key)}>Remove</button> */}
                        </li>
                    )
                })}

                <form action="submit">
                    <fieldset>
                    <legend>Add a new event to your schedule</legend>
                        <label htmlFor = "newEventName">Event name</label>
                        <input 
                            type="text" 
                            id="newEventName" 
                            onChange={handleChangeMon} 
                            value={userInputEventNameMon} 
                        />
                        <label htmlFor="newEventType">Event type</label>
                        <input 
                            type="text" 
                            id="newEventType" 
                            onChange={handleChangeMon2} 
                            value={userInputEventTypeMon} 
                        />
                        <label htmlFor="newPartySize">Event party size</label>
                        <input 
                            type="text" 
                            id="newPartySize" 
                            onChange={handleChangeMon3} 
                            value={userInputPartySizeMon} 
                        />
                        <button onClick={handleClickMon}>Add event</button>
                    </fieldset>
                </form>

            </ul>
        </div>
        
        </div>
        </>

        // <>
        // <section className="weekCalendar">
        //     {/* destructuring, to access each key-value pair within each weekday object */}

        //         {socialEvents.map(({ day, eventName, eventType, partySize}) => {
        //             return (
        //             <li key={day}>
        //                 <h2>{day}</h2>
        //                 <p>{eventName}</p>
        //                 <p>{eventType}</p>
        //                 <p>{partySize}</p>
        //                 {/* 🚨 needs to be updated; needs to be delete the entire day object in Firebase */}
        //                 {/* <button onClick={() => removeSocialEvent(day)}> Remove </button> */}
        //             </li>
        //             )
        //         })}
        // </section>

        // <section className="newEvents">
        //     {newEvents.map((newEvent) => {
        //   return (
        //     <li>
        //       <p>{newEvent}</p>
        //     </li>
        //   )
        // })}

        // </section>


        // </>
    )
}

export default WeeklyEvents2;
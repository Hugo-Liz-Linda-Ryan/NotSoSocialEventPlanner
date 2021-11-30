// import {useState} from "react";
import "./calendar.css"

function Calendar () {

    // const [todayDate, setTodayDate] = useState("")
    // const [thisWeek, setThisWeek] = useState([])
    
    // const weekArray = []

    // goes to Wednesday again as it iterates +7 to the array, on Saturday going to array[14]
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    
    const today = new Date()
    // Returns "Mon Nov 29 2021 14:47:24 GMT-0500 (Eastern Standard Time)"

    const todayDayName = today.getDay()
    // gets today's weekday as a numerical value
        // Ex. Sunday=0, Monday=1, Tuesday=2 etc.
    const todayISODate = today.toISOString().substr(0,10)
        // Returns "2021-11-29"
    

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate()+1)
    const tomorrowISODate = tomorrow.toISOString().substr(0,10)


    const dayAfter = new Date(tomorrow)
    dayAfter.setDate(dayAfter.getDate()+1)
    const dayAfterISODate = dayAfter.toISOString().substr(0,10)
    
    // useEffect
    // function getWeek(){
        // for (let i = 1; 1 < 7; i++){
            // tomorrow.setDate(tomorrow.getDate() + i)
            // const tomorrowISODate = tomorrow.toISOString().substr(0,10)
            // weekArray.push(tomorrowISODate);
            // console.log(weekArray)
            // }
            // return weekArray;
        // }
    
    return (
        <div className="calendar">
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName]}</h2>
                <p className="date">{todayISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+1]}</h2>
                <p className="date">{tomorrowISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+2]}</h2>
                <p className="date">{dayAfterISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+3]}</h2>
                <p className="date">{todayISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+4]}</h2>
                <p className="date">{todayISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+5]}</h2>
                <p className="date">{todayISODate}</p>
            </div>
            <div className="day">
                <h2 className="dayName">{weekdays[todayDayName+6]}</h2>
                <p className="date">{todayISODate}</p>
            </div>
        </div>

        )
}

export default Calendar;




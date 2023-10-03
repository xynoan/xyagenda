import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css'
// these variables are optional
// const agenda = "Code";
let week = 8;
const gym = "Gym: Leg A";
const gymVariations = ["Gym: Push A", "Gym: Pull A", "Gym: Leg A", "Gym: Push B", "Gym: Pull B","Gym: Leg B"];  
// end of optional variables
// edit your schedules here.
// const schedules = {
//   // SUNDAY
//   0: [agenda, gym],
//   // MONDAY
//   1: [agenda, gym],
//   // TUESDAY
//   2: [agenda, gym],
//   // WEDNESDAY
//   3: [agenda, gym],
//   // THURSDAY
//   4: [agenda, gym],
//   // FRIDAY
//   5: [agenda, gym],
//   // SATURDAY
//   6: [agenda, gym],
// };

function App() {
  const [schedules, setSchedules] = useState({
    // SUNDAY
  0: ["8:00 A.M: code/Accomplish all school works for week " + week,
      gym,
    ],
  // MONDAY
  1: ["8:00 A.M: code/Accomplish all school works for week " + week,
      gym
    ],
  // TUESDAY
  2: ["1:00 - 3:00 P.M: CC104 (Lec)",
      "10:00 A.M: Shower",
     "4:00 - 7:00 P.M: CC104 (Lab)",
     "7:00 P.M - 12:00 A.M: code/Do school work/Scan lecture QA for future reference",
     gym],
  // WEDNESDAY
  3: ["10:00 A.M - 1:00 P.M: CC105 (Lab)",
      "10:00 A.M: Shower",
      "2:00 - 4:00 P.M: CC105 (Lec)",
      "5:00 - 8:00 P.M: HUM1",
      "8:00 P.M - 12:00 A.M: code/Do school work/Scan lecture QA for future reference",
      gym],
  // THURSDAY
  4: ["3:00 - 5:00 P.M: PF101 (Lec)",
     "6:00 - 9:00 P.M: PF101 (Lab)",
     "9:00 P.M - 12:00 A.M: code/Do school work/Scan lecture QA for future reference",
     gym],
  // FRIDAY
  5: ["10:00 A.M: Shower",
      "7:00 - 9:00 A.M: PE3",
      "11:00 A.M - 1:00 P.M: IS104 (Lec)",
      "2:00 - 5:00 P.M: IS104 (Lab)",
     "5:00 P.M - 6:00 P.M: code/Do school work/Scan lecture QA for future reference",
     gym],
  // SATURDAY
  6: ["1:00 - 3:00 P.M: NET102 (Lec)",
      "4:00 - 7:00 P.M: NET102 (Lab)",
     "7:00 P.M - 12:00 A.M: code/Do school work/Scan lecture QA for future reference",
     gym]
  });
  
  useEffect(() => {
    initGym();
    customEvent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function initGym() {
    // modify gym tomorrow
    schedules[dateTomorrow().day][schedules[dateTomorrow().day].indexOf(gym)] = gymVariations[gymVariations.indexOf(gym) + 1];
    setSchedules({...schedules});
  }
  
  function customEvent() {
    const getToday = dateToday().date.split(" ")[1] + " " + dateToday().date.split(" ")[2];
    const getTomorrow = dateTomorrow().date.split(" ")[1] + " " + dateTomorrow().date.split(" ")[2];
    // note: month is first three letters.
    switch(getToday) {
      case "Sep 28":
        schedules[dateToday().day].push("9:00 - 11:00 A.M: RECAP");
        break;
      case "Sep 25":
        schedules[dateToday().day].push("");
    }
    
    switch(getTomorrow) {
      case "Sep 28":
        schedules[dateTomorrow().day].push("9:00 - 11:00 A.M: RECAP");
        break;
      case "Sep 25":
        schedules[dateTomorrow().day].push("");
    }
    
    setSchedules({...schedules});
  }
  
  function dateToday() {
    const date = new Date();
    const day = new Date(date.toDateString()).getDay();
    return { date: date.toDateString(), day };
  }

  function dateTomorrow() {
    Date.prototype.addDays = function (days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    const date = new Date();
    const day = new Date(date.addDays(1).toDateString()).getDay();
    return { date: date.addDays(1).toDateString(), day };
  }
  
  function handleWeek() {
    // constraints
    if (week === 18) {
      return;
    }
    const agenda = "8:00 A.M: code/Accomplish all school works for week ";
    week++;
    if (dateToday().day === 0 || dateToday().day === 1) {
      schedules[dateToday().day][0] = agenda + week;
    }
    
    if (dateTomorrow().day === 0 || dateTomorrow().day === 1) {
      schedules[dateTomorrow().day][0] = agenda + week;
    }
    
    setSchedules({...schedules});
  }
  
  function handleGym() {
    const nextVariation = gymVariations[gymVariations.indexOf(gym) + 1];
    for (let i=0; i<=6; i++) {
      if (schedules[i].indexOf(gym) !== -1) {
        schedules[i][schedules[i].indexOf(gym)] = nextVariation;
      } else {
        schedules[i][schedules[i].indexOf(nextVariation)] = gymVariations[gymVariations.indexOf(nextVariation) + 1];
      }
    }
    setSchedules({...schedules});
  }

  return (
    <div className="container">
      <Greet />
      <p className="description">
        You want to organize your thoughts on what to do during the day? I got
        you! :)
      </p>
      <Boxes>
        <Box class="today" text="Today" function={dateToday()} schedules={schedules} />
        <Box class="tomorrow" text="Tomorrow" function={dateTomorrow()} schedules={schedules}/>
      </Boxes>
      <button type="button" className="btn btn-primary" onClick={handleWeek}>Increase week</button>
      <button type="button" className="btn btn-secondary" onClick={handleGym}>Next gym</button>
    </div>
  );
}

function Greet() {
  function greetings() {
    const timeOfTheDay = new Date().getHours();
    if (timeOfTheDay < 12) {
      return "Good Morning!";
    } else if (timeOfTheDay < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }

  return <h1 className="title">{greetings()}</h1>;
}

function Boxes(props) {
  return <div className="rectangles">{props.children}</div>;
}

Boxes.propTypes = {
  children: PropTypes.element
}

function Box(props) {
  return (
    <div className={props.class}>
      <h2 className="text-center">{props.text}</h2>
      <p className="text-center date">{`(${props.function.date})`}</p>
      {props.schedules[props.function.day].map((sched, i) => (
        <p key={i}>{sched}</p>
      ))}
    </div>
  );
}

Box.propTypes = {
  class: PropTypes.string,
  text: PropTypes.string,
  function: PropTypes.func,
  schedules: PropTypes.array
}
 
export default App
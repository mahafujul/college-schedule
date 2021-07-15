import React, { Component } from "react";
import Fschedule from "./Fschedule";
import Day from "./Day";
import Holiday from "./Holiday";
import { classes } from "./classes";

import "./Main.css";
import Expired from "./Expired";

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      fullView: false,
      displayTime: "HH:MM:SS AMPM",
    };

    setInterval(() => {
      const time = new Date();
      var hh = time.getHours();
      var mm = time.getMinutes();
      var ss = time.getSeconds();

      var ampm = hh >= 12 ? "PM" : "AM";
      hh = hh > 12 ? hh - 12 : hh;
      hh = hh < 10 ? "0" + hh : hh;
      mm = mm < 10 ? "0" + mm : mm;
      ss = ss < 10 ? "0" + ss : ss;
      hh = hh === "00" ? "12" : hh;

      this.setState({
        displayTime:
          ss % 2 === 0
            ? hh + ":" + mm + ":" + ss + " " + ampm
            : hh + " " + mm + " " + ss + " " + ampm,
      });
    }, 500);
  }

  // handleClick = () => {
  //   this.setState((prevState) => {
  //     return {
  //       fullView: !prevState.fullView,
  //     };
  //   });
  // };

  render() {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();

    const now = date.getHours() * 60 + date.getMinutes();
    const eleven = 11 * 60;
    // const twelve = 12 * 60;
    // const thirteen = 13 * 60;
    const thirteenHalf = 13 * 60 + 30;
    const fourteen = 14 * 60;
    // const fifteen = 15 * 60;
    const sixteenHalf = 16 * 60 + 30;

    let timeOfDay;
    let DayName;
    let CurrentS;
    let Class_1;
    let Class_2;
    let availability = true;
    let expires = Date.parse(this.props.expires);
    if (date >= expires) {
      availability = false;
    }

    // const room = [' ','F1','S1','⇨',];

    const messages = ["Break Time", "No class available right now !"];

    if (5 < hours && hours < 12) {
      timeOfDay = "Morning";
    } else if (hours >= 12 && hours < 17) {
      timeOfDay = "Afternoon";
    } else if (hours > 17 && hours < 20) {
      timeOfDay = "Evening";
    } else if (hours > 0 && hours < 2) {
      timeOfDay = "Mid Night";
    } else if (hours > 4 && hours < 5) {
      timeOfDay = "Dawn";
    } else {
      timeOfDay = "Night";
    }

    if (day === 0) {
      DayName = "Sunday";
      Class_1 = classes[1];
      Class_2 = classes[3];
      if (eleven <= now && now < thirteenHalf) {
        CurrentS = Class_1;
      } else if (thirteenHalf <= now && now < fourteen) {
        CurrentS = messages[0];
      } else if (fourteen <= now && now < sixteenHalf) {
        CurrentS = Class_2;
      } else {
        CurrentS = messages[1];
      }
    } else if (day === 1) {
      DayName = "Monday";
      Class_1 = classes[3];
      Class_2 = classes[6];
      if (eleven <= now && now < thirteenHalf) {
        CurrentS = Class_1;
      } else if (thirteenHalf <= now && now < fourteen) {
        CurrentS = messages[0];
      } else if (fourteen <= now && now < sixteenHalf) {
        CurrentS = Class_2;
      } else {
        CurrentS = messages[1];
      }
    } else if (day === 2) {
      DayName = "Tuesday";
      Class_1 = classes[1];
      Class_2 = classes[6];
      if (eleven <= now && now < thirteenHalf) {
        CurrentS = Class_1;
      } else if (thirteenHalf <= now && now < fourteen) {
        CurrentS = messages[0];
      } else if (fourteen <= now && now < sixteenHalf) {
        CurrentS = Class_2;
      } else {
        CurrentS = messages[1];
      }
    } else if (day === 3) {
      DayName = "Wednesday";
      Class_1 = classes[2];
      Class_2 = classes[4];
      if (eleven <= now && now < thirteenHalf) {
        CurrentS = Class_1;
      } else if (thirteenHalf <= now && now < fourteen) {
        CurrentS = messages[0];
      } else if (fourteen <= now && now < sixteenHalf) {
        CurrentS = Class_2;
      } else {
        CurrentS = messages[1];
      }
    } else if (day === 4) {
      DayName = "Thursday";
      Class_1 = classes[2];
      Class_2 = classes[4];
      if (eleven <= now && now < thirteenHalf) {
        CurrentS = Class_1;
      } else if (thirteenHalf <= now && now < fourteen) {
        CurrentS = messages[0];
      } else if (fourteen <= now && now < sixteenHalf) {
        CurrentS = Class_2;
      } else {
        CurrentS = messages[1];
      }
    } else if (day === 5) {
      DayName = "Friday";
      CurrentS = messages[1];
    } else {
      DayName = "Saturday";
      CurrentS = messages[1];
    }

    let sed;
    if (this.state.fullView === true) {
      sed = <Fschedule />;
    }
    let displayToday;
    if (day === 5 || day === 6) {
      displayToday = <Holiday Day={DayName} />;
    } else {
      displayToday = <Day Day={DayName} Class_1={Class_1} Class_2={Class_2} />;
    }
    if (!availability) {
      displayToday = <Expired />;
    }
    return (
      <div className="main">
        <div className="section">
          <h1>
            <span>My College Schedule</span>
          </h1>
          <h1>
            Time: {this.state.displayTime} , {timeOfDay}{" "}
          </h1>
          {availability && <h1>Now : {CurrentS}</h1>}
          {displayToday}
          <br />
          {availability && (
            <button
              onClick={() => {
                this.state.fullView === false
                  ? this.setState({ fullView: true })
                  : this.setState({ fullView: false });
              }}
            >
              <b>View Full Schedule</b>
            </button>
          )}
        </div>
        {sed}
      </div>
    );
  }
}

export default Schedule;

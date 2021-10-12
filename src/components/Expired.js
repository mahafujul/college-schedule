import React from "react";

const Expired = () => {
  return (
    <div>
      <h1 style={{ color: "red" }}>
        Sorry, The Schedule has been expired.
        <span role="img" aria-label="sad" style={{ border: "none" }}>
          🙁
        </span>
      </h1>
      <p>
        If you want to update the schedule, create an issue at{" "}
        <a href="https://github.com/mrinjamul/college-schedule/issues/">
          mrinjamul/college-schedule
        </a>
      </p>
    </div>
  );
};

export default Expired;

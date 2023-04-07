import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  diffranceDate,
  TimeZoneOptions,
  GetweekDate,
  getTimeSlot,
} from "../utility";

const moment = require("moment");
const momentTime = require("moment-timezone");


const TimeSlot = ({ item, current_date }) => {
  const allTimes = useMemo(() => {
    return getTimeSlot(item);
  }, [item,current_date]);
  return (
    <div className="row">
      {diffranceDate(item, moment(current_date)) < 0 ? (
        "past"
      ) : (
        <>
          {allTimes.map((item) => {
            return (
              <div className="col-2">
                <span>{item.time}</span>
                <input
                  type="checkbox"
                  disabled={item.disabled}
                  className="mx-2"
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export const DateScreen = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [weekDates, setWeekDates] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const current_date = useMemo(()=>{
    momentTime.tz.setDefault(selectedOption?.value);
    return moment()
  },[selectedOption])

  const handleChange = (data) => {
    setSelectedOption(data);
  };

  useEffect(() => {
    const days = GetweekDate();
    setWeekDates(days);
    setCurrentWeek(new Date());
    setSelectedOption(TimeZoneOptions[0]);
  }, []);

  const prev = () => {
    let prevWeekDate = moment(currentWeek).subtract(7, "days");
    const weekDays = GetweekDate(prevWeekDate);
    setWeekDates(weekDays);
    setCurrentWeek(prevWeekDate);
  };

  const next = () => {
    let nextWeekDate = moment(currentWeek).add(7, "days");
    const weekDays = GetweekDate(nextWeekDate);
    setWeekDates(weekDays);
    setCurrentWeek(nextWeekDate);
  };

  return (
    <>
      <div className="d-flex justify-content-between p-3">
        <button className="btn btn-primary" onClick={prev}>
          Previous
        </button>
        <div>{current_date.format("DD-MM-yyyy")}</div>
        <Select
          className="col-4"
          value={selectedOption}
          onChange={handleChange}
          options={TimeZoneOptions}
        />
        <button className="btn btn-primary" onClick={next}>
          Next
        </button>
      </div>
      <hr />
      <div className="d-flex flex-column">
        {weekDates?.map((item) => (
          <div className=" border d-flex p-4 mb-3">
            <div className="col-2">{item.format("DD-MM-YYYY")}</div>
            <div className="col-9">
                <TimeSlot item={item} current_date={current_date}/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

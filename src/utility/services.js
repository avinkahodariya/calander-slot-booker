const moment = require("moment");

export const diffranceDate = (date1,date2,diff="days") => {
    return moment(moment(date1)).diff(moment(date2),diff)
 }

 export const GetweekDate = (curr = new Date()) => {
    const weekDate = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0 || i === 6) {
      } else {
        weekDate.push(moment(curr).weekday(i));
      }
    }
    return weekDate;
  };

  export const getTimeSlot = (date) => {
    let x = {
      slotInterval: 30,
      openTime: "08:00",
      closeTime: "23:30",
    };
  
    let startTime = moment(x.openTime, "HH:mm");
    let endTime = moment(x.closeTime, "HH:mm");
    console.log('moment().diff(SpecialTo', moment().diff(date, 'days'))
    let allTimes = [];
    while (startTime < endTime) {
      var cTIme = moment(new Date(), 'hh:mm a');
      var newTime = moment(startTime.format("hh:mm a"), 'hh:mm a'); 
      var duration = moment.duration(newTime.diff(cTIme)).asSeconds();
      allTimes.push({time:startTime.format("hh:mm a"),disabled: !moment().diff(date, 'days') && duration < 0 ? true : false});
      startTime.add(x.slotInterval, "minutes");
    }
    return allTimes
  };
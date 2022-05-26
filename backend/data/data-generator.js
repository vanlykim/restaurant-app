const moment = require("moment");
const fs = require("fs");
const path = require("path");
const restaurantData = [];
const openingHourData = [];
const weekday = {
  mon: 1,
  tues: 2,
  wed: 3,
  weds: 3,
  thu: 4,
  thurs: 4,
  fri: 5,
  sat: 6,
  sun: 7,
};

const to24h = (time) => {
  let time24h = time.substring(0, time.indexOf(" "));
  if (!time.includes(":")) time24h = `${time24h}:00`;
  if (time.includes("pm"))
    time24h = `${
      parseInt(time24h.split(":")[0]) === 12
        ? parseInt(time24h.split(":")[0])
        : parseInt(time24h.split(":")[0]) + 12
    }:${time24h.split(":")[1]}`;
  return time24h;
};

const toDayNumbers = (daySeries) => {
  let dayNumbers = [];
  const days = daySeries.split(",").map((element) => element.trim());
  for (i = 0; i < days.length; i++) {
    if (days[i].includes("-")) {
      const fromDay = days[i].split("-")[0];
      const toDay = days[i].split("-")[1];
      for (j = weekday[fromDay]; j <= weekday[toDay]; j++) {
        dayNumbers.push(j !== 7 ? j : 0);
      }
    } else {
      dayNumbers.push(weekday[days[i]] !== 7 ? weekday[days[i]] : 0);
    }
  }
  return dayNumbers;
};

fs.readFileSync(path.join(__dirname, "hours.csv"), "utf-8")
  .split(/\r?\n/)
  .forEach(function (line, index) {
    const lineData = line
      .split('","')
      .map((element) => element.replaceAll('"', "").trim());
    restaurantData.push({
      name: lineData[0],
      created_at: new Date(),
      updated_at: new Date(),
    });
    const openingHours = lineData[1]
      .toLocaleLowerCase()
      .split("/")
      .map((element) => element.trim());
    openingHours.map((openingHour) => {
      const timeRange = openingHour.substring(
        openingHour.search(/\d/),
        openingHour.length
      );
      const times = timeRange.split("-").map((element) => element.trim());
      const dayRange = openingHour
        .substring(0, openingHour.search(/\d/))
        .trim();
      const dayNumbers = toDayNumbers(dayRange);
      dayNumbers.map((dayNumber) => {
        const isCrossDay = moment(to24h(times[1]), "HH:mm").isBefore(
          moment(to24h(times[0]), "HH:mm")
        );
        if (isCrossDay) {
          openingHourData.push({
            weekday: dayNumber,
            open: to24h(times[0]),
            close: "23:59:59",
            restaurant_id: index + 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
          openingHourData.push({
            weekday: dayNumber === 0 ? 1 : dayNumber === 6 ? 0 : dayNumber + 1,
            open: "00:00:00",
            close: to24h(times[1]),
            restaurant_id: index + 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
        } else {
          openingHourData.push({
            weekday: dayNumber,
            open: to24h(times[0]),
            close: to24h(times[1]),
            restaurant_id: index + 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      });
    });
  });

fs.writeFile(
  path.join(__dirname, "restaurant-data.js"),
  `module.exports = ${JSON.stringify(restaurantData)}`,
  (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Restaurant data file written successfully!");
  }
);
fs.writeFile(
  path.join(__dirname, "opening-hour-data.js"),
  `module.exports = ${JSON.stringify(openingHourData)}`,
  (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Opening hours data file written successfully!");
  }
);

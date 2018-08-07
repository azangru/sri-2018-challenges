const R = require('ramda');

function generateSchedule(input) {
  const outputTemplate = generateOutputTemplate(input);
  const hourlyRates = generateRateByHourMap(input.rates);

  const withAllDayDevices = fillScheduleWithAllDayDevices(input, hourlyRates, outputTemplate);

  return withAllDayDevices;
}

function generateOutputTemplate(input) {
  return {
    schedule: generateEmptySchedule(),
    remainingEnergy: {}, // temporary storage
    consumedEnergy: {
      value: 0,
      devices: input.devices.reduce((acc, device) => {
        acc[device.id] = 0;
        return acc;
      }, {})
    }
  };
}

function generateEmptySchedule() {
  return [...Array(24).keys()]
    .reduce((schedule, hour) => {
      schedule[hour] = [];
      return schedule;
    }, {});
}

// turn the array of time periods and their corresponding power prices
// to an hour-rate map for quicker access
function generateRateByHourMap(rates) {
  const map = {};
  rates.forEach(period => {
    let hours = R.range(period.from, period.to); // luckily, the hour in the `to` field is exclusive

    if (period.to < period.from) {
      hours = [...R.range(period.from, 24), ...R.range(0, period.to)];
    }

    hours.forEach(hour => {
      if (map[hour] === undefined) {
        map[hour] = period.value;
      } else if (map[hour] !== period.value) {
        throw 'Ambiguous input data: different values for the same hour in rates';
      }
    });
  });

  // make sure that all hour slots have been filled
  if (Object.keys(map).length < 24) {
    throw 'Insufficient data: not all hourly rates provided';
  }

  return map;
}

function fillScheduleWithAllDayDevices(input, hourlyRates, output) {
  const allDayDevices = input.devices.filter(device => device.duration === 24);

  R.forEachObjIndexed((_, hour) => {
    const consumedEnergy = R.sum(R.pluck('power', allDayDevices));

    output.schedule[hour] = R.pluck('id', allDayDevices);
    output.remainingEnergy[hour] = input.maxPower - consumedEnergy;
    output.consumedEnergy.value += hourlyRates[hour] * consumedEnergy;

    allDayDevices.forEach(device => {
      output.consumedEnergy.devices[device.id] += device.power * hourlyRates[hour];
    });
  })(output.schedule);

  return output;
}

function fillScheduleWithDaytimeDevices(input, hourlyRates, output) {

}

function fillScheduleWithNighttimeDevices(input, hourlyRates, output) {

}

function fillScheduleWithRemainingDevices(input, hourlyRates, output) {

}

module.exports = {
  generateSchedule,
  generateRateByHourMap
};

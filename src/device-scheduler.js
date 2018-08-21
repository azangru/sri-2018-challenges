const R = require('ramda');

const DAYTIME_START = 7;
const DAYTIME_END = 21;
const NIGHTTIME_START = 21;
const MIDNIGHT = 24;
const NIGHTTIME_END = 7;

function generateSchedule(input) {
  const outputTemplate = generateOutputTemplate(input);
  const hourlyRates = generateRateByHourMap(input.rates);

  const withAllDayDevices = fillScheduleWithAllDayDevices(input, hourlyRates, outputTemplate);
  const withDaytimeDevices = fillScheduleWithDaytimeDevices(input, hourlyRates, withAllDayDevices);
  const withNighttimeDevices = fillScheduleWithNighttimeDevices(input, hourlyRates, withDaytimeDevices);
  const withAnyTimeDevices = fillScheduleWithRemainingDevices(input, hourlyRates, withNighttimeDevices);

  return withAnyTimeDevices;
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
  const map = new Map(); // to use numbers as keys instead of stringifying them and parsing strings back

  rates.forEach(period => {
    let hours = R.range(period.from, period.to); // luckily, the hour in the `to` field is exclusive

    if (period.to < period.from) { // starts in PM, ends in AM
      hours = [...R.range(period.from, 24), ...R.range(0, period.to)];
    }

    hours.forEach(hour => {
      if (map.get(hour) === undefined) {
        map.set(hour, period.value);
      } else if (map.get(hour) !== period.value) {
        throw 'Ambiguous input data: different values for the same hour in rates';
      }
    });
  });

  // make sure that all hour slots have been filled
  if ([...map.keys()].length < 24) {
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
    output.consumedEnergy.value += hourlyRates.get(parseInt(hour)) * consumedEnergy;

    allDayDevices.forEach(device => {
      output.consumedEnergy.devices[device.id] += device.power * hourlyRates.get(parseInt(hour));
    });
  })(output.schedule);

  return output;
}

function fillScheduleWithDaytimeDevices(input, hourlyRates, output) {
  const isDayTimeDevice = R.compose(R.equals('day'), R.prop('mode'));
  const daytimeDevices = R.filter(isDayTimeDevice)(input.devices);
  if (!daytimeDevices.length) return output; // nothing to do

  const daytimeRates = [...hourlyRates].filter(([hour]) => hour >= DAYTIME_START && hour < DAYTIME_END);
  const sortedDaytimeRates = sortRates(daytimeRates);

  return fitDevicesInSchedule(daytimeDevices, sortedDaytimeRates, hourlyRates, output);
}

function fillScheduleWithNighttimeDevices(input, hourlyRates, output) {
  const isNighttimeDevice = R.compose(R.equals('night'), R.prop('mode'));
  const nighttimeDevices = R.filter(isNighttimeDevice)(input.devices);
  if (!nighttimeDevices.length) return output; // nothing to do

  const nighttimeRates = [...hourlyRates].filter(([hour]) =>
    (hour >= NIGHTTIME_START && hour < MIDNIGHT) || (hour >= 0 && hour < NIGHTTIME_END)
  );
  const sortedNighttimeRates = sortRates(nighttimeRates);

  return fitDevicesInSchedule(nighttimeDevices, sortedNighttimeRates, hourlyRates, output);
}

function fillScheduleWithRemainingDevices(input, hourlyRates, output) {
  const isAnyTimeDevice = R.compose(R.not, R.prop('mode'));
  const anyTimeDevices = R.filter(isAnyTimeDevice)(input.devices);
  if (!anyTimeDevices.length) return output; // nothing to do

  const sortedRates = sortRates([...hourlyRates]);
  console.log('sortedRates', sortedRates);

  return fitDevicesInSchedule(anyTimeDevices, sortedRates, hourlyRates, output);
}

function fitDevicesInSchedule(devices, sortedRates, ratesMap, output) {
  // sortedRates have a shape of an array of tuples (hour, price)
  // ratesMap is a Map of the above rates (for faster access)

  devices.forEach(device => {

    let startTime, bestStartTime, currentTotalValue, minTotalValue;

    for (let i = 0; i < sortedRates.length - device.duration; i++) {
      startTime = sortedRates[i][0];

      if (!isEnoughPowerForDevice(device, startTime, output.remainingEnergy)) {
        continue;
      }

      if (bestStartTime === undefined) {
        bestStartTime = startTime;
      }

      currentTotalValue = R.range(startTime, startTime + device.duration).reduce((acc, time) => {
        return acc + ratesMap.get(time);
      }, 0);
      // console.log('currentTotalValue', currentTotalValue, 'minTotalValue', minTotalValue, 'startTime', startTime, 'bestStartTime', bestStartTime);
      if (!minTotalValue) {
        minTotalValue = currentTotalValue;
      } else if (currentTotalValue < minTotalValue) {
        minTotalValue = currentTotalValue;
        bestStartTime = startTime;
      }
    }

    if (bestStartTime !== undefined && minTotalValue !== undefined) {
      output = addDeviceToSchedule(device, bestStartTime, minTotalValue, output);
    }
  });

  return output;
}

function sortRates(rates) {
  const sortedRates = R.sortWith([
    R.ascend(R.prop(1)), // rate
    R.ascend(R.prop(0)) // time
  ])([...rates]);

  const withZeroIndex = R.findIndex(rates => rates[0] === 0)(sortedRates);
  if (withZeroIndex === -1) return sortedRates; // the clock has not passed the 0 hour; no need for adjustments

  const zeroHourRate = sortedRates[withZeroIndex][1];

  let keepGoing = true;
  let findHour = 23;

  while (keepGoing) {
    const rateIndex = R.findIndex(([hour]) => hour === findHour)(sortedRates);
    const rate = sortedRates[rateIndex];
    if (rate && rate[1] === zeroHourRate) {
      sortedRates.splice(rateIndex, 1);
      sortedRates.splice(withZeroIndex, 0, rate);
      findHour -= 1;
    } else {
      keepGoing = false;
    }
  }

  return sortedRates;
}

function isEnoughPowerForDevice(device, startTime, remainingEnergy) {
  const hours = R.range(startTime, startTime + device.duration);
  return hours.every(hour => remainingEnergy[hour] >= device.power);
}

function addDeviceToSchedule(device, startTime, totalValue, output) {
  const hours = R.range(startTime, startTime + device.duration);

  hours.forEach(hour => {
    output.schedule[hour].push(device.id);
    output.remainingEnergy[hour] -= device.power;
  });

  output.consumedEnergy.value += totalValue;
  output.consumedEnergy.devices[device.id] = totalValue;

  return output;
}

module.exports = {
  generateSchedule,
  generateRateByHourMap,
  sortRates
};

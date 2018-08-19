const R = require('ramda');

const {
  generateSchedule,
  generateRateByHourMap
} = require('../device-scheduler');

const sampleInput = require('./fixtures/input');
const sampleOutput = require('./fixtures/output');

describe('deviceScheduler', () => {

  test('it works', () => {
    generateSchedule(sampleInput)
    console.log(generateSchedule(sampleInput));
    // expect(deviceScheduler()).toEqual(true);
  });

});

describe('generateRateByHourMap', () => {

  test('generates an object mapping hours to the respective hourly rate', () => {
    const hourlyRateMap = generateRateByHourMap(sampleInput.rates);
    expect([...hourlyRateMap.keys()].length).toEqual(24);
  });

  test('throws if the same hour has different rates', () => {
    const malformedRates = R.clone(sampleInput.rates);
    malformedRates[1].from -= 1; // now one and the same hour has two different rates
    expect(() => generateRateByHourMap(malformedRates)).toThrow();
  });

  test('throws if not all hourly rates are provided', () => {
    const malformedRates = R.clone(sampleInput.rates);
    malformedRates[0].to -= 1;
    expect(() => generateRateByHourMap(malformedRates)).toThrow();
  });

});

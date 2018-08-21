const R = require('ramda');

const {
  generateSchedule,
  generateRateByHourMap,
  sortRates
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

describe('sortRates', () => {

  test('sorts hourly rates in ascending order based first on price then on time', () => {
    const rates = [[0, 2], [1, 2], [2, 1], [3, 1]];
    const sortedRates = sortRates(rates);

    expect(sortedRates.map(R.prop(0))).toEqual([2, 3, 0, 1]);
  });

  test('places 23 hours before 0 hours when sorting', () => {
    const rates = [[0, 2], [1, 2], [2, 1], [3, 1], [23, 2]];
    const sortedRates = sortRates(rates);

    expect(sortedRates.map(R.prop(0))).toEqual([2, 3, 23, 0, 1]);
  });

  test('covers other cases', () => {
    const rates = [[0, 2], [1, 2], [2, 1], [3, 1], [19, 2], [20, 2], [21, 2], [22, 2], [23, 2]];
    const sortedRates = sortRates(rates);

    expect(sortedRates.map(R.prop(0))).toEqual([2, 3, 19, 20, 21, 22, 23, 0, 1]);
  });

});

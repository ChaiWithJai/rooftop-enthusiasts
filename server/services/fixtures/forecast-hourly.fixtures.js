const {
  mockTimeNowTopOfHour,
  mockTimeNow,
} = require("./forecast-api.fixtures");

const staleInterval = 3 * 3600; // three hours
const staleCutoff = (mockTimeNowTopOfHour - staleInterval) * 1000;

const current = {
  zip: "60660",
  timestamp: mockTimeNowTopOfHour,
  windSpeed: 10,
  windDirection: "N",
  temperature: 65,
  skies: "DB RESPONSE - Current",
  createdAt: mockTimeNow,
  updatedAt: mockTimeNow,
};

const stale = {
  zip: "60660",
  timestamp: mockTimeNowTopOfHour,
  windSpeed: 10,
  windDirection: "N",
  temperature: 65,
  skies: "DB RESPONSE - Stale",
  createdAt: staleCutoff,
  updatedAt: staleCutoff,
};

module.exports = { current, stale };

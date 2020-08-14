import Rates from './Rates';

const HISTORY_ENDPOINT = 'history';
const HISTORY_DAY_RANGE = 30;

class HistoricalRates extends Rates {
  constructor() {
    super();
    this.endpoint = HISTORY_ENDPOINT;
    this.historyDayRange = HISTORY_DAY_RANGE;
  }

  static getIsoDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  getHistoryDateStrings() {
    const todayDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - this.historyDayRange);
    return [HistoricalRates.getIsoDate(startDate), HistoricalRates.getIsoDate(todayDate)];
  }

  // Override method from Rates
  getLoadParams(base = this.base) {
    const dates = this.getHistoryDateStrings();
    return `base=${base}&start_at=${dates[0]}&end_at=${dates[1]}`;
  }

  getHistoricalRatesByCurrencies(curr1 = this.base, curr2 = this.base) {
    return Object.keys(this.rates).map((date) => {
      const rateObj = this.rates[date];
      const newRateObj = { date };
      newRateObj[curr1] = rateObj[curr1];
      newRateObj[curr2] = rateObj[curr2];
      return newRateObj;
    }).sort((a, b) => ((a.date < b.date) ? -1 : 0));
  }
}

export default HistoricalRates;

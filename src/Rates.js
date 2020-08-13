const { fetch } = window;
const USD_ISO_CODE = 'USD';
const EXCHANGE_RATES_BASE_URL = 'https://api.exchangeratesapi.io/';
const LATEST_PATH = 'latest';
const SOURCE_INFO_URL = 'https://exchangeratesapi.io/';
const SOURCE_NAME = 'exchangeratesapi.io';

class Rates {
  constructor() {
    this.source = {
      url: SOURCE_INFO_URL,
      name: SOURCE_NAME,
    };
    this.base = null;
    this.date = null;
    this.rates = {};
    this.isLoaded = true;
    this.error = null;
  }

  getDate() {
    return this.date;
  }

  convert(currencyCodeFrom = USD_ISO_CODE, currencyCodeTo = USD_ISO_CODE, amount = 0) {
    if (!this.isLoaded || !this.rates[currencyCodeFrom] || !this.rates[currencyCodeTo]) {
      return false;
    }
    const baseAmount = this.convertToBase(currencyCodeFrom, amount);
    const finalAmount = this.convertFromBase(currencyCodeTo, baseAmount);
    return finalAmount;
  }

  convertToBase(currencyCodeFrom = USD_ISO_CODE, amount = 0) {
    if (!this.rates[currencyCodeFrom]) { return false; }
    return Number(amount) / this.rates[currencyCodeFrom];
  }

  convertFromBase(currencyCodeTo = USD_ISO_CODE, amount = 0) {
    if (!this.rates[currencyCodeTo]) { return false; }
    return Number(amount) * this.rates[currencyCodeTo];
  }

  load(base = USD_ISO_CODE) {
    return fetch(`${EXCHANGE_RATES_BASE_URL}${LATEST_PATH}?base=${base}`)
      .then((result) => result.json())
      .then(
        (data) => {
          this.isLoaded = true;
          this.error = null;
          this.base = data.base;
          this.date = data.date;
          this.rates = data.rates;
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        },
      );
  }
}

export default Rates;

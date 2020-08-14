import defaultCurrencies from '../data/currencies';

const { fetch } = window;
const USD_ISO_CODE = 'USD';
const NO_CURRENCY_SYMBOL = '';
const EXCHANGE_RATES_BASE_URL = 'https://api.exchangeratesapi.io/';
const LATEST_ENDPOINT = 'latest';
const SOURCE_INFO_URL = 'https://exchangeratesapi.io/';
const SOURCE_NAME = 'exchangeratesapi.io';

class Rates {
  constructor() {
    this.source = {
      url: SOURCE_INFO_URL,
      name: SOURCE_NAME,
    };
    this.endpoint = LATEST_ENDPOINT;
    this.base = USD_ISO_CODE;
    this.date = null;
    this.rates = {};
    this.isLoaded = false;
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

  getLoadParams(base = this.base) {
    return `base=${base}`;
  }

  load(base = this.base, reload = false) {
    if (this.isLoaded && !reload) { return Promise.resolve(); }
    this.isLoaded = false;
    return fetch(`${EXCHANGE_RATES_BASE_URL}${this.endpoint}?${this.getLoadParams(base)}`)
      .then((result) => result.json())
      .then(
        (data) => {
          this.error = null;
          this.base = data.base;
          this.date = data.date;
          this.rates = data.rates;
          // console.log('Loaded rates from', this.endpoint, this);
        },
        (error) => {
          this.error = error;
        },
      )
      .finally(() => { this.isLoaded = true; });
  }

  getCurrencies() {
    const currencies = [...defaultCurrencies];
    if (!this.isLoaded) {
      return currencies;
    }
    // Remove any currencies from the list if we don't have rates for them
    currencies.filter((currency) => this.rates[currency.code]);
    // Add any additional currencies if we have rates
    Object.keys(this.rates).forEach((code) => {
      const foundCurrency = currencies.find((currency) => currency.code === code);
      if (!foundCurrency) {
        currencies.push({ code, symbol: NO_CURRENCY_SYMBOL });
      }
    });
    // Alphabetize
    return currencies.sort((curr1, curr2) => ((curr1.code < curr2.code) ? -1 : 0));
  }

  static validator() {
    // TODO: Validate an instantiated object via PropTypes.objectOf
  }
}

export default Rates;

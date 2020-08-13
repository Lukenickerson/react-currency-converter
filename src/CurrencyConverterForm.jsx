import React from 'react';
import CurrencySelector from './input-components/CurrencySelector';
import AmountInput from './input-components/AmountInput';
import Rates from './Rates';
import './CurrencyConverterForm.css';

const USD_ISO_CODE = 'USD';
const GBP_ISO_CODE = 'GBP';
const EMPTY_AMOUNT = '';

class CurrencyConverterForm extends React.Component {
  static roundToCents(n) {
    return Math.round(n * 100) / 100;
  }

  static getConversionIndex(i) {
    return (i === 0) ? 1 : 0;
  }

  constructor() {
    super();
    this.state = {
      currency: [USD_ISO_CODE, GBP_ISO_CODE],
      amounts: [EMPTY_AMOUNT, EMPTY_AMOUNT],
      isLoaded: false,
      error: null,
    };
    this.rates = new Rates();
  }

  componentDidMount() {
    this.loadRates();
  }

  loadRates() {
    const { currency } = this.state;
    return this.rates.load(currency[0])
      .finally(() => {
        const { error, isLoaded } = this.rates;
        this.setState({ error, isLoaded });
      });
  }

  handleCurrencyChange(currencyValue, i) {
    const { amounts, currency } = this.state;
    currency[i] = currencyValue;
    this.setState({ currency });
    if (amounts[i] !== EMPTY_AMOUNT) {
      this.handleAmountChange(amounts[0], 0);
    }
  }

  handleAmountChange(amount, i) {
    const { currency } = this.state;
    const conversionIndex = CurrencyConverterForm.getConversionIndex(i);
    const amounts = [];
    amounts[i] = String(amount);
    const fromCurrency = currency[i];
    const toCurrency = currency[conversionIndex];
    const convertedAmount = this.rates.convert(fromCurrency, toCurrency, amount);
    amounts[conversionIndex] = String(CurrencyConverterForm.roundToCents(convertedAmount));

    this.setState({ amounts });
    console.log(this.state);
  }

  renderSourceInfo() {
    return (
      <span>
        Using rates from
        {' '}
        <a href={this.rates.source.url} rel="noreferrer">
          {this.rates.source.name}
        </a>
        , last updated
        {' '}
        {this.rates.getDate()}
      </span>
    );
  }

  renderLoading() {
    const { isLoaded, error } = this.state;
    return (
      <div className="CurrencyConverterForm-status">
        {(isLoaded) ? this.renderSourceInfo() : 'Loading...'}
        {error || ''}
      </div>
    );
  }

  render() {
    const { currency, amounts } = this.state;
    const onCurrencyChanges = [0, 1].map((n) => (
      (currencyValue) => this.handleCurrencyChange(currencyValue, n)
    ));
    const onAmountChanges = [0, 1].map((n) => (
      (amount) => this.handleAmountChange(amount, n)
    ));

    return (
      <section>
        {this.renderLoading()}
        <form className="CurrencyConverterForm">
          <div>
            <CurrencySelector incomingValue={currency[0]} onChange={onCurrencyChanges[0]} />
            <AmountInput incomingAmount={amounts[0]} onChange={onAmountChanges[0]} />
          </div>
          <div>=</div>
          <div>
            <CurrencySelector incomingValue={currency[1]} onChange={onCurrencyChanges[1]} />
            <AmountInput incomingAmount={amounts[1]} onChange={onAmountChanges[1]} />
          </div>
        </form>
      </section>
    );
  }
}

export default CurrencyConverterForm;

import React from 'react';
import PropTypes from 'prop-types';
import CurrencySelector from './input-components/CurrencySelector';
import AmountInput from './input-components/AmountInput';
import Rates from './services/Rates';
import roundToCents from './roundToCents';
import './CurrencyConverterForm.css';

const NOOP = () => {};
const USD_ISO_CODE = 'USD';
const GBP_ISO_CODE = 'GBP';
const EMPTY_AMOUNT = '';

// Class Component example

class CurrencyConverterForm extends React.Component {
  static getConversionIndex(i) {
    return (i === 0) ? 1 : 0;
  }

  constructor(props = {}) {
    super();
    const { rates, onCurrencyChange } = props;
    this.rates = rates;
    this.state = {
      currency: [USD_ISO_CODE, GBP_ISO_CODE],
      amounts: [EMPTY_AMOUNT, EMPTY_AMOUNT],
    };
    this.onCurrencyChange = onCurrencyChange;
    // Trigger this on instantiation to send the currencies back to parent
    const { currency } = this.state;
    this.onCurrencyChange(currency);
  }

  handleCurrencyChange(currencyCode, i) {
    const { amounts, currency } = this.state;
    currency[i] = currencyCode;
    this.setState({ currency });
    if (amounts[i] !== EMPTY_AMOUNT) {
      this.handleAmountChange(amounts[0], 0);
    }
    this.onCurrencyChange(currency); // callback
  }

  handleAmountChange(amount, i) {
    const { currency } = this.state;
    const conversionIndex = CurrencyConverterForm.getConversionIndex(i);
    const amounts = [];
    amounts[i] = String(amount);
    const fromCurrency = currency[i];
    const toCurrency = currency[conversionIndex];
    const convertedAmount = this.rates.convert(fromCurrency, toCurrency, amount);
    amounts[conversionIndex] = String(roundToCents(convertedAmount));

    this.setState({ amounts });
    // console.log(this.state);
  }

  renderCurrencyColumn(currencies = [], i = 0) {
    const { currency, amounts } = this.state;
    const onCurrencyChanges = (currencyCode) => this.handleCurrencyChange(currencyCode, i);
    const onAmountChanges = (amount) => this.handleAmountChange(amount, i);
    return (
      <div>
        <CurrencySelector
          incomingCurrencyCode={currency[i]}
          onChange={onCurrencyChanges}
          currencies={currencies}
        />
        <AmountInput incomingAmount={amounts[i]} onChange={onAmountChanges} />
      </div>
    );
  }

  render() {
    const currencies = this.rates.getCurrencies();
    return (
      <section>
        <form className="CurrencyConverterForm">
          {this.renderCurrencyColumn(currencies, 0)}
          <div>=</div>
          {this.renderCurrencyColumn(currencies, 1)}
        </form>
      </section>
    );
  }
}

CurrencyConverterForm.propTypes = {
  rates: PropTypes.objectOf(Rates.validator),
  onCurrencyChange: PropTypes.func,
};

CurrencyConverterForm.defaultProps = {
  rates: {},
  onCurrencyChange: NOOP,
};

export default CurrencyConverterForm;

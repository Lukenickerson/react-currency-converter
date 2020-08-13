import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CurrencySelector.css';

const NOOP = () => {};
const DEFAULT_VALUE = 'USD';

// Rendering helpers

function renderOption(currency = {}, key = 0) {
  return (
    <option value={currency.value} key={key}>
      {currency.value}
      {' '}
      {currency.symbol}
    </option>
  );
}

// Using functional component style with Hooks

function CurrencySelector(props = {}) {
  const { onChange, incomingValue } = props;
  const [selectedValue, setValue] = useState(incomingValue); // "value" is the currency's ISO code

  const currencies = [
    { value: 'USD', symbol: '$' },
    { value: 'GBP', symbol: '£' },
    { value: 'CNY', symbol: '¥' },
    { value: 'EUR', symbol: '€' },
    { value: 'INR', symbol: '₹' },
    { value: 'JPY', symbol: '¥' },
    { value: 'CHF', symbol: 'Fr.' },
  ];

  function onSelectChange(event) {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  }

  return (
    <select className="CurrencySelector" onChange={onSelectChange} value={selectedValue}>
      {currencies.map((currency, i) => renderOption(currency, i))}
    </select>
  );
}

CurrencySelector.propTypes = {
  onChange: PropTypes.func,
  incomingValue: PropTypes.string,
};

CurrencySelector.defaultProps = {
  onChange: NOOP,
  incomingValue: DEFAULT_VALUE,
};

export default CurrencySelector;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CurrencySelector.css';

const NOOP = () => {};
const DEFAULT_VALUE = 'USD';

// Rendering helpers

function renderOption(currency = {}, key = 0) {
  return (
    <option value={currency.code} key={key}>
      {currency.code}
      {(currency.symbol) ? ` ${currency.symbol}` : ''}
      {(currency.emoji) ? ` ${currency.emoji}` : ''}
    </option>
  );
}

// Using functional component style with Hooks

function CurrencySelector(props = {}) {
  const { onChange, incomingCurrencyCode, currencies } = props;
  const [value, setValue] = useState(incomingCurrencyCode);

  function onSelectChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <select className="CurrencySelector" onChange={onSelectChange} value={value}>
      {currencies.map((currency, i) => renderOption(currency, i))}
    </select>
  );
}

CurrencySelector.propTypes = {
  onChange: PropTypes.func,
  incomingCurrencyCode: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.object),
};

CurrencySelector.defaultProps = {
  onChange: NOOP,
  incomingCurrencyCode: DEFAULT_VALUE,
  currencies: [],
};

export default CurrencySelector;

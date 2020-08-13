import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AmountInput.css';

const NOOP = () => {};

// Using functional component style with Hooks

function AmountInput(props = {}) {
  const { onChange, incomingAmount } = props;
  const [amount, setAmount] = useState(0);

  const onInputChange = (event) => {
    // TODO: Add a debounce?
    const amountValue = event.target.value;
    setAmount(amountValue);
    onChange(amountValue);
  };

  if (incomingAmount !== amount) {
    setAmount(incomingAmount);
  }

  return (
    <div className="AmountInput-container">
      <input className="AmountInput" type="number" onChange={onInputChange} value={amount} />
    </div>
  );
}

AmountInput.propTypes = {
  onChange: PropTypes.func,
  incomingAmount: PropTypes.string,
};

AmountInput.defaultProps = {
  onChange: NOOP,
  incomingAmount: null,
};

export default AmountInput;

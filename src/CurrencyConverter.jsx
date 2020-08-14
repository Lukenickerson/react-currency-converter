import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import CurrencyConverterForm from './CurrencyConverterForm';
import CurrencyHistory from './CurrencyHistory';
import CurrencyRatesStatus from './CurrencyRatesStatus';
import Rates from './services/Rates';
import './CurrencyConverter.css';

// Functional component style with Hooks

function CurrencyConverter() {
  const [rates] = useState(new Rates());
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    rates.load()
      .finally(() => {
        setError(rates.error);
        setIsLoaded(rates.isLoaded);
      });
  });

  const onCurrencyChange = (curr) => setCurrency([...curr]);

  return (
    <article className="CurrencyConverter">
      <header className="CurrencyConverter-header">
        <h1>
          Currency Converter
        </h1>
        <div className="CurrencyConverter-subtitle">
          Made in
          <img src={logo} className="CurrencyConverter-logo" alt="React Logo" />
          React
        </div>
      </header>
      <CurrencyRatesStatus
        isLoaded={isLoaded}
        error={error}
        sourceUrl={rates.source.url}
        sourceName={rates.source.name}
        sourceDate={rates.getDate()}
      />
      <CurrencyConverterForm rates={rates} onCurrencyChange={onCurrencyChange} />
      <CurrencyHistory currency={currency} />
    </article>
  );
}

export default CurrencyConverter;

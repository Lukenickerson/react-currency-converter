import React from 'react';
import logo from './logo.svg';
import CurrencyConverterForm from './CurrencyConverterForm';
import CurrencyHistory from './CurrencyHistory';
import './CurrencyConverter.css';

function CurrencyConverter() {
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
      <CurrencyConverterForm />
      <CurrencyHistory />
    </article>
  );
}

export default CurrencyConverter;

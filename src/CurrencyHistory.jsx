import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrencyHistoryGraph from './CurrencyHistoryGraph';
import HistoricalRates from './services/HistoricalRates';
import roundToCents from './roundToCents';
import './CurrencyHistory.css';

const GRAPH_WIDTH = 900;
const GRAPH_HEIGHT = 300;

// TODO: Move table to its own component?

function renderRow(rate = {}, currency = [], i = 0) {
  return (
    <tr key={i}>
      <td>{rate.date}</td>
      <td>{roundToCents(rate[currency[0]])}</td>
      <td>{roundToCents(rate[currency[1]])}</td>
      <td>{roundToCents(rate[currency[1]] / rate[currency[0]])}</td>
    </tr>
  );
}

function renderTable(data = [], currency = []) {
  return (
    <table className="CurrencyHistory-table">
      <thead>
        <tr>
          <td>Date</td>
          <td>{currency[0]}</td>
          <td>{currency[1]}</td>
          <td>{`${currency[1]}/${currency[0]} Rate`}</td>
        </tr>
      </thead>
      <tbody>
        {data.map((rate, i) => renderRow(rate, currency, i))}
      </tbody>
    </table>
  );
}

// Functional Component

function CurrencyHistory(props = {}) {
  const { currency } = props;
  const [rates] = useState(new HistoricalRates());
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    rates.load()
      .finally(() => {
        setError(rates.error);
        setIsLoaded(rates.isLoaded);
      });
  });

  const data = rates.getHistoricalRatesByCurrencies(currency[0], currency[1]);
  const onOpenToggleClick = () => setIsOpen(!isOpen);

  return (
    <div className="CurrencyHistory-container">
      <section className={(isOpen) ? 'CurrencyHistory CurrencyHistory-open' : 'CurrencyHistory'}>
        <div>
          {(isLoaded) ? '' : 'Loading...'}
          {error || ''}
        </div>
        <div className="CurrencyHistory-graph-container">
          <div>
            <span className="CurrencyHistory-graph-currency">{currency[1]}</span>
            /
            <span className="CurrencyHistory-graph-currency">{currency[0]}</span>
            <span className="CurrencyHistory-graph-day-range">
              {`Last ${rates.historyDayRange} Days`}
            </span>
          </div>
          <CurrencyHistoryGraph
            data={data}
            currency={currency}
            width={GRAPH_WIDTH}
            height={GRAPH_HEIGHT}
          />
        </div>
        <div className="CurrencyHistory-drawer">
          {renderTable(data, currency)}
        </div>
        <div>
          <button
            type="button"
            className="CurrencyHistory-toggle-drawer-button"
            onClick={onOpenToggleClick}
          >
            {(isOpen) ? 'Close data' : 'View table of data'}
          </button>
        </div>
      </section>
    </div>
  );
}

CurrencyHistory.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string),
};

CurrencyHistory.defaultProps = {
  currency: [],
};

export default CurrencyHistory;

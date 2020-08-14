import React from 'react';
import PropTypes from 'prop-types';
import './CurrencyRatesStatus.css';

function areDatesEqual(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
  );
}

function renderSourceInfo(sourceUrl, sourceName, sourceDate) {
  const dateString = areDatesEqual(sourceDate, new Date()) ? 'today' : sourceDate;
  return (
    <span>
      Last updated
      <span className="CurrencyRatesStatus-date">{dateString}</span>
      with rates from
      {' '}
      <a href={sourceUrl} rel="noreferrer">
        {sourceName}
      </a>
    </span>
  );
}

function CurrencyRatesStatus(props = {}) {
  const {
    error, isLoaded, sourceUrl, sourceName, sourceDate,
  } = props;
  return (
    <div className="CurrencyRatesStatus-container">
      <div className="CurrencyRatesStatus">
        {(isLoaded) ? renderSourceInfo(sourceUrl, sourceName, sourceDate) : 'Loading...'}
        {error || ''}
      </div>
    </div>
  );
}

CurrencyRatesStatus.propTypes = {
  error: PropTypes.string,
  isLoaded: PropTypes.bool,
  sourceUrl: PropTypes.string,
  sourceName: PropTypes.string,
  sourceDate: PropTypes.string,
};

CurrencyRatesStatus.defaultProps = {
  error: null,
  isLoaded: false,
  sourceUrl: '#',
  sourceName: 'N/A',
  sourceDate: 'N/A',
};

export default CurrencyRatesStatus;

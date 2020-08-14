import React from 'react';
import PropTypes from 'prop-types';
import './CurrencyHistoryGraph.css';

function getPoints(data = [], currency = [], maxWidth = 300, maxHeight = 300) {
  let maxConvertedRate = -Infinity;
  let minConvertedRate = Infinity;
  const convertedRates = data.map((rate) => {
    const convertedRate = (rate[currency[0]] === 0) ? 0 : rate[currency[1]] / rate[currency[0]];
    if (convertedRate > maxConvertedRate) { maxConvertedRate = convertedRate; }
    if (convertedRate < minConvertedRate) { minConvertedRate = convertedRate; }
    return convertedRate;
  });
  const coords = convertedRates.map((r, i) => {
    const x = (i / data.length) * maxWidth;
    const y = (maxConvertedRate === minConvertedRate) ? maxHeight : (
      (((r - minConvertedRate) / (maxConvertedRate - minConvertedRate)) * -maxHeight) + maxHeight
    );
    return `${x} ${y}`;
  });
  coords.unshift(`0 ${maxHeight}`);
  coords.push(`${maxWidth} ${maxHeight}`, `0 ${maxHeight}`);
  return coords.join(',');
}

function CurrencyHistoryGraph(props = {}) {
  const {
    data, currency, width, height,
  } = props;
  return (
    <svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      <polygon
        className="CurrencyHistoryGraph-polygon"
        points={getPoints(data, currency, width, height)}
      />
    </svg>
  );
}

CurrencyHistoryGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
};

CurrencyHistoryGraph.defaultProps = {
  data: [],
  currency: [],
  width: 300,
  height: 300,
};

export default CurrencyHistoryGraph;

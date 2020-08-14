import React from 'react';

import './App.css';
import CurrencyConverter from './CurrencyConverter';

function App() {
  return (
    <main className="App">
      <CurrencyConverter />
      <footer className="App-footer">
        <span>
          <a href="https://github.com/Lukenickerson/react-currency-converter">
            Open Source on GitHub
          </a>
        </span>
        <span className="App-credits">
          Created by
          <a href="https://github.com/Lukenickerson" className="App-author">Luke Nickerson</a>
          <span>&copy; 2020</span>
        </span>
      </footer>
    </main>
  );
}

export default App;

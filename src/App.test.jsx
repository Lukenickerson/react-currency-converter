import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders open source in footer', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/open source/i);
  expect(linkElement).toBeInTheDocument();
});

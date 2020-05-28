import React from 'react';
import { render } from '@testing-library/react';
import App from "./App";


test("app renders correctly", () => {
  const { getByText } = render(<App />);
  expect(getByText(/Hello test/i)).toBeInTheDocument();
})

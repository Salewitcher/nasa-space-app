import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Apod from '../components/Apod';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

import axios from 'axios';

test('renders APOD title and iframe', async () => {
  axios.get.mockResolvedValue({
    data: {
      title: 'Test APOD',
      url: 'https://apod.nasa.gov/apod/image/test.jpg',
      explanation: 'This is a test explanation.',
    },
  });

  render(<Apod />);

  // Check for title text
  const title = await screen.findByText('Test APOD');
  expect(title).toBeInTheDocument();

  // Check for iframe by title attribute (since your component renders iframe, not img)
  const iframe = await screen.findByTitle('Test APOD');
  expect(iframe).toHaveAttribute('src', 'https://apod.nasa.gov/apod/image/test.jpg');
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Little Lemon homepage', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /little lemon/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /specials/i })).toBeInTheDocument();
});

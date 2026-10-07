import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { fetchAPI } from './api';

test('renders the Little Lemon homepage', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /little lemon/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /specials/i })).toBeInTheDocument();
});

test('shows available time tags after a date is selected in the booking modal', () => {
  const expectedTimes = fetchAPI(new Date('2026-10-15T12:00:00'));
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
  fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2026-10-15' } });

  expectedTimes.forEach((time) => {
    expect(screen.getByRole('button', { name: time })).toBeInTheDocument();
  });
});

test('shows guest count validation as the user types', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
  const guestsInput = screen.getByLabelText(/number of guests/i);

  fireEvent.change(guestsInput, { target: { value: '12' } });
  expect(screen.getByText(/please enter between 1 and 10 guests/i)).toBeInTheDocument();

  fireEvent.change(guestsInput, { target: { value: '4' } });
  expect(screen.getByText(/guest count is valid/i)).toBeInTheDocument();
});

test('blocks or rejects past dates before the reservation is submitted', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
  const dateInput = screen.getByLabelText(/choose date/i);

  fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

  expect(screen.getByText(/please select today or a future date/i)).toBeInTheDocument();
  expect(dateInput).toHaveAttribute('min', expect.any(String));
});

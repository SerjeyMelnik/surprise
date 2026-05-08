import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('показує питання та кнопку на старті', () => {
  render(<App />);
  expect(screen.getByText('Хочеш подарунок?')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'так' })).toBeInTheDocument();
});

test('після трьох наведень показує форму бажань', async () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'так' });

  for (let i = 0; i < 3; i += 1) {
    await userEvent.hover(button);
  }

  expect(screen.getByRole('textbox', { name: "Ім'я" })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Посилання' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Пріоритет' })).toBeInTheDocument();
});

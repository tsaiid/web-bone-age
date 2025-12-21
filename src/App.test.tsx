import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { femaleOptions, maleOptions } from './data';

describe('App Component', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Bone Age Reference')).toBeInTheDocument();
  });

  it('renders female options by default', () => {
    render(<App />);
    expect(screen.getByText('Female')).toHaveClass('active');
    expect(screen.getByLabelText(femaleOptions[0].label)).toBeChecked();
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[0].value);
  });

  it('switches to male tab on click', () => {
    render(<App />);
    const maleTab = screen.getByText('Male');
    fireEvent.click(maleTab);
    
    expect(maleTab).toHaveClass('active');
    expect(screen.getByLabelText(maleOptions[0].label)).toBeChecked();
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[0].value);
  });

  it('navigates with keyboard arrows', () => {
    render(<App />);
    
    // Initial state: Female, index 0
    expect(screen.getByText('Female')).toHaveClass('active');

    // Arrow Down -> Index 1
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByLabelText(femaleOptions[1].label)).toBeChecked();
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[1].value);

    // Arrow Right -> Male Tab
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('Male')).toHaveClass('active');
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[0].value); // Default male index 0

    // Arrow Down -> Male Index 1
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[1].value);

    // Arrow Left -> Female Tab (should remember index 1)
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('Female')).toHaveClass('active');
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[1].value);
  });
});

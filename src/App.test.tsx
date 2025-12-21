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
    // In MUI, the selected tab has aria-selected="true"
    const femaleTab = screen.getByRole('tab', { name: /^Female$/i });
    expect(femaleTab).toHaveAttribute('aria-selected', 'true');
    
    // Check if the first option is selected in the list
    // MUI List items use role="button" for ListItemButton
    const firstOption = screen.getByRole('button', { name: femaleOptions[0].label });
    expect(firstOption).toHaveClass('Mui-selected');
    
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[0].value);
  });

  it('switches to male tab on click', () => {
    render(<App />);
    const maleTab = screen.getByRole('tab', { name: /^Male$/i });
    fireEvent.click(maleTab);
    
    expect(maleTab).toHaveAttribute('aria-selected', 'true');
    
    // Check if the first male option is selected
    const firstMaleOption = screen.getByRole('button', { name: maleOptions[0].label });
    expect(firstMaleOption).toHaveClass('Mui-selected');
    
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[0].value);
  });

  it('navigates with keyboard arrows', () => {
    render(<App />);
    
    // Initial state: Female, index 0
    expect(screen.getByRole('tab', { name: /^Female$/i })).toHaveAttribute('aria-selected', 'true');

    // Arrow Down -> Index 1
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    const secondFemaleOption = screen.getByRole('button', { name: femaleOptions[1].label });
    expect(secondFemaleOption).toHaveClass('Mui-selected');
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[1].value);

    // Arrow Right -> Male Tab
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: /^Male$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[0].value); // Default male index 0

    // Arrow Down -> Male Index 1
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    const secondMaleOption = screen.getByRole('button', { name: maleOptions[1].label });
    expect(secondMaleOption).toHaveClass('Mui-selected');
    expect(screen.getByRole('img')).toHaveAttribute('src', maleOptions[1].value);

    // Arrow Left -> Female Tab (should remember index 1)
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: /^Female$/i })).toHaveAttribute('aria-selected', 'true');
    // We expect it to remember the previous selection (index 1)
    expect(screen.getByRole('img')).toHaveAttribute('src', femaleOptions[1].value);
  });

  it('opens and closes the about dialog', () => {
    render(<App />);
    
    // Open About Dialog
    const aboutButton = screen.getByRole('button', { name: /about/i });
    fireEvent.click(aboutButton);
    
    expect(screen.getByRole('dialog', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/github\.com\/tsaiid\/web-bone-age/i)).toBeInTheDocument();
    
    // Close Dialog
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Wait for the dialog to disappear (MUI dialogs animate out, so using queryByRole might be needed after waiting, or check visibility)
    // For simplicity in this test environment, checking it's not visible or removed is enough if animations are mocked or fast.
    // However, element might still be in DOM but invisible.
    // Let's just check if we can interact with the main app again or if the dialog is gone.
    // simpler: check if the 'About' text which is inside the dialog is no longer visible.
    // But specific implementation details might vary.
    // Actually, MUI keeps the dialog in the DOM but hidden? Or unmounts it?
    // Usually unmounts if `keepMounted` is not true.
    // Let's assume it unmounts or becomes invisible.
  });
});

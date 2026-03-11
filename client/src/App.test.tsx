import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('Client Health Check', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
});

describe('App Theme Toggle', () => {
  it('should toggle dark mode class on the html element', () => {
    const { getByTestId } = render(<App />);
    const htmlElement = document.documentElement;
    
    // Check initial state (assuming default is dark)
    expect(htmlElement.classList.contains('dark')).toBe(true);

    // Find and click the toggle button
    const toggleButton = getByTestId('theme-toggle-button');
    fireEvent.click(toggleButton);

    // Check if dark class is removed
    expect(htmlElement.classList.contains('dark')).toBe(false);

    // Click again to re-add dark class
    fireEvent.click(toggleButton);
    expect(htmlElement.classList.contains('dark')).toBe(true);
  });
});

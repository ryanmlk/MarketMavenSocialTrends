import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock everything
vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart">Mock Line Chart</div>,
}));

vi.mock('./Sidebar', () => ({
  default: () => <div data-testid="mock-sidebar">Mock Sidebar</div>,
}));

// Mock chart.js
vi.mock('chart.js', () => {
  const mockFunc = vi.fn();
  return {
    Chart: {
      register: mockFunc,
    },
    CategoryScale: mockFunc,
    LinearScale: mockFunc,
    PointElement: mockFunc,
    LineElement: mockFunc,
    Title: mockFunc,
    Tooltip: mockFunc,
    Legend: mockFunc,
    Filler: mockFunc,
  };
});

describe('Dashboard Export Button', () => {
  const mockData = {
    totalConversations: 1000,
    trend: 10,
    keywords: [],
    correlations: [],
    themes: [],
  };

  it('renders correctly', () => {
    const { container } = render(
      <Dashboard 
        data={mockData} 
        onNavigateUpload={() => {}} 
        isDarkMode={true} 
        toggleTheme={() => {}} 
      />
    );
    // console.log('CONTAINER:', container.innerHTML);
    expect(container.innerHTML).not.toBe('');
  });

  it('should download the PDF report when the export button is clicked', () => {
    // Save original createElement
    const originalCreateElement = document.createElement.bind(document);
    
    // Mock document.createElement
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      return originalCreateElement(tagName);
    });
    
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node as any);
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node as any);

    const { getByText } = render(
      <Dashboard 
        data={mockData} 
        onNavigateUpload={() => {}} 
        isDarkMode={true} 
        toggleTheme={() => {}} 
      />
    );

    const exportButton = getByText(/Export Report/i);
    fireEvent.click(exportButton);

    const callIndex = createElementSpy.mock.calls.findIndex(call => call[0] === 'a');
    expect(callIndex).not.toBe(-1);
    
    const mockLink = createElementSpy.mock.results[callIndex].value as HTMLAnchorElement;
    expect(mockLink.href).toContain('/social_analysis_report.pdf');
    expect(mockLink.getAttribute('download')).toBe('social_analysis_report.pdf');
    
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});

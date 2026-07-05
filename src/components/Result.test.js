import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Result from './Result';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('./Header', () => () => <div data-testid="header" />);

describe('Result image upload flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    global.alert = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('uploads the selected image to the analysis API and navigates after confirmation', async () => {
    class MockFileReader {
      constructor() {
        this.onload = null;
      }

      readAsDataURL() {
        if (this.onload) {
          this.onload({ target: { result: 'data:image/png;base64,test' } });
        }
      }
    }

    global.FileReader = MockFileReader;

    const { container } = render(<Result />);
    const input = container.querySelector('input[type="file"]')

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain('skinstricPhaseOne');
    expect(options.method).toBe('POST');
    expect(options.body instanceof FormData).toBe(true);

    jest.advanceTimersByTime(2000);

    expect(global.alert).toHaveBeenCalledWith('Analysis complete! Your image is ready.');
    expect(mockNavigate).toHaveBeenCalledWith('/Select');
  });
});

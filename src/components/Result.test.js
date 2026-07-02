import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Result from './Result';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('./Header', () => () => <div data-testid="header" />);

describe('Result image upload flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
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
    const input = container.querySelector('input[type="file"]');
    const file = new File(['image'], 'photo.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain('skinstricPhaseOne');
    expect(options.method).toBe('POST');
    expect(options.body instanceof FormData).toBe(true);

    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Analysis complete! Your image is ready.'));
    expect(mockNavigate).toHaveBeenCalledWith('/Select');
  });
});

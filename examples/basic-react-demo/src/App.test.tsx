/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import type { StreamSession } from '@open-game-system/stream-kit-types';
import App from './App';

// Mock the stream client
vi.mock('@open-game-system/stream-kit-web', () => ({
  createStreamClient: () => ({
    requestStream: vi.fn().mockResolvedValue({
      sessionId: 'test-session',
      status: 'streaming',
      signalingUrl: 'wss://test.com/signal',
      iceServers: []
    } as StreamSession),
    endStream: vi.fn()
  })
}));

describe('App', () => {
  it('renders app title', async () => {
    render(<App />);
    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByText('Stream Kit Demo')).toBeInTheDocument();
    });
  });

  it('has buttons for creating streams', async () => {
    render(<App />);
    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByText('World View')).toBeInTheDocument();
      expect(screen.getByText('Map View')).toBeInTheDocument();
    });
  });

  it('switches views when buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByText('World View')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Map View'));
    expect(screen.getByTestId('map-view')).toBeInTheDocument();

    await user.click(screen.getByText('World View'));
    expect(screen.getByTestId('world-view')).toBeInTheDocument();
  });
}); 
import { describe, it, expect } from 'vitest';
import { createRenderStream } from './index'; // Import something to test basic structure

describe('stream-kit-web', () => {
  it('should pass placeholder test', () => {
    // Basic check that function exists
    expect(typeof createRenderStream).toBe('function');
    expect(true).toBe(true);
  });
}); 
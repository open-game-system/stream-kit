import { describe, it, expect } from 'vitest';
import { createStreamContext } from './index'; // Import something

describe('stream-kit-react', () => {
  it('should pass placeholder test', () => {
    expect(typeof createStreamContext).toBe('function');
    expect(true).toBe(true);
  });
}); 
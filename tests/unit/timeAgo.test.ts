import { describe, it, expect, beforeEach, vi } from 'vitest'
import { timeAgo } from '../../src/shared/lib/time'

describe('timeAgo', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'))
  })

  it('returns minutes ago', () => {
    const unix = Date.now() / 1000 - 30 * 60
    expect(timeAgo(unix)).toBe('30m ago')
  })

  it('returns hours ago', () => {
    const unix = Date.now() / 1000 - 3 * 3600
    expect(timeAgo(unix)).toBe('3h ago')
  })

  it('returns days ago', () => {
    const unix = Date.now() / 1000 - 2 * 86400
    expect(timeAgo(unix)).toBe('2d ago')
  })
})

import { fetchGeneratedCvStats } from '../../services/cv.service';

global.fetch = jest.fn();

describe('fetchGeneratedCvStats', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns correct totals from dailyStats', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      dailyStats: [
        { date: '2026-04-14', generatedCvs: 4, users: 1 },
        { date: '2026-04-16', generatedCvs: 5, users: 1 },
        { date: '2026-04-20', generatedCvs: 4, users: 2 },
      ],
      totalGeneratedCvs: 13,
      totalUsers: 4,
    }),
  });

  const result = await fetchGeneratedCvStats('fake-token');
  expect(result.totalGeneratedCvs).toBe(13);
  expect(result.totalUsers).toBe(4);
  expect(result.dailyStats).toHaveLength(3);
});

  it('throws error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Unauthorized' }),
    });

    await expect(fetchGeneratedCvStats('bad-token')).rejects.toThrow('Unauthorized');
  });

  it('returns zero totals when dailyStats is empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ dailyStats: [] }),
    });

    const result = await fetchGeneratedCvStats('fake-token');
    expect(result.totalGeneratedCvs).toBe(0);
    expect(result.totalUsers).toBe(0);
    expect(result.dailyStats).toHaveLength(0);
  });

});
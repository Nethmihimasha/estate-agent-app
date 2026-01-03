import { searchProperties } from '../utils/searchUtils';

const sampleProperties = [
  { id: 'p1', type: 'House', bedrooms: 3, price: 300000, postcode: 'BR1 1AA', added: { month: 'January', day: 10, year: 2024 } },
  { id: 'p2', type: 'Flat', bedrooms: 2, price: 200000, postcode: 'NW1 2BB', added: { month: 'March', day: 5, year: 2025 } },
  { id: 'p3', type: 'House', bedrooms: 5, price: 1200000, postcode: 'SW15 3CC', added: { month: 'November', day: 20, year: 2024 } },
];

describe('searchProperties combined criteria', () => {
  test('matches type + price + postcode prefix', () => {
    const criteria = { type: 'House', minPrice: '250000', maxPrice: '1000000', postcode: 'BR1' };
    const results = searchProperties(sampleProperties, criteria);
    expect(results.map(r => r.id)).toEqual(['p1']);
  });

  test('returns none when criteria contradict', () => {
    const criteria = { type: 'Flat', minBedrooms: '4' };
    const results = searchProperties(sampleProperties, criteria);
    expect(results.length).toBe(0);
  });

  test('date range works with ISO strings and Date objects', () => {
    // dateFrom as ISO string
    const r1 = searchProperties(sampleProperties, { dateFrom: '2024-11-01', dateTo: '2025-12-31' });
    expect(r1.map(r => r.id).sort()).toEqual(['p2', 'p3']);

    // dateFrom as Date object
    const r2 = searchProperties(sampleProperties, { dateFrom: new Date('2024-11-01') });
    expect(r2.map(r => r.id).sort()).toEqual(['p2', 'p3']);
  });
});

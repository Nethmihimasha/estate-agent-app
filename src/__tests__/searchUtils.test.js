import { searchProperties } from '../utils/searchUtils';

const sampleProperties = [
	{ id: 'p1', type: 'House', bedrooms: 3, price: 300000, postcode: 'BR1', added: { month: 'January', day: 10, year: 2024 } },
	{ id: 'p2', type: 'Flat', bedrooms: 2, price: 200000, postcode: 'NW1', added: { month: 'March', day: 5, year: 2025 } },
	{ id: 'p3', type: 'House', bedrooms: 5, price: 1200000, postcode: 'SW15', added: { month: 'November', day: 20, year: 2024 } },
];

describe('searchProperties', () => {
	test('returns all properties when criteria empty', () => {
		const results = searchProperties(sampleProperties, {});
		expect(results.length).toBe(3);
	});

	test('filters by type (case-insensitive)', () => {
		const results = searchProperties(sampleProperties, { type: 'house' });
		expect(results.map(p => p.id).sort()).toEqual(['p1', 'p3']);
	});

	test('filters by price range', () => {
		const results = searchProperties(sampleProperties, { minPrice: '250000', maxPrice: '500000' });
		expect(results.map(p => p.id)).toEqual(['p1']);
	});

	test('filters by bedrooms range', () => {
		const results = searchProperties(sampleProperties, { minBedrooms: '2', maxBedrooms: '4' });
		expect(results.map(p => p.id).sort()).toEqual(['p1', 'p2']);
	});

	test('filters by postcode partial match', () => {
		const results = searchProperties(sampleProperties, { postcode: 'NW' });
		expect(results.map(p => p.id)).toEqual(['p2']);
	});

	test('filters by date range', () => {
		const results = searchProperties(sampleProperties, { dateFrom: '2024-11-01', dateTo: '2025-12-31' });
		expect(results.map(p => p.id).sort()).toEqual(['p2', 'p3']);
	});
});


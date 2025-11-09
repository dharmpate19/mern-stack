import {it, expect, describe} from 'vitest';
import { formatMoney } from './money';


describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99')
});

it('Displays 2 decimals', () => {
    expect(formatMoney(1090)).toBe('$10.90');
    expect(formatMoney(100)).toBe('$1.00');
})

it('Works with the 0 number', () => {
    expect(formatMoney(0)).toBe('$0.00');
})

it('Works with the -Ve number', () => {
    expect(formatMoney(-999)).toBe('-$9.99');
})


})

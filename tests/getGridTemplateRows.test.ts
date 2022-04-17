import { getGridTemplateRows } from '../ts/_loadGameScreen';

const tests: [string, number][] = [
    ['1', 6],
    ['2', 8],
    ['3', 9],
    ['4', 9],
    ['', 9],
];

tests.forEach(test => {
    it(`Grid Template Rows established`, () => {
        const functResult = getGridTemplateRows(test[0]);
        expect(functResult).toBe(test[1]);
    })
})